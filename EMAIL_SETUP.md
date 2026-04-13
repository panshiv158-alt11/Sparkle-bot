# 📧 Email Confirmation Setup Guide

## Overview

Your website now has automatic email confirmations when users fill out the contact form! Users will receive a professional confirmation email immediately after submitting, and you'll get a notification.

---

## ⚙️ STEP 1: Get Your Gmail App Password

### Why?

Gmail doesn't allow regular passwords in apps for security. You need a special "App Password."

### Steps:

1. Go to: **https://myaccount.google.com/apppasswords**
2. You'll be asked to sign in if not already signed in
3. Select:
   - **App:** Select "Mail"
   - **Device:** Select "Windows Computer" (or your device)
4. Click **"Generate"**
5. Copy the **16-character password** shown (it will look like: `xxxx xxxx xxxx xxxx`)

---

## 📝 STEP 2: Configure server.js

### Edit the Email Credentials:

Open `server.js` and find these lines (around line 19-20):

```javascript
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // 👈 Replace with your email
    pass: "your-app-password", // 👈 Replace with the 16-char password
  },
});
```

### Example:

```javascript
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sparklebots.contact@gmail.com",
    pass: "abcd efgh ijkl mnop", // From myaccount.google.com/apppasswords
  },
});
```

---

## 🚀 STEP 3: Start the Server

### Option A: Using Command Line

```bash
cd "c:\Users\HP\OneDrive\Desktop\Application"
node server.js
```

### Option B: Using start.bat

```bash
start.bat
```

You should see:

```
╔════════════════════════════════════════╗
║   SPARKLEBOTS WEBSITE SERVER RUNNING   ║
╚════════════════════════════════════════╝

🚀 Server is running at http://localhost:3000
📧 Email confirmation system
✓ Email service ready
```

---

## ✅ STEP 4: Test It Out

1. Open your browser: **http://localhost:3000**
2. Go to **Contact Us** page
3. Fill out the form with:
   - Your name
   - Your email address
   - Your phone number
   - A test message
4. Click **"Send Message"**

### Expected Results:

✅ Green success message on the page
✅ Confirmation email arrives in your inbox (check spam folder if not found)
✅ Admin notification email sent to your configured email

---

## 📧 What Users Receive

### Confirmation Email includes:

- ✨ Professional branded design
- 👋 Personalized greeting with their name
- 🔄 Echo of their message
- 📞 Quick contact information
- 🎯 Next steps information

---

## 🔧 Troubleshooting

### Problem: "Email service not ready" error

**Solution:**

- Check if Gmail credentials are correct
- Make sure you used an **App Password**, not your regular Gmail password
- Verify the email address is correct

### Problem: Emails going to spam folder

**Solution:**

- This is normal with new email services
- Users can mark as "Not Spam"
- Consider setting up DKIM/SPF records (advanced)

### Problem: Form says "Success" but no email received

**Solution:**

- Check spam folder
- Verify email address in server.js is correct
- Check terminal for error messages
- Make sure port 3000 is not blocked

### Problem: "Port 3000 is already in use"

**Solution:**

```bash
# Kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

---

## 📋 Email Customization

### To customize email templates:

Edit the email HTML in `server.js` (search for `userMailOptions` and `adminMailOptions`)

You can modify:

- Subject line
- Email template design
- Brand colors
- Message content
- Sender name

---

## 🔒 Security Notes

- Never commit `server.js` with real credentials to GitHub
- Consider using environment variables for production
- App Passwords are tied to your Gmail account

### To use environment variables:

1. Install dotenv:

```bash
npm install dotenv
```

2. Create `.env` file:

```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

3. Update `server.js`:

```javascript
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
```

---

## 📱 Features Include

✅ Automatic confirmation emails to users
✅ Admin notifications  
✅ Form validation
✅ Error handling
✅ Professional HTML templates
✅ Success/error feedback messages
✅ Mobile-responsive form

---

## 💡 Next Steps (Optional)

- [ ] Add more form fields (course interest, age, etc.)
- [ ] Save submissions to a database
- [ ] Add SMS notifications
- [ ] Create admin dashboard
- [ ] Schedule automated follow-up emails

---

## 📞 Support

If you have any issues:

1. Check the terminal for error messages
2. Verify Gmail credentials
3. Ensure port 3000 is available
4. Clear browser cache and try again

**Happy emailing!** 🎉
