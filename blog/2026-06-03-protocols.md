# Hands-On Protocol Enumeration: Dismantling Network Abstractions with Telnet

In modern network security, automated tools often obscure the underlying mechanics of the protocols they scan. True fluency requires stripping away these layers to communicate with services directly. This article walks through manual enumeration against a target environment (`10.49.179.14`), demonstrating how to interact with HTTP, FTP, SMTP, POP3, and IMAP using raw tools like `telnet`, followed by an automated `nmap` comparison.

---

# 1. Manual Service Enumeration

## HTTP (Port 80) — Navigating Virtual Hosts

Initial attempts to fetch resources directly failed with a **400 Bad Request**:

```bash
$ telnet 10.49.179.14 80
GET /index.html HTTP/1.1

HTTP/1.1 400 Bad Request
Server: nginx/1.18.0 (Ubuntu)
```

Because the server runs virtual hosting, Nginx requires a `Host` header to route traffic. Providing the correct header allows access to the index file and a hidden asset path:

```bash
$ telnet 10.49.179.14 80
GET /index.html HTTP/1.1
host: telnet

HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
...
<h1>Coming Soon<h1>

GET /flag.thm HTTP/1.1
host: telnet

HTTP/1.1 200 OK
THM{e3eb0a1df437f3f97a64aca5952c8ea0}
```

---

## FTP (Port 21) — Data Exfiltration

Interacting with the **vsFTPd 3.0.5** daemon using valid credentials (`frank`) required transitioning into passive mode (`227`) before directory parsing and binary file retrieval could occur:

```bash
$ ftp 10.49.179.14
220 (vsFTPd 3.0.5)
Name: frank
331 Please specify the password.
Password:
230 Login successful.

ftp> ls
150 Here comes the directory listing.
drwx------   10 1001     1001         4096 Maildir
-rw-rw-r--    1 1001     1001         4006 README.txt
-rw-rw-r--    1 1001     1001           39 ftp_flag.thm

ftp> get ftp_flag.thm
226 Transfer complete.
```

---

## SMTP (Port 25) — Banner Grabbing

Connecting to the mail infrastructure immediately leaked internal configurations inside the unauthenticated service readiness banner before any transactional commands were issued:

```bash
$ telnet 10.49.179.14 25
Connected to 10.49.179.14.
220 bento.localdomain ESMTP Postfix THM{5b31ddfc0c11d81eba776e983c35e9b5}
```

---

## POP3 (Port 110) & IMAP (Port 143) — Mailstore Interrogation

Authentication against POP3 confirmed a valid account context, but the drop folder contained zero active items:

```bash
$ telnet 10.49.179.14 110
+OK Hello there.
USER frank
+OK Password required.
PASS D2xc9CgD
+OK logged in.
STAT
+OK 0 0
```

Switching to IMAP required explicit command tags (`c1`, `c2`) to execute session tracking, mailbox mapping, and non-destructive read-only index verification (`EXAMINE`):

```bash
$ telnet 10.49.179.14 143
* OK Courier-IMAP ready.

c1 LOGIN frank D2xc9CgD
c1 OK LOGIN Ok.

c2 LIST "" "*"
* LIST (\HasNoChildren) "." "INBOX.Trash"
* LIST (\Unmarked \HasChildren) "." "INBOX"
c2 OK LIST completed

c3 EXAMINE INBOX
* 0 EXISTS
c3 OK [READ-ONLY] Ok
```

---

# 2. Automated Verification (Nmap)

An aggressive Nmap audit was executed to evaluate scanner observation limits against manual enumeration findings:

```bash
nmap -sV -sC -p 21,25,80,110,143 10.49.179.14
```

Output:

```bash
PORT    STATE SERVICE VERSION
21/tcp  open  ftp     vsftpd 3.0.5
25/tcp  open  smtp    Postfix smtpd
|_smtp-commands: bento.localdomain, PIPELINING, SIZE 10240000, VRFY...
80/tcp  open  http    nginx 1.18.0 (Ubuntu)
|_http-title: Welcome to my Web Server
110/tcp open  pop3    Courier pop3d
| ssl-cert: Subject: commonName=localhost
|_Not valid after:  2022-09-14T12:41:12
143/tcp open  imap    Courier Imapd (released 2018)
```

---

# Strategic Key Differences

## Context Blindness

Nmap accurately versioned daemons but failed to locate hidden items (such as `/flag.thm` or `ftp_flag.thm`) which required explicit application-layer interaction.

## Feature Leakage

Nmap highlighted the availability of the `VRFY` command on port 25, indicating that the target allows unauthenticated user enumeration.

## Cryptographic Life-Cycle Failure

The scan parsed the mail services' TLS profiles and flagged that the certificates expired years prior (`Not valid after: 2022`), exposing traffic to potential Machine-in-the-Middle (MitM) positioning.

---

# Conclusion

While scanners excel at scale, they lack the context-driven logic needed to bypass custom routing limits or interact deeply with session flows. Understanding raw network communication ensures accurate assessment validation when modern tools miss critical application logic.