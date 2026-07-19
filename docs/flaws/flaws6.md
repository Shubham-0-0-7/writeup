---
sidebar_position: 6
---

# flAWS level 6 

okay so lets read the description ..  
<img width="697" height="696" alt="Screenshot 2026-06-11 at 18 30 36" src="https://github.com/user-attachments/assets/eb7ebc11-0d5b-4223-ba96-d30381d49647" />

credentials are given ... configure your aws using those credentials   

then lets list the lambda functions first to see what we are working with.  
`aws lambda list-functions --profile flaws6 --region us-west-2`.  

<img width="685" height="705" alt="Screenshot 2026-06-11 at 18 35 19" src="https://github.com/user-attachments/assets/0e1e888f-e539-472c-8436-5edc8034bfeb" />

found one named Level6 ... lets try to grab the source code    
`aws lambda get-function --function-name Level6 --profile flaws6 --region us-west-2 --query 'Code.Location' --output text`

tried but it says access denied :(   
access denied ... so we cant read the code directly ... the policy blocks it. but we can check what is allowed to trigger this function instead   
`aws lambda get-policy --function-name Level6 --profile flaws6 --region us-west-2`   

<img width="1468" height="148" alt="Screenshot 2026-06-11 at 18 37 26" src="https://github.com/user-attachments/assets/7a9576ad-ef16-47a6-b938-3f2ead4bfb72" />

look at the output ... in the source arn there is an api gateway id ... s33ppypa75 ... this is the front door.    
now we just need the stage name for this api to build the actual url  ...   
`aws apigateway get-stages --rest-api-id s33ppypa75 --profile flaws6 --region us-west-2`

<img width="755" height="292" alt="Screenshot 2026-06-11 at 18 39 42" src="https://github.com/user-attachments/assets/6ee27683-e94f-4d1e-ab35-f93f36120e29" />

so the stage name is `Prod` ... lets navigate there ...   
<img width="711" height="184" alt="Screenshot 2026-06-11 at 18 40 28" src="https://github.com/user-attachments/assets/e2fae6aa-5f4c-4c54-b612-5241971115be" />
navigate again to the given dir ...   
<img width="921" height="733" alt="Screenshot 2026-06-11 at 18 40 55" src="https://github.com/user-attachments/assets/79c260bf-69fe-4749-b14c-f8ef003861c7" />

and boom we completed the flaws challenge!! ...  
