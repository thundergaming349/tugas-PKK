# Prompt Frontend Development untuk LMS
Kamu adalah AI Web Developer yang ahli dalam membuat website menggunakan React dan Tailwind CSS. Tugasmu adalah membuat sebuah frontend untuk aplikasi Learning Management System (LMS) berdasarkan spesifikasi berikut.

## Tech Stack
- **Framework:** React
- **Styling:** Tailwind CSS + shadcn ui
- **Routing:** React Router (untuk navigasi dan proteksi route berdasarkan role)
- **State Management & Data Fetching:** Sesuai standar React (Context API / Redux / React Query / Axios)

## Deskripsi Aplikasi & Role
Aplikasi ini memiliki 3 jenis user: **Siswa**, **Guru**, dan **Admin**. Masing-masing memiliki hak akses dan tampilan sidebar yang berbeda. Aplikasi ini juga memiliki halaman Login dan Register.

### 1. Autentikasi (Publik)
- **Halaman Login:** Form input email dan password, beserta tombol Login. Jika berhasil, redirect ke dashboard sesuai dengan role. Jika gagal, tampilkan pesan error.
- **Halaman Register:** Form input email, password, dan pilihan role (Siswa/Guru/Admin), beserta tombol Register. Jika berhasil, otomatis redirect ke halaman Login.

### 2. User: Siswa
- **Dashboard:** Menampilkan ucapan selamat datang, deskripsi dari LMS, dan fitur-fitur profil siswa.
- **Sesi:** Menampilkan daftar semua sesi yang tersedia. Jika di-klik, masuk ke halaman detail sesi (berisi nama sesi, deskripsi, tanggal, waktu, dan status sesi). Tampilkan juga status absen siswa di sesi tersebut (Hadir / Tidak Hadir).
- **Summary:** Menampilkan ringkasan kehadiran siswa (berapa kali hadir & tidak hadir). Tampilkan **Pie Chart** yang berisi persentase kehadiran dan ketidakhadiran beserta jumlah total sesi.
- **Logout:** Mengeluarkan user dari aplikasi dan otomatis redirect ke halaman login.

### 3. User: Guru
- **Dashboard:** Menampilkan ucapan selamat datang, deskripsi dari LMS, dan fitur-fitur profil guru.
- **Mata Pelajaran:** Menampilkan semua mata pelajaran yang diajarkan oleh guru. Jika di-klik, akan muncul sebuah **Modal** berisi Judul Mata Pelajaran dan deskripsi, lengkap dengan tombol tutup modal.
- **Sesi:** Menampilkan semua sesi yang tersedia. Guru dapat menambahkan sesi baru. Jika sesi di-klik, tampilkan:
  - Tombol absen dan status absen sesi.
  - Daftar murid yang ada di sesi tersebut (nama murid, status absen: hadir/sakit/izin/alfa).
  - Guru dapat mengubah status murid jika status absennya sakit/izin/alfa.
- **Summary:** Menampilkan ringkasan data murid yang diajar guru tersebut. Tampilkan **Pie Chart** berisi persentase murid hadir, tidak hadir, serta total jumlah murid.
- **Logout:** Mengeluarkan user dari aplikasi dan otomatis redirect ke halaman login.

### 4. User: Admin
- **Dashboard:** Menampilkan ucapan selamat datang, deskripsi dari LMS, dan fitur-fitur profil admin.
- **Manajemen Mata Pelajaran:** Fitur CRUD (Create, Read, Update, Delete) untuk mata pelajaran.
- **Manajemen Kelas:** Fitur CRUD (Create, Read, Update, Delete) untuk kelas.
- **Manajemen Siswa:** Fitur CRUD (Create, Read, Update, Delete) untuk data siswa di dalam kelas.
- **Logout:** Mengeluarkan user dari aplikasi dan otomatis redirect ke halaman login.

---

## Integrasi Backend API
Sebagai AI, kamu perlu memahami dan mengintegrasikan frontend ini dengan backend API (Laravel Sanctum) yang sudah tersedia. Base URL menggunakan awalan `/api`. Pastikan mengirimkan token otorisasi (Bearer Token) untuk endpoint yang dilindungi (`auth:sanctum`).

Berikut adalah daftar Endpoint API yang harus kamu gunakan:

### Auth
- `POST /api/auth/register` : Registrasi user baru.
- `POST /api/auth/login` : Login user.
- `POST /api/auth/logout` : Logout user (butuh token).

### Admin (Membutuhkan Token)
- `GET, POST /api/admin/class` : Menampilkan & menambah data Kelas.
- `PUT, DELETE /api/admin/class/{id}` : Mengedit & menghapus data Kelas.
- `GET, POST /api/admin/subject` : Menampilkan & menambah data Mata Pelajaran.
- `PUT, DELETE /api/admin/subject/{id}` : Mengedit & menghapus data Mata Pelajaran.

### Guru (Membutuhkan Token)
- `GET /api/teacher/class` : Menampilkan data Kelas untuk guru.
- `GET /api/teacher/subject` : Menampilkan data Mata Pelajaran untuk guru.

### Sesi (Membutuhkan Token)
- `POST /api/session/` : Membuat sesi baru (oleh guru).
- `GET /api/session/teacher` : Menampilkan semua sesi untuk guru.
- `GET /api/session/student` : Menampilkan semua sesi untuk siswa.
- `PUT, DELETE /api/session/{id}` : Mengedit atau menghapus sesi.

### Absensi (Membutuhkan Token)
- `PUT /api/attendance/{sessionId}/attend` : Melakukan absensi (oleh siswa).
- `PUT /api/attendance/{studentId}/{sessionId}/sakit` : Guru mengubah status siswa menjadi sakit.
- `PUT /api/attendance/{studentId}/{sessionId}/izin` : Guru mengubah status siswa menjadi izin.
- `PUT /api/attendance/{studentId}/{sessionId}/alfa` : Guru mengubah status siswa menjadi alfa.
- `GET /api/attendance/{sessionId}/student` : Menampilkan daftar siswa pada suatu sesi tertentu.

### Summary / Ringkasan (Membutuhkan Token)
- `GET /api/summary/get-summary-by-student` : Mengambil data summary (untuk pie chart siswa).
- `GET /api/summary/get-summary-by-teacher/{sessionId}` : Mengambil data summary (untuk pie chart guru pada sesi tertentu).

## Instruksi Tambahan untuk Model AI
1. Mulailah dengan membuat struktur folder dasar React (`components`, `pages`, `context`, `services`).
2. Buatlah setup konfigurasi API menggunakan Axios instance, sehingga Bearer Token bisa otomatis disisipkan.
3. Buatlah Layout dengan Sidebar dinamis yang menunya menyesuaikan dengan jenis `role` (Admin, Guru, Siswa).
4. Pastikan UI/UX dibuat modern dan responsif dengan Tailwind CSS (gunakan warna-warna yang clean dan profesional).
5. Untuk pembuatan *Pie Chart*, kamu bisa merekomendasikan penggunaan library `recharts` atau `shadcn ui`.
6. Jangan buat semua kode dalam satu file, pecahlah menjadi komponen-komponen agar lebih mudah dibaca dan di-*maintain*. Tuliskan kode langkah demi langkah!
