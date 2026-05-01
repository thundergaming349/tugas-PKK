-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2026 at 03:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.3.29

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
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `storage_url` varchar(255) NOT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`id`, `storage_url`, `post_id`) VALUES
(3, 'attachment/YcKRe8w6HInhTObV3iZlR5dbBJUu2UX96CBoIpaR.pdf', 6);

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `session_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('hadir','izin','sakit','alfa') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`id`, `student_id`, `session_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 17, 'hadir', '2026-04-30 08:42:23', '2026-05-01 03:28:39'),
(2, 7, 17, 'alfa', '2026-04-30 08:42:23', '2026-04-30 08:42:23'),
(3, 1, 18, 'izin', '2026-05-01 06:27:38', '2026-05-01 07:14:32'),
(4, 7, 18, 'alfa', '2026-05-01 06:27:38', '2026-05-01 06:27:38'),
(5, 2, 19, 'alfa', '2026-05-01 07:00:32', '2026-05-01 07:00:32');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(8, '0001_01_01_000000_create_users_table', 1),
(9, '0001_01_01_000001_create_cache_table', 1),
(10, '0001_01_01_000002_create_jobs_table', 1),
(11, '2026_04_29_023112_create_personal_access_tokens_table', 1),
(12, '2026_04_29_023727_create_student_classes_table', 1),
(13, '2026_04_29_023930_create_subjects_table', 1),
(14, '2026_04_29_024132_create_students_table', 1),
(15, '2026_04_29_024244_create_sessions_table', 1),
(16, '2026_04_29_024314_create_attendances_table', 1),
(17, '2026_04_29_113812_create_personal_access_tokens_table', 2),
(18, '2026_05_01_103112_create_posts_table', 3),
(19, '2026_05_01_103258_create_attachments_table', 3),
(20, '2026_05_01_103306_create_comments_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 5, 'auth', '5dc727533a68d55a865222d458f54a68d0e783a280d81ac24eb30d6b5cb8821e', '[\"*\"]', '2026-04-29 06:03:06', NULL, '2026-04-29 05:34:49', '2026-04-29 06:03:06'),
(7, 'App\\Models\\User', 4, 'auth', '445d45d819ef200cbaca275e595adf5f5243560a5abea64c00ee76f833351ae1', '[\"*\"]', '2026-04-29 08:30:15', NULL, '2026-04-29 08:29:47', '2026-04-29 08:30:15'),
(8, 'App\\Models\\User', 4, 'auth', 'bde1febdc36c258e885999a93e147d0e9720e06124245f9c6e88e2f378b33773', '[\"*\"]', '2026-04-30 05:30:41', NULL, '2026-04-30 05:25:26', '2026-04-30 05:30:41'),
(9, 'App\\Models\\User', 1, 'auth', 'fa6ca45b78fe74da20f51a16c8992484e1a6cedbfa4e13e7bef6fa10d0907487', '[\"*\"]', '2026-05-01 03:15:57', NULL, '2026-04-30 05:31:18', '2026-05-01 03:15:57'),
(10, 'App\\Models\\User', 4, 'auth', 'bc71bbe2a05ff83ca5ba057b154984bce8434bf1d797f55114e6a4766264630a', '[\"*\"]', '2026-05-01 07:00:56', NULL, '2026-04-30 05:33:08', '2026-05-01 07:00:56'),
(11, 'App\\Models\\User', 3, 'auth', 'bc3c498e26225b13a6c98b99c1e96fa38511896a0883cec1193bfbd4ef331e8f', '[\"*\"]', '2026-04-30 05:58:07', NULL, '2026-04-30 05:57:43', '2026-04-30 05:58:07'),
(12, 'App\\Models\\User', 4, 'auth', '55287459fe9510269b1e09f7bcfb251f170eb7493ec0986326829dcabb1805a3', '[\"*\"]', '2026-05-01 07:59:27', NULL, '2026-05-01 03:06:26', '2026-05-01 07:59:27'),
(13, 'App\\Models\\User', 1, 'auth', '24ded94f42517e1cb6b3ff6dc00c559dc55cc8f44f303136f023f7c8432c4736', '[\"*\"]', '2026-05-01 07:20:17', NULL, '2026-05-01 03:06:59', '2026-05-01 07:20:17'),
(14, 'App\\Models\\User', 2, 'auth', '9453c83080d8b092a6356d0e69a933ca13d027a92015929dc6a75a9e15b64f15', '[\"*\"]', '2026-05-01 07:40:49', NULL, '2026-05-01 03:27:11', '2026-05-01 07:40:49'),
(15, 'App\\Models\\User', 3, 'auth', '5de868ca3f4169073c0d44418866a0506ecaecfbae372edc9aa3e5bb810f7121', '[\"*\"]', '2026-05-01 07:01:03', NULL, '2026-05-01 06:59:15', '2026-05-01 07:01:03');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `caption` varchar(255) NOT NULL,
  `session_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `caption`, `session_id`, `created_at`, `updated_at`) VALUES
(6, 'Pagi semua, ini ada tugas dari ibu', 17, '2026-05-01 04:58:34', '2026-05-01 04:58:34'),
(7, 'semuanya jangan pada keluar keluar ya nak', 17, '2026-05-01 04:59:38', '2026-05-01 04:59:38');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `class_id` bigint(20) UNSIGNED NOT NULL,
  `subject_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  `hidden` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `class_id`, `subject_id`, `date`, `start`, `end`, `hidden`, `created_at`, `updated_at`) VALUES
(17, 2, 6, '2026-12-01', '10:00:00', '12:00:00', 0, '2026-04-30 08:42:23', '2026-04-30 08:42:23'),
(18, 2, 4, '2026-12-01', '08:00:00', '10:00:00', 0, '2026-05-01 06:27:38', '2026-05-01 06:27:38'),
(19, 1, 1, '2026-12-01', '08:00:00', '10:00:00', 0, '2026-05-01 07:00:32', '2026-05-01 07:00:32');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `class_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `user_id`, `class_id`) VALUES
(1, 1, 2),
(2, 2, 1),
(7, 7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `student_classes`
--

CREATE TABLE `student_classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_classes`
--

INSERT INTO `student_classes` (`id`, `name`) VALUES
(1, 'XI TKJ 1'),
(2, 'XI TKJ 2'),
(3, 'XII TKJ 1'),
(4, 'XII TKJ 2'),
(5, 'X TG 3'),
(6, 'X TG 4'),
(7, 'X TG 1'),
(8, 'X TG 2'),
(9, 'X DKV 1'),
(10, 'X DKV 2'),
(11, 'XI DKV 1');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `teacher_id`) VALUES
(1, 'Administrasi Sistem Jaringan', 3),
(2, 'Matematika', 6),
(4, 'PKPJ', 4),
(5, 'Keamanan Jaringan', 4),
(6, 'MPP (Mikrotik)', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('siswa','guru','admin') NOT NULL DEFAULT 'siswa',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Muhammad Fathar', 'fatharfaidur@gmail.com', '$2y$12$BHANHv7jybOoNntnoCIseOKdglxuObBLjytQl9P0kCl0KpUT8JEru', 'siswa', '2026-04-29 05:31:39', '2026-04-29 05:31:39'),
(2, 'Rizky Wahyudi', 'rizkywahyudi@gmail.com', '$2y$12$FyagV/TXvt8/1lOSxPrUV.fm1p5pQpGAc6OUA4gLCRG0L6OsR7yEa', 'siswa', '2026-04-29 05:32:15', '2026-04-29 05:32:15'),
(3, 'Ziza Wildan', 'zizawildan@gmail.com', '$2y$12$Z/jNClkEPcDeR/eAgVjm2O.EGtjYgP6sdX3kPrIp/9p0Gi/FIHFWC', 'guru', '2026-04-29 05:32:26', '2026-04-29 05:32:26'),
(4, 'Dwi Puspitaningtyas', 'dwipuspita@gmail.com', '$2y$12$05oSguzfhSd3tgMx6XH/0.3e/LkwN1nBNXq5vGxBvlT7TDH7G3a02', 'guru', '2026-04-29 05:32:38', '2026-04-29 05:32:38'),
(5, 'Admin', 'admin2409@gmail.com', '$2y$12$UYuZfjE.bSZubVMTtY1i8ueuqbAC0HvF/SpaNF7h/E/eBVYcWse/a', 'admin', '2026-04-29 05:32:54', '2026-04-29 05:32:54'),
(6, 'Gunawan', 'gunawan@gmail.com', '$2y$12$9YkT4qkysYokCDdMoNjRseWBDn7SqDPFGHttvomHIvwsCgUVMdNOO', 'guru', '2026-04-29 05:57:35', '2026-04-29 05:57:35'),
(7, 'Rasyah Muhammad', 'rasyahbrebes@gmail.com', '$2y$12$k.YGWdqXJGGdPI8XQPw3BufHNe1M1IxwK.wytFoUUqIUI3G4kr8Mi', 'siswa', '2026-04-30 06:31:24', '2026-04-30 06:31:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attachments_post_id_foreign` (`post_id`);

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendances_student_id_foreign` (`student_id`),
  ADD KEY `attendances_session_id_foreign` (`session_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_session_id_foreign` (`session_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_class_id_foreign` (`class_id`),
  ADD KEY `sessions_subject_id_foreign` (`subject_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `students_user_id_foreign` (`user_id`),
  ADD KEY `students_class_id_foreign` (`class_id`);

--
-- Indexes for table `student_classes`
--
ALTER TABLE `student_classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subjects_teacher_id_foreign` (`teacher_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `student_classes`
--
ALTER TABLE `student_classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attachments`
--
ALTER TABLE `attachments`
  ADD CONSTRAINT `attachments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_session_id_foreign` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`),
  ADD CONSTRAINT `attendances_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_session_id_foreign` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `student_classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sessions_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `student_classes` (`id`),
  ADD CONSTRAINT `students_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
