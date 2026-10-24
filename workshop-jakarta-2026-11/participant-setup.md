# Persiapan Peserta — Workshop AI or DIE Jakarta

Mohon selesaikan persiapan ini **di rumah sebelum workshop**. Waktu yang dibutuhkan sekitar 30–45 menit.
Tidak ada model lokal — semua berjalan melalui internet. WiFi tersedia di lokasi,
tetapi instalasi harus sudah selesai sebelum hari-H.

## Prasyarat (wajib)

Tanpa ini Anda tidak dapat mengikuti sesi praktik.

1. **Laptop sendiri** — Windows 10/11, macOS atau Linux, beserta charger
   (colokan listrik tersedia di setiap kursi).
2. **Agen AI — pilih salah satu:**

   **A. OpenCode dengan NVIDIA sebagai model provider** (gratis)
   1. Daftar akun developer NVIDIA di <https://build.nvidia.com> dan buat **API key**.
   2. Instal OpenCode — <https://opencode.ai>
      Cek: `opencode --version`
   3. Hubungkan NVIDIA: jalankan `opencode auth login`, pilih **Nvidia**, lalu tempel API key Anda.
      (Alternatif: set environment variable `NVIDIA_API_KEY`.)
   4. Jalankan `opencode`, pilih salah satu model NVIDIA, dan ketik: `Halo, apa kabar?` — agen harus menjawab.

   **B. Claude Code** (memerlukan langganan Claude)
   1. Instal Claude Code — <https://docs.claude.com/en/docs/claude-code/overview>
      Cek: `claude --version`
   2. Jalankan `claude` sekali dan login.

3. **Akun GitHub** — untuk latihan spec-driven development di Sesi 3.

## Untuk Sesi 5 — agen sendiri dengan Spring Boot & Spring AI

1. **JDK 21** — misalnya [Eclipse Temurin](https://adoptium.net/)
   Cek: `java -version`
2. **Maven 3.9+** — <https://maven.apache.org/download.cgi>
   Cek: `mvn -version`
3. **Git** — <https://git-scm.com/>
4. **IDE** — IntelliJ IDEA Community atau VS Code dengan Java extension pack
5. **NVIDIA API key** dari langkah 2A — Spring AI memakai model NVIDIA dari build.nvidia.com.
   Peserta dengan Claude dapat memakai Anthropic API key sebagai gantinya.

## Unduh project workshop lebih awal

Link repository dikirim kepada peserta terdaftar satu minggu sebelum workshop.

```bash
git clone <workshop-repository-url>
cd <workshop-repository>
mvn -q dependency:go-offline
```

## Ada kendala?

Tanyakan di grup peserta, atau datang pukul **08:30** pada hari-H —
asisten akan membantu saat registrasi.

Sampai jumpa di Jakarta!
