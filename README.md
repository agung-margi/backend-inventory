# Backend Inventory
Ini adalah proyek backend untuk sistem inventaris sederhana yang dibangun dengan menggunakan Node.js, Express.js, dan Sequelize ORM.

## Instalasi
Clone Repository

git clone https://github.com/margiyonoagung/backend-inventory.git

## Instal Dependensi

Masuk ke direktori proyek dan jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan:

cd backend-inventory
npm install

## Konfigurasi Database

Proyek ini menggunakan database MySQL. Pastikan Anda telah menginstal MySQL di komputer Anda. Konfigurasikan koneksi database Anda di file .env.

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=inventory_db

## Migrasi Database
Jalankan migrasi database untuk membuat skema database:

npx sequelize-cli db:migrate

## Menjalankan Server
Setelah semua langkah di atas selesai, jalankan server dengan perintah:

npm start

## Endpoint API
Berikut adalah daftar endpoint API yang disediakan oleh backend inventory:

GET /users : Mendapatan daftar user.
GET /user/:id : Mendapatan detail user berdasarkan ID.
GET /profile/:id : Mendapatan detail user berdasarkan ID.
POST /user : Membuat user baru.
PUT /user/:id: Memperbarui detail user berdasarkan ID.
DELETE /user/:id: Menghapus user berdasarkan ID.
POST /login: Masuk ke akun pengguna.
POST /logout: Keluar dari akun pengguna.

GET /categorys: Mendapatkan daftar semua category.
GET /category/:id: Mendapatkan detail category berdasarkan ID.
POST /category: Membuat category baru.
PUT /category/:id: Memperbarui detail category berdasarkan ID.
DELETE /category/:id: Menghapus category berdasarkan ID.

GET /products: Mendapatkan daftar semua produk.
GET /product/:id: Mendapatkan detail produk berdasarkan ID.
POST /product: Membuat produk baru.
PUT /product/:id: Memperbarui detail produk berdasarkan ID.
DELETE /product/:id: Menghapus produk berdasarkan ID.

GET /transactions: Mendapatkan daftar semua transaksi.
GET /transaction/:id: Mendapatkan detail transaksi berdasarkan ID.
POST /transaction: Membuat transaksi baru.
PUT /transaction/:id: Memperbarui detail transaksi berdasarkan ID.
DELETE /transaction/:id: Menghapus transaksi berdasarkan ID.

Pastikan untuk memeriksa dokumentasi API dan contoh permintaan yang diberikan di dalam proyek untuk informasi lebih lanjut tentang penggunaan setiap endpoint.

## Kontribusi
Jika Anda ingin berkontribusi pada proyek ini, silakan buat pull request. Kami sangat menghargai kontribusi Anda.
