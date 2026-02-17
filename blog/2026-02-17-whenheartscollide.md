---
title: "When Hearts Collide writeup TryHackMe"
authors: [shubham]
tags: [web, ctf, cybersecurity, cryptography, md5]
---

## initial observations
reading through the problem statement for "when hearts collide," the application's underlying logic became clear. the web app allows you to upload an image, calculates its md5 hash, and then compares that hash against its database to find a "match." 

## the vulnerability
the critical flaw here is the application's reliance on md5 to determine file uniqueness. md5 is a deprecated and broken cryptographic hash function that is highly vulnerable to collision attacks. this means an attacker can intentionally generate two entirely different files that produce the exact same md5 hash output.

*(for a deeper understanding of how this works, check out this official exploit-db reference: [md5 collision of these 2 images is now() trivial and instant](https://www.exploit-db.com/docs/english/46047-md5-collision-of-these-2-images-is-now()-trivial-and-instant.pdf))*

## the exploit
to exploit this logic flaw, i needed to create an md5 collision using a standard image file. rather than dealing with compiling collision tools locally, i opted to use a pre-built docker container for `fastcoll`.

* grabbed a random standard jpeg image to use as my base (e.g., `fly.jpg`).
* spun up the `brimstone/fastcoll` docker container and passed my image in as a prefix block to generate two new, distinct images (`f1.jpg` and `f2.jpg`):

`docker run --rm --platform linux/amd64 -v $PWD:/work -w /work brimstone/fastcoll --prefixfile fly.jpg -o f1.jpg f2.jpg`

*(note: tweak the `--platform` flag if your local machine's architecture requires it).*

## the result
with the two newly generated images in hand, i returned to the web app.
* uploaded `f1.jpg` to the server.
* immediately followed up by uploading `f2.jpg`.

because `f2.jpg` had the exact same md5 hash as `f1.jpg` but contained different file data, the application's matching logic broke perfectly. boom. the flag popped up on the screen.