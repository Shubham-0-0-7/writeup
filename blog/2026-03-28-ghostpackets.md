# CTF Writeup: Ghost Packets


**Challenge Description:** During a late-night gaming session, the network seemed perfectly normal — smooth gameplay, steady connections, nothing unusual. But later, a capture revealed something strange. Among the usual packets, a few stood out — not broken, not corrupted… just different. They didn’t interrupt anything, didn’t raise alarms — they simply existed, quietly blending in.

**Flag Format:** `Kaal{}`  
**File:** `filechall.pcap`

---

## Step 1: Initial PCAP Analysis

To understand what kind of traffic we are dealing with, we start by checking the Protocol Hierarchy Statistics using tshark. This gives us a birds-eye view of the packets in the capture file.

Run the following command:
`tshark -r filechall.pcap -q -z io,phs`

The output statistics show various frames. While the bulk of the traffic is TCP/TLS, you will notice there are exactly 38 DNS frames. These warrant a closer look, as DNS is frequently used to smuggle data.

## Step 2: Investigating DNS Traffic

We filter the traffic to show only DNS queries and extract the requested domain names. 

Run the following command:
`tshark -r filechall.pcap -Y "dns" -T fields -e dns.qry.name`

Looking through the output domains (like `www.google.com` and `fonts.gstatic.com`), we identify a clear case of DNS Exfiltration. Hexadecimal strings are being sent out as subdomains to `ctf.com`, neatly ordered from `p1` to `p5`.

## Step 3: Extracting and Assembling the Payload

We isolate the hex strings from the subdomains in their sequential order:

First part (`p1`): `4b-61-61-6c-7b-62-72-33-61-6b`  
Second part (`p2`): `31-6e-67-5f-62-34-64`  
Third part (`p3`): `5f-77-31-74-68`  
Fourth part (`p4`): `5f-77-31-72-65`  
Fifth part (`p5`): `73-68-34-72-6b-7d`  

Concatenating them gives us our full hex payload:
`4b-61-61-6c-7b-62-72-33-61-6b-31-6e-67-5f-62-34-64-5f-77-31-74-68-5f-77-31-72-65-73-68-34-72-6b-7d`

## Step 4: Decoding the Hex

Finally, we use Python to strip out the hyphens and decode the hex string back into readable ASCII text.

Start your Python environment:
`python3`

Store the payload in a variable:
`payload = "4b-61-61-6c-7b-62-72-33-61-6b-31-6e-67-5f-62-34-64-5f-77-31-74-68-5f-77-31-72-65-73-68-34-72-6b-7d"`

Strip the hyphens and decode the bytes:
`print(bytes.fromhex(payload.replace("-","")).decode())`

## Final Flag
`Kaal{br3ak1ng_b4d_w1th_w1resh4rk}`