---
title: "Wireshark Basics & Packet Analysis"
authors: [shubham]
tags: [tryhackme, cybersecurity, wireshark, packet-analysis]
---

# Wireshark Basics & Packet Analysis

## What is Wireshark

okay let me go through it straight forward  

wireshark is a free and open-source packet analyzer used to capture and inspect network traffic. you can either sniff live packets or load pcap files for analysis.

lame language definition:  
wireshark is basically a microscope for network traffic — you can zoom into every packet and see all details  

formal definition:  
wireshark is a cross-platform network protocol analyzer that captures, decodes, and displays packets across OSI layers, enabling low-level inspection, filtering, and traffic analysis.

---

## Why Wireshark Matters

- troubleshoot network issues  
- inspect protocol behavior (dns, http, tcp, udp, tls, etc.)  
- analyze suspicious or malicious traffic  
- understand real packet structures  
- extract files or data from captures  
- essential tool for both networking and cybersecurity

lame language definition:  
if you want to see exactly what your computer is “saying”, wireshark is the tool  

formal definition:  
wireshark provides detailed packet-level visibility for diagnostics, protocol research, security auditing, and digital forensics.

---

## Basic Wireshark Interface

when you open a capture, you mainly work with:

- packet list pane → shows all packets  
- packet details pane → shows protocol breakdown for selected packet  
- packet bytes pane → raw hex/ASCII data  
- display filter bar → to narrow down what you want to see  

you can load `.pcap` or `.pcapng` files or capture live traffic.

---

## Packet Dissection

every packet is shown layer by layer:

- ethernet (source/dest MAC)  
- ip header (source/dest IP, TTL, protocol)  
- tcp/udp (ports, flags, seq numbers)  
- application data (http, dns, ftp, tls, etc.)

the details pane lets you drill down into any header field.

example things you might inspect:

- TTL value  
- source/destination ports  
- HTTP host or user-agent  
- DNS query name  
- TCP handshake flags  
- payload bytes  

---

## Filtering Packets

wireshark supports two kinds of filters:

### capture filters  
applied before capturing, restrict what gets recorded.  
example: only capture traffic on port 80 → tcp port 80

### display filters  
applied to shown packets after loading a capture.  
these are more powerful and commonly used.

examples:  
dns  
http  
tcp.flags.syn == 1  
ip.addr == 192.168.1.10  
udp.port == 53

you can also right-click any field → “Apply as Filter” to generate syntax automatically.

---

## Searching Inside Packets

you can search for:

- strings inside packet bytes  
- hostnames  
- ip addresses  
- http headers  
- filenames  
- hidden text in payload  

useful for CTFs and malware pcaps.

---

## Statistics Tools

wireshark provides high-level summaries:

### protocol hierarchy  
breakdown of all protocols in the capture → useful for spotting dominant traffic

### endpoints  
shows all communicating IPs, MACs, ports

### conversations  
shows who talked to whom and how much data was exchanged

### capture file properties  
metadata about the pcap, sometimes includes hidden notes or flags

these tools let you get insights without reading every packet manually.

---

## Common Use Cases

### identifying suspicious traffic  
filter by http, dns, unknown ports, large payloads, repeated requests, etc.

### extracting files  
some http/ftp/unencrypted streams let you reconstruct transmitted files.

### analyzing tcp handshakes  
useful for diagnosing connectivity issues.

### spotting DNS exfiltration  
check unusually long TXT records or frequent DNS queries.

### reading HTTP requests  
see urls, methods, cookies, headers (if unencrypted).

### following a TCP stream  
reconstruct entire conversations (http pages, ftp sessions, etc.)

---

## Conclusion

wireshark is one of the most important tools for anyone learning networking or cybersecurity.  
it shows you real traffic, real protocols, and real packet structures — no abstractions.

if you understand how to filter, dissect, and interpret packets in wireshark,  
you basically understand how data truly moves across networks.

`<!-- truncate -->`