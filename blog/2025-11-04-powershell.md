---
title: "Windows PowerShell"
authors: [shubham]
tags: [tryhackme, cybersecurity, windows]
---

# Windows PowerShell

## Introduction

okay let me go through it straight forward  

PowerShell is basically Windows' upgraded command-line.  
it replaces old cmd with something way more powerful because it works with **objects** instead of plain text.

lame language definition:  
it's cmd but on steroids — lets you automate, manage system stuff, and chain commands easily  

formal definition:  
PowerShell is a task-based command-line shell and scripting language built on .NET, designed for system automation and configuration management.

---

## Cmdlets (Commands)

PowerShell doesn't use traditional commands like `ls`, `cat`, etc.  
it uses **cmdlets** which follow the pattern:  
`Verb-Noun`

lame language definition:  
cmdlets are special built-in functions that perform small, focused actions  

formal definition:  
cmdlets are lightweight .NET-based commands used within PowerShell for performing administrative tasks.

some basic cmdlets:

**Get-Command**  
lists all available commands  

**Get-Help**  
shows documentation for any cmdlet  

**Get-Alias**  
shows shortcut names for commands  

these three are your starting trio.

---

## Navigating File System

just like linux, you move around directories and view things.  
but names are different in powershell.

**Set-Location** → change directory  
**Get-ChildItem** → list files/folders  
**New-Item** → create a file/folder  
**Remove-Item** → delete things  
**Copy-Item / Move-Item** → copy / move files  

lame language definition:  
same file operations as linux/mac, only the cmd names are different  

formal definition:  
PowerShell uses provider-based access to systems like filesystem, registry, etc., allowing cmdlets to interact with them as structured objects.

---

## Piping & Filtering (MOST important)

this is where powershell becomes overpowered compared to cmd.  

you pass **objects**, not text.  
this means downstream commands can read properties directly.

example concepts:

**Where-Object** → filter  
**Select-Object** → pick properties  
**Sort-Object** → sort results  

lame language definition:  
you're not messing with strings. you're passing real data with fields like Name, Id, Path, etc.  

formal definition:  
PowerShell pipelines transfer .NET objects between cmdlets, enabling structured querying, transformation, and automation.

---

## Managing Processes & Services

PowerShell is a system admin tool at heart.  
so it gives full access to OS-level components:

**Get-Process** → list running processes  
**Stop-Process** → kill a process  
**Get-Service** → list services  
**Start-Service / Stop-Service** → control services  

lame language definition:  
you can inspect or control what is running on the machine using simple commands  

formal definition:  
PowerShell exposes OS process and service management through object-based cmdlets, allowing precise control and automation.

---

## System & Network Information

powershell can show system details cleanly:

- network config  
- environment variables  
- event logs  
- hardware info  
- registry  

some common areas:

`Get-NetIPConfiguration`  
`Test-Connection` (like ping but object-based)  
`Get-EventLog`  

---

## Why PowerShell is Important in Cybersecurity

attackers love powershell  
admins love powershell  
everyone basically uses it  

because:

- it’s preinstalled on all windows systems  
- lets you automate enumeration  
- can access registry, services, files, processes  
- can download payloads, run scripts, and move laterally  
- allows powerful recon without extra tools  

lame language definition:  
if you know powershell, you can control a windows machine like a pro  

formal definition:  
PowerShell is widely adopted in offensive and defensive security due to its deep system access, scripting capabilities, and ubiquity across Windows environments.

---

## Conclusion

all powershell concepts boil down to this:  

**instead of text, you're working with objects — which makes system automation, enumeration, and control extremely powerful.**

if you understand cmdlets, pipelines, filtering, and basic system commands,  
you already understand the core of PowerShell.

`<!-- truncate -->`