# Linux Privilege Escalation Guide

> **Note:** This blog is made by taking reference from: [Delinea blog on Linux Privilege Escalation](https://delinea.com/blog/linux-privilege-escalation).

## What is Privilege Escalation?

Privilege escalation occurs when an attacker gains access to a limited user account and attempts to elevate their permissions to a higher level (typically `root`).

* **Vertical Escalation:** A user with lower privileges attempts to gain higher privileges (e.g., a standard user becoming `root`).
* **Horizontal Escalation:** An attacker takes over another user's account with similar privileges but different access rights (e.g., accessing a database admin's account).

---

## Core Concepts & File Structures

Understanding how Linux handles users and permissions is critical for both exploitation and defense.

### Key Files
* **`/etc/passwd`**: Lists all users on the system.
    * *Format:* `Username:PasswordPlaceholder:UID:GID:Info:Home:Shell`
* **`/etc/shadow`**: Stores encrypted password hashes (readable only by root).
* **`/etc/group`**: Defines user groups.

### Permissions
* **r (Read):** 4
* **w (Write):** 2
* **x (Execute):** 1
* **Special Bits:**
    * **SUID (Set User ID):** Runs the file with the permissions of the file owner (often root).
    * **SGID (Set Group ID):** Runs the file with the permissions of the group.

<img width="1214" height="539" alt="image" src="https://github.com/user-attachments/assets/f533cc92-716c-4f54-9ae3-0e446707f98c" />



## Enumeration: The First Step

Before escalating, you must understand the environment.

### Manual Enumeration Commands

| Command | Description |
| :--- | :--- |
| `id` | Print real and effective user/group IDs. |
| `whoami` | Display current username. |
| `hostname` | Show the system's hostname. |
| `uname -a` | Print system and kernel information. |
| `ps -ef` | Snapshot of current processes. |
| `echo $PATH` | Print environment PATH variable. |
| `ifconfig` / `ip a` | Network interface configuration. |
| `cat /etc/passwd` | View user list. |
| `sudo -l` | List commands the user can run as sudo. |

### Finding SUID/SGID Files
Command to find all files with SUID or SGID bits set:
```bash
find / -type f -a \( -perm -u+s -o -perm -g+s \) -exec ls -l {} \; 2> /dev/null
```

## Automated Enumeration Tools
These scripts automate the discovery of potential vectors:

* **LinPEAS** (Linux Privilege Escalation Awesome Script)
* **LinEnum**
* **Linux Smart Enumeration**
* **Linux Exploit Suggester 2**

---

## Common Escalation Techniques

### 1. Kernel Exploits
Attackers look for outdated kernel versions with known vulnerabilities (e.g., Dirty COW).
* **Detection:** Check `uname -r` and search exploit databases.

### 2. Abuse of Sudo Rights
If a user is allowed to run specific commands via `sudo` without a password (checked via `sudo -l`), they might break out of that command to spawn a root shell.
* **Example:** Using `vim` or `less` to execute shell commands.

### 3. SUID/SGID Binaries
Executables with the SUID bit set run with the owner's privileges. If a binary is owned by root and has SUID set, exploiting it can yield root access.

### 4. Misconfigurations
* **Weak File Permissions:** Sensitive files (like `/etc/shadow`) being readable or writable by standard users.
* **Cron Jobs:** Scripts running as root that are writable by standard users.
* **Cleartext Passwords:** Credentials left in config files, history files, or scripts.

---

## Prevention & Mitigation
To secure Linux systems against these attacks:

* **Least Privilege:** Ensure users only have the permissions necessary for their role.
* **Patch Management:** Keep the Kernel and applications updated.
* **Secure Passwords:** Use strong passwords and store them in PAM/Vault solutions rather than cleartext.
* **Audit Sudoers:** Regularly check `/etc/sudoers` and remove unnecessary entries.
* **Monitor Logs:** Use tools to audit and log privileged access usage.
* **MFA:** Implement Multi-Factor Authentication for access points.

