---
sidebar_position: 4
---

# flAWS level 4 

okay so right now we got the link to level 4 right 
<img width="1032" height="508" alt="Screenshot 2026-06-11 at 16 34 50" src="https://github.com/user-attachments/assets/3884181c-cf51-4f6e-abac-6387c76d4638" />

now lets look into what the question is   
<img width="676" height="686" alt="Screenshot 2026-06-11 at 16 35 30" src="https://github.com/user-attachments/assets/368a6ab1-b2ec-45e0-87ee-bec600013584" />

look at the questions .. its asking for webpage running on ec2 instance  


An AWS Snapshot is a frozen, point-in-time backup of one of these EBS volumes. The vulnerability in this level is a classic misconfiguration: the target account accidentally set the permissions on snapshot snap-0b49342abd1bdcb89 to public.    
Any AWS user can take a public snapshot and "hydrate" it ... meaning they can use it as a mold to press a brand new, identical EBS volume in their own AWS account.    

<img width="730" height="487" alt="Screenshot 2026-06-11 at 16 58 00" src="https://github.com/user-attachments/assets/b94fc8fd-4223-40d9-9620-44cc9d6b5cd2" />

so we got the snapshot id from here ... and now we will create volume using the `create-volume` command ...  


<img width="922" height="291" alt="Screenshot 2026-06-11 at 16 54 51" src="https://github.com/user-attachments/assets/f7c5f0c8-0db9-4296-809f-d7bbf176ee0b" />
now go to your aws console ... select the region you created the volume in .. here its United States (Oregon) ... `us-west-2a` ... then spin up ec2 instance   
and make sure while selecting the network subnet you select the one that matches the availiability of your region ... else you wont be able to attach the volume ...   
here select network subnet with `us-west-2a` ... or whatever matches yours ...   

then navigate again to EBS section (volume) and select the volume you spun using your aws-cli ... and click the `Actions` button and attach volume ...   

now ssh into your server and locate the volume using command `lsblk` ... and mount it ...    
<img width="566" height="277" alt="Screenshot 2026-06-11 at 17 33 23" src="https://github.com/user-attachments/assets/94347188-0774-4f6d-bc01-ef8e3a000d65" />
then cd into /mnt/flaws/home/ubuntu ... and check ...    
<img width="682" height="97" alt="Screenshot 2026-06-11 at 17 42 28" src="https://github.com/user-attachments/assets/49970b89-1f7e-402d-aac1-9a4294d3874f" />

and we got the username and password ...   

navigate to 4d0cf09b9b2d761a7d87be99d17507bce8b86f3b.flaws.cloud ... and it will prompt for username and password ... write them and you'll get level 5 
<img width="759" height="280" alt="Screenshot 2026-06-11 at 17 46 01" src="https://github.com/user-attachments/assets/50afcb62-adf7-491c-b431-3b12a0888f79" />

