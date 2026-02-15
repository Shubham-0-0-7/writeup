---
title: "TryHeartMe Writeup"
authors: [shubham]
tags: [web, ctf, cybersecurity, jwt]
---

## initial observations
web applications running on port 5000 are often built with python frameworks like flask. because of this, they frequently store session data—including user roles—directly in a cookie. 

## the vulnerability
keeping that in mind, i inspected the site and opened the developer tools. 
* navigated to `application` -> `storage` -> `cookies`.
* found a cookie named `tryheartme_jwt`.
* recognized it as a json web token (jwt).

## the exploit
i copied the cookie's value and headed over to an online tool called jwt.one to mess with the payload. 
* changed the `"role"` parameter from `"user"` to `"admin"`.
* increased the `"credits"` just in case i needed them to make the purchase. 

after generating the forged token, i pasted it back into the cookie value in my browser and hit refresh. 

## the result
boom. admin access gained. the hidden `valenflag` product finally appeared on the page. all that was left was to purchase it and grab the flag.