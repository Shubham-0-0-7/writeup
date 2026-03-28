# Disk Deception:CTF Writeup

**challenge description:** a suspicious disk image was recovered from a compromised machine. sensitive data was hidden using multiple layers of obfuscation.

---

## step 1: reassemble the disk image
the provided disk image was split into two parts by ftk imager. to begin the forensic analysis on the macbook air m2, we first concatenate the split parts into a single raw image file.

`cat disk23.001 disk23.002 > disk_full.raw`

## step 2: extract hidden payloads
instead of diving deep into the fat32 file system immediately, a quick string search reveals a hidden json object embedded directly within the raw bytes of the disk image.

`strings disk_full.raw | grep -i "stego_start"`

this json object contains a txt_content key holding a massive base64 encoded string.

## step 3: decode and analyze the steganography
decoding the base64 string reveals a story about hidden messages. the text contains two distinct layers of steganography:
1. zero-width characters embedded throughout the text.
2. a sequence of black and red flag emojis at the bottom of the text acting as binary.

## step 4: extraction script
we can use a python script to automatically parse the raw disk image, extract the base64 json, decode it, and parse the zero-width characters and emojis into binary strings to reveal the hidden text. this script would be a great example to share during a session at the iiitvicd technical committee.

```python
import json
import base64
import re

with open('disk_full.raw', 'rb') as f:
    data = f.read().decode('utf-8', errors='ignore')

match = re.search(r'<<stego_start>>(.*?)<<stego_end>>', data, 2)
if not match:
    exit()

stego_json = json.loads(match.group(1))
b64_content = stego_json['txt_content']

decoded_text = base64.b64decode(b64_content).decode('utf-8')

zw_b1 = ""
zw_b2 = ""

for c in decoded_text:
    if c == '\u200b':
        zw_b1 += '0'
        zw_b2 += '1'
    elif c == '\u200c':
        zw_b1 += '1'
        zw_b2 += '0'

if zw_b1:
    m1 = "".join([chr(int(zw_b1[i:i+8], 2)) for i in range(0, len(zw_b1), 8) if len(zw_b1[i:i+8]) == 8])
    m2 = "".join([chr(int(zw_b2[i:i+8], 2)) for i in range(0, len(zw_b2), 8) if len(zw_b2[i:i+8]) == 8])
    print("zero width method 1:", m1)
    print("zero width method 2:", m2)

flags = re.findall(r'[🏴🚩]+', decoded_text)

if flags:
    fb1 = ""
    fb2 = ""
    for block in flags:
        for c in block:
            if c == '🏴':
                fb1 += '0'
                fb2 += '1'
            elif c == '🚩':
                fb1 += '1'
                fb2 += '0'

    if fb1:
        m1 = "".join([chr(int(fb1[i:i+8], 2)) for i in range(0, len(fb1), 8) if len(fb1[i:i+8]) == 8])
        m2 = "".join([chr(int(fb2[i:i+8], 2)) for i in range(0, len(fb2), 8) if len(fb2[i:i+8]) == 8])
        print("flag method 1:", m1)
        print("flag method 2:", m2)
```

## step 5: execute the script to get the flag
running the script parses both methods.

`python3 disk.py`

the script outputs the decrypted strings from the zero-width character extraction, revealing the true flag on the first method.
