# Sparklebots Website

A professional, modern website for Sparklebots Robotics & AI Innovation Lab built with HTML, CSS, and JavaScript.

## Features

✨ **Key Features:**

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **QR Code Generator** - Automatically generates QR code linking to www.sparklebots.com
- **Video Integration** - Embedded videos section showcasing student projects
- **Course/Program Listings** - All courses with pricing and descriptions
- **Enrollment Form** - Easy contact and enrollment form
- **Smooth Navigation** - Smooth scrolling between sections
- **Modern UI** - Professional Sparklebots branding with yellow, blue, and red colors

## File Structure

```
Application/
├── index.html              # Main HTML file
├── styles.css              # CSS styling
├── README.md               # This file
├── copy_videos.bat         # Batch script to copy videos
├── server.js               # Simple Node.js server
└── WhatsApp Video*.mp4     # Video files (after running copy_videos.bat)
```

## Sections

1. **Navigation Bar** - Quick links to all sections
2. **Hero Section** - Welcome banner with CTAs
3. **Core Advanced Courses** - Python, Arduino, Image Processing, 3D CAD
4. **Specialised Tracks** - Humanoid Robotics, Robot Arm Programming
5. **Career-Oriented Modules** - Embedded Systems, IoT, Raspberry Pi
6. **Skills Section** - What students will achieve
7. **Videos Section** - Embedded video showcase
8. **QR Code Section** - Scannable QR code for easy website access
9. **Contact/Enrollment** - Form for interested students
10. **Footer** - Copyright and branding

## Setup Instructions

### Option 1: Using Node.js Server (Recommended for Videos)

1. Copy your videos to the Application folder:

   - Run `copy_videos.bat` (double-click it)
   - OR manually copy the MP4 files from WhatsApp to this folder

2. Install Node.js if you haven't already:

   - Download from https://nodejs.org/

3. Run the server:

   ```bash
   node server.js
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

### Option 2: Direct File Opening

1. Simply double-click `index.html` to open it in your browser
2. Note: Videos may not load due to browser restrictions with local file paths

### Option 3: Using Python Server

```bash
python -m http.server 8000
```

Then navigate to `http://localhost:8000`

## Video Setup

The website includes three video sections. To add your videos:

1. Copy the three WhatsApp videos to the Application folder
2. The HTML file references them as:
   - `WhatsApp Video 2026-04-01 at 11.41.18 PM.mp4`
   - `WhatsApp Video 2026-04-01 at 11.42.57 PM.mp4`
   - `WhatsApp Video 2026-04-01 at 11.43.13 PM.mp4`

Or run the included `copy_videos.bat` script to automatically copy them.

## QR Code Feature

The website automatically generates a QR code that links to `www.sparklebots.com`.

You can:

- **Print the QR Code** from the website to add to posters and flyers
- **Right-click** on the QR code and select "Save image as..." to download it
- **Use it in posters** - scan it to automatically redirect to the website

## Customization

### Colors

Edit `styles.css` to change colors:

```css
--primary-blue: #003DA5
--primary-yellow: #FFD800
--primary-red: #E63946
```

### Content

Edit `index.html` to:

- Change course names and prices
- Update contact information
- Modify program descriptions
- Add more courses or sections

### Contact Information

Update these in `index.html`:

- Phone: 8446630300
- Website: www.sparklebots.com
- Add your actual location/address

## Browser Compatibility

- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. The website is optimized for fast loading
2. Videos are embedded directly for easy playback
3. CSS is minified where possible
4. Images/icons use Unicode emojis for zero loading time

## Deployment Options

### Deploy to Netlify (Free)

1. Create account at netlify.com
2. Connect your GitHub repo or drag & drop the files
3. Your site goes live instantly

### Deploy to Vercel (Free)

1. Create account at vercel.com
2. Import your project
3. Automatic deployments on every update

### Deploy to GitHub Pages (Free)

1. Push files to GitHub repository
2. Enable Pages in repository settings
3. Your site is live at `username.github.io/repo-name`

### Custom Server

- Use any web hosting provider
- Upload all files to your server
- Configure your domain

## Contact & Support

For questions or customizations, contact:
📞 **Phone:** 8446630300
🌐 **Website:** www.sparklebots.com

## License

© 2026 Sparklebots - Robotics & AI Innovation Lab. All rights reserved.

## Version History

**v1.0** - Initial Release

- Core website structure
- All course/program listings
- QR code integration
- Video section
- Enrollment form
- Responsive design
