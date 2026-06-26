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

## Tema
**Hiburan & Lifestyle** - Panduan Wisata Lokal Sumatera Barat
## Fitur Aplikasi
-------------------------------------------------------------------------
|       Fitur        |                 Keterangan                       |
|--------------------|--------------------------------------------------|
|Autentikasi         | Register, Login, Logout dengan JWT               |
|Dashboard           | Statistik rencana & rekomendasi kegiatan         |
|Explore             | 25+ kegiatan dengan filter kategori & kota       |
|Detail Activity     | Informasi lengkap kegiatan + atur durasi sendiri |
|My Plan             | Kelola rencana (tambah, selesai, hapus)          |
|Profile             | Informasi user & statistik                       |
|Dark/light Mode     | Toggle dark/light mode                           |
|Animasi             | Transisi halaman & hover effects                 |
-------------------------------------------------------------------------

## Teknologi yang Digunakan

### Frontend
- **React 18** - Library UI
- **Vite** - Build tool
- **React Router DOM** - Navigasi
- **Axios** - HTTP Client
- **CSS3** - Styling (tanpa framework)

### Backend
- **Express.js** - Server
- **JWT** - Autentikasi
- **bcryptjs** - Password hashing
- **db.json** - Database (JSON)

## Struktur Folder
hangouthub/
│
├── README.md # Dokumentasi proyek
│
├── backend/ # Backend Express.js
│ ├── server.js # Main server
│ ├── db.json # Database (JSON)
│ ├── package.json # Dependencies backend
│ ├── package-lock.json
│ └── .env # Environment variables
│
├── frontend/ # Frontend React + Vite
│ ├── src/
│ │ ├── api/
│ │ │ └── client.js # Axios API client
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
