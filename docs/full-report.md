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
- **Environment:** Fully isolated virtual network (no internet access)
- **Participants:** 50 simulated dummy user accounts
- **Campaigns:** 3 phishing simulation campaigns over 6 months
- **Tools:** GoPhish, Kali Linux, sandboxed mail/web servers
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

### Core Components

| Component | Tool | Purpose |
|-----------|------|---------|
| Hypervisor | VirtualBox / VMware | VM management & network isolation |
| Simulation Platform | GoPhish | Campaign orchestration & tracking |
| Attack OS | Kali Linux | Security testing tools |
| Mail Server | hMailServer / Postfix | Local email delivery (sandboxed) |
| Web Server | Apache / Nginx | Hosting training landing pages |
| Monitoring | Wireshark / ELK Stack | Traffic capture & log analysis |
| DNS | dnsmasq | Local DNS for fictional domains |

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

### Simulated Campaign Results (Sample Data)

| Metric | Campaign 1 (Baseline) | Campaign 2 (Post-Training) | Campaign 3 (Advanced) | Overall Change |
|--------|-----------------------|----------------------------|------------------------|----------------|
| Email Open Rate | 82% | 75% | 68% | 📉 -17% |
| Click-Through Rate | 45% | 22% | 11% | 📉 -75% |
| Credential Submission | 28% | 10% | 3% | 📉 -89% |
| Reporting Rate | 8% | 35% | 62% | 📈 +675% |
| Avg Time to Report | 47 min | 12 min | 3 min | 📉 -93% |

### Awareness Improvement Indicators
- **Susceptibility Reduction:** % decrease in CTR between first and latest campaigns
- **Response Time Improvement:** Faster reporting indicates better situational awareness
- **Training Engagement:** Post-simulation training completion rates
- **Departmental Analysis:** Metrics broken down by team to identify high-risk groups

### Privacy Considerations
- Present results at aggregate/team level, not individual level
- Define a data retention period (e.g., 12 months)
- Ensure participants are informed that testing is part of the training program
- Never use simulation results for disciplinary action

---

## 7. Analysis Report

### Report Structure

#### 1. Objective
State the purpose, scope, participants, environment, and authorization.

#### 2. Methodology

| Phase | Description | Duration |
|-------|-------------|----------|
| Setup | Configured isolated lab with GoPhish, mail server, 50 dummy accounts | Week 1-2 |
| Baseline | Initial simulation (password reset scenario) | Week 3 |
| Training | Awareness training on phishing indicators and defense | Week 4-6 |
| Post-Training | Second simulation (shared document scenario) | Week 8 |
| Advanced | Third simulation (BEC/authority scenario) | Week 12 |
| Analysis | Compiled metrics, analyzed patterns, prepared findings | Week 13-14 |

#### 3. Results Summary
Present campaign comparison table with key aggregate metrics (see Section 6).

**Key Outcomes:**
- 75% reduction in click-through rate
- 7.7× increase in reporting rate
- 89% training completion rate
- Average report time decreased from 47 min to 3 min

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
