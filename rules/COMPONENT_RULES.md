# Component Rules

Gunakan pendekatan component-based.

Setiap section utama harus dibuat sebagai komponen terpisah:
- Navbar
- Hero
- About
- SkillKeyboard
- Projects
- Experience
- Education
- Contact
- Footer

Aturan komponen:
- Jangan menulis semua kode di App.jsx.
- App.jsx hanya digunakan untuk menyusun section.
- Data seperti skills, projects, experiences, dan education harus dipisahkan ke folder src/data.
- Komponen harus reusable dan mudah diedit.
- Gunakan nama komponen dengan PascalCase.
- Gunakan nama file sesuai nama komponen.
- Hindari kode yang terlalu panjang dalam satu file.
- Jika komponen mulai terlalu besar, pecah menjadi subcomponent.

Aturan pembuka:
- Saat mengujungi website akan ada tampilan khusus dengan kata sambutan
- Menampilkan Nama (Muhammad Aditya)
- logo instagram dengan nickname lgmbng
- logo github dengan nickname lgmbng2
- domian web portopolio yang muncul dengan diketik perlahan
- setelah beberapa detik hilang semuanya dengan animasi mulus lalu lanjut ke halaman utama landing page website portopolio

Aturan Home:
- Nama
- penjelasan singkat
- cards kecil yang menampilkan total project, pengalaman
- foto menggunakan desain card dengan tema desain achievment unlock jadi pertama foto kartu terbalikdan ketika di klik muncul pop up utama ke layar dan kartu terbalik diikuti dengan animasi dan detail achievment unlock dengan latar belakang blur, ketika di klik maka kembali ke tempat semula dan foto akan terbuka

Aturan Skill Keyboard:
- Skill Keyboard harus menjadi section utama yang menarik perhatian.
- Setiap skill ditampilkan seperti tombol keyboard.
- Setiap tombol memiliki icon/logo, warna, nama skill, dan deskripsi.
- Saat hover atau klik, tampilkan deskripsi skill secara dinamis.
- Tombol harus memiliki efek visual seperti keyboard 3D menggunakan CSS shadow dan transform.
- Jangan gunakan Three.js pada versi awal kecuali diminta.

Aturan Project:
- project ditampilkan dalam bentuk card
- bagian dalam berisi gambar projcect dan penjelasan project
- ada bagian tag dan skill yg berkaitan dengan project itu di setiap card
- project bisa direact dengan memberikan emote dan bisa didisplay setiap react

Aturan experience:
- setiap ecperiece dibuat menjadi satu bagian yang berisi : judul, deskripsi singkat, logo, point point experience, waktu, dan dokumentasi yang bisa ditambahkan dan di slide untuk ditampilkan jika di klik dokumentasi menampilkan foto dengan smooth dan informasi kegiatan dokumentasi itu 

Aturan Education:
- dibuat list dengan informasi logo, nama, tahun, grade

Aturan Achievments:
- Berupa Gambar utama
- dibagian bawah kecil ada:
- penjelasan nama sertif
- keterangan
- logo 

kebutuhan skill di keyboards itu ada:
HTMLL
Css
JS
Ts
Github
Golang
React
CI4
Laravel
Kotlin
Java
Integasi
Xampp
Firebase