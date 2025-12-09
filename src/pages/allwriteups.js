import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function AllWriteups() {
  return (
    <Layout title="All Writeups" description="Cybersecurity writeups and walkthroughs">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem" }}>
        
        <h1>All Writeups</h1>
        <p style={{ opacity: 0.8, marginBottom: "2rem" }}>
          Explore Bandit, Natas, Linux basics, Windows commands, networking fundamentals,
          shell scripting, web basics, and more.
        </p>

        {/* ⭐ MANUAL LIST OF LINKS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

         <Link to="/writeup/blog/2025/10/18/bandit-0-1" className="writeup-card">
                     Bandit Level 0 → 1
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/18/bandit-1-2" className="writeup-card">
                     Bandit Level 1 → 2
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/18/bandit-2-3" className="writeup-card">
                     Bandit Level 2 → 3
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/18/bandit-3-4" className="writeup-card">
                     Bandit Level 3 → 4
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/18/bandit-4-5" className="writeup-card">
                     Bandit Level 4 → 5
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/18/bandit-5-6" className="writeup-card">
                     Bandit Level 5 → 6
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/18/bandit-6-7" className="writeup-card">
                     Bandit Level 6 → 7
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/18/bandit-7-8" className="writeup-card">
                     Bandit Level 7 → 8
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/18/bandit-passwords" className="writeup-card">
                     Bandit Passwords (Complete Dump)
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/20/bandit-13-14" className="writeup-card">
                     Bandit Level 13 → 14
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/20/bandit-14-15" className="writeup-card">
                     Bandit Level 14 → 15
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/20/bandit-15-16" className="writeup-card">
                     Bandit Level 15 → 16
                   </Link>
         
                   <Link to="/writeup/blog/2025/10/20/bandit-16-17" className="writeup-card">
                     Bandit Level 16 → 17
                   </Link>
         

                    <Link
                      to="/writeup/blog/2025/10/23/natas-0"
                      className="writeup-card"
                    >
                      Natas Level 0
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/10/23/natas-1"
                      className="writeup-card"
                    >
                      Natas Level 1
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/10/24/natas-2"
                      className="writeup-card"
                    >
                      Natas Level 2
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/10/24/natas-3"
                      className="writeup-card"
                    >
                      Natas Level 3
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/10/24/natas-4"
                      className="writeup-card"
                    >
                      Natas Level 4
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/10/24/natas-5"
                      className="writeup-card"
                    >
                      Natas Level 5
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/10/24/natas-6"
                      className="writeup-card"
                    >
                      Natas Level 6
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/10/24/natas-7"
                      className="writeup-card"
                    >
                      Natas Level 7
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/11/06/natas-8"
                      className="writeup-card"
                    >
                      Natas Level 8
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/11/06/natas-9"
                      className="writeup-card"
                    >
                      Natas Level 9
                    </Link>

          <Link
                      to="/writeup/blog/2025/11/05/web-basics"
                      className="writeup-card"
                    >
                      Web Basics (Nov 2025)
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/11/04/windowsad"
                      className="writeup-card"
                    >
                      Windows Commands & AD Basics (Nov 2025)
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/11/04/powershell"
                      className="writeup-card"
                    >
                      PowerShell Fundamentals (Nov 2025)
                    </Link>
          
                    <Link
                      to="/writeup/blog/2025/12/04/networking"
                      className="writeup-card"
                    >
                      Networking Essentials (Dec 2025)
                    </Link>

                    <Link
                      to="/writeup/blog/2025/12/06/netw-core-protocols"
                      className="writeup-card"
                    >
                      Networking Core Protocols (Dec 2025)
                    </Link>
                    
                    <Link
                     to="/writeup/blog/2025/12/07/wiresharkbasics"
                     className="writeup-card"
                    >
                    Wireshark Basics
                    </Link>

                    <Link
                      to="/writeup/blog/2025/12/09/tcpdump"
                      className="writeup-card"
                    >
                    Tcpdump Basics
                    </Link>

        </div>

      </div>
    </Layout>
  );
}
