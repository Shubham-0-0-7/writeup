---
sidebar_position: 7
---

# flAWS 2 Attacker 1 

lets look at the question
<img width="1174" height="396" alt="Screenshot 2026-06-18 at 12 01 41" src="https://github.com/user-attachments/assets/333d41dc-aabf-4571-a9b6-2a2a1750a530" />

as usual .. as always .. do inspect element hehe   

<img width="1421" height="658" alt="image" src="https://github.com/user-attachments/assets/d7d99262-5aa5-473f-8ba1-63c1ba6e44e2" />

and we got something look ...   
if you have done level 6 of flaws.cloud ... then you'll get the idea that this link is made of what ... 

url : `https://2rfismmoo8.execute-api.us-east-1.amazonaws.com/default/level1` 
this is api gateway url ... it follows the url pattern like `https://{api-id}.execute-api.{region}.amazonaws.com/{stage}`   

here;     
`2rfismmoo8` is api gateway id     
`default` is stage   
`level1` is specific resource i believe     

now lets try something ...  
intercept the request in burp .. and send something which is not a number ...  
<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/14322bef-7126-4a3f-b043-2fd95e30dd78" />

and boom lol ... we got everything ...  
now go to your terminal .. configure your aws-cli with a new profile and all the necessary tokens ...   
<img width="644" height="163" alt="Screenshot 2026-06-18 at 12 23 57" src="https://github.com/user-attachments/assets/35909d50-19b0-4852-82b3-723b67355fde" />

and we check the bucket also .. and we got a secret file ...   

<img width="653" height="167" alt="Screenshot 2026-06-18 at 12 24 42" src="https://github.com/user-attachments/assets/9da741a4-fb22-412c-8f0f-35955a453ff8" />

navigate there and you'll get another level  ...  
 


