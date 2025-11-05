---
title: "Web Basics"
authors: [shubham]
tags: [overthewire, cybersecurity, web]
---

# Web Basics

## HTTP header 

okay let me go through it straight forward 
```bash
GET /home.html HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/testpage.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1
If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
Cache-Control: max-age=0
```

you might have seen this type of thing in burp suite, if not no problem.  
all these things such as `User-Agent`, `Host`, `Accept` etc are called as HTTP header   

lame language definition:  
they are key-value pair that gives you additional information about the request or the response   

now formal definition:  
HTTP headers let the client and the server pass additional information with a message in a request or response.  [source: mdn]     


### Request header 
it is a header that can used in HTTP request to provide information about the request context, so that server can tailor the response. for example `Accept` header tells us which is preferred or allowed format of the response

### CORS
short for cross-origin resource sharing is a system consisting of transferring http header which tells whether the browser blocks frontend javascript code from accessing responses from cross origin requests 

some CORS headers are 
`Access-Control-Allow-Origin`, `Access-Control-Allow-Credentials`, etc

### Cookies 
these are small pieces of data that web server stores on your browser to remember information between requests .. so question arises why cookies exists? http is stateless .. every request is independent ... server doesnt remember you ... cookies fix that by storing small data on your device so that server can recognize you whenever you revisit   
cookies are stored in browsers in small text files and server sends them as `Set-Cookie` http header.  
