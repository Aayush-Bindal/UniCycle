# 🚲 Unicycle

**Unicycle** is a student-first marketplace built exclusively for college communities.  
Think OLX, but optimized for campus life.  

🎓 Students can buy, sell, or exchange essentials like lab coats, calculators, books, snacks, and more.  
🌙 At night, the app automatically switches to **Night Market**, where hostel-only items (like snacks, Maggi, chips) come alive.  
🔐 Secure login with **email OTP** — freshers can start instantly, but must verify their `@thapar.edu` email later.  

---

## 🚀 Features (Phase 1)

- 🔐 **Email OTP Login** (any email to start, `@thapar.edu` required for verification)  
- 🌓 **Auto Day/Night Market switch** based on time  
- 📦 **List, browse, and categorize items**  
- 📸 **Manual image uploads** for listings  
- ✅ **Seller approval flow** → Buyers send requests, sellers approve/reject  
- 🕶️ **Dark theme UI** (always-on, neon highlights at night)  

---

## 🧑‍💻 Tech Stack

| Layer       | Tech Used |
|-------------|-----------|
| Frontend    | React Native + Expo |
| Backend     | Express.js (Node.js) |
| Auth        | Custom Email OTP + JWT |
| Database    | PostgreSQL (self-hosted on GCP Compute Engine) |
| Storage     | Google Cloud Storage |
| Hosting     | GCP Cloud Run (Backend), Play Store / App Store (Frontend) |

---

## 🛠️ Project Structure

```
unicycle/
├── app/                   # React Native (Expo)
│   ├── components/
│   ├── screens/
│   ├── assets/
│   └── navigation/
│
├── backend/               # Express.js API
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   └── db/
│
└── README.md
```

---

## 🛣️ Roadmap

### ✅ Phase 1 (MVP)
- [x] Email OTP login (any email allowed, later verification for `@thapar.edu`)  
- [x] JWT-protected backend APIs  
- [x] Auto Day/Night Market switch  
- [x] Item listings with categories + manual images  
- [x] Seller approval flow for buyers  

### 🌓 Phase 2
- [ ] Google OAuth login option  
- [ ] Reviews and ratings system  
- [ ] Better UI/UX improvements  
- [ ] Bug fixes  

### 💰 Phase 3
- [ ] Monetization features (premium listings, ads, etc.)  
- [ ] Additional revenue models based on campus demand  

---

## 📊 User Flow

```mermaid
graph TD;
    A[🔐 Login via Email OTP] --> B[🏫 Explore Day/Night Market] 
    B --> C[📦 Browse Categories]
    C --> D[📸 View Listings]
    D --> E[🤝 Buy / Sell / Exchange Options]
    
    E -->|🛒 Buy| F[📬 Send Request to Seller]
    F --> G[✅ Seller Approves?]
    G -- No --> D
    G -- Yes --> H[📞 Reveal Seller Contact]

    E -->|➕ Sell| J[📝 Create New Listing (with images + category)]
    J --> D
```

---

## 🧠 Important Notes

* 💡 Freshers can sign up with **any email** and start listing immediately.
* 🎓 Once they get their **college email (`@thapar.edu`)**, they must verify it to continue listing.
* 🧾 No payments are handled in-app — students meet offline to complete deals.
* 🕶️ Always in **dark mode** for a consistent campus vibe.

---

## 🤝 Contributing

Contributions are welcome! 🚲 Submit ideas, features, or bugfixes via PRs.

```bash
git clone https://github.com/aayush-bindal/UniCycle/
```

---

## 📜 License

MIT License © 2025 Unicycle
