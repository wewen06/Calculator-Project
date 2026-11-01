# Kalkulator Modern

Kalkulator web dengan tampilan modern, mendukung **mode terang dan gelap**, animasi halus, serta **input lewat keyboard**. Dibuat dengan **HTML, CSS, dan JavaScript murni** tanpa framework maupun library tambahan.

## Fitur

- Operasi dasar: tambah (`+`), kurang (`-`), kali (`×`), bagi (`÷`)
- Operasi **modulo** (`%`) dan **akar kuadrat** (`√`)
- Tampilan dua baris: operasi sebelumnya di atas, angka saat ini di bawah
- Tombol **C** untuk menghapus semua dan **X** untuk menghapus angka terakhir
- Penanganan kesalahan: pembagian dengan nol dan akar dari bilangan negatif menampilkan `Error`
- Pencegahan input titik desimal ganda dan batas panjang input 15 karakter
- Format otomatis untuk hasil yang sangat panjang (desimal dibulatkan, angka besar memakai notasi ilmiah)
- **Mode terang dan gelap** dengan tombol pengganti tema, pilihan tema tersimpan di browser (`localStorage`)
- Gambar latar belakang dengan efek kaca (*glassmorphism*)
- Animasi: tombol saat ditekan, efek *ripple*, hasil muncul, dan display bergetar saat input tidak valid
- Tampilan responsif untuk layar ponsel
- Mencegah zoom akibat *double-tap* di perangkat mobile

## Pintasan Keyboard

| Tombol | Fungsi |
|--------|--------|
| `0` - `9` | Memasukkan angka |
| `.` | Titik desimal |
| `+` `-` `*` `/` | Tambah, kurang, kali, bagi |
| `%` | Modulo |
| `Enter` atau `=` | Hitung hasil |
| `Backspace` | Hapus angka terakhir |
| `Escape` | Hapus semua (clear) |

## Teknologi

- HTML5
- CSS3 (variabel CSS untuk tema, animasi `@keyframes`, `backdrop-filter`, media query)
- JavaScript (vanilla)

## Struktur Proyek

```
.
├── index.html        # Struktur halaman dan tombol kalkulator
├── style.css         # Tampilan, tema terang/gelap, dan animasi
├── script.js         # Logika kalkulator, tema, dan interaksi
├── background.jpg    # Gambar latar belakang
├── sun-icon.png      # Ikon untuk beralih ke mode terang
└── moon-icon.png     # Ikon untuk beralih ke mode gelap
```

## Cara Menjalankan

Tidak perlu instalasi apa pun.

**Langsung di browser**

1. Unduh atau clone repositori ini.

   ```bash
   git clone https://github.com/<username>/Calculator-Project.git
   ```

2. Buka berkas `index.html` dengan browser.

**Atau dengan server lokal** (opsional)

```bash
npx serve .
```

**Deploy ke GitHub Pages**

Buka Settings, lalu Pages, pilih branch `main` dan folder root. Situs akan tersedia di `https://<username>.github.io/Calculator-Project/`.

## Cara Kerja Singkat

Kalkulator menyimpan tiga keadaan utama: nilai saat ini, nilai sebelumnya, dan operator yang dipilih. Ketika operator ditekan, nilai saat ini dipindahkan ke baris atas. Angka berikutnya yang dimasukkan menjadi operand kedua, dan saat `=` ditekan hasilnya dihitung lalu ditampilkan dengan animasi. Jika operator ditekan lagi sebelum `=`, operasi sebelumnya dihitung terlebih dahulu sehingga perhitungan dapat dirangkai.

## Catatan

- Tombol `%` berfungsi sebagai **modulo** (sisa bagi), bukan persentase. Contoh: `10 % 3 = 1`.
- Tombol `√` langsung menghitung akar dari angka yang tampil, tanpa perlu menekan `=`.
- Operasi dihitung berurutan dari kiri ke kanan tanpa prioritas operator. Misalnya `2 + 3 × 4` menghasilkan `20`, bukan `14`.

## Pengembangan Selanjutnya

- Riwayat perhitungan
- Tombol persentase sungguhan, tanda kurung, dan tombol ganti tanda (+/-)
- Fungsi ilmiah (pangkat, trigonometri, logaritma)
- Tombol untuk mengganti gambar latar dari antarmuka
- Penambahan pengujian otomatis untuk logika perhitungan

## Lisensi

Project ini dibuat untuk keperluan pembelajaran. Atur lisensi sesuai kebutuhan.

## Pembuat

Dikembangkan oleh **Wendy** sebagai proyek pembelajaran.
