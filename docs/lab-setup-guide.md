# SecureBait — VirtualBox Lab Setup Guide
## Complete Step-by-Step Instructions

> ⚠️ EDUCATIONAL USE ONLY — Isolated lab environment for academic training.

---

## Prerequisites
- Oracle VirtualBox installed ✅
- At least 8GB RAM (4GB for VM)
- 30GB free disk space
- Kali Linux ISO downloaded from https://www.kali.org/get-kali/#kali-installer-images

---

## PHASE 1: Create Kali Linux VM

### Step 1 — Create the VM
1. Open VirtualBox → Click **New**
2. Settings:
   - **Name:** `SecureBait-Kali`
   - **Type:** Linux
   - **Version:** Debian (64-bit)
   - **RAM:** 4096 MB (4GB)
   - **Hard disk:** Create a virtual hard disk now → VDI → Dynamically allocated → 30GB
3. Click **Create**

### Step 2 — Configure VM Settings
1. Select the VM → Click **Settings**
2. **System** → Processor → Set to 2 CPUs
3. **Storage** → Click Empty disk → Click disk icon → Choose Kali ISO
4. **Network** → Adapter 1:
   - Attached to: **NAT** (for initial setup/downloads)
   - Later we'll switch to **Host-only** for isolation

### Step 3 — Install Kali Linux
1. Start the VM → Boot from ISO
2. Choose **Graphical Install**
3. Follow prompts: language, timezone, hostname (`securebait`), user/password
4. Wait for installation to complete (~20-30 min)
5. Reboot when prompted, remove ISO from virtual drive

### Step 4 — Update Kali (while still on NAT)
```bash
sudo apt update && sudo apt upgrade -y
```

---

## PHASE 2: Install GoPhish

### Step 5 — Download GoPhish
```bash
# Download the latest GoPhish release
cd /opt
sudo wget https://github.com/gophish/gophish/releases/download/v0.12.1/gophish-v0.12.1-linux-64bit.zip

# Install unzip if needed
sudo apt install unzip -y

# Extract
sudo unzip gophish-v0.12.1-linux-64bit.zip -d /opt/gophish

# Make executable
sudo chmod +x /opt/gophish/gophish
```

### Step 6 — Configure GoPhish to listen on all interfaces
```bash
# Edit config.json to listen on 0.0.0.0 (needed for VM access)
sudo nano /opt/gophish/config.json
```

Change the config to:
```json
{
    "admin_server": {
        "listen_url": "0.0.0.0:3333",
        "use_tls": true,
        "cert_path": "gophish_admin.crt",
        "key_path": "gophish_admin.key",
        "trusted_origins": []
    },
    "phish_server": {
        "listen_url": "0.0.0.0:8080",
        "use_tls": false,
        "cert_path": "example.crt",
        "key_path": "example.key"
    },
    "db_name": "sqlite3",
    "db_path": "gophish.db",
    "migrations_prefix": "db/db_",
    "contact_address": "",
    "logging": {
        "filename": "",
        "level": ""
    }
}
```

### Step 7 — Start GoPhish
```bash
cd /opt/gophish
sudo ./gophish
```

**IMPORTANT:** The terminal will show a temporary admin password like:
```
Please login with the username admin and the password XXXXXXXX
```
**Copy this password!** You'll need it to log in.

### Step 8 — Access GoPhish Admin Panel
Open Firefox in Kali and go to:
```
https://localhost:3333
```
- Username: `admin`
- Password: (the temp password from terminal)
- You'll be prompted to change the password on first login

---

## PHASE 3: Set Up Local Mail Server

### Step 9 — Install Postfix (Local SMTP)
```bash
# Install Postfix mail server
sudo apt install postfix -y
```
When prompted:
- Select: **Local only**
- System mail name: `training.local`

```bash
# Start Postfix
sudo systemctl start postfix
sudo systemctl enable postfix

# Verify it's running
sudo systemctl status postfix
```

### Step 10 — Install Mailutils (to check received mail)
```bash
sudo apt install mailutils -y

# Create dummy test users
sudo useradd -m trainee01
sudo useradd -m trainee02
sudo useradd -m trainee03
sudo useradd -m trainee04
sudo useradd -m trainee05
```

### Step 11 — Test Local Email
```bash
# Send a test email
echo "Test email body" | mail -s "Test Subject" trainee01@localhost

# Check if trainee01 received it
sudo cat /var/mail/trainee01
```
If you see the email, your mail server works!

---

## PHASE 4: Configure GoPhish Campaign

