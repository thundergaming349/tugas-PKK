<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\StudentClass;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = [
            [
                'full_name' => 'Muhammad Fathar',
                'email' => 'fatharfaidur@gmail.com',
                'password' => Hash::make('24092008'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Adinda Kamilaratu',
                'email' => 'adinda@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Affrisyah Putri',
                'email' => 'affrisyah@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Ahmad Naufal Ardana',
                'email' => 'ahmadnaufal@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Affandi Santoso',
                'email' => 'affandi@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Andi Yoko Ihsan',
                'email' => 'andiyoko@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Arlieta Okta',
                'email' => 'arlieta@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Arsyad Aufa',
                'email' => 'arsyad@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Aurelina Bonita',
                'email' => 'aurelina@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Citra Aulia',
                'email' => 'citraaulia@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Dimas Aditya Pratama',
                'email' => 'dimass@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Khairun Nisa Pujadi',
                'email' => 'khairunnisa@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Farrel Ilham Fauzan',
                'email' => 'farrelilham@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Hazel Quantanimo',
                'email' => 'hazelnut@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Maikel Roberto Simanjuntak',
                'email' => 'maikelroberto@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Rasyah Brebes',
                'email' => 'rasyahbrebes@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Salman Caesar Dani',
                'email' => 'salmannn@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'siswa'
            ],
            [
                'full_name' => 'Ziza Wildan',
                'email' => 'zizawildan@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'guru'
            ],
            [
                'full_name' => 'Gunawan',
                'email' => 'gunawan@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'guru'
            ],
        ];


        $kelas = [
            [
                'name' => 'XI TKJ 1'
            ],
            [
                'name' => 'XI TKJ 2'
            ],
            [
                'name' => 'XI TG 1'
            ],
            [
                'name' => 'XI TG 2'
            ],
            [
                'name' => 'XI TG 3'
            ],
            [
                'name' => 'XI TG 4'
            ],
            [
                'name' => 'XI DKV 1'
            ],
            [
                'name' => 'XI DKV 2'
            ],
            [
                'name' => 'X TKJ 1'
            ],
            [
                'name' => 'X TKJ 2'
            ],
            [
                'name' => 'X TG 1'
            ],
            [
                'name' => 'X TG 2'
            ],
            [
                'name' => 'X TG 3'
            ],
            [
                'name' => 'X TG 4'
            ],
        ];


        foreach ($user as $us) {
            if ($us['role'] === 'guru') {
                $users = User::create($us);
            }
        }
    }
}
