# 🎯 HangoutHub
> Aplikasi Perencana Kegiatan Hiburan & Lifestyle - Sumatera Barat

## Deskripsi Proyek
**HangoutHub** adalah aplikasi web interaktif yang membantu pengguna menemukan dan merencanakan kegiatan hiburan & lifestyle di Sumatera Barat. Aplikasi ini menyediakan 25+ kegiatan dari berbagai kategori seperti Wisata Alam, Wisata Budaya, Kuliner, dan Olahraga.

Pengguna dapat:
- Menjelajahi berbagai kegiatan
- Filter berdasarkan kategori dan kota
- Mengatur durasi kegiatan sendiri
- Menyimpan rencana ke "My Plan"
- Menandai kegiatan yang sudah selesai

## Struktur Folder
hangouthub/
│
├── README.md # Dokumentasi proyek
│
├── frontend/ # Frontend React + Vite
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.jsx # Navigasi
│ │ │ └── LoadingSpinner.jsx # Loading indicator
│ │ ├── context/
│ │ │ └── AuthContext.jsx # Auth state management
│ │ ├── pages/
│ │ │ ├── Login.jsx # Halaman login
│ │ │ ├── Register.jsx # Halaman register
│ │ │ ├── Dashboard.jsx # Beranda
│ │ │ ├── Explore.jsx # Daftar kegiatan
│ │ │ ├── ActivityDetail.jsx # Detail kegiatan (dynamic route)
│ │ │ ├── MyPlan.jsx # Kelola rencana
│ │ │ └── Profile.jsx # Profil user
│ │ ├── App.jsx # Main app
│ │ ├── main.jsx # Entry point
│ │ └── index.css # Global styling + dark mode
│ ├── index.html
│ ├── package.json
│ ├── package-lock.json
│ ├── vite.config.js
│ └── .env # Environment variables
│
└── .gitignore
