# Hands-On Protocol Enumeration: Dismantling Network Abstractions with Telnet

In modern network security, we rely heavily on automated scanners, framework-driven exploitation tools, and high-level clients to interact with remote infrastructure. While these tools offer undeniable efficiency, they often obscure the mechanics of the underlying protocols. True fluency in network security requires the ability to strip away these layers of abstraction and speak directly to services in their native dialects.

This write-up explores a hands-on protocol enumeration exercise targeting a Linux-based host (`10.49.179.14`). By bypassing automated suites and utilizing raw network utilities like `telnet`, we manually map, authenticate, and interact with five foundational application-layer protocols: **HTTP, FTP, SMTP, POP3, and IMAP**. We then corroborate our manual findings with an automated `nmap` service audit to analyze how scanners interpret these raw network responses.

---

# Technical Environment

* **Attacking Platform:** Unix/Linux Shell (Zsh)
* **Target IP Address:** `10.49.179.14`
* **Target Operating System:** Linux (Ubuntu/Fedora-derived target ecosystem)
* **Tools Utilized:** `telnet`, `ftp`, `nmap`

---

# 1. Manual Service Enumeration via Cleartext Protocols

## HTTP (Port 80) — Navigating Virtual Hosts

Initial attempts to interact with the HTTP service on port 80 demonstrated how modern web servers handle incoming traffic routing based on HTTP headers rather than just IP addresses.

A generic connection followed by a standard command string triggered a client-side routing failure:

```bash
$ telnet 10.49.179.14 80
Trying 10.49.179.14...
Connected to 10.49.179.14.
Escape character is '^]'.

GET /index.html HTTP/1.1

HTTP/1.1 400 Bad Request
Server: nginx/1.18.0 (Ubuntu)
Connection: close
```

The server responded with an HTTP `400 Bad Request` status code. Because modern web servers frequently host multiple web applications on a single IP address (Virtual Hosting), Nginx requires an explicit `Host` header to determine which server block should receive the request.

By re-establishing the session and manually crafting a valid HTTP request containing the appropriate Host header routing (`host: telnet`), the server successfully processed the request, yielding a `200 OK` response along with the raw HTML payload:

```bash
$ telnet 10.49.179.14 80
Trying 10.49.179.14...
Connected to 10.49.179.14.

GET /index.html HTTP/1.1
host: telnet

HTTP/1.1 200 OK
Server: nginx/1.18.0 (Ubuntu)
Content-Type: text/html
Content-Length: 234
Connection: keep-alive

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Welcome to my Web Server</title>
</head>
<body>
  <h1>Coming Soon</h1>
</body>
</html>
```

With a stable keep-alive connection, a secondary manual request was issued to target hidden files directly on the server, successfully exfiltrating an application token:

```bash
GET /flag.thm HTTP/1.1
host: telnet

HTTP/1.1 200 OK
Content-Type: application/octet-stream
Content-Length: 39

THM{e3eb0a1df437f3f97a64aca5952c8ea0}
```

---

## FTP (Port 21) — Data Retrieval

File Transfer Protocol (FTP) remains a common vector for sensitive data exposure if misconfigured. Interacting with port 21 exposed a standard vsFTPd 3.0.5 daemon.

Using the local FTP client utility, a session was established using known user credentials (`frank`).

```bash
$ ftp 10.49.179.14
Connected to 10.49.179.14.
220 (vsFTPd 3.0.5)

Name (10.49.179.14:localuser): frank
331 Please specify the password.

Password:
230 Login successful.

Remote system type is UNIX.
```

Upon successful authentication, the server transitioned to passive mode (`227 Entering Passive Mode`) to establish a separate data channel for directory listings and file transfers. A directory listing exposed a target backup text document and an explicit data file:

```bash
ftp> ls

150 Here comes the directory listing.
drwx------   10 1001     1001         4096 Sep 15 2021 Maildir
-rw-rw-r--    1 1001     1001         4006 Sep 15 2021 README.txt
-rw-rw-r--    1 1001     1001           39 Sep 15 2021 ftp_flag.thm
226 Directory send OK.

ftp> get ftp_flag.thm

local: ftp_flag.thm remote: ftp_flag.thm
150 Opening BINARY mode data connection for ftp_flag.thm (39 bytes).
226 Transfer complete.
```

---

## SMTP (Port 25) — Banner Grabbing

Simple Mail Transfer Protocol (SMTP) often leaks critical system configuration metrics via its initialization banner. Connecting to the raw mail submission port immediately triggered an unauthenticated information disclosure.

```bash
$ telnet 10.49.179.14 25
Trying 10.49.179.14...
Connected to 10.49.179.14.
Escape character is '^]'.

220 bento.localdomain ESMTP Postfix THM{5b31ddfc0c11d81eba776e983c35e9b5}
```

The Postfix daemon leaked both the internal hostname (`bento.localdomain`) and an embedded system string directly inside the cleartext `220` service readiness banner before any SMTP transaction commands (`HELO`, `EHLO`) were issued.

---

## POP3 (Port 110) — Mailstore Authentication

The Post Office Protocol version 3 (POP3) handles standard cleartext mailbox retrieval. Utilizing credentials harvested during reconnaissance, a direct authentication sequence was executed over port 110.

