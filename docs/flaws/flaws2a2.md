---
sidebar_position: 8
---

# flAWS 2 Attacker 2

okay lets look into question and the lesson learnt ...   
<img width="745" height="643" alt="Screenshot 2026-06-18 at 12 27 51" src="https://github.com/user-attachments/assets/3d9c8a53-5b36-489c-90eb-30b661a5084b" />

look at the hint ... description is telling us to search the ecr repository named level2 .. 

<img width="658" height="130" alt="Screenshot 2026-06-18 at 12 34 03" src="https://github.com/user-attachments/assets/c0ca4d8f-e909-4e36-a269-a969d0d2cb94" />

we tried listing all ecr repo but we got access denied ... so lets try something different ..    
<img width="816" height="309" alt="Screenshot 2026-06-18 at 12 35 20" src="https://github.com/user-attachments/assets/1e55e202-b9f2-4c54-984b-2c22e347940f" />    

so we tried getting all metadata in repo named level2    
aws ecr repo follows the format `<account-id>.dkr.ecr.<region>.amazonaws.com`    
and we already got the details above ...   
so use the command    
`aws ecr get-login-password --region us-east-1 --profile level1-flaws2 | sudo docker login --username AWS --password-stdin 653711331788.dkr.ecr.us-east-1.amazonaws.com`    

use this command and you'll see login succeedded   
then use `docker pull` command :    
`docker pull 653711331788.dkr.ecr.us-east-1.amazonaws.com/level2:latest`    

<img width="761" height="261" alt="Screenshot 2026-06-18 at 12 51 28" src="https://github.com/user-attachments/assets/2097ca95-60d0-4705-a17a-f83bbdf526a8" />


after pulling the container .. run it ...   and find for level3 file  ...   
<img width="1319" height="335" alt="Screenshot 2026-06-18 at 12 51 52" src="https://github.com/user-attachments/assets/062701f2-6381-44dc-a0cd-9f7c26947bfe" />


and here we go .. we got it    
