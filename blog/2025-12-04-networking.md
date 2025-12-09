---
title: "Networking Concepts"
authors: [shubham]
tags: [tryhackme, cybersecurity, networking]
---

# Networking Concepts

## OSI Model

okay let me go through it straight forward  

so networking has this 7 layer model called **OSI model**  
it’s basically a structured way to understand “how data moves” from your device to another device  

lame language definition:  
it is a 7-step pipeline through which data passes. each layer has a job, adds some info, and sends it to the next one  

formal definition:  
the OSI model (Open Systems Interconnection) standardizes communication functions into 7 abstraction layers to ensure different systems can communicate reliably  

### the 7 layers (in simple and useful language)

**Layer 7 — Application**  
the apps you actually use (browser, ssh, discord)

**Layer 6 — Presentation**  
formats and translates data (encryption, compression, encoding)

**Layer 5 — Session**  
creates and maintains the connection (opening, closing, maintaining sessions)

**Layer 4 — Transport**  
splits data into segments, handles ports, and ensures delivery (tcp/udp)

**Layer 3 — Network**  
handles IP addresses and routing (deciding the best path)

**Layer 2 — Data Link**  
mac addressing, local network delivery, error detection

**Layer 1 — Physical**  
actual electrical/optical signals, cables, wifi waves  

basically:  
`7 → what users see`  
`1 → how bits physically travel`

---

## TCP/IP Model

it’s like OSI but the one that the internet actually uses.  
more practical, fewer layers.  

lame language definition:  
TCP/IP is OSI model but compressed into 4 layers so engineers don’t cry  

formal definition:  
TCP/IP (Transmission Control Protocol / Internet Protocol) is a suite of communication protocols used to interconnect network devices on the internet  

### layers

**Application Layer**  
combines OSI’s layers 5,6,7  
your apps, formats, protocols like http, dns, ftp

**Transport Layer**  
manages port numbers + segmentation + reliability  
(TCP/UDP live here)

**Internet Layer**  
IP addressing + routing

**Network Access Layer**  
equals OSI layer 1+2  
MAC, frames, physical transmission  

---

## IP Addresses & Subnets

ip = internet address of a device  
A.B.C.D basically  

now every IP address has two parts:  

**Network part** → which network you belong to  
**Host part** → your unique device inside that network  

so how do we know which part is which?  
using **subnet mask**

lame language definition:  
subnet mask draws a line between “network” and “host” portion of the IP address  

formal definition:  
a subnet mask is a 32-bit number that divides an IP address into network and host identifiers  

example:  
`255.255.255.0` → first 3 octets = network, last = host  

so valid hosts become `.1` to `.254`  

---

## TCP and UDP

### TCP  
the reliable guy  
does handshake, ensures packet delivery, checks order  
it’s slow but trustworthy  

use cases: https, ssh, ftp, email  

### UDP  
the fast guy  
no handshake, no guarantee, no ordering  
works when speed matters  

use cases: video calls, gaming, streaming  

lame language definition:  
TCP cares, UDP doesn’t  

---

## Encapsulation

when data moves through layers, each layer **wraps** it with its own piece of information  
like putting a gift into multiple wrapping papers  

formal definition:  
encapsulation is the process where each networking layer adds its own header (and sometimes trailer) to the data from the layer above  

example flow:  
application data → transport segment → IP packet → frame → bits  

receiver does the reverse (decapsulation)  

---

## Telnet

telnet is an old protocol to remotely access systems  

lame language definition:  
it is SSH but without encryption … like shouting your password in public  

formal definition:  
telnet is an application protocol used to provide a bidirectional text-based communication using a virtual terminal connection over TCP (typically port 23)

not used anymore because everything is **plaintext**, so attackers can sniff credentials easily  

---

## Conclusion

all networking concepts here boil down to one idea:  

**data doesn’t just travel; it passes through layers, gets wrapped with info, uses protocols to move, and gets delivered safely using IP + TCP/UDP.**  

this is the backbone of how the internet works.
`<!-- truncate -->`