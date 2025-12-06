---
title: "Networking Core Protocols"
authors: [shubham]
tags: [tryhackme, cybersecurity, networking]
---

# Networking Core Protocols

## Introduction

okay let me go through it straight forward  

this room covers the core application-layer protocols the internet uses everyday: DNS, WHOIS, HTTP, FTP, SMTP/POP3/IMAP.  
these protocols help resolve names, fetch web pages, transfer files, and send/receive emails.

lame language definition:  
these are the official "languages" computers speak for websites, files, emails, and domain lookup  

formal definition:  
Core network protocols are standardized application-layer communication rules that define how data is requested, transferred, and interpreted across the internet, enabling services like DNS resolution, HTTP browsing, FTP file transfer, and email transmission.

---

## DNS (Domain Name System)

dns converts names → ip addresses.  
your browser can't understand domain names, only numbers.

lame language definition:  
dns is the internet’s phonebook  

formal definition:  
DNS is a hierarchical, distributed naming system that resolves human-readable domain names into IP addresses and provides additional record types like MX, CNAME, PTR, etc.

### DNS Example
```bash
nslookup example.com
Server: 8.8.8.8
Address: 8.8.8.8#53

Non-authoritative answer:
Name: example.com
Address: 93.184.216.34
```

browser now knows where to send HTTP request.

---

## WHOIS

whois gives info about who owns a domain, when it was registered, etc.  

lame language definition:    
whois is “who owns this address on the internet?”    

formal definition:    
WHOIS is a query/response protocol used to look up registration data for domain names and IP address blocks.  

### WHOIS Example
```bash
whois example.com
Domain Name: EXAMPLE.COM
Creation Date: 1995-08-13
Registrar: ...
Registrant Organization: IANA
```

used in reconnaissance.

---

## HTTP (Hypertext Transfer Protocol)  

http is how browsers fetch web pages, APIs, json, images, etc.

lame language definition:  
http is “give me this webpage”  

formal definition:  
HTTP is an application-layer protocol defining how clients and servers request and deliver web resources, using methods like GET, POST, PUT, DELETE, etc.  

### HTTP Example
```bash
GET / HTTP/1.1
Host: example.com
User-Agent: curl/7.79.1
Accept: /

HTTP/1.1 200 OK
Content-Type: text/html
<html>...</html> ```
FTP (File Transfer Protocol)
```
ftp is used to upload/download files between client and server.  

lame language definition:
ftp is a courier service for files. 

formal definition:
FTP is a standard network protocol for transferring files over a reliable TCP connection, usually using port 21 for control and additional ports for data. 

### FTP Example
```bash
ftp example.com
Name: anonymous
Password: guest

ftp> ls
ftp> get secrets.txt
ftp> bye
```
## Email Protocols (SMTP, POP3, IMAP)
### SMTP
used for sending emails.  

lame language definition:
smtp sends your mail to the post office.  

formal definition:
SMTP is a protocol for transferring outgoing email between clients and mail servers, and between mail servers.

### POP3 

used for retrieving emails, usually downloads + deletes.  

lame language definition:
pop3 pulls emails down to your device.  

formal definition:
POP3 is a simple email retrieval protocol where the client downloads messages from server and optionally deletes them from the mailbox.   

### IMAP
used for retrieving emails but keeps them synced across devices.  

lame language definition:
imap keeps your emails on the server so all devices see same inbox.  

formal definition:
IMAP is an email protocol allowing clients to view, organize, and synchronize mail stored on the server without deleting it.  
### Email Example (POP3 via telnet)
```bash
telnet mail.example.com 110
+OK POP3 server ready
USER student
+OK
PASS password123
+OK Logged in
LIST
+OK 2 messages
RETR 1
Subject: Welcome
From: admin@example.com
QUIT
```

### Why These Protocols Matter

dns → resolves names   
whois → reveals domain ownership   
http → loads websites   
ftp → transfers files   
smtp/pop/imap → email communication  

lame language definition:
without these, the internet would be a pile of raw IP addresses and bytes

formal definition:
Core protocols make internet services usable by providing standardized mechanisms for name resolution, content delivery, file transfer, and email exchange.
Conclusion

networking core protocols explain how websites load, how domains resolve, how files are transferred, and how emails flow across servers.

if you understand dns, whois, http, ftp, smtp/pop3/imap — you understand how humans communicate over the internet at protocol-level.