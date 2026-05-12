# 🛡️ SecureBait — Phishing Awareness & Defense Training Platform

> **⚠️ EDUCATIONAL USE ONLY** — This project is designed exclusively for authorized academic training in controlled, isolated lab environments. It must NOT be used against real users, real domains, or real systems.

## Overview

SecureBait is a phishing simulation and awareness training project that demonstrates how phishing attacks work and teaches users to identify and defend against them. The project includes a **live GoPhish simulation** running on Kali Linux and an **interactive web-based training platform**.

## Tools Used

| Tool | Purpose | Status |
|------|---------|--------|
| **GoPhish** | Phishing simulation platform — campaign management, email delivery, tracking | ✅ Active |
| **Kali Linux** | Lab environment (VirtualBox VM) hosting all simulation tools | ✅ Active |
| **Postfix** | Local sandboxed SMTP email server for email delivery | ✅ Active |
| **HTML Phishing Page** | Fake login page used as GoPhish landing page | ✅ Active |

## Deliverables

| Deliverable | Location |
|---|---|
| Phishing simulation results | GoPhish CSV export + screenshots |
| Attack analysis report | `docs/full-report.md` |
| Security awareness guide | `pages/prevention.html` + `docs/full-report.md` |
| Fake login phishing page | `pages/fake-login-demo.html` + GoPhish landing page |
| Lab setup documentation | `docs/lab-setup-guide.md` |

## Simulation Summary

- **Campaign:** Password Reset Phishing Simulation
- **Targets:** 5 dummy users on isolated local mail server
- **Results:** Tracked email opens, link clicks, and credential submissions
- **Platform:** GoPhish on Kali Linux (VirtualBox VM)
- **Mail Server:** Postfix (local only, no internet access)

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- No external dependencies required
- Runs entirely in-browser (no server needed)

## Quick Start

```bash
# Simply open the main page in any browser
start index.html
```

## Project Structure

```
SecureBait/
├── index.html              # Main entry point
├── css/
│   └── styles.css          # Design system & styles
├── js/
│   └── app.js              # Application logic
├── pages/
│   ├── lab-setup.html      # Lab architecture guide
│   ├── simulation.html     # Simulation scenarios
│   ├── templates.html      # Email template gallery
│   ├── login-concepts.html # Fake login analysis
│   ├── metrics.html        # Tracking & metrics
│   ├── report.html         # Analysis report
│   └── prevention.html     # Prevention guide
└── docs/
    └── full-report.md      # Complete academic report
```

## Ethical Guidelines

1. **Authorization Required** — Only use in environments where you have explicit permission
2. **No Real Targets** — Never target real users, domains, or email accounts
3. **Sandbox Only** — All simulations must run in isolated lab environments
4. **Educational Focus** — Equal emphasis on defense, awareness, and analysis
5. **Clear Labeling** — All simulation content must be clearly marked as training material

## License

For academic and educational purposes only.
