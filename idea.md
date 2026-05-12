saya ingin membuat website untuk Learning Management System (LMS), saya sudah membuat api nya dengan laravel yang ada di folder tugas_pkk. coba cek ke folder tersebut dan cari tahu endpoint dan controller yang sudah ada di backend.

oke, saya ingin membuat frontend dengan react dan styling dengan tailwindcss. saya ingin menggunakan sidebar untuk navigasi. di sidebar terdapat 3 desain berdasarkan user. yang pertama untuk user siswa, yang kedua untuk user guru, dan yang ketiga untuk user admin.

untuk siswa:
- Dashboard (ucapan selamat datang, serta deskripsi dari LMS dan fitur fitur yang ada di profil siswa)

- Sesi (menampilkan semua sesi yang tersedia, jika user klik sesi tersebut maka akan otomatis masuk ke detail dari sesi yang dipilih. di halaman detail sesi tersebut akan berisi nama sesi, deskripsi sesi, tanggal, waktu, dan status sesi. jika user sudah absen maka akan menampilkan status absen (hadir/tidak hadir))

- Summary (menampilkan summary dari siswa tersebut hadir & tidak hadir dari beberapa sesi. serta buatkan pie chart yang berisi persentase murid hadir & tidak hadir & jumlah total sesi)

- Logout

untuk guru:
- Dashboard (ucapan selamat datang, serta deskripsi dari LMS dan fitur fitur yang ada di profil guru)

- Mata Pelajaran (menampilakn semua mata pelajaran yang diikuti oleh guru tersebut. dan jika di klik, akan muncul modal yang berisi Judul Mata pelajaran, dan deskripsi dari mata pelajaran itu sendiri. serta di modal terdapat tombol tutup untuk menutup modal)

- Sesi (menampilkan semua sesi yang tersedia, serta guru bisa menambahkan sesi sendiri. apabila sesi di klik, terdapat tombol absen dan status absen, di bawahnya terdapat list murid. dan di status absen di masing masing murid terdapat nama murid, dan status absen (hadir/sakit/izin/alfa), kemudian guru bisa mengubah status absen apabila status absen murid sakit/izin/alfa)

- Summary (menampilkan summary dari guru tersebut yang berisikan data data murid. serta buatkan pie chart yang berisi persentase murid hadir & tidak hadir & jumlah total murid)

- Logout


untuk admin:
- Dashboard (ucapan selamat datang, serta deskripsi dari LMS dan fitur fitur yang ada di profil admin)

- Manajemen Mata Pelajaran (admin bisa menambah,mengubah,mengedit, dan menghapus mata pelajaran)

- Manajemen Kelas (admin bisa menambah,mengubah,mengedit, dan menghapus kelas)

- Manajemen Siswa (admin bisa menambah,mengubah,mengedit, dan menghapus siswa dari kelas tersebut)

- Logout

Serta terdapat halaman login dan halaman register.

Untuk halaman login terdapat form email dan password. Serta button login. Jika berhasil akan otomatis mengarahkan ke halaman dashboard berdasarkan role user. Jika gagal akan menampilkan pesan error.

Untuk halaman register terdapat form email dan password dan role user (siswa/guru/admin). Serta button register. Jika berhasil akan otomatis masuk ke halaman login.