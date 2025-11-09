# Portofolio Dzaky

Website pribadi modern untuk menampilkan proyek, pengalaman, dan keahlian Dzaky. Dibangun dengan Next.js 15, Tailwind CSS, dan Framer Motion untuk menghadirkan pengalaman yang halus, responsif, dan siap produksi di Vercel.

## 📸 Pratinjau

![Tampilan Halaman Utama](./public/images/screenshots/portfolio-home.png)

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/4d111019-7252-42fd-b278-cb9f9908d40b" />

## ✨ Fitur Utama
- Animasi interaktif (hero, timeline pendidikan, hover card) menggunakan utilitas motion bersama.
- Mode terang/gelap adaptif dengan tema kustom dan gradien bercahaya.
- Halaman khusus untuk proyek, skill, pendidikan, blog teaser, serta formulir kontak profesional.
- SEO bawaan: sitemap, robots, dan Open Graph image dinamis.
- Integrasi Vercel untuk preview per branch dan pengiriman email via Resend.

## 🧰 Teknologi
- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui, token desain kustom
- **Animasi**: Framer Motion, variabel motion reusable
- **Tooling**: ESLint, Turbopack build, Vercel Analytics

## 🚀 Mulai Cepat
```bash
npm install        # pasang dependensi
npm run dev        # jalankan server pengembangan
npm run build      # build produksi
npm start          # jalankan output produksi
```

### Variabel Lingkungan
- `RESEND_API_KEY` (opsional) – aktifkan endpoint `/api/contact` untuk mengirim email.

## 🗂️ Struktur Proyek
```
src/
  app/
    page.tsx                      # Beranda: hero, highlight proyek, CTA
    about|education|projects/...  # Halaman konten utama
    projects/[slug]/page.tsx      # Detail studi kasus proyek
    api/contact/route.ts          # Handler email via Resend
    sitemap.ts | robots.ts        # Output SEO standar
  components/
    layout/                       # Header, footer, shell layout
    sections/                     # Hero, timeline, grid skill, dsb.
    ui/animations/                # HoverCard, Reveal, Stagger, utilitas motion
  config/                         # Metadata dan navigasi
  data/                           # Konten statis (proyek, skill, edukasi)
public/
  images/                         # Aset proyek & profil
  tools/                          # Logo stack teknologi
  resume.pdf (opsional)           # Untuk tautan unduh CV
```

## 🔍 Komponen Penting
- `HoverCard`, `Reveal`, `Stagger`: abstraksi Framer Motion dengan typing aman.
- `education-vertical-timeline.tsx`: timeline beranimasi dengan efek glow.
- `Glowing-Effect.tsx`: gradien atmosfer untuk hero dan CTA.

## ✅ Pemeriksaan Kode
```bash
npm run lint   # lint Next.js + pemeriksaan tipe
```

## ☁️ Deploy ke Vercel
1. Import repo di Vercel dan arahkan ke folder `web`.
2. Tambahkan variabel lingkungan seperti `RESEND_API_KEY`.
3. Setiap push memicu preview deployment; merge ke `main` untuk produksi.

## 📅 Rencana Pengembangan
- Integrasi konten MDX untuk blog atau studi kasus yang lebih kaya.
- Menampilkan aktivitas GitHub dan testimoni klien.
- Menambahkan pengujian aksesibilitas otomatis (Playwright/axe).

---

Website ini dibuat dan dikelola oleh **Dzaky**. Silakan fork, kembangkan, atau hubungi langsung melalui formulir kontak di situs.***
