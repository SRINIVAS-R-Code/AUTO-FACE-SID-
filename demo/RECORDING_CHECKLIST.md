# 📹 Demo Recording Checklist

## Before Recording

### System Setup
- [ ] PostgreSQL database is running
- [ ] Backend server is running (port 5000)
- [ ] Frontend is running (port 3000)
- [ ] Database has sample data
- [ ] No console errors in browser
- [ ] No terminal errors

### Browser Setup
- [ ] Use Chrome or Edge (best compatibility)
- [ ] Clear browser cache and cookies
- [ ] Close unnecessary tabs
- [ ] Disable browser extensions (or use incognito)
- [ ] Set zoom to 100%
- [ ] Full screen mode (F11)

### Recording Software
- [ ] Screen recorder installed (OBS/Camtasia/etc.)
- [ ] Recording resolution set to 1920x1080
- [ ] Frame rate set to 30fps
- [ ] Audio input tested
- [ ] Microphone levels adjusted
- [ ] Test recording completed

### Environment
- [ ] Quiet recording space
- [ ] Good lighting (if showing face)
- [ ] No background noise
- [ ] Phone on silent
- [ ] Notifications disabled

### Content Preparation
- [ ] Demo script reviewed
- [ ] Test accounts ready
- [ ] Sample data in database
- [ ] Key features list prepared
- [ ] Talking points memorized

---

## During Recording

### General Tips
- [ ] Speak clearly and slowly
- [ ] Pause between sections
- [ ] Move cursor smoothly
- [ ] Highlight important elements
- [ ] Show, don't just tell
- [ ] Keep energy level up

### What to Show
- [ ] Landing page
- [ ] User registration
- [ ] User dashboard features
- [ ] Admin registration
- [ ] Admin dashboard
- [ ] Live monitoring (camera)
- [ ] Screen sharing
- [ ] Screenshot capture
- [ ] Attendance tracking
- [ ] Performance analytics
- [ ] Real-time notifications
- [ ] AI assistant
- [ ] Security logs

### What to Avoid
- [ ] Don't rush through features
- [ ] Don't show errors (unless intentional)
- [ ] Don't use real personal data
- [ ] Don't show sensitive information
- [ ] Don't have long silent pauses

---

## After Recording

### Review
- [ ] Watch entire recording
- [ ] Check audio quality
- [ ] Verify all features shown
- [ ] Note any mistakes to re-record
- [ ] Check video quality

### Editing
- [ ] Trim unnecessary parts
- [ ] Add intro/outro
- [ ] Add text overlays
- [ ] Add transitions
- [ ] Add background music (optional)
- [ ] Add captions (optional)
- [ ] Color correction if needed

### Export
- [ ] Export as MP4 (H.264)
- [ ] 1920x1080 resolution
- [ ] 30fps frame rate
- [ ] 8-10 Mbps bitrate
- [ ] Test playback

### Final Steps
- [ ] Save to demo/final-video/ folder
- [ ] Create thumbnail image
- [ ] Write video description
- [ ] Add timestamps
- [ ] Upload to platform (YouTube/Vimeo)
- [ ] Share link

---

## Quick Reference

### Test Accounts
```
Admin:
- Email: admin@company.com
- Password: admin

User:
- Email: john@company.com  
- Password: user
```

### URLs to Show
```
Landing: http://localhost:3000
Register: http://localhost:3000/register
Login: http://localhost:3000/login
User Dashboard: http://localhost:3000/user/dashboard
Admin Dashboard: http://localhost:3000/admin/dashboard
Live Monitoring: http://localhost:3000/admin/monitoring
```

### Key Features to Highlight
1. Role-based registration
2. Real-time camera monitoring
3. Screen sharing
4. Screenshot capture
5. Live notifications
6. AI assistant
7. Performance analytics
8. Attendance tracking

---

## Troubleshooting

### If Backend Won't Start
```bash
cd backend
npm install
node server.js
```

### If Frontend Won't Start
```bash
npm install
npm run dev
```

### If Database Connection Fails
- Check PostgreSQL is running
- Verify credentials in backend/db.js
- Ensure database exists: `auto_face_sid_db`

### If Videos Don't Play
- Check browser console for errors
- Verify video URLs are accessible
- Try different browser
- Clear cache and reload

---

**Ready to Record? Let's go! 🎬**
