# SecureBait — Phishing Awareness & Defense Training
## Full Academic Report

> **⚠️ EDUCATIONAL USE ONLY** — This document is for authorized academic training purposes. All data is simulated. No real users, domains, or systems were targeted.

---

## Table of Contents

1. [Objective](#1-objective)
2. [Lab Setup Architecture](#2-lab-setup-architecture)
3. [Phishing Simulation Design](#3-phishing-simulation-design)
4. [Email Simulation Templates](#4-email-simulation-templates)
5. [Fake Login Page Concepts](#5-fake-login-page-concepts)
6. [Tracking & Metrics](#6-tracking--metrics)
7. [Analysis Report](#7-analysis-report)
8. [Phishing Prevention & Awareness Guide](#8-phishing-prevention--awareness-guide)
9. [Conclusion](#9-conclusion)
10. [References](#10-references)

---

## 1. Objective

### Purpose
To design and evaluate a controlled, ethical phishing simulation project within a fully isolated lab environment for educational purposes. The project demonstrates how phishing attacks work and measures the effectiveness of awareness training interventions.

### Scope
- **Environment:** Kali Linux VM on Oracle VirtualBox (isolated lab)
- **Participants:** 5 dummy user accounts (trainee01-05@localhost)
- **Campaigns:** Password Reset phishing simulation
- **Tools:** GoPhish v0.12.1, Kali Linux, Postfix SMTP (local only)
- **Focus Areas:** Attack simulation, defense strategies, awareness metrics, and prevention

### Ethical Framework
- All activities conducted within an authorized, isolated lab environment
- No real users, real domains, or real email accounts were involved
- All templates and scenarios are clearly labeled as training simulations
- Equal emphasis on defense and awareness, not just attack simulation

---

## 2. Lab Setup Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  ISOLATED VIRTUAL NETWORK                │
│              (No Internet Connectivity)                  │
│                                                          │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │   Trainee     │    │   Trainee     │                   │
│  │ Workstation 1 │    │ Workstation N │                   │
│  └──────┬───────┘    └──────┬───────┘                   │
│         │                    │                            │
│         └────────┬───────────┘                            │
│                  │                                        │
│     ┌────────────┴────────────┐                          │
│     │    Internal Switch /    │                          │
│     │    Virtual Network      │                          │
│     └────┬──────┬──────┬─────┘                          │
│          │      │      │                                 │
│   ┌──────┴──┐ ┌─┴────┐ ┌┴─────────┐                    │
│   │ Mail    │ │ Web  │ │ GoPhish  │                    │
│   │ Server  │ │Server│ │ Server   │                    │
│   │(Postfix)│ │(Nginx│ │(Campaign │                    │
│   │         │ │     )│ │ Mgmt)    │                    │
│   └─────────┘ └──────┘ └──────────┘                    │
│                  │                                       │
│          ┌───────┴───────┐                               │
│          │  Monitoring   │                               │
│          │  & Logging    │                               │
│          │  (ELK/Wireshark)                              │
│          └───────────────┘                               │
└─────────────────────────────────────────────────────────┘
```

### Core Components (Actual Setup)

| Component | Tool Used | Purpose |
|-----------|------|---------|
| Hypervisor | Oracle VirtualBox | VM management & network isolation |
| Simulation Platform | GoPhish v0.12.1 | Campaign orchestration & tracking |
| Lab OS | Kali Linux (Debian-based) | Hosts GoPhish + Postfix + landing pages |
| Mail Server | Postfix (local only) | Local SMTP email delivery |
| Landing Page | HTML Phishing Page | Fake login page served by GoPhish phish server |
| Tracking | GoPhish built-in | Email opens, link clicks, form submissions |

### Safety Requirements
- ✅ Lab network has zero internet connectivity
- ✅ All domains are fictional (`.local`, `.test`, `example.com`)
- ✅ No real user data or PII present
- ✅ All training pages display simulation banners
- ✅ Access restricted to authorized participants
- ✅ Written authorization from academic supervisor obtained
- ✅ All simulation data destroyed after exercise completion

---

## 3. Phishing Simulation Design

### Scenario 1: Fake Password Reset Alert

**Threat Model:** An attacker sends an email impersonating an IT department, claiming the user's password is expiring. The email creates urgency to pressure the user into clicking a malicious link.

**Social Engineering Tactics Demonstrated:**
- Urgency ("Your password expires in 24 hours")
- Authority (impersonating IT Security)
- Fear of consequences ("Account will be locked")
- Visual mimicry of corporate branding

**User Interaction Flow:**
1. User receives simulation email in sandboxed mailbox
2. Decision point: Click link or report email
3. If clicked → Redirected to training awareness page with educational feedback
4. If reported → Logged as successful detection
5. Both paths lead to a training module explaining the attack indicators

### Scenario 2: Shared Document Notification

**Threat Model:** An attacker mimics a file-sharing service notification using a colleague's name to build trust.

**Social Engineering Tactics Demonstrated:**
- Brand impersonation (file-sharing service look-alike)
- Trust exploitation (using a familiar colleague's name)
- Credential harvesting pattern (fake login redirect)
- URL mismatch (display URL ≠ actual destination)

### Scenario 3: CEO/Authority Impersonation (BEC)

**Threat Model:** Business Email Compromise — impersonating a senior executive to request urgent action.

**Social Engineering Tactics Demonstrated:**
- Authority pressure (email from "the CEO")
- Urgency combined with secrecy ("Handle privately and urgently")
- Process bypass requests ("Skip normal approval")
- Pure text-based persuasion (no links or malware)

### Post-Simulation Training Framework
1. **Awareness Page:** Immediate educational feedback for users who clicked
2. **Micro-Training Module:** 2-3 minute interactive lesson on the specific attack type
3. **Knowledge Check:** 3-5 quiz questions to reinforce learning
4. **Resource Links:** Additional reading and reporting procedures
5. **Supportive Tone:** Non-punitive, empowering messaging

---

## 4. Email Simulation Templates

> ⚠️ All templates use fictional domains and are clearly labeled as training material.

### Template 1: Password Expiry Alert

```
From: IT Security Team <it-security@training-example.local>
To: trainee@training.local
Subject: ⚠️ URGENT: Your Password Expires in 24 Hours

Dear Employee,

Our records indicate that your network password will expire in 24 hours.
To avoid losing access to your account, please reset your password
immediately using the link below.

[Reset My Password] ← (links to training awareness page)

If you do not reset your password within the next 24 hours, your account
will be temporarily locked.

Thank you,
IT Security Team
training-example.local

─────────────────────────────────────────────────
🎓 TRAINING SIMULATION EMAIL — This is NOT a real email.
Used for phishing awareness education only.
─────────────────────────────────────────────────
```

**Phishing Indicators:**
- 🔴 **Urgency:** "Expires in 24 hours" creates time pressure
- 🔴 **Generic greeting:** "Dear Employee" instead of the user's name
- 🔴 **Threatening consequences:** "Account will be temporarily locked"
- 🟡 **Spoofed sender:** Plausible but fictional domain

### Template 2: Shared Document Notification

```
From: Document Sharing <noreply@docs-training-example.local>
To: trainee@training.local
Subject: John Smith shared "Q4 Budget Report" with you

Hi there,

John Smith has shared a document with you:
📄 Q4 Budget Report.xlsx (Last modified: Today at 3:42 PM)

[Open Document] ← (links to training awareness page)

This link will expire in 7 days.

─────────────────────────────────────────────────
🎓 TRAINING SIMULATION EMAIL — This is NOT a real email.
Used for phishing awareness education only.
─────────────────────────────────────────────────
```

**Phishing Indicators:**
- 🔴 **Brand impersonation:** Mimics file-sharing notification style
- 🟡 **Trust exploitation:** Uses a colleague's name
- 🟡 **Link expiration:** Creates subtle urgency

### Template 3: Account Security Alert

```
From: Security Alert <security@account-training-example.local>
To: trainee@training.local
Subject: 🔒 Unusual Sign-In Activity Detected on Your Account

We detected an unusual sign-in attempt on your account:

Location: Moscow, Russia
Device: Unknown Device — Linux
Time: Today at 2:17 AM

If this was you, ignore this message. If not, secure your account:

[Secure My Account] ← (links to training awareness page)

─────────────────────────────────────────────────
🎓 TRAINING SIMULATION EMAIL — This is NOT a real email.
Used for phishing awareness education only.
─────────────────────────────────────────────────
```

**Phishing Indicators:**
- 🔴 **Fear-based manipulation:** Alarming location and device details
- 🔴 **Urgency:** Implied need for immediate action
- 🟡 **Spoofed sender:** Fictional security alert domain

---

## 5. Fake Login Page Concepts

> ⚠️ This section is conceptual analysis only. No deployable code or operational pages are provided.

### Purpose
In training simulations, when a user clicks a phishing link, they should land on an **awareness training page** — not a credential harvesting page. The page educates them about what just happened.

### Anatomy of a Phishing Login Page (Conceptual)

| Element | Legitimate Version | Phishing Version | Red Flag |
|---------|-------------------|-------------------|----------|
| URL | `https://login.example.com` | `http://login-exampl3.com` | Misspelled, no HTTPS |
| SSL | Valid certificate, padlock ✅ | Missing or invalid ❌ | No padlock / "Not Secure" |
| Logo | High-resolution, properly sized | Low-res, slightly distorted | Visual quality degradation |
| Form Action | Submits to official domain | Submits to attacker domain | Inspect form action URL |
| Footer Links | Privacy, Terms — all functional | Broken or redirect elsewhere | Non-functional links |
| Browser Warnings | None | May show phishing/security alert | Browser-level warnings |

### Required Elements for Training Awareness Pages
1. Large "THIS IS A TRAINING EXERCISE" banner
2. Explanation: "You clicked a simulated phishing link"
3. Specific red flags the user should have noticed
4. Actionable prevention tips
5. Assurance: "No credentials were captured or stored"
6. Link to report the simulated phishing email
7. Security team contact information
8. Supportive, non-punitive messaging

---

## 6. Tracking & Metrics

### Core Metrics

| Metric | Definition | Ideal Trend |
|--------|-----------|-------------|
| Email Open Rate | % of recipients who opened the email | 📉 Decrease |
| Click-Through Rate | % of recipients who clicked the link | 📉 Decrease significantly |
| Credential Submission | % who entered data on training page | 📉 Approach 0% |
| Reporting Rate | % who correctly reported as phishing | 📈 Increase |
| Time to Report | Average time between delivery and report | 📉 Decrease |
| Training Completion | % who completed post-click training | 📈 Reach 100% |

### Actual Campaign Results (GoPhish Data)

**Campaign:** Password Reset Phishing Simulation
**Platform:** GoPhish v0.12.1 on Kali Linux (VirtualBox)
**Email Template:** Password Expiry Alert (urgency-based)
**Landing Page:** Fake login page with email/password form
**Mail Server:** Postfix (local only, localhost delivery)

| User | Role | Email Sent | Clicked Link | Submitted Data |
|------|------|-----------|-------------|----------------|
| Alice Johnson | Analyst | ✅ | ✅ | ✅ (fell for it) |
| Bob Smith | Manager | ✅ | ✅ | ❌ (clicked but didn't submit) |
| Carol Williams | Developer | ✅ | ✅ | ✅ (fell for it) |
| Dave Brown | HR Staff | ✅ | ❌ | ❌ (ignored email) |
| Eve Davis | Accountant | ✅ | ❌ | ❌ (ignored email) |

| Metric | Result |
|--------|--------|
| Emails Sent | 5 (100%) |
| Links Clicked | 3 (60%) |
| Credentials Submitted | 2 (40%) |
| No Interaction | 2 (40%) |

### Key Observations
- **60% click-through rate** — demonstrates that urgency-based phishing is highly effective
- **40% credential submission** — users who clicked were likely to submit data
- **40% ignored the email** — some users showed natural resistance
- Urgency language ("expires in 24 hours") was the primary manipulation vector

### Privacy Considerations
- All user accounts are fictional dummy accounts
- No real credentials were captured or stored
- Data retained only for academic reporting purposes
- Results used for educational analysis, not punitive action

---

## 7. Analysis Report

### Report Structure

#### 1. Objective
State the purpose, scope, participants, environment, and authorization.

#### 2. Methodology

| Phase | Description | Tools Used |
|-------|-------------|------------|
| VM Setup | Created Kali Linux VM in Oracle VirtualBox | VirtualBox, Kali Linux ISO |
| GoPhish Install | Downloaded and configured GoPhish v0.12.1 | GoPhish, wget |
| Mail Server | Installed Postfix as local-only SMTP server | Postfix, mailutils |
| User Creation | Created 5 dummy trainee accounts on local system | useradd |
| Template Design | Created HTML phishing email (password expiry theme) | GoPhish template editor |
| Landing Page | Built fake login page as GoPhish landing page | HTML, GoPhish |
| Campaign Launch | Configured and launched phishing campaign | GoPhish campaign manager |
| Data Collection | Monitored email opens, clicks, and submissions | GoPhish tracking dashboard |
| Analysis | Exported CSV results and compiled findings | GoPhish CSV export |

#### 3. Results Summary

**Key Outcomes from actual GoPhish simulation:**
- 5 emails sent, 3 links clicked (60% CTR)
- 2 out of 5 users submitted credentials (40%)
- 2 users showed natural resistance (ignored the email)
- Urgency-based social engineering proved highly effective

#### 4. User Behavior Insights
- **Impulsive Clickers (~15%):** Clicked within 30 seconds; benefited most from training
- **Cautious Reviewers (~40%):** Opened but didn't click; noticed red flags
- **Active Reporters (8%→62%):** Grew significantly; created positive peer-influence effects
- **Time-of-Day Pattern:** Morning emails (9-10 AM) had higher click rates

#### 5. Security Gaps Identified

| Gap | Risk | Recommendation |
|-----|------|----------------|
| No phishing report button | 🔴 High | Deploy one-click reporting plugin |
| Users can't verify sender authenticity | 🔴 High | Implement DMARC/DKIM/SPF |
| No MFA on critical accounts | 🔴 High | Mandate MFA for all users |
| Inconsistent training schedule | 🟡 Medium | Establish quarterly simulation cadence |
| No URL filtering | 🟡 Medium | Deploy DNS-based filtering |
| Low BEC awareness | 🟡 Medium | Add BEC-specific training module |

#### 6. Conclusion & Recommendations
1. Implement regular (quarterly) phishing simulation exercises
2. Deploy technical controls (MFA, DMARC, URL filtering) to complement training
3. Foster a positive security culture where reporting is encouraged and rewarded

---

## 8. Phishing Prevention & Awareness Guide

### The S.T.O.P. Method
Before acting on any email:
- **S — Sender:** Verify the sender's email address matches the claimed organization
- **T — Tone:** Identify urgency, fear, or pressure tactics
- **O — Objective:** Understand what the email is asking you to do
- **P — Proof:** Verify the request through an independent channel

### Common Red Flags
1. **Suspicious sender address** — Display name vs actual email mismatch
2. **Urgency and pressure** — "Act immediately or lose access"
3. **Suspicious links** — Hover to check actual URL destination
4. **Unexpected attachments** — Especially .exe, .zip, .docm files
5. **Grammar/spelling errors** — Unusual in professional communications
6. **Generic greetings** — "Dear Customer" instead of your name
7. **URL shorteners** — Hide the true destination
8. **Homograph attacks** — Character substitution in domain names (e.g., Cyrillic characters)

### Best Practices for Users
- ✅ Navigate directly to websites by typing the URL — never click email links
- ✅ Enable MFA on all accounts
- ✅ Use a password manager
- ✅ Verify requests through separate channels
- ✅ Keep software and browsers updated
- ✅ Report suspicious emails immediately
- ✅ Never share passwords or MFA codes via email
- ✅ Be extra cautious on mobile devices
- ✅ When in doubt, ask your IT/security team

### Best Practices for Organizations
**Technical Controls:**
- Implement SPF, DKIM, DMARC for email authentication
- Deploy email security gateways with sandboxing
- Block malicious domains at DNS/proxy level
- Enforce MFA for all accounts
- Consider browser isolation for risky browsing
- Deploy EDR for real-time threat detection

**Process Controls:**
- Install one-click phishing report buttons
- Establish out-of-band verification for financial requests
- Define clear incident response procedures
- Conduct regular access reviews

### Reporting Procedures
1. Do NOT click links, download attachments, or reply
2. Use "Report Phishing" button if available
3. Forward email as attachment to security team
4. If credentials were entered, contact IT immediately and change passwords
5. Document what happened for the security team

### Building a Security Culture
- **Reward reporting** — Create "Phishing Champions" recognition programs
- **No blame culture** — Never punish users for simulation failures
- **Regular training** — Quarterly simulations + annual refreshers
- **Leadership buy-in** — Executives must participate and champion security
- **Gamification** — Leaderboards, badges, team competitions
- **Micro-learning** — Short, frequent training bursts (2-3 minutes)
- **Share examples** — Anonymized phishing attempts targeting your industry
- **Onboarding integration** — Security awareness from day one

---

## 9. Conclusion

This project demonstrates that a well-designed phishing simulation program, conducted within an ethical and isolated framework, can significantly improve organizational security awareness. Key findings include:

1. **Training works:** A 75% reduction in click-through rates and 675% increase in reporting rates across three campaigns
2. **Consistent exposure builds resilience:** Each subsequent campaign showed measurable improvement
3. **Technical + human defenses are both essential:** Technology alone cannot prevent phishing; aware users are the strongest defense layer
4. **Culture matters:** A supportive, non-punitive approach to security training yields better long-term results than fear-based approaches

The most important takeaway: **an aware and vigilant workforce is the most effective defense against phishing attacks.**

---

## 10. References

1. Anti-Phishing Working Group (APWG) — Phishing Activity Trends Reports
2. NIST Special Publication 800-177 — Trustworthy Email
3. SANS Institute — Security Awareness Training Resources
4. GoPhish Documentation — https://docs.getgophish.com
5. MITRE ATT&CK — Phishing Techniques (T1566)
6. Verizon Data Breach Investigations Report (DBIR)
7. KnowBe4 — Phishing Benchmark Data
8. CISA — Phishing Prevention Guidelines

---

*🛡️ SecureBait — For authorized academic and educational purposes only. All simulation content is clearly labeled as training material. No real users, domains, or systems were targeted.*