```bash
$ telnet 10.49.179.14 110
Trying 10.49.179.14...
Connected to 10.49.179.14.

+OK Hello there.
USER frank
+OK Password required.

PASS D2xc9CgD
+OK logged in.

STAT
+OK 0 0
```

The server acknowledged authentication via `+OK logged in`. Executing the `STAT` command revealed that while the account context was fully valid, the specific POP3 drop directory contained zero active messages (`+OK 0 0`), prompting a pivot to more advanced mail handling frameworks.

---

## IMAP (Port 143) — Interactive Mail Inspection

Internet Message Access Protocol (IMAP) provides a more complex command structure than POP3 for mailbox management. Sessions require explicit command tags (`c1`, `c2`, etc.) prepended to each instruction line.

```bash
$ telnet 10.49.179.14 143
Connected to 10.49.179.14.

* OK Courier-IMAP ready.

c1 LOGIN frank D2xc9CgD
* OK [ALERT] Filesystem notification initialization error
c1 OK LOGIN Ok.
```

Following successful authentication, directory structures were enumerated using wildcard filters to identify mail storage structures within the file system:

```bash
c2 LIST "" "*"

* LIST (\HasNoChildren) "." "INBOX.Trash"
* LIST (\HasNoChildren) "." "INBOX.Drafts"
* LIST (\HasNoChildren) "." "INBOX.Templates"
* LIST (\HasNoChildren) "." "INBOX.Sent"
* LIST (\Unmarked \HasChildren) "." "INBOX"

c2 OK LIST completed
```

The primary mailbox partition was then inspected in a non-destructive, read-only state using the `EXAMINE` verb:

```bash
c3 EXAMINE INBOX

* FLAGS (\Draft \Answered \Flagged \Deleted \Seen \Recent)
* OK [PERMANENTFLAGS ()] No permanent flags permitted
* 0 EXISTS
* 0 RECENT

c3 OK [READ-ONLY] Ok
```

---

# 2. Automated Service Verification via Nmap

To compare manual assessment techniques against automated tools, an aggressive network service scan was executed using the Nmap Scripting Engine (NSE) to interrogate the exact same port array.

```bash
nmap -sV -sC -p 21,25,80,110,143 10.49.179.14
```

## Scan Output Analysis

```bash
Starting Nmap 7.92 at 2026-06-03 11:22 IST

Nmap scan report for 10.49.179.14
Host is up (0.048s latency).

PORT    STATE SERVICE VERSION
21/tcp  open  ftp     vsftpd 3.0.5
25/tcp  open  smtp    Postfix smtpd
|_smtp-commands: bento.localdomain, PIPELINING, SIZE 10240000, VRFY,
| ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN,
| SMTPUTF8, CHUNKING
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=bento
| Subject Alternative Name: DNS:bento
|_Not valid after: 2031-09-12T12:03:40

80/tcp  open  http    nginx 1.18.0 (Ubuntu)
|_http-title: Welcome to my Web Server
|_http-server-header: nginx/1.18.0 (Ubuntu)

110/tcp open  pop3    Courier pop3d
|_pop3-capabilities: UTF8(USER) TOP UIDL PIPELINING
| LOGIN-DELAY(10) USER STLS
| IMPLEMENTATION(Courier Mail Server)
| ssl-cert: Subject:
| commonName=localhost/organizationName=Courier Mail Server
|_Not valid after: 2022-09-14T12:41:12

143/tcp open  imap    Courier Imapd (released 2018)
|_imap-capabilities: ACL UTF8=ACCEPT
| THREAD=ORDEREDSUBJECT completed QUOTA OK
| THREAD=REFERENCES IDLE CAPABILITY IMAP4rev1
| ENABLE SORT STARTTLS CHILDREN UIDPLUS
| NAMESPACE ACL2=UNION

Service Info:
Host: bento.localdomain
OSs: Unix, Linux
CPE: cpe:/o:linux:linux_kernel

Nmap done: 1 IP address (1 host up) scanned in 20.12 seconds
```

---

# Core Architecture Findings: Manual vs Automated

## Information Extraction Limitations

While Nmap accurately performed service version fingerprinting (`nginx 1.18.0`, `vsFTPd 3.0.5`), it did not discover sensitive flag structures hidden deeper in custom application paths (such as `/flag.thm` on HTTP), nor did it attempt credentialed data extraction within the mailboxes.

## SMTP Command Exposure

Nmap's default scripts executed an `EHLO` sequence and discovered that the `VRFY` instruction is globally exposed. This indicates that the mail server allows unauthenticated clients to verify user accounts, exposing the infrastructure to automated username harvesting and brute-force staging.

## Cryptographic Weaknesses

The NSE engine extracted SSL/TLS public key infrastructure data for the mail daemons on ports 110 and 143. The script engine exposed a critical configuration finding:

```bash
Not valid after: 2022-09-14T12:41:12
```

The cryptographic certificates protecting authentication data over POP3/IMAP expired years prior. In an enterprise auditing scenario, this confirms a failure in certificate lifecycle management, exposing transmission lines to potential credential harvesting via Machine-in-the-Middle (MitM) attacks.

---

# Conclusion

Automated engines like Nmap are essential for broad attack-surface mapping and initial discovery. However, security professionals must remain adept at manual protocol interaction. Understanding how to communicate directly with network daemons over raw TCP streams ensures that security testers can accurately validate configurations, handle virtual host routing constraints, and uncover deep-seated vulnerabilities that automated enumeration routines frequently overlook.
