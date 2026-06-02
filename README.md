# Galewela Pradeshiya Sabha Website

Open `index.html` on a public web host to preview the site.

## Firebase Setup

1. Create or open the Firebase project in `assets/js/firebase-config.js`.
2. Enable Cloud Firestore.
3. Upload all project files to your public host.
4. Visit `https://your-domain/index.html`.
5. Admin panel: `https://your-domain/panel/index.html`.

The admin panel now saves website details, profile images, gallery images, blog posts, calendar events, responsibilities, bookings and public chat messages in Firebase Firestore. Public pages listen to the same Firebase database, so admin changes and chat messages appear live on other devices while the pages are open.

## Firestore Collections

- `galewela-site/content` stores admin-managed website content.
- `galewela-bookings/all` stores booking requests and approval status.
- `galewela-public-chat` stores public chat messages.

## Public Chat

The chat uses Firebase realtime listeners. If a visitor sends a message from one device, other open devices receive the message immediately through Firestore.

## Admin Panel

Open:

```text
panel/index.html
```

Default PIN:

```text
1234
```

Admin panel features:

- Add and delete blog posts.
- Add and delete calendar events.
- Add and delete gallery images.
- Upload president profile image and message.
- Upload secretary profile image and message.
- Update information officer profiles.
- Manage responsibilities.
- Approve and delete bookings.
- Update office phone, email, address and welcome note.
- Switch light and dark mode.
- Change admin PIN for this browser.
- Export and import Firebase-backed content as JSON.

The site keeps a browser cache for fast rendering, but the shared production data is Firebase Firestore.