### Step 12 — Create Sending Profile
In GoPhish admin panel (https://localhost:3333):
1. Go to **Sending Profiles** → **New Profile**
2. Fill in:
   - **Name:** `Lab SMTP`
   - **From:** `IT Security <it-security@training.local>`
   - **Host:** `localhost:25`
   - Leave username/password blank
   - Check **Ignore Certificate Errors**
3. Click **Send Test Email** to verify → send to `trainee01@localhost`
4. Check: `sudo cat /var/mail/trainee01`
5. Click **Save Profile**

### Step 13 — Create Email Template
1. Go to **Email Templates** → **New Template**
2. Fill in:
   - **Name:** `Password Expiry Alert`
   - **Subject:** `⚠️ URGENT: Your Password Expires in 24 Hours`
   - **Add Tracking Image:** ✅ Check this (enables open tracking)
3. Click **HTML** tab and paste:

```html
<html>
<body style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
<div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 30px;">
    <h2 style="color: #d32f2f;">⚠️ Password Expiration Notice</h2>
    <p>Dear {{.FirstName}},</p>
    <p>Our records indicate that your network password will <strong>expire in 24 hours</strong>. 
    To avoid losing access to your account, please reset your password immediately.</p>
    <p style="text-align: center; margin: 25px 0;">
        <a href="{{.URL}}" style="background: #1976d2; color: white; padding: 12px 30px; 
        text-decoration: none; border-radius: 6px; font-weight: bold;">Reset My Password</a>
    </p>
    <p>If you do not reset your password, your account will be <strong>temporarily locked</strong>.</p>
    <p>Thank you,<br><strong>IT Security Team</strong><br>training.local</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="font-size: 11px; color: #999;">This is an automated message from IT Security.</p>
</div>
{{.Tracker}}
</body>
</html>
```
4. Click **Save Template**

### Step 14 — Create Landing Page
1. Go to **Landing Pages** → **New Page**
2. Fill in:
   - **Name:** `Training Awareness Page`
   - **Capture Submitted Data:** ✅ Check
   - **Capture Passwords:** ❌ **UNCHECK** (not needed for training)
   - **Redirect to:** (leave blank or set to a thank-you page)
3. Paste the HTML in the editor (use the content from `pages/fake-login-demo.html` in your SecureBait project, or a simplified version)
4. Click **Save Page**

### Step 15 — Create User Group
1. Go to **Users & Groups** → **New Group**
2. **Name:** `Lab Training Group`
3. Add users (use **Bulk Import** with this CSV):

```csv
First Name,Last Name,Email,Position
Alice,Johnson,trainee01@localhost,Analyst
Bob,Smith,trainee02@localhost,Manager
Carol,Williams,trainee03@localhost,Developer
Dave,Brown,trainee04@localhost,HR Staff
Eve,Davis,trainee05@localhost,Accountant
```
4. Click **Save Group**

### Step 16 — Launch Campaign!
1. Go to **Campaigns** → **New Campaign**
2. Fill in:
   - **Name:** `Campaign 1 - Password Reset Baseline`
   - **Email Template:** `Password Expiry Alert`
   - **Landing Page:** `Training Awareness Page`
   - **URL:** `http://localhost:8080` (GoPhish phish server)
   - **Sending Profile:** `Lab SMTP`
   - **Groups:** `Lab Training Group`
3. Click **Launch Campaign**

### Step 17 — Monitor Results
1. Go to **Campaigns** → Click your campaign
2. GoPhish shows real-time tracking:
   - 📧 **Email Sent** — email was delivered
   - 👁️ **Email Opened** — tracking pixel loaded (user opened email)
   - 🖱️ **Clicked Link** — user clicked the phishing link
   - 📝 **Submitted Data** — user submitted the form
3. **Export Results:** Click **Export CSV** for your report

---

## PHASE 5: Switch to Isolated Network (Optional but Recommended)

### Step 18 — Create Host-Only Network
1. In VirtualBox: **File → Host Network Manager**
2. Click **Create** → Note the IP range (e.g., 192.168.56.1/24)
3. VM Settings → Network → Adapter 1 → Change to **Host-only Adapter**
4. This removes internet access — fully isolated lab

---

## PHASE 6: Collect Data & Generate Report

### Step 19 — Export Campaign Data
```bash
# GoPhish API - export results (from within Kali)
curl -k "https://localhost:3333/api/campaigns/?api_key=YOUR_API_KEY" | python3 -m json.tool

# Or use the GoPhish web dashboard:
# Campaigns → Select Campaign → Export CSV
```

### Step 20 — Take Screenshots
Capture screenshots of:
1. GoPhish dashboard showing campaign results
2. Email in trainee's mailbox
3. Landing page interaction
4. Campaign statistics graphs
5. CSV export data

These screenshots become your **Phishing Simulation Results** deliverable.

---

## Quick Reference

| Service | URL | Credentials |
|---------|-----|-------------|
| GoPhish Admin | https://localhost:3333 | admin / (your password) |
| GoPhish Phish Server | http://localhost:8080 | — |
| Local SMTP | localhost:25 | — |
| Trainee Mail | /var/mail/traineeXX | — |

## Troubleshooting

**GoPhish won't start:**
```bash
# Check if port is in use
sudo lsof -i :3333
sudo lsof -i :8080
# Kill conflicting process if needed
```

**Emails not being received:**
```bash
# Check Postfix status
sudo systemctl status postfix
# Check mail log
sudo tail -f /var/log/mail.log
```

**Can't access GoPhish from browser:**
```bash
# Make sure you're using https:// (not http://) for admin panel
# Accept the self-signed certificate warning in Firefox
```
