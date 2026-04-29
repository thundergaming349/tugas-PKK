-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 29 Apr 2026 pada 11.17
-- Versi server: 8.0.45-0ubuntu0.24.04.1
-- Versi PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tugas_pkk`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '2026_04_29_023112_create_personal_access_tokens_table', 1),
(3, '2026_04_29_023727_create_student_classes_table', 1),
(4, '2026_04_29_023930_create_subjects_table', 1),
(5, '2026_04_29_024132_create_students_table', 1),
(6, '2026_04_29_024244_create_sessions_table', 1),
(7, '2026_04_29_024314_create_attendances_table', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 1, 'auth', '8af66b0d3ebec643ab74022744257ce6594884177a1ba063b66dfa366f0a2a6d', '[\"*\"]', '2026-04-28 21:56:25', NULL, '2026-04-28 21:55:56', '2026-04-28 21:56:25'),
(3, 'App\\Models\\User', 5, 'auth', '7f07e8992b09bb1936bfe589922999f0bfe846abc9a7f6832fd3971de0b21d53', '[\"*\"]', '2026-04-28 21:59:04', NULL, '2026-04-28 21:56:46', '2026-04-28 21:59:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('siswa','guru','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'siswa',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Muhammad Fathar', 'fatharfaidur@gmail.com', '$2y$12$236Ptb8nU.WUF1vPFyx.ve5kMxYZUAX4AhjiJ2ZHSZTjwB1Y2PiGW', 'siswa', '2026-04-28 21:20:28', '2026-04-28 21:20:28'),
(2, 'Rizky Wahyudi', 'rizkywahyudi@gmail.com', '$2y$12$LqPXpRGsPE2btlKxiMNie.D40CBL/5tSzSbY9FSlhIfQd.Zlsk9W2', 'siswa', '2026-04-28 21:20:44', '2026-04-28 21:20:44'),
(3, 'Dwi Puspitaningtyas', 'dwipuspita@gmail.com', '$2y$12$LSRzoSv0CAbY2eqg.MHKQO8mvft825clQXTpsYxJy1l0WrjmP4MsS', 'guru', '2026-04-28 21:21:37', '2026-04-28 21:21:37'),
(4, 'Ziza Wildan', 'zizawildan@gmail.com', '$2y$12$VFLyoynA/c.yaw/7Dtrf2OgYHFAXyvPwGrjhMxopvF2znS4Mvjrbi', 'guru', '2026-04-28 21:26:22', '2026-04-28 21:26:22'),
(5, 'adminKu', 'admin2409@gmail.com', '$2y$12$2apMINMAdTZf2INIe7tZNejL6Pda396E3E0y2qRn7BMtK48Fycpcm', 'admin', '2026-04-28 21:54:35', '2026-04-28 21:54:35');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
