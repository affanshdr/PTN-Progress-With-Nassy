import type { SnbtSubtestCode } from "@/lib/supabase/types";

export interface SubtestMaterialGuide {
  overview: string;
  keyPoints: ReadonlyArray<{
    title: string;
    detail: string;
  }>;
  quickTip: string;
}

export interface SubMaterialSection {
  heading: string;
  body: string;
  bullets?: ReadonlyArray<string>;
  exampleBox?: {
    wrong?: string;
    right: string;
    note: string;
  };
}

export interface SubMaterialLesson {
  id: string;
  orderNumber: number;
  topicKey: string;
  title: string;
  chapterTitle: string;
  summary: string;
  heroConceptTitle: string;
  heroConceptFormula: string;
  heroConceptSubtitle: string;
  introParagraphs: ReadonlyArray<string>;
  sections: ReadonlyArray<SubMaterialSection>;
  examTip: string;
}

export interface SubtestChapterGroup {
  chapterTitle: string;
  lessons: ReadonlyArray<SubMaterialLesson>;
}

export const SNBT_SUBTEST_MATERIALS: Record<
  SnbtSubtestCode,
  SubtestMaterialGuide
> = {
  PK: {
    overview:
      "Konten sub-materi dan bank soal Pengetahuan Kuantitatif (PK) sedang disiapkan.",
    keyPoints: [],
    quickTip:
      "Sub-materi untuk subtes ini akan segera tersedia setelah materi dan paket soal diunggah.",
  },
  PM: {
    overview:
      "Konten sub-materi dan bank soal Penalaran Matematika (PM) sedang disiapkan.",
    keyPoints: [],
    quickTip:
      "Sub-materi untuk subtes ini akan segera tersedia setelah materi dan paket soal diunggah.",
  },
  PU: {
    overview:
      "Konten sub-materi dan bank soal Penalaran Umum (PU) sedang disiapkan.",
    keyPoints: [],
    quickTip:
      "Sub-materi untuk subtes ini akan segera tersedia setelah materi dan paket soal diunggah.",
  },
  PPU: {
    overview:
      "Konten sub-materi dan bank soal Pengetahuan & Pemahaman Umum (PPU) sedang disiapkan.",
    keyPoints: [],
    quickTip:
      "Sub-materi untuk subtes ini akan segera tersedia setelah materi dan paket soal diunggah.",
  },
  LBI: {
    overview:
      "Literasi Bahasa Indonesia menguji kemampuan menggali informasi tersurat dan tersirat, memahami tujuan penulis, serta mengevaluasi bacaan sastra maupun ilmiah populer.",
    keyPoints: [
      {
        title: "Ide Pokok & Gagasan Pendukung",
        detail:
          "Identifikasi pernyataan umum dan kalimat penjelas di tiap paragraf untuk merumuskan inti keseluruhan wacana.",
      },
      {
        title: "Simpulan Tersirat",
        detail:
          "Gabungkan beberapa fakta penting dalam teks secara objektif tanpa menambahkan klaim berlebihan yang tidak didukung bacaan.",
      },
      {
        title: "Nada, Sikap & Tujuan Teks",
        detail:
          "Amati diksi penilaian penulis guna mengetahui apakah bacaan bersifat informatif, persuasif, skeptis, atau kritis.",
      },
      {
        title: "Pemahaman Sastra & Tabel",
        detail:
          "Perhatikan konflik, watak tokoh, serta pesan tersirat dalam cuplikan sastra dan hubungkan data infografis dengan narasi.",
      },
    ],
    quickTip:
      "Baca pertanyaannya terlebih dahulu secara singkat supaya tahu bagian teks mana yang perlu dicermati lebih dalam.",
  },
  LBE: {
    overview:
      "Literasi Bahasa Inggris mengukur kemampuan memahami teks akademik, opini, dan diskusi berbahasa Inggris mulai dari main idea, detail, hingga inference.",
    keyPoints: [
      {
        title: "Main Idea & Topic Sentence",
        detail:
          "Lakukan skimming pada kalimat awal dan akhir paragraf untuk menangkap ide utama serta alur pengembangan argumen.",
      },
      {
        title: "Inference & Author's Attitude",
        detail:
          "Tarik simpulan yang logis dari petunjuk tekstual dan kenali nada penulis (supportive, neutral, cautionary, critical).",
      },
      {
        title: "Vocabulary in Context",
        detail:
          "Tentukan arti kata sulit dengan melihat petunjuk definisi, kontras (however, although), atau contoh di sekitarnya.",
      },
      {
        title: "Paragraph Relationship & Purpose",
        detail:
          "Pahami peran paragraf tertentu (memberi bukti, membantah pandangan sebelumnya, atau menyajikan solusi).",
      },
    ],
    quickTip:
      "Hati-hati dengan opsi jawaban yang menyalin persis kata dari teks tetapi membalik atau menyempitkan maknanya (extreme wording).",
  },
  PBM: {
    overview:
      "Pemahaman Bacaan & Menulis menguji kemampuan menyunting kalimat efektif, penerapan EYD V (ejaan dan tanda baca), pemilihan kata baku, serta keutuhan paragraf.",
    keyPoints: [
      {
        title: "Struktur Kalimat Efektif",
        detail:
          "Pastikan kalimat memiliki subjek dan predikat yang jelas, bebas pemborosan kata (pleonasme), dan paralel dalam perincian.",
      },
      {
        title: "EYD V: Kapital, Miring & Tanda Baca",
        detail:
          "Kuasai aturan koma sebelum kata hubung pertentangan (sedangkan, melainkan), pemakaian tanda hubung, serta di-/ke- sebagai kata depan.",
      },
      {
        title: "Kata Baku & Imbuhan Tepat",
        detail:
          "Cermati penulisan kata baku KBBI dan peluluhan konsonan K-T-S-P setelah awalan meN- dan peN-.",
      },
      {
        title: "Kohesi & Penyuntingan Paragraf",
        detail:
          "Perbaiki konjungsi antarkalimat agar alur logis tetap mulus dan kenali kalimat sumbang yang keluar dari topik paragraf.",
      },
    ],
    quickTip:
      "Jika kalimat terasa panjang dan membingungkan, cari kata kerja utamanya (predikat) lalu cek apakah subjeknya diawali preposisi yang bikin rancu.",
  },
};

// ============================================================================
// KURIKULUM TERSTRUKTUR ALA SKILVUL (BAB -> SUB-MATERI + MATERI BACAAN LENGKAP)
// ============================================================================

const PBM_LESSONS: ReadonlyArray<SubMaterialLesson> = [
  {
    id: "pbm-01",
    orderNumber: 1,
    topicKey: "01. Kompilasi Pemahaman Bacaan & Menulis",
    title: "Kompilasi Pemahaman Bacaan & Menulis",
    chapterTitle: "Ejaan, Tanda Baca, & Morfologi (EYD V)",
    summary:
      "Pemetaan menyeluruh tipe soal PBM UTBK-SNBT: penyuntingan ejaan, ketepatan diksi, kepaduan paragraf, hingga penyusunan kalimat acak.",
    heroConceptTitle: "Peta Kompetensi PBM SNBT",
    heroConceptFormula: "Ejaan (EYD V) + Kalimat Efektif + Kohesi Wacana",
    heroConceptSubtitle:
      "Tiga pilar utama yang selalu diujikan secara terpadu dalam setiap paket Pemahaman Bacaan & Menulis.",
    introParagraphs: [
      "Subtes Pemahaman Bacaan dan Menulis (PBM) menguji kemahiran kamu dalam membaca teks secara kritis sekaligus menyunting tata bahasa Indonesia sesuai kaidah baku. Berbeda dengan Literasi Bahasa Indonesia yang menitikberatkan pada kedalaman isi wacana, PBM berfokus pada ketepatan bentuk bahasa: mulai dari ejaan, tanda baca, pilihan kata (diksi), struktur kalimat, hingga kepaduan antar-kalimat.",
      "Dalam sub-materi kompilasi ini, kamu akan melihat bagaimana berbagai konsep PBM digabungkan dalam satu teks utuh bernomor kalimat (1) sampai (10). Pendekatan terbaik saat mengerjakan soal kompilasi adalah langsung membaca kalimat yang ditunjuk oleh nomor soal tanpa harus membaca keseluruhan wacana dari awal jika soal hanya menanyakan ejaan atau tanda baca.",
    ],
    sections: [
      {
        heading: "1. Ketepatan Pilihan Kata (Diksi & Kolokasi)",
        body: "Kata yang secara kamus benar belum tentu tepat apabila dipasangkan dengan kata yang salah di dalam kalimat. Perhatikan kesesuaian kolokasi (sanding kata) dan konteks formal kalimat ilmiah.",
        bullets: [
          "Gunakan 'melakukan/menjalankan analisis', bukan 'melangsungkan analisis' (kata melangsungkan berkolokasi dengan acara/pernikahan/rapat).",
          "Pastikan kata kerja transitif seperti 'memengaruhi' atau 'membutuhkan' langsung diikuti objek tanpa disisipi preposisi ('memengaruhi cara', bukan 'memengaruhi terhadap cara').",
          "Cermati bentuk baku kata serapan: risiko (bukan resiko), kontinu (bukan kontinyu), kualitas (bukan kwalitas).",
        ],
        exampleBox: {
          wrong: "Para peneliti melangsungkan analisis genetik yang memengaruhi terhadap status konservasi.",
          right: "Para peneliti melakukan analisis genetik yang memengaruhi status konservasi.",
          note: "Perbaiki kolokasi 'melakukan analisis' dan hapus preposisi 'terhadap' setelah verba transitif 'memengaruhi'.",
        },
      },
      {
        heading: "2. Kepaduan Paragraf, Kalimat Sisipan, & Urutan Kalimat",
        body: "Paragraf yang baik memiliki kohesi (keterkaitan bentuk) dan koherensi (keterpaduan makna). Ketika menyisipkan atau mengurutkan kalimat acak, perhatikan kata rujukan (tersebut, ini, itu) dan konjungsi antarkalimat.",
        bullets: [
          "Kalimat yang memuat frasa rujukan seperti 'Tradisi ini...' atau 'Catatan tersebut...' wajib diletakkan tepat setelah kalimat yang pertama kali memperkenalkan istilah atau konsep acuannya.",
          "Kalimat pembuka paragraf umumnya berupa definisi umum atau pengenalan fenomena, bukan kalimat yang langsung diawali kata rujukan atau konjungsi akibat.",
        ],
      },
    ],
    examTip:
      "Untuk soal pengurutan kalimat acak, cari kalimat definisi umum terlebih dahulu sebagai kalimat pertama, lalu lacak pasangan kalimat yang terhubung lewat kata rujukan ('ini', 'tersebut').",
  },
  {
    id: "pbm-02",
    orderNumber: 2,
    topicKey: "02. Penggunaan Tanda Baca (EYD V)",
    title: "Penggunaan Tanda Baca (EYD V)",
    chapterTitle: "Ejaan, Tanda Baca, & Morfologi (EYD V)",
    summary:
      "Aturan lengkap tanda koma (,), titik dua (:), titik koma (;), tanda hubung (-), tanda pisah (—), dan tanda petik (\"...\") sesuai EYD Edisi Kelima.",
    heroConceptTitle: "Rumus Emas Tanda Koma EYD V",
    heroConceptFormula: "Anak Kalimat, Induk Kalimat  |  Konjungsi Antarkalimat, S-P",
    heroConceptSubtitle:
      "Lebih dari 70% soal tanda baca di SNBT menguji ketepatan peletakan tanda koma pada konjungsi dan perincian.",
    introParagraphs: [
      "Penggunaan tanda baca dalam Ejaan Bahasa Indonesia yang Disempurnakan Edisi Kelima (EYD V) berfungsi menjaga kejelasan struktur kalimat dan menghindari ketaksaan makna. Kesalahan satu tanda koma saja dapat memisahkan subjek dari predikat atau mengaburkan batas klausa.",
      "Fokus utama pembuat soal UTBK-SNBT terletak pada perbedaan perilaku tanda koma saat mendahului konjungsi intrakalimat (di dalam satu kalimat) dibandingkan konjungsi antarkalimat (di awal kalimat baru), serta aturan perincian tiga unsur atau lebih.",
    ],
    sections: [
      {
        heading: "1. Empat Kaidah Utama Tanda Koma (,)",
        body: "Hafalkan empat posisi wajib dan posisi terlarang tanda koma berikut agar tidak terjebak pengecoh:",
        bullets: [
          "Wajib dipakai setelah konjungsi antarkalimat di awal kalimat: 'Oleh karena itu, ...', 'Meskipun demikian, ...', 'Namun, ...', 'Akan tetapi, ...', 'Selain itu, ...'.",
          "Wajib dipakai sebelum konjungsi intrakalimat penanda pertentangan/perbandingan: '..., tetapi ...', '..., melainkan ...', '..., sedangkan ...', '..., sementara ...'.",
          "Wajib dipakai pada perincian 3 unsur atau lebih sebelum kata 'dan'/'atau' (koma seri): 'buku, pensil, dan penghapus'.",
          "DILARANG dipakai sebelum konjungsi 'bahwa', 'karena', 'sehingga', 'agar', 'supaya', atau 'meskipun' jika induk kalimat mendahului anak kalimat.",
        ],
        exampleBox: {
          wrong: "Oleh karena itu masyarakat perlu meningkatkan literasi digital, sehingga tidak mudah tertipu.",
          right: "Oleh karena itu, masyarakat perlu meningkatkan literasi digital sehingga tidak mudah tertipu.",
          note: "Tambahkan koma setelah 'Oleh karena itu' dan hapus koma sebelum 'sehingga'.",
        },
      },
      {
        heading: "2. Tanda Titik Dua (:), Titik Koma (;), dan Tanda Petik (\"...\")",
        body: "Selain tanda koma, perhatikan syarat kelengkapan klausa sebelum titik dua serta posisi tanda baca penutup pada kutipan langsung.",
        bullets: [
          "Tanda titik dua (:) hanya dipakai pada akhir pernyataan yang sudah lengkap dan diikuti perincian. Jangan gunakan titik dua setelah kata 'meliputi', 'yaitu', 'seperti', atau 'adalah' jika perinciannya masih bagian langsung dari kalimat.",
          "Pada kalimat langsung, tanda titik, koma, tanya, atau seru diletakkan DI DALAM tanda petik penutup: Ibu berkata, \"Jangan lupa membawa payung.\"",
        ],
      },
    ],
    examTip:
      "Cek cepat setiap ada kata 'Oleh karena itu', 'Namun', atau 'Meskipun demikian' di awal kalimat: jika tidak ada koma tepat sesudahnya, kalimat tersebut pasti salah ejaan!",
  },
  {
    id: "pbm-03",
    orderNumber: 3,
    topicKey: "03. Penulisan Kata Baku & Kata Serapan",
    title: "Penulisan Kata Baku & Kata Serapan",
    chapterTitle: "Ejaan, Tanda Baca, & Morfologi (EYD V)",
    summary:
      "Penguasaan kosakata baku KBBI VI, penyerapan istilah asing, serta pembedaan kata depan di/ke dan imbuhan di-/ke-.",
    heroConceptTitle: "Kata Baku & Serapan Ilmiah",
    heroConceptFormula: "Practice → Praktik (Mempraktikkan)  |  Risk → Risiko",
    heroConceptSubtitle:
      "Kata serapan bahasa Inggris berakhiran -ic/-ics diserap menjadi -ik, dan huruf f/v dalam serapan tetap konsisten saat diberi imbuhan.",
    introParagraphs: [
      "Penulisan kata baku mengacu pada Kamus Besar Bahasa Indonesia (KBBI) dan pedoman pembentukan istilah. Dalam wacana akademik SNBT, ketidakbakuan kata sering disamarkan melalui ejaan percakapan sehari-hari yang terdengar akrab di telinga namun keliru secara ortografi.",
      "Selain hafalan bentuk baku, soal PBM sering menguji konsistensi perubahan bunyi saat kata serapan mendapat imbuhan (misalnya kata 'sosialisasi' menjadi 'menyosialisasikan', atau 'praktik' menjadi 'mempraktikkan') serta pembedaan preposisi 'di' dan prefiks 'di-'.",
    ],
    sections: [
      {
        heading: "1. Daftar Pasangan Kata Baku vs Tidak Baku Tersering di SNBT",
        body: "Perhatikan pola penyerapan huruf asing ke bahasa Indonesia pada kata-kata yang paling sering muncul di soal:",
        bullets: [
          "aktivitas / aktif (bukan aktifitas), efektivitas / efektif (bukan efektifitas), produktivitas (bukan produktifitas).",
          "analisis (bukan analisa), hipotesis (bukan hipotesa), sintesis (bukan sintesa), diagnosis (bukan diagnosa).",
          "praktik / mempraktikkan (bukan praktek), risiko (bukan resiko), kualitas (bukan kwalitas), jadwal (bukan jadual).",
          "nasihat (bukan nasehat), ijazah (bukan ijasah), hakikat (bukan hakekat), sistem (bukan sistim), ekstrem (bukan ekstrim).",
        ],
        exampleBox: {
          wrong: "Para siswa mempraktekkan analisa data untuk mengurangi resiko kesalahan aktifitas praktikum.",
          right: "Para siswa mempraktikkan analisis data untuk mengurangi risiko kesalahan aktivitas praktikum.",
          note: "Gunakan bentuk baku KBBI: mempraktikkan, analisis, risiko, dan aktivitas.",
        },
      },
      {
        heading: "2. Kata Depan (di, ke) vs Awalan (di-, ke-)",
        body: "Cara tercepat membedakan keduanya adalah menguji apakah kata tersebut menjawab pertanyaan 'di mana / ke mana' atau dapat diubah ke bentuk aktif 'meN-':",
        bullets: [
          "Kata depan 'di' dan 'ke' menunjukkan tempat/arah → DITULIS TERPISAH: di halaman, di dalam, di antara, ke sekolah, ke luar negeri.",
          "Imbuhan 'di-' membentuk kata kerja pasif (bisa diubah ke meN-) → DITULIS SERANGKAI: dikirim (mengirim), dianalisis (menganalisis), diperbaiki (memperbaiki).",
        ],
      },
    ],
    examTip:
      "Ingat kaidah -f vs -v: saat berupa kata sifat berakhiran '-if' (aktif, efektif, kreatif), gunakan huruf F. Saat mendapat akhiran '-itas' menjadi kata benda (aktivitas, efektivitas, kreativitas), huruf F berubah menjadi V!",
  },
  {
    id: "pbm-04",
    orderNumber: 4,
    topicKey: "04. Penulisan Gabungan Kata & Bentuk Terikat",
    title: "Penulisan Gabungan Kata & Bentuk Terikat",
    chapterTitle: "Ejaan, Tanda Baca, & Morfologi (EYD V)",
    summary:
      "Aturan penulisan gabungan kata terpisah vs serangkai, pengimbuhan gabungan kata, serta bentuk terikat (pra-, pasca-, antar-, ekstra-, non-).",
    heroConceptTitle: "Rumus Gabungan Kata Berimbuhan",
    heroConceptFormula: "Awalan ATAU Akhiran → Pisah  |  Awalan + Akhiran → Rangkai",
    heroConceptSubtitle:
      "bertanggung jawab (hanya awalan) vs mempertanggungjawabkan (awalan + akhiran).",
    introParagraphs: [
      "Gabungan kata (kata majemuk) dalam bahasa Indonesia pada dasarnya ditulis terpisah antar-unsurnya, seperti 'kerja sama', 'terima kasih', 'tanggung jawab', dan 'rumah sakit'. Namun, penulisan tersebut berubah menjadi serangkai ketika gabungan kata mendapat awalan dan akhiran sekaligus (konfiks).",
      "Selain itu, terdapat bentuk terikat (morfem yang tidak dapat berdiri sendiri dalam kalimat normal), seperti 'pra-', 'pasca-', 'antar-', 'ekstra-', 'multi-', dan 'non-'. Bentuk terikat ini wajib ditulis serangkai dengan kata yang mengikutinya.",
    ],
    sections: [
      {
        heading: "1. Tiga Aturan Emas Gabungan Kata",
        body: "Cermati apakah gabungan kata berdiri sendiri, hanya mendapat satu imbuhan, atau diapit oleh awalan dan akhiran sekaligus:",
        bullets: [
          "Tanpa imbuhan → DITULIS TERPISAH: kerja sama, terima kasih, tanggung jawab, tanda tangan, beri tahu.",
          "Hanya mendapat awalan ATAU hanya akhiran → TETAP TERPISAH: bekerja sama, berterima kasih, bertanggung jawab, bertanda tangan, memberi tahu, beri tahukan.",
          "Mendapat awalan DAN akhiran sekaligus → DITULIS SERANGKAI: mempertanggungjawabkan, menandatangani, memberitahukan, menggarisbawahi, menyebarluaskan.",
          "Gabungan kata yang sudah padu ditulis serangkai: olahraga, kacamata, matahari, saputangan, segitiga, sukacita, darmabakti.",
        ],
        exampleBox: {
          wrong: "Panitia bekerjasama untuk menanda tangani berita acara pasca ujian.",
          right: "Panitia bekerja sama untuk menandatangani berita acara pascaujian.",
          note: "'bekerja sama' hanya berawalan ber- (dipisah), 'menandatangani' berawalan meN- dan berakhiran -i (serangkai), 'pascaujian' bentuk terikat (serangkai).",
        },
      },
      {
        heading: "2. Bentuk Terikat (pra-, pasca-, antar-, ekstra-, non-)",
        body: "Semua bentuk terikat ditulis serangkai dengan kata berikutnya, KECUALI bila diikuti oleh kata yang diawali huruf kapital (maka gunakan tanda hubung '-'):",
        bullets: [
          "Ditulis serangkai: prasekolah, pascapanen, antarkota, antarnegara, ekstrakurikuler, infrastruktur, multilateral, nonformal.",
          "Diikuti huruf kapital (gunakan tanda hubung): non-Indonesia, pan-Afrikanisme, pro-Barat.",
        ],
      },
    ],
    examTip:
      "Jika melihat 'antar negara', 'pra sekolah', atau 'pasca sarjana' ditulis terpisah di soal PBM, langsung tandai sebagai kesalahan ejaan karena bentuk terikat wajib ditulis serangkai!",
  },
  {
    id: "pbm-05",
    orderNumber: 5,
    topicKey: "05. Imbuhan (Afiksasi) & Hukum KTSP",
    title: "Imbuhan (Afiksasi) & Hukum KTSP",
    chapterTitle: "Ejaan, Tanda Baca, & Morfologi (EYD V)",
    summary:
      "Peluluhan fonem /k/, /t/, /s/, /p/ saat bertemu awalan meN-/peN-, jenis-jenis afiks (prefiks, infiks, sufiks, konfiks), dan perubahan kelas kata.",
    heroConceptTitle: "Hukum Peluluhan K-T-S-P",
    heroConceptFormula: "meN- + [K, T, S, P] + Vokal → LULUH (kecuali kluster konsonan)",
    heroConceptSubtitle:
      "meN- + survei → menyurvei (luluh) | meN- + produksi → memproduksi (gugus konsonan pr- tidak luluh).",
    introParagraphs: [
      "Afiksasi (pengimbuhan) adalah proses pembentukan kata turunan dengan menambahkan imbuhan pada kata dasar. Dalam bahasa Indonesia terdapat empat jenis imbuhan: awalan (prefiks), sisipan (infiks seperti -el-, -em-, -er-, -in-), akhiran (sufiks), serta awalan-akhiran sekaligus (konfiks).",
      "Salah satu kaidah morfofonemik yang paling sering diujikan adalah Hukum KTSP: kata dasar yang diawali konsonan tunggal K, T, S, atau P dan diikuti huruf vokal akan mengalami peluluhan (melebur) ketika bertemu awalan meN- atau peN-.",
    ],
    sections: [
      {
        heading: "1. Aturan Peluluhan K-T-S-P dan Pengecualiannya",
        body: "Perhatikan apakah huruf awal K, T, S, P diikuti oleh huruf vokal atau diikuti oleh konsonan lain (gugus konsonan / kluster):",
        bullets: [
          "K-T-S-P diikuti VOKAL → LULUH: meN- + kupas → mengupas; meN- + taut + -kan → menautkan; meN- + survei → menyurvei; meN- + pesona → memesona; meN- + ubah → mengubah.",
          "K-T-S-P berupa GUGUS KONSONAN (kr-, tr-, pr-, st-, sk-, kl-) → TIDAK LULUH: mengkritik, mentransfer, memproduksi, mempraktikkan, menstabilkan (KHUSUS kluster sp-, sm-, sy- pada beberapa kata dapat luluh/tetap sesuai KBBI, namun pr-/tr-/kr- tidak luluh).",
          "Pengecualian khusus: 'mempunyai' (dari dasar punya, sudah mengakar) dan 'mengkaji' (membedakan kaji/telaah dengan mengaji/membaca Al-Qur'an).",
        ],
        exampleBox: {
          wrong: "Lembaga tersebut mensurvei kepuasan publik dan mempublikasikan pemandangan yang mempesona.",
          right: "Lembaga tersebut menyurvei kepuasan publik dan memublikasikan pemandangan yang memesona.",
          note: "Kata dasar 'survei', 'publikasi', dan 'pesona' diawali konsonan tunggal + vokal, sehingga S dan P wajib luluh.",
        },
      },
      {
        heading: "2. Fungsi Imbuhan dalam Menentukan Kelas Kata",
        body: "Imbuhan menentukan kategori sintaksis (kelas kata) dari kata bentukan:",
        bullets: [
          "Pembentuk Nomina (Kata Benda): peN-, peN-...-an, per-...-an, ke-...-an, -an (contoh: penyapu, pengajaran, kelautan, perairan, lautan).",
          "Pembentuk Verba (Kata Kerja): meN-, ber-, ter-, di-, ber-...-an (contoh: melaut, bertebaran, terbakar, bekerja).",
          "Pembentuk Adjektiva (Kata Sifat): -i, -wi, -iah, -is (contoh: alami, duniawi, manusiawi, ilmiah, agamis).",
        ],
      },
    ],
    examTip:
      "Hati-hati dengan kata dasar berawalan semu seperti 'berlian', 'berani', 'berisik', dan 'beras'—kata-kata tersebut adalah kata dasar utuh, BUKAN hasil imbuhan awalan ber-!",
  },
  {
    id: "pbm-06",
    orderNumber: 6,
    topicKey: "06. Konjungsi Intrakalimat & Antarkalimat",
    title: "Konjungsi Intrakalimat & Antarkalimat",
    chapterTitle: "Sintaksis, Struktur, & Kalimat Efektif",
    summary:
      "Klasifikasi kata penghubung intrakalimat, korelatif (berpasangan), dan antarkalimat beserta hubungan logis (sebab-akibat, pertentangan, konsesif, tujuan).",
    heroConceptTitle: "Klasifikasi & Pasangan Konjungsi",
    heroConceptFormula: "tidak hanya ..., tetapi juga ...  |  bukan ..., melainkan ...",
    heroConceptSubtitle:
      "Jangan pernah menggabungkan dua konjungsi semakna dalam satu kalimat (mis. 'Walaupun ..., tetapi ...' atau 'Karena ..., sehingga ...').",
    introParagraphs: [
      "Konjungsi (kata penghubung) adalah partikel yang menghubungkan kata dengan kata, frasa dengan frasa, klausa dengan klausa, atau kalimat dengan kalimat. Ketepatan memilih konjungsi menentukan apakah hubungan logika di dalam paragraf berjalan mulus atau justru kontradiktif.",
      "Dalam soal PBM, kesalahan konjungsi umumnya muncul dalam tiga bentuk: pemilihan konjungsi yang tidak sesuai hubungan makna (misalnya hubungan pertentangan diberi konjungsi sebab), penggunaan pasangan konjungsi korelatif yang keliru, serta penumpukan dua konjungsi dalam satu kalimat majemuk.",
    ],
    sections: [
      {
        heading: "1. Konjungsi Korelatif (Berpasangan Tetap)",
        body: "Konjungsi korelatif menghubungkan dua unsur kalimat yang setara dan memiliki pasangan tetap yang tidak boleh ditukar:",
        bullets: [
          "tidak hanya ..., tetapi juga ... (menambahkan informasi positif/setara).",
          "bukan ..., melainkan ... (mengoreksi/mempertentangkan nomina atau frasa).",
          "baik ... maupun ... (bukan 'baik ... ataupun ...').",
          "entah ... entah ... / jangankan ..., ... pun ...",
        ],
        exampleBox: {
          wrong: "Program ini tidak hanya memperluas akses buku, melainkan juga meningkatkan minat baca.",
          right: "Program ini tidak hanya memperluas akses buku, tetapi juga meningkatkan minat baca.",
          note: "Kata 'tidak' berpasangan dengan 'tetapi', sedangkan kata 'bukan' berpasangan dengan 'melainkan'.",
        },
      },
      {
        heading: "2. Pantangan Konjungsi Ganda & Konjungsi Antarkalimat",
        body: "Satu kalimat majemuk yang terdiri atas dua klausa hanya membutuhkan SATU konjungsi penghubung klausa:",
        bullets: [
          "SALAH: 'Walaupun hujan deras, tetapi ia tetap berangkat.' → BENAR: 'Walaupun hujan deras, ia tetap berangkat.'",
          "SALAH: 'Karena kurang teliti, sehingga jawabannya keliru.' → BENAR: 'Karena kurang teliti, jawabannya keliru.'",
          "Konjungsi antarkalimat (Oleh karena itu, Meskipun demikian, Namun, Selain itu, Sebaliknya) HANYA boleh berada di awal kalimat baru dan diikuti tanda koma.",
        ],
      },
    ],
    examTip:
      "Saat mengisi rumpang konjungsi, baca klausa sebelum dan sesudah titik-titik: jika tanda bernilai (+ vs −) pilih konjungsi pertentangan (padahal, sedangkan, namun); jika bernilai (alasan → hasil) pilih konjungsi kausalitas (karena, sehingga, oleh sebab itu).",
  },
  {
    id: "pbm-07",
    orderNumber: 7,
    topicKey: "07. Inti Kalimat (Subjek & Predikat Utama)",
    title: "Inti Kalimat (Subjek & Predikat Utama)",
    chapterTitle: "Sintaksis, Struktur, & Kalimat Efektif",
    summary:
      "Teknik cepat menemukan kerangka inti kalimat (S-P atau S-P-O) dengan mengeliminasi keterangan, perluasan yang/bahwa, dan aposisi.",
    heroConceptTitle: "Rumus Ekstraksi Inti Kalimat",
    heroConceptFormula: "Inti Kalimat = Subjek Inti + Predikat Inti (+ Objek Inti)",
    heroConceptSubtitle:
      "Coret semua Keterangan (di, pada, karena, meskipun), klausa perluasan ('yang ...'), dan aposisi di antara dua koma!",
    introParagraphs: [
      "Inti kalimat adalah satuan struktur terkecil yang mewakili gagasan utama sebuah kalimat panjang, yang sekurang-kurangnya terdiri atas Subjek (S) inti dan Predikat (P) inti, serta Objek (O) inti apabila predikatnya berupa kata kerja transitif aktif.",
      "Soal inti kalimat di UTBK-SNBT sengaja menyajikan kalimat sepanjang 3–4 baris yang dipenuhi anak kalimat perluasan ('yang...'), keterangan waktu/tempat/cara, dan rincian contoh. Kunci utamanya adalah memangkas seluruh hiasan kalimat tersebut hingga tersisa tulang punggung S–P(-O).",
    ],
    sections: [
      {
        heading: "1. Tiga Langkah Memangkas Kalimat Panjang",
        body: "Terapkan algoritma eliminasi tiga langkah berikut setiap kali bertemu soal Inti Kalimat:",
        bullets: [
          "Langkah 1 (Hapus Anak Kalimat & Keterangan): Coret bagian yang diawali kata depan/konjungsi seperti 'Meskipun...', 'Di tengah...', 'Menurut...', 'Berdasarkan...', 'Untuk...'.",
          "Langkah 2 (Hapus Perluasan 'yang'): Semua klausa yang diawali kata 'yang' hanyalah penjelas (atribut) bagi kata di depannya. Coret mulai dari kata 'yang' sampai batas sebelum predikat utama.",
          "Langkah 3 (Ubah Pasif ke Aktif bila Perlu): Jika kalimat asli berpola pasif ('Rencana itu disetujui oleh pemerintah') dan tidak ada di opsi, cari bentuk aktif setaranya ('Pemerintah menyetujui rencana itu').",
        ],
        exampleBox: {
          wrong: "Mengambil rincian di dalam anak kalimat 'Meskipun cuaca buruk...' sebagai inti kalimat.",
          right: "Meskipun cuaca sangat buruk sejak pagi hari, [para petani] [mulai menerapkan] [metode pertanian] ramah lingkungan → Inti: Para petani mulai menerapkan metode pertanian.",
          note: "Anak kalimat konsesif di awal langsung dicoret; ambil S (para petani) + P (mulai menerapkan) + O (metode pertanian).",
        },
      },
      {
        heading: "2. Kasus Khusus: Predikat Pasif di Awal ('Diperkirakan bahwa...')",
        body: "Jika kalimat diawali verba pasif seperti 'Diperkirakan bahwa X akan meningkat', maka klausa 'bahwa X akan meningkat' berfungsi sebagai subjek/isi perkiraan yang wajib dipertahankan dalam inti kalimat.",
      },
    ],
    examTip:
      "Jangan pernah memilih opsi jawaban Inti Kalimat yang masih memuat kata 'karena', 'meskipun', 'seperti', atau rincian contoh di dalam kurung!",
  },
  {
    id: "pbm-08",
    orderNumber: 8,
    topicKey: "08. Pola Kalimat (S-P-O-Pel-K) & Kesamaan Pola",
    title: "Pola Kalimat (S-P-O-Pel-K) & Kesamaan Pola",
    chapterTitle: "Sintaksis, Struktur, & Kalimat Efektif",
    summary:
      "Cara membedakan Subjek, Predikat, Objek, Pelengkap, dan Keterangan, serta strategi mencari kalimat dengan pola sintaksis yang identik.",
    heroConceptTitle: "Bedah S – P – O – Pel – K",
    heroConceptFormula: "Objek (bisa jadi S pasif)  ≠  Pelengkap (tidak bisa dipasifkan)",
    heroConceptSubtitle:
      "Keterangan bersifat fleksibel (bisa dipindah ke awal/akhir kalimat) dan umumnya diawali kata depan (di, ke, dari, pada, secara, dengan).",
    introParagraphs: [
      "Analisis pola kalimat (S-P-O-Pel-K) menuntut kemampuan mengenali jabatan setiap frasa di dalam kalimat. Soal tipe ini biasanya menanyakan fungsi suatu frasa, pola lengkap kalimat, atau meminta kamu memilih satu kalimat di antara opsi A–E yang memiliki pola persis sama dengan kalimat soal.",
      "Tantangan terbesar peserta SNBT adalah membedakan antara Objek (O), Pelengkap (Pel), dan Keterangan (K) karena ketiganya sering berada di sebelah kanan Predikat.",
    ],
    sections: [
      {
        heading: "1. Cara Cepat Membedakan S, P, O, Pel, dan K",
        body: "Gunakan ciri penguji sintaksis berikut untuk menentukan jabatan unsur kalimat secara akurat:",
        bullets: [
          "Subjek (S): Jawaban atas 'Siapa/Apa yang P?'. Berupa nomina/frasa nominal dan TIDAK diawali preposisi (di, pada, bagi, dalam).",
          "Predikat (P): Inti tindakan/keadaan. Umumnya berupa verba (meN-, ber-, di-, ter-) atau kopula (adalah, merupakan, ialah).",
          "Objek (O): Muncul langsung setelah verba aktif transitif (meN-) tanpa preposisi, dan DAPAT menjadi Subjek ketika kalimat diubah menjadi pasif (di-).",
          "Pelengkap (Pel): Muncul setelah verba intransitif (ber-, ter-, menjadi, merupakan) atau setelah Objek, dan TIDAK DAPAT menjadi Subjek kalimat pasif.",
          "Keterangan (K): Diawali preposisi (di, ke, dari, pada, dalam, untuk, karena, dengan, berdasarkan) dan posisinya dapat dipindah ke depan Subjek.",
        ],
        exampleBox: {
          wrong: "Kemampuan literasi digital (S) merupakan (P) keterampilan penting (Objek).",
          right: "Kemampuan literasi digital (S) merupakan (P) keterampilan penting (Pelengkap).",
          note: "Setelah kata 'merupakan', 'adalah', atau 'menjadi', unsur yang mengikutinya selalu berfungsi sebagai Pelengkap (Pel), bukan Objek!",
        },
      },
      {
        heading: "2. Strategi Menjawab Soal 'Kesamaan Pola Kalimat'",
        body: "Ketika mencari kalimat yang sepola (mis. S–P–O–K), cek terlebih dahulu posisi Keterangan (apakah di awal K–S–P atau di akhir S–P–K) dan jenis Predikatnya (apakah transitif berobjek S–P–O atau berpelengkap S–P–Pel) untuk langsung mengeliminasi 3–4 opsi.",
      },
    ],
    examTip:
      "Jika frasa diawali kata depan (di, pada, dalam, untuk, dengan, melalui, berdasarkan), jabatan sintaksisnya 99% adalah Keterangan (K)!",
  },
  {
    id: "pbm-09",
    orderNumber: 9,
    topicKey: "09. Kalimat Efektif & Penyuntingan",
    title: "Kalimat Efektif & Penyuntingan",
    chapterTitle: "Sintaksis, Struktur, & Kalimat Efektif",
    summary:
      "Enam syarat kalimat efektif: kelengkapan S-P, kehematan kata (anti-pleonasme), kesejajaran bentuk (paralelisme), ketepatan nalar, dan kejelasan rujukan.",
    heroConceptTitle: "6 Syarat Kalimat Efektif",
    heroConceptFormula: "S-P Jelas + Hemat Kata + Paralel + Logis + Baku",
    heroConceptSubtitle:
      "Hindari preposisi di depan Subjek ('Bagi peserta...', 'Dalam penelitian ini membahas...') dan penanda jamak ganda ('banyak para...').",
    introParagraphs: [
      "Kalimat efektif adalah kalimat yang mampu menyampaikan gagasan penulis secara tepat, jelas, hemat, dan tidak menimbulkan tafsir ganda bagi pembaca. Dalam subtes PBM, kalimat tidak efektif merupakan salah satu materi dengan porsi soal terbanyak.",
      "Mayoritas ketidakefektifan kalimat pada soal UTBK bukan disebabkan oleh kalimat yang terlalu panjang, melainkan oleh cacat struktur tersembunyi: hilangnya Subjek akibat kata depan di awal kalimat, pemborosan kata bersinonim (pleonasme), atau ketidaksejajaran imbuhan pada perincian.",
    ],
    sections: [
      {
        heading: "1. Tiga Jebakan Utama Kalimat Tidak Efektif",
        body: "Periksa tiga titik rawan ini setiap kali diminta mencari atau memperbaiki kalimat tidak efektif:",
        bullets: [
          "Subjek Hilang karena Preposisi: 'Dalam rapat itu membahas anggaran' atau 'Bagi seluruh peserta diharapkan hadir'. Perbaikan: hapus kata 'Dalam'/'Bagi' ATAU ubah predikatnya menjadi pasif ('Dalam rapat itu dibahas anggaran').",
          "Pemborosan Kata & Jamak Ganda (Pleonasme): Hindari 'banyak para pengguna', 'sejumlah faktor-faktor', 'saling bantu-membantu', 'agar supaya', 'adalah merupakan', 'demi untuk'.",
          "Ketidaksejajaran (Non-Paralel): Jika unsur perincian pertama memakai verba 'meN-', unsur berikutnya juga harus memakai 'meN-' (mis. 'mengumpulkan, mengolah, dan menyajikan data', bukan 'pengumpulan, mengolah, dan disajikan').",
        ],
        exampleBox: {
          wrong: "Dari hasil penelitian sejumlah lembaga menunjukkan bahwa banyak para pengguna internet belum teredukasi.",
          right: "Hasil penelitian sejumlah lembaga menunjukkan bahwa banyak pengguna internet belum teredukasi.",
          note: "Hapus 'Dari' agar Subjek 'Hasil penelitian...' jelas, dan hapus kata 'para' setelah 'banyak' agar tidak terjadi jamak ganda.",
        },
      },
      {
        heading: "2. Kelogisan Makna Kalimat",
        body: "Pastikan pelaku tindakan logis secara nalar. Misalnya: 'Waktu dan tempat kami persilakan' (tidak logis karena yang dipersilakan adalah pembicara/Bapak/Ibu, bukan waktu dan tempat).",
      },
    ],
    examTip:
      "Jika kalimat diawali kata 'Dalam...', 'Pada...', 'Dari...', 'Bagi...', atau 'Menurut...' lalu langsung diikuti kata kerja aktif 'meN-' (menunjukkan, membahas, menjelaskan) tanpa koma, kalimat tersebut PASTI tidak bersubjek!",
  },
  {
    id: "pbm-10",
    orderNumber: 10,
    topicKey: "10. Hubungan Kata (Analogi Kontekstual)",
    title: "Hubungan Kata (Analogi Kontekstual)",
    chapterTitle: "Semantik, Wacana, & Gagasan Utama",
    summary:
      "Menentukan kesepadanan relasi makna antar-pasangan kata (alat-fungsi, sebab-akibat, bagian-keseluruhan, wadah-isi, konsep-prinsip) dalam konteks kalimat.",
    heroConceptTitle: "Metode Kalimat Jembatan Analogi",
    heroConceptFormula: "[Kata A] memiliki relasi spesifik [...] terhadap [Kata B]",
    heroConceptSubtitle:
      "Susun kalimat penghubung yang spesifik dan perhatikan urutan arah relasinya (kiri ke kanan jangan terbalik!).",
    introParagraphs: [
      "Soal Hubungan Kata (Analogi Kontekstual) menguji kemampuan penalaran semantik: bagaimana kamu memetakan jenis relasi logis antara dua konsep di dalam kalimat stimulus, lalu menerapkan pola relasi yang persis sama pada pasangan konsep kedua.",
      "Kesalahan paling umum adalah memilih opsi hanya karena bidang temanya mirip dengan kata di soal. Padahal, yang dicari dalam analogi bukanlah kemiripan topik, melainkan kesetaraan hubungan fungsional dan urutan kelas katanya.",
    ],
    sections: [
      {
        heading: "1. Pola Relasi Analogi yang Paling Sering Muncul",
        body: "Kenali tipe-tipe hubungan logis standar berikut untuk mempercepat pembuatan kalimat jembatan:",
        bullets: [
          "Wadah / Sumber dan Isinya: Ensiklopedia menyimpan pengetahuan ↔ Arsip menyimpan dokumen.",
          "Alat Ukur dan Besaran yang Diukur: Termometer mengukur suhu ↔ Higrometer mengukur kelembapan udara.",
          "Tindakan Pencegahan dan Risiko yang Dicegah: Konservasi energi bertujuan mengurangi pemborosan energi.",
          "Bagian dan Keseluruhan (Meronimi): Bab adalah bagian dari buku ↔ Adegan adalah bagian dari drama.",
          "Sebab dan Akibat / Gejala dan Penanganan: Infeksi diatasi dengan antibiotik ↔ Dehidrasi diatasi dengan rehidrasi cairan.",
        ],
        exampleBox: {
          wrong: "Memilih 'Arsip : Perpustakaan' untuk analogi 'Ensiklopedia : Pengetahuan'.",
          right: "Ensiklopedia : Pengetahuan = Arsip : Dokumen (keduanya berelasi 'tempat penyimpanan : informasi/bahan yang disimpan di dalamnya').",
          note: "Perpustakaan adalah gedung fisik, sedangkan isi yang disimpan di dalam arsip adalah dokumen.",
        },
      },
      {
        heading: "2. Jaga Urutan Arah dan Kelas Kata",
        body: "Jika pasangan pertama berpola [Kata Benda Alat : Kata Benda Hasil], maka pasangan kedua juga harus berpola [Kata Benda Alat : Kata Benda Hasil], tidak boleh terbalik menjadi [Hasil : Alat].",
      },
    ],
    examTip:
      "Buat satu kalimat pendek yang menghubungkan Kata 1 dan Kata 2 (mis. 'A berfungsi untuk mengukur B'). Jika ada dua opsi yang cocok, persempit kalimat jembatannya dengan menyertakan sifat fisik/abstraknya!",
  },
  {
    id: "pbm-11",
    orderNumber: 11,
    topicKey: "11. Tema, Topik, dan Judul Bacaan",
    title: "Tema, Topik, dan Judul Bacaan",
    chapterTitle: "Semantik, Wacana, & Gagasan Utama",
    summary:
      "Membedakan cakupan Tema (umum), Topik (fokus spesifik), dan Judul (frasa ringkas + kaidah huruf kapital EYD V), serta memprediksi paragraf lanjutan.",
    heroConceptTitle: "Piramida Cakupan Wacana",
    heroConceptFormula: "Tema (Payung Umum)  ›  Topik (Fokus Bahasan)  ›  Judul (Nama Spesifik)",
    heroConceptSubtitle:
      "Judul yang baik berbentuk frasa (bukan kalimat lengkap), mewakili seluruh paragraf, dan mematuhi kapitalisasi EYD V.",
    introParagraphs: [
      "Dalam analisis wacana PBM, Tema, Topik, dan Judul sering dianggap sama, padahal ketiganya memiliki tingkat kekhususan yang berbeda. Tema adalah gagasan dasar yang paling umum (mis. 'Teknologi dan Pendidikan'), Topik adalah pokok pembicaraan yang lebih terfokus (mis. 'Pemanfaatan AI dan Sikap Kritis Siswa'), sedangkan Judul adalah kepala karangan spesifik yang mewakili keseluruhan isi bacaan.",
      "Selain menanyakan isi judul, PBM juga sering menguji penulisan huruf kapital pada judul sesuai EYD V serta kemampuan memprediksi topik paragraf berikutnya berdasarkan kalimat penutup paragraf terakhir.",
    ],
    sections: [
      {
        heading: "1. Syarat Judul yang Tepat & Kaidah Kapitalisasi Judul (EYD V)",
        body: "Saat memilih judul bacaan atau mengecek ejaan judul, pastikan dua syarat ini terpenuhi:",
        bullets: [
          "Cakupan Isi: Judul harus memayungi paragraf awal hingga akhir. Hindari opsi judul yang hanya menyebutkan contoh di satu paragraf (terlalu sempit) atau keluar dari bahasan teks (terlalu luas).",
          "Aturan Huruf Kapital Judul: Huruf pertama setiap kata dalam judul ditulis kapital, KECUALI kata tugas (kata depan & kata hubung) seperti: di, ke, dari, pada, dalam, untuk, bagi, terhadap, sebagai, tentang, dengan, dan, atau, tetapi, yang—asalkan kata tugas tersebut TIDAK terletak di awal judul.",
        ],
        exampleBox: {
          wrong: "Strategi Belajar Efektif Untuk Meraih PTN Impian Di Era Digital",
          right: "Strategi Belajar Efektif untuk Meraih PTN Impian di Era Digital",
          note: "Kata tugas 'untuk' dan 'di' yang berada di tengah judul wajib ditulis dengan huruf kecil semua.",
        },
      },
      {
        heading: "2. Memprediksi Topik Paragraf Selanjutnya",
        body: "Untuk menjawab soal 'Apabila penulis menambahkan satu paragraf lanjutan...', fokuslah pada KALIMAT TERAKHIR paragraf penutup. Paragraf baru harus menjadi kelanjutan logis dari kalimat terakhir tersebut (misalnya jika kalimat terakhir menyebut perlunya kebijakan perbaikan, maka paragraf berikutnya membahas contoh/langkah kebijakan tersebut).",
      },
    ],
    examTip:
      "Jangan memilih judul hanya karena mengandung kata yang sering diulang di paragraf pertama; cek apakah kata kunci di paragraf terakhir juga sudah terwakili oleh judul tersebut!",
  },
  {
    id: "pbm-12",
    orderNumber: 12,
    topicKey: "12. Gagasan Pokok, Ide Utama, & Pikiran Utama",
    title: "Gagasan Pokok, Ide Utama, & Pikiran Utama",
    chapterTitle: "Semantik, Wacana, & Gagasan Utama",
    summary:
      "Menemukan gagasan pokok/ide utama paragraf dan pikiran utama kalimat dengan membedakan kalimat utama dari kalimat penjelas.",
    heroConceptTitle: "Rumus Cepat Gagasan Pokok",
    heroConceptFormula: "Gagasan Pokok = Inti dari Kalimat Utama (Awal / Akhir / Awal+Akhir)",
    heroConceptSubtitle:
      "Gagasan pokok bukan sekadar pernyataan yang benar menurut teks, melainkan pernyataan payung yang dijelaskan oleh kalimat-kalimat lainnya.",
    introParagraphs: [
      "Gagasan pokok, ide utama, pikiran utama, dan pokok pikiran adalah empat istilah yang merujuk pada konsep yang sama: inti persoalan yang mendasari pengembangan sebuah paragraf. Setiap paragraf yang baik hanya memiliki satu gagasan pokok yang dituangkan di dalam kalimat utama.",
      "Mengapa banyak peserta terkecoh pada soal gagasan pokok? Karena pembuat soal sering meletakkan pernyataan fakta yang 100% benar menurut bacaan di opsi pengecoh, padahal pernyataan tersebut hanyalah kalimat penjelas (contoh, data angka, atau rincian kasus), bukan gagasan payungnya.",
    ],
    sections: [
      {
        heading: "1. Cara Menemukan Kalimat Utama dalam 15 Detik",
        body: "Jangan membaca berulang-ulang seluruh paragraf. Periksa hubungan antara Kalimat (1), Kalimat (2), dan Kalimat Terakhir:",
        bullets: [
          "Cek Kalimat (2): Jika Kalimat (2) memiliki kata rujukan ('Hal ini...', 'Kondisi tersebut...', 'Upaya itu...') atau langsung merinci contoh/data dari Kalimat (1), maka Kalimat (1) PASTI adalah Kalimat Utama (Paragraf Deduktif).",
          "Cek Kalimat Terakhir: Jika kalimat terakhir diawali simpulan ('Oleh karena itu,', 'Dengan demikian,', 'Jadi,'), periksa apakah ia menyimpulkan rincian sebelumnya (Induktif) atau menegaskan ulang Kalimat (1) (Campuran).",
          "Hati-hati pola Kontras di Kalimat (2): Jika Kalimat (1) hanya pengantar umum lalu Kalimat (2) diawali 'Namun,' atau 'Akan tetapi,' yang diikuti penjelasan di kalimat (3)–(5), maka inti bahasan berpusat pada gagasan setelah kata 'Namun' tersebut.",
        ],
        exampleBox: {
          wrong: "Memilih opsi yang memuat angka statistik spesifik atau nama lokasi contoh sebagai gagasan pokok.",
          right: "Merangkum subjek dan predikat dari kalimat utama menjadi satu pernyataan umum yang mencakup seluruh kalimat penjelas.",
          note: "Kalimat yang berisi angka statistik hampir selalu berfungsi sebagai kalimat penjelas/bukti.",
        },
      },
      {
        heading: "2. Empat Ciri Opsi Pengecoh Gagasan Pokok",
        body: "Eliminasi opsi jawaban yang memiliki salah satu dari empat ciri berikut: (1) Terlalu sempit (hanya mengutip 1 kalimat penjelas), (2) Terlalu luas (melampaui isi paragraf), (3) Bertentangan dengan teks, atau (4) Menggunakan kata mutlak yang tidak ada di bacaan.",
      },
    ],
    examTip:
      "Tanyakan pada dirimu: 'Apakah kalimat-kalimat lain di paragraf ini sedang menjelaskan opsi ini?' Jika ya, itulah Gagasan Pokok yang benar!",
  },
];

// Generator untuk membuat SubMaterialLesson terstruktur bagi LBI dan LBE
function createLesson(
  subtest: SnbtSubtestCode,
  orderNumber: number,
  topicKey: string,
  chapterTitle: string,
  heroFormula: string,
  summary: string,
  intro1: string,
  intro2: string,
  sec1Heading: string,
  sec1Body: string,
  sec1Bullets: ReadonlyArray<string>,
  sec2Heading: string,
  sec2Body: string,
  sec2Bullets: ReadonlyArray<string>,
  examTip: string,
): SubMaterialLesson {
  const cleanTitle = topicKey.replace(/^\d+\.\s*/, "");
  return {
    id: `${subtest.toLowerCase()}-${String(orderNumber).padStart(2, "0")}`,
    orderNumber,
    topicKey,
    title: cleanTitle,
    chapterTitle,
    summary,
    heroConceptTitle: `Konsep Inti ${subtest} — ${cleanTitle}`,
    heroConceptFormula: heroFormula,
    heroConceptSubtitle: summary,
    introParagraphs: [intro1, intro2],
    sections: [
      {
        heading: sec1Heading,
        body: sec1Body,
        bullets: sec1Bullets,
      },
      {
        heading: sec2Heading,
        body: sec2Body,
        bullets: sec2Bullets,
      },
    ],
    examTip,
  };
}

const LBI_LESSONS: ReadonlyArray<SubMaterialLesson> = [
  createLesson(
    "LBI",
    1,
    "01. Kompilasi Pemahaman Bacaan",
    "Gagasan Utama & Struktur Paragraf",
    "Ide Pokok + Fakta Tersurat/Tersirat + Simpulan + Makna Kontekstual",
    "Latihan terpadu membaca wacana panjang Saintek & Soshum untuk memetakan ide pokok, fakta, dan simpulan.",
    "Literasi dalam Bahasa Indonesia (LBI) menguji kemampuan memahami, menggunakan, mengevaluasi, dan merefleksikan berbagai jenis teks untuk menyelesaikan masalah. Wacana LBI di SNBT mencakup tema Saintek (biologi, kesehatan, lingkungan, teknologi) dan Soshum (ekonomi, sosial, budaya, sejarah).",
    "Pada sub-materi kompilasi ini, kamu akan berlatih menghadapi lima tipe pertanyaan utama yang selalu muncul dalam satu wacana: gagasan utama, informasi tersurat, informasi tersirat, simpulan logis, dan makna istilah dalam konteks kalimat.",
    "1. Strategi Membaca Aktif (Question-First Reading)",
    "Hindari membaca wacana panjang dari awal sampai akhir tanpa tujuan. Gunakan langkah berikut:",
    [
      "Baca kalimat pertanyaan terlebih dahulu untuk mengidentifikasi kata kunci (keyword) yang dicari.",
      "Lakukan skimming (membaca cepat kalimat awal/akhir paragraf) untuk soal ide pokok dan simpulan.",
      "Lakukan scanning (memindai kata kunci/angka/nama) untuk soal fakta tersurat dan pernyataan sesuai teks.",
    ],
    "2. Menafsirkan Makna Istilah Kontekstual",
    "Ketika ditanya makna istilah ilmiah atau ungkapan (seperti 'gaya hidup sedenter' atau 'ekonomi sirkular'), perhatikan kalimat penjelas tepat sebelum dan sesudah istilah tersebut muncul di dalam paragraf.",
    [
      "Cari petunjuk definisi langsung ('yaitu', 'yakni', 'merupakan') atau petunjuk sebab-akibat di sekitarnya.",
      "Uji opsi jawaban dengan menggantikannya ke dalam kalimat asli.",
    ],
    "Jangan menjawab berdasarkan opini pribadi di luar teks; setiap jawaban LBI yang benar selalu memiliki bukti kalimat di dalam bacaan.",
  ),
  createLesson(
    "LBI",
    2,
    "02. Paragraf Deduktif, Induktif, & Campuran",
    "Gagasan Utama & Struktur Paragraf",
    "Deduktif (Awal) | Induktif (Akhir) | Campuran (Awal & Akhir)",
    "Mengenali letak kalimat utama dan pola pengembangan paragraf umum-khusus maupun khusus-umum.",
    "Setiap paragraf eksposisi atau argumentasi dikembangkan berdasarkan satu kalimat utama yang didukung oleh beberapa kalimat penjelas. Letak kalimat utama menentukan jenis pola pengembangan paragraf tersebut.",
    "Di UTBK-SNBT, pengenalan jenis paragraf membantu kamu menemukan ide pokok tiga kali lebih cepat tanpa harus terjebak pada rincian contoh atau data statistik.",
    "1. Tiga Pola Utama Letak Kalimat Utama",
    "Bedakan ketiga pola berikut berdasarkan posisi pernyataan paling umum:",
    [
      "Paragraf Deduktif (Umum → Khusus): Kalimat utama berada di awal paragraf, diikuti kalimat penjelas berupa rincian, bukti, atau contoh.",
      "Paragraf Induktif (Khusus → Umum): Diawali uraian fakta/peristiwa khusus dan ditutup dengan kalimat simpulan di akhir paragraf (sering ditandai 'Oleh karena itu,', 'Dengan demikian,').",
      "Paragraf Campuran (Deduktif-Induktif): Kalimat utama dinyatakan di awal paragraf lalu ditegaskan kembali dengan redaksi berbeda pada kalimat terakhir.",
    ],
    "2. Ciri Kalimat Penjelas",
    "Kalimat penjelas tidak dapat berdiri sendiri dan biasanya memuat:",
    [
      "Kata rujukan ('ini', 'itu', 'tersebut') yang mengacu pada kalimat pertama.",
      "Data angka, persentase, tahun, nama lembaga, atau rincian contoh ('seperti', 'antara lain').",
    ],
    "Jika kalimat kedua diawali kata rujukan 'Hal tersebut...' atau 'Kondisi ini...', maka kalimat pertama hampir pasti adalah kalimat utamanya (Deduktif).",
  ),
  createLesson(
    "LBI",
    3,
    "03. Hubungan Antarparagraf (Bagian 1)",
    "Gagasan Utama & Struktur Paragraf",
    "Sebab-Akibat | Masalah-Solusi | Pertentangan | Perincian",
    "Menganalisis koherensi logis antara satu paragraf dan paragraf berikutnya dalam wacana multi-paragraf.",
    "Dalam teks panjang yang terdiri atas 3–5 paragraf, setiap paragraf memiliki peran struktural terhadap paragraf lainnya. Soal hubungan antarparagraf menguji bagaimana gagasan di Paragraf A dilanjutkan, diperinci, dipertentangkan, atau diberi solusi di Paragraf B.",
    "Untuk menjawabnya secara cepat, kamu cukup membandingkan gagasan utama Paragraf pertama dan gagasan utama Paragraf kedua (atau membaca kalimat terakhir paragraf sebelumnya dan kalimat pertama paragraf sesudahnya).",
    "1. Pola Hubungan Antarparagraf yang Sering Diujikan",
    "Kenali empat relasi utama antarparagraf berikut:",
    [
      "Masalah – Solusi: Paragraf sebelumnya memaparkan ancaman/kendala, sedangkan paragraf berikutnya menyajikan langkah penanganan atau inovasi.",
      "Sebab – Akibat: Paragraf pertama menguraikan pemicu fenomena, lalu paragraf kedua menjabarkan dampak yang ditimbulkan.",
      "Umum – Khusus (Perincian): Paragraf pertama memperkenalkan konsep besar, lalu paragraf kedua merinci tahapan atau contoh kasusnya.",
      "Pertentangan / Kontras: Paragraf kedua diawali penanda kontras ('Namun,', 'Di sisi lain,') yang meninjau sudut pandang berbeda dari paragraf pertama.",
    ],
    "2. Menentukan Fungsi Kalimat di Dalam Paragraf",
    "Selain antarparagraf, cermati pula bagaimana kalimat ketiga atau terakhir di dalam satu paragraf merangkum dampak atau menyimpulkan rincian pada kalimat sebelumnya.",
    [
      "Perhatikan kata penghubung antarkalimat sebagai kompas penunjuk relasi.",
    ],
    "Rumus cepat: baca kalimat pertama dari kedua paragraf yang ditanyakan, lalu hubungkan keduanya dengan kata 'karena', 'sehingga', 'namun', atau 'contohnya'.",
  ),
  createLesson(
    "LBI",
    4,
    "04. Hubungan Antarparagraf & Prediksi (Bagian 2)",
    "Gagasan Utama & Struktur Paragraf",
    "Kalimat Akhir Paragraf N  →  Topik Paragraf N+1",
    "Memprediksi gagasan paragraf selanjutnya dan mengevaluasi kesinambungan alur argumen penulis.",
    "Bagian kedua dari materi hubungan antarparagraf ini berfokus pada keterampilan memprediksi arah pengembangan wacana (paragraph prediction) serta mengidentifikasi jembatan transisi antar-bagian teks.",
    "Ketika penulis menutup paragraf terakhir dengan sebuah isu baru, rekomendasi kebijakan, atau pertanyaan terbuka, paragraf selanjutnya secara logis harus mengupas tuntas isu penutup tersebut.",
    "1. Teknik Memprediksi Paragraf Berikutnya",
    "Gunakan aturan 'Ekor ke Kepala' (Tail-to-Head Transition):",
    [
      "Baca dengan cermat 1–2 kalimat terakhir pada paragraf paling akhir.",
      "Identifikasi subjek atau rekomendasi baru yang baru saja disinggung tetapi belum sempat dijelaskan rinciannya.",
      "Pilih opsi jawaban yang membahas rincian/mekanisme dari gagasan kalimat terakhir tersebut.",
    ],
    "2. Menghindari Opsi Pengecoh Prediksi",
    "Eliminasi opsi yang:",
    [
      "Mengulang topik yang sudah selesai dibahas di paragraf 1 atau 2.",
      "Melompat ke topik yang sama sekali tidak memiliki kaitan dengan kalimat penutup.",
    ],
    "Kalimat terakhir paragraf penutup adalah kunci 100% untuk menjawab soal prediksi paragraf berikutnya!",
  ),
  createLesson(
    "LBI",
    5,
    "05. Kesimpulan & Ringkasan Logis",
    "Simpulan, Ringkasan, & Jenis Teks",
    "Ringkasan = Ide Pokok P1 + P2 + P3  |  Simpulan = Sintesis Logis",
    "Membedakan cara menyusun ringkasan (rangkuman berurutan) dan kesimpulan (sintesis akhir) dari teks.",
    "Meskipun sering dianggap serupa, Kesimpulan (Simpulan) dan Ringkasan (Rangkuman) memiliki perbedaan mendasar. Ringkasan adalah penyajian singkat yang menggabungkan gagasan utama tiap paragraf secara berurutan, sedangkan Kesimpulan adalah pendapat akhir yang ditarik secara logis dari hubungan fakta-fakta di dalam teks.",
    "Dalam UTBK-SNBT, soal simpulan menuntut kamu memilih pernyataan yang merangkul benang merah keseluruhan bacaan tanpa menambahkan klaim di luar teks.",
    "1. Syarat Simpulan yang Sah",
    "Pastikan simpulan yang kamu pilih memenuhi kriteria berikut:",
    [
      "Mencakup seluruh premis utama bacaan, bukan hanya menyalin satu kalimat dari paragraf pertama.",
      "Tidak menggunakan kata mutlak ('selalu', 'pasti semua', 'satu-satunya') jika teks hanya menyebutkan kecenderungan.",
      "Menunjukkan hubungan sebab-akibat atau solusi terpadu yang didukung oleh data di dalam teks.",
    ],
    "2. Cara Menyusun Ringkasan Wacana",
    "Untuk soal ringkasan:",
    [
      "Ambil ide pokok Paragraf 1 + ide pokok Paragraf 2 + ide pokok Paragraf 3.",
      "Pilih opsi yang memuat seluruh ide pokok tersebut secara proporsional dan berurutan.",
    ],
    "Jika sebuah opsi simpulan hanya membahas isi Paragraf 1 dan mengabaikan Paragraf 2–3, opsi tersebut terlalu sempit!",
  ),
  createLesson(
    "LBI",
    6,
    "06. Simpulan Tersirat & Rangkuman Wacana",
    "Simpulan, Ringkasan, & Jenis Teks",
    "Premis Teks A + Premis Teks B  →  Simpulan Tersirat (Inferensi)",
    "Menarik inferensi logis dari informasi yang tidak tertulis secara harfiah namun pasti benar menurut bacaan.",
    "Simpulan tersirat (inferensi) mengharuskan pembaca menghubungkan dua atau lebih fakta di dalam teks untuk menghasilkan satu pemahaman baru yang logis. Informasi ini tidak ditulis kata demi kata secara eksplisit, tetapi merupakan konsekuensi langsung dari pernyataan penulis.",
    "Latihan pada bagian kedua ini mempertajam kemampuan kamu membedakan inferensi yang sah dari asumsi liar (over-inference).",
    "1. Membedakan Inferensi Sah vs Asumsi Berlebihan",
    "Perhatikan batas bukti tekstual:",
    [
      "Inferensi Sah: Jika teks menyebut 'mekanisme cap-and-trade memperbolehkan perusahaan membeli sisa kuota karbon', maka dapat disimpulkan bahwa kuota emisi dapat diperdagangkan antarperusahaan.",
      "Asumsi Berlebihan: Menyimpulkan bahwa suatu negara 'diwajibkan' menjual kredit karbon padahal teks hanya menyebut 'berpeluang memperoleh pendanaan'.",
    ],
    "2. Mengecek Konsistensi Sebab-Akibat",
    "Periksa apakah arah hubungan sebab-akibat pada opsi jawaban tidak dibalik oleh pembuat soal.",
    [
      "Hati-hati terhadap opsi yang membalik pelaku atau membalik syarat kondisi.",
    ],
    "Waspadai kata sifat pembanding ('lebih efektif daripada', 'paling buruk'): jangan dipilih jika teks tidak pernah membandingkan kedua hal tersebut!",
  ),
  createLesson(
    "LBI",
    7,
    "07. Jenis-Jenis Teks & Karakteristik Paragraf",
    "Simpulan, Ringkasan, & Jenis Teks",
    "Eksposisi | Argumentasi | Deskripsi | Narasi | Persuasi",
    "Mengenali tujuan penulisan, nada penulis, gaya bahasa (majas), serta karakteristik struktur berbagai jenis teks.",
    "Setiap teks ditulis dengan tujuan komunikasi tertentu. Mengenali jenis teks (eksposisi, argumentasi, narasi, deskripsi, atau persuasi) serta gaya bahasa yang digunakan penulis membantu kamu memahami sikap penulis terhadap topik yang dibahas.",
    "Selain teks ilmiah populer, LBI SNBT juga menyajikan cuplikan teks sastra atau esai reflektif yang menanyakan fungsi majas (metafora, personifikasi, simile, hiperbola, ironi) dan suasana bacaan.",
    "1. Karakteristik Lima Jenis Teks Utama",
    "Bedakan ciri dominan tiap jenis teks berikut:",
    [
      "Eksposisi: Memaparkan informasi/pengetahuan secara objektif dan netral untuk menambah wawasan pembaca.",
      "Argumentasi: Membuktikan suatu pendapat/klaim dengan dukungan data, fakta, dan alasan logis.",
      "Persuasi: Mengajak atau membujuk pembaca melakukan sesuatu (mengandung kata ajakan/rekomendasi).",
      "Deskripsi & Narasi: Melukiskan objek secara indrawi (deskripsi) atau mengisahkan rangkaian peristiwa berurutan waktu (narasi).",
    ],
    "2. Gaya Bahasa (Majas) dalam Teks LBI",
    "Kenali majas yang sering muncul di soal:",
    [
      "Simile (Perumpamaan): Membandingkan secara eksplisit dengan kata 'seperti', 'ibarat', 'bagaikan', 'laksana'.",
      "Metafora & Personifikasi: Perbandingan langsung tanpa kata pembanding (metafora) atau melekatkan sifat manusia pada benda mati (personifikasi).",
    ],
    "Untuk soal sikap/nada penulis, jika teks menyajikan data ilmiah dan solusi tanpa emosi berlebih, pilih 'objektif, informatif, atau konstruktif'.",
  ),
  createLesson(
    "LBI",
    8,
    "08. Pernyataan Eksplisit (Informasi Tersurat)",
    "Evaluasi Informasi & 5W+1H",
    "Scanning Kata Kunci  →  Verifikasi Kalimat Teks (Parafrase Tepat)",
    "Menemukan fakta tersurat secara presisi pada wacana Saintek dan Soshum melalui teknik pemindaian kata kunci.",
    "Soal pernyataan eksplisit (informasi tersurat) menanyakan fakta yang tertulis langsung di dalam bacaan. Meskipun terlihat mudah, opsi jawaban yang benar jarang menyalin kalimat teks secara mentah, melainkan menggunakan parafrase (pengungkapan ulang dengan sinonim).",
    "Sebaliknya, opsi pengecoh justru sering menggunakan kata-kata yang persis sama dengan teks, tetapi diselipi kata negasi ('tidak', 'tanpa') atau diubah keterangan jumlah/waktunya.",
    "1. Teknik Scanning Cepat 3 Langkah",
    "Temukan letak informasi tersurat dalam waktu kurang dari 30 detik:",
    [
      "Tandai kata benda khusus, istilah teknis, nama tempat, atau angka pada pertanyaan.",
      "Pindai (scan) paragraf yang memuat kata kunci tersebut.",
      "Baca satu kalimat utuh tempat kata kunci berada, lalu cocokkan maknanya dengan kelima opsi.",
    ],
    "2. Mengenali Parafrase yang Akurat",
    "Opsi yang benar menyampaikan makna yang 100% setara:",
    [
      "Misalnya teks menulis 'ketergantungan pada mobil pribadi yang membuat warga minim bergerak', diparafrasekan menjadi 'minim aktivitas fisik akibat ketergantungan pada kendaraan bermotor'.",
    ],
    "Jangan terburu-buru memilih opsi yang kata-katanya paling mirip teks sebelum memeriksa apakah predikat dan keterangannya sesuai!",
  ),
  createLesson(
    "LBI",
    9,
    "09. Pernyataan Sesuai & Tidak Sesuai Teks (Bagian 1)",
    "Evaluasi Informasi & 5W+1H",
    "Verifikasi silang 5 Opsi terhadap Fakta Paragraf 1–4",
    "Menguji kebenaran pernyataan terhadap teks tunggal maupun teks berpasangan (Teks B1 & Teks B2).",
    "Tipe soal 'Manakah pernyataan yang SESUAI / TIDAK SESUAI dengan bacaan?' menuntut ketelitian tinggi karena kamu harus memverifikasi lima klaim sekaligus terhadap isi teks. Di SNBT terbaru, tipe ini juga sering menggunakan dua teks pendek (Teks B1 dan Teks B2) yang membahas tema serupa dari sudut pandang atau kasus berbeda.",
    "Kunci mengerjakan soal ini adalah memprioritaskan pengecekan opsi yang memiliki penanda lokasi paling jelas (nama tokoh, angka persentase, atau istilah unik).",
    "1. Strategi Eliminasi Cepat",
    "Jangan mengecek secara acak. Gunakan urutan ini:",
    [
      "Cari opsi yang memuat angka, persentase, atau nama tokoh (mis. Pak Darmo vs Bu Ratna, atau CRISPR vs Sel Punca) karena paling mudah ditemukan di teks.",
      "Waspadai jebakan 'Tukar Atribut': sifat milik objek A di teks sengaja dilekatkan pada objek B di opsi jawaban.",
      "Perhatikan kata 'KECUALI' atau 'TIDAK SESUAI' pada batang soal agar tidak salah memilih.",
    ],
    "2. Menghadapi Teks Berpasangan (Teks B1 & B2)",
    "Saat membaca dua teks:",
    [
      "Pastikan klaim yang menggabungkan Teks B1 dan B2 benar-benar sesuai untuk masing-masing teks, tidak terbalik.",
    ],
    "Hati-hati dengan jebakan angka: 'mereduksi hingga 60%' tidak sama dengan 'menyisakan 60%'!",
  ),
  createLesson(
    "LBI",
    10,
    "10. Pernyataan Sesuai & Tidak Sesuai Teks (Bagian 2)",
    "Evaluasi Informasi & 5W+1H",
    "Literasi Sains & Sosial Terpadu — Analisis Klaim Presisi",
    "Pendalaman evaluasi kebenaran klaim pada teks ilmiah Saintek dan Soshum setara UTBK-SNBT.",
    "Pada bagian kedua ini, kamu akan berlatih dengan teks-teks berlevel sedikit lebih padat yang menggabungkan mekanisme ilmiah (seperti cara kerja vaksin, fotosintesis, atau geologi) dan kebijakan sosial-ekonomi (seperti proteksionisme perdagangan, inflasi, dan demografi).",
    "Fokuskan perhatian pada hubungan kausalitas (sebab-akibat) dan syarat kondisi ('apabila', 'dalam jangka panjang', 'meskipun') di dalam teks.",
    "1. Mencermati Keterangan Waktu & Syarat Kondisi",
    "Pembuat soal sering mengubah cakupan waktu atau syarat:",
    [
      "Jika teks menyatakan dampak baru terjadi 'dalam jangka panjang', maka opsi yang menyebut dampak terjadi 'secara seketika' adalah TIDAK SESUAI.",
      "Jika teks menyebutkan 'sebagian besar responden', maka opsi yang menulis 'seluruh responden tanpa terkecuali' adalah TIDAK SESUAI.",
    ],
    "2. Verifikasi Hubungan Sebab-Akibat",
    "Pastikan mana yang menjadi pemicu (sebab) dan mana yang menjadi hasil (akibat):",
    [
      "Misalnya: proteksionisme berlebihan memicu perang tarif dan menurunkan efisiensi, bukan meningkatkan efisiensi.",
    ],
    "Lingkari kata pembatas di opsi seperti 'hanya', 'selalu', 'tidak pernah', dan 'seluruh'—opsi dengan kata mutlak ini biasanya salah kecuali teks memang menyatakan demikian.",
  ),
  createLesson(
    "LBI",
    11,
    "11. Memahami 5W + 1H dalam Teks (Bagian 1)",
    "Evaluasi Informasi & 5W+1H",
    "What (Apa) | Who (Siapa) | Where (Di mana) | When (Kapan) | Why (Mengapa) | How (Bagaimana)",
    "Membedah struktur informasi fundamental 5W+1H pada wacana literasi Saintek dan Soshum.",
    "Kerangka 5W + 1H (Apa, Siapa, Di mana, Kapan, Mengapa, dan Bagaimana) adalah fondasi dari seluruh pertanyaan pemahaman bacaan. Di UTBK-SNBT, pertanyaan 'Mengapa' (alasan/penyebab) dan 'Bagaimana' (proses/mekanisme) memiliki bobot kemunculan paling tinggi karena menguji pemahaman mendalam.",
    "Dengan memetakan unsur 5W + 1H saat membaca, kamu dapat langsung mengisolasi kalimat yang menjadi jawaban tanpa terdistraksi oleh kalimat lain.",
    "1. Memetakan Pertanyaan Mengapa (Why) & Bagaimana (How)",
    "Kedua pertanyaan ini menuntut pemahaman proses:",
    [
      "Pertanyaan 'Mengapa' (Why): Cari kalimat yang mengandung penanda kausalitas ('karena', 'sebab', 'akibat', 'dipicu oleh', 'bertujuan untuk').",
      "Pertanyaan 'Bagaimana' (How): Cari urutan tahapan mekanisme ('melalui', 'dengan cara', 'ketika ... maka ...').",
    ],
    "2. Ketepatan Subjek (Who) & Objek Kebijakan (What)",
    "Pada teks Soshum/Ekonomi, perhatikan lembaga atau pelaku yang berwenang:",
    [
      "Bedakan peran bank sentral (otoritas moneter) dari kementerian atau lembaga lainnya sesuai yang tertulis eksplisit di bacaan.",
    ],
    "Pastikan jawabanmu menjawab kata tanya yang tepat: jika ditanya 'Bagaimana mekanisme...', pilih opsi yang menjelaskan proses, bukan sekadar definisi!",
  ),
  createLesson(
    "LBI",
    12,
    "12. Memahami 5W + 1H dalam Teks (Bagian 2)",
    "Evaluasi Informasi & 5W+1H",
    "Analisis Proses Ilmiah & Dampak Sosial-Ekonomi (5W+1H Lanjutan)",
    "Latihan lanjutan membedah kausalitas dan mekanisme pada wacana selang-seling Saintek dan Soshum.",
    "Bagian kedua dari seri 5W + 1H ini melatih kecepatan dan ketepatan kamu berpindah fokus antara teks Sains-Teknologi dan teks Sosial-Humaniora secara selang-seling, persis seperti suasana ujian UTBK-SNBT sesungguhnya.",
    "Cermati bagaimana setiap paragraf menjawab pertanyaan spesifik: Paragraf 1 umumnya menjawab 'Apa' dan 'Mengapa penting', Paragraf 2 menjawab 'Bagaimana mekanismenya', dan Paragraf 3 menjawab 'Apa tantangan atau solusinya'.",
    "1. Mengintegrasikan Informasi Lintas Kalimat",
    "Terkadang jawaban atas 'Mengapa' atau 'Bagaimana' tersebar di dua kalimat berurutan:",
    [
      "Kalimat pertama menyebutkan tindakan (mis. pencatatan transaksi digital otomatis via QRIS), lalu kalimat kedua menyebutkan manfaat lanjutannya (membangun profil kredit UMKM).",
      "Gabungkan kedua kalimat tersebut untuk memilih opsi yang paling utuh.",
    ],
    "2. Manajemen Waktu Membaca",
    "Targetkan waktu pengerjaan maksimal 60–75 detik per soal LBI:",
    [
      "20 detik membaca soal & kata kunci, 30 detik memindai kalimat di teks, dan 20 detik memilih opsi terbaik.",
    ],
    "Jika dua opsi tampak mirip, pilih opsi yang memuat hubungan sebab-akibat paling lengkap sesuai kalimat rujukan di teks.",
  ),
];

const LBE_LESSONS: ReadonlyArray<SubMaterialLesson> = [
  createLesson(
    "LBE",
    1,
    "01. Reading Comprehension Compilation",
    "Main Idea, Theme, & Purpose",
    "Main Focus + Explicit Detail + Inference + Vocabulary + Author's Tone",
    "Comprehensive practice covering the core question types of SNBT English Literacy across Science and Humanities passages.",
    "Literasi dalam Bahasa Inggris (LBE) pada UTBK-SNBT menguji kemampuan memahami teks akademik berbahasa Inggris setara level CEFR B1–B2. Bacaan disajikan dalam bentuk artikel ilmiah populer, ulasan fenomena sosial, atau diskusi multi-perspektif.",
    "Dalam modul kompilasi pembuka ini, kamu akan mempelajari cara membedah satu teks utuh yang mencakup lima tipe pertanyaan inti: fokus utama bacaan (primary focus), informasi spesifik paragraf, inferensi logis (logical inference), kosakata kontekstual (vocabulary in context), dan sikap penulis (author's tone).",
    "1. The 3-Step SNBT English Reading Strategy",
    "Gunakan pendekatan terstruktur agar tidak kehabisan waktu menerjemahkan kata demi kata:",
    [
      "Read the Question Stem First: Identifikasi apakah soal menanyakan gambaran umum (main idea/tone) atau paragraf spesifik ('According to the second paragraph...').",
      "Locate the Evidence Sentence: Pindai kata kunci (seperti 'gut dysbiosis', 'blood-brain barrier', atau 'algorithmic management') di paragraf yang ditunjuk.",
      "Match by Paraphrase, Not Word-Repetition: Jawaban yang benar di LBE selalu menggunakan sinonim/parafrase dari kalimat asli.",
    ],
    "2. Recognizing Common Trap Options",
    "Hindari empat jenis jebakan standar di LBE:",
    [
      "Extreme Modifiers: Opsi yang memuat kata 'completely', 'entirely', 'never', 'only', 'all' hampir selalu salah kecuali teks menyatakan hal mutlak.",
      "Opposite Meaning: Mengambil kata dari teks tetapi membalik maknanya (mis. 'impenetrable' padahal teks menyebut 'breached').",
    ],
    "Jangan panik jika ada 1–2 kosakata sulit; makna kalimat utama tetap bisa ditangkap dari subjek, kata kerja utama, dan konjungsi penghubungnya!",
  ),
  createLesson(
    "LBE",
    2,
    "02. Theme, Main Idea, Moral, & Conclusion",
    "Main Idea, Theme, & Purpose",
    "Main Idea = Topic + Controlling Idea (What the author says about the topic)",
    "Mastering how to identify the overarching theme, central main idea, moral lesson, and logical conclusion of a passage.",
    "Menentukan Main Idea (Gagasan Utama) dan Theme (Tema Umum) adalah keterampilan paling mendasar dalam Literasi Bahasa Inggris. Main Idea adalah klaim utama yang mengikat seluruh paragraf di dalam teks, sedangkan Theme adalah konsep universal yang melatarbelakangi bacaan.",
    "Pada teks naratif atau studi kasus inspiratif (seperti kisah pelestarian budaya atau inovasi komunitas), soal juga dapat menanyakan Moral of the Story (pesan pelajaran) dan Conclusion (simpulan akhir).",
    "1. How to Find the Main Idea Quickly",
    "Perhatikan struktur standar penulisan esai bahasa Inggris:",
    [
      "Check Paragraph 1 (Thesis Statement): Kalimat pertama dan terakhir di paragraf pembuka biasanya memperkenalkan topik dan sudut pandang utama penulis.",
      "Check Topic Sentences of Body Paragraphs: Baca kalimat pertama tiap paragraf berikutnya untuk memastikan opsi pilihanmu mencakup keseluruhan teks, bukan hanya satu paragraf.",
    ],
    "2. Theme vs. Main Idea vs. Moral",
    "Bedakan ketiganya saat memilih opsi:",
    [
      "Theme: Frasa abstrak yang umum (mis. 'Technological advancement and its unintended environmental consequences').",
      "Main Idea: Kalimat lengkap yang merangkum isi spesifik bacaan.",
      "Moral/Lesson: Nilai bijak yang dapat dipetik dari pengalaman tokoh atau kasus di dalam teks.",
    ],
    "Opsi Main Idea yang benar tidak boleh terlalu sempit (hanya membahas 1 paragraf) dan tidak boleh terlalu ekstrem!",
  ),
  createLesson(
    "LBE",
    3,
    "03. Implied Main Idea (Gagasan Tersirat)",
    "Main Idea, Theme, & Purpose",
    "Supporting Details (P1 + P2 + P3)  →  Unstated Central Point",
    "Synthesizing supporting details across paragraphs when the main idea is not stated in a single topic sentence.",
    "Tidak semua bacaan menuliskan gagasan utamanya secara eksplisit dalam satu kalimat pembuka. Pada soal Implied Main Idea (Gagasan Utama Tersirat), penulis menyajikan serangkaian fenomena, bukti penelitian, atau kontras, lalu meminta pembaca merumuskan sendiri benang merahnya.",
    "Untuk menemukan Implied Main Idea, tanyakan: 'Apa satu pesan utama yang ingin dibuktikan penulis melalui seluruh contoh dan data di paragraf-paragraf ini?'",
    "1. Formula Menemukan Implied Main Idea",
    "Gunakan langkah sintesis berikut:",
    [
      "Identifikasi subjek utama yang terus dibahas dari paragraf pertama hingga terakhir (Who or What?).",
      "Identifikasi apa dampak, masalah, atau perubahan utama yang terjadi pada subjek tersebut (What about it?).",
      "Gabungkan keduanya menjadi satu pernyataan umum yang didukung oleh seluruh paragraf.",
    ],
    "2. Cermati Kata Hubung Kontras (However, Yet, Despite)",
    "Dalam teks bahasa Inggris, gagasan inti penulis sering muncul tepat SETELAH kata transisi kontras:",
    [
      "Jika Paragraf 1 menjelaskan manfaat teknologi, lalu Paragraf 2 diawali 'However, this rapid adoption has created...', maka gagasan utama teks mencakup kedua sisi tersebut (manfaat sekaligus risikonya).",
    ],
    "Jika sebuah opsi hanya menyebutkan detail angka dari satu paragraf, itu adalah Supporting Detail, bukan Implied Main Idea!",
  ),
  createLesson(
    "LBE",
    4,
    "04. Restatement & Paraphrasing (Part 1)",
    "Paraphrasing, Inference, & Text Relations",
    "Same Core Meaning + Same Logical Relation (Cause/Contrast/Condition)",
    "Rewriting complex English sentences using different vocabulary and grammar while preserving 100% of the original meaning.",
    "Soal Restatement & Paraphrasing meminta kamu memilih kalimat yang memiliki makna paling setara (closest in meaning) dengan kalimat yang dikutip dari bacaan. Ini adalah salah satu tipe soal paling favorit di LBE UTBK-SNBT.",
    "Kunci utama menjawab soal restatement adalah mempertahankan dua hal: (1) Inti Subjek–Predikat–Objek dan (2) Hubungan logika antar-klausa (apakah sebab-akibat, pertentangan/konsesif, atau syarat).",
    "1. Maintain the Logical Connector",
    "Perhatikan kata hubung pada kalimat asli dan cari padanannya di opsi jawaban:",
    [
      "Contrast/Concession: although / even though / despite / in spite of / while / whereas.",
      "Cause & Effect: because / since / due to / owing to / consequently / as a result / therefore.",
      "Condition: unless (= if not) / provided that / as long as.",
    ],
    "2. Active-Passive & Synonym Substitution",
    "Kalimat restatement yang benar sering melakukan dua transformasi:",
    [
      "Mengganti kata kunci dengan sinonimnya (mis. 'mitigate' → 'reduce/alleviate', 'indispensable' → 'essential').",
      "Mengubah struktur kalimat aktif menjadi pasif (atau sebaliknya) tanpa mengubah pelaku dan sasaran tindakan.",
    ],
    "Cek apakah ada informasi penting yang hilang atau ditambah secara berlebihan; restatement yang tepat tidak boleh mengubah derajat kepastian kalimat asli!",
  ),
  createLesson(
    "LBE",
    5,
    "05. Drawing Conclusions & Logical Inference",
    "Paraphrasing, Inference, & Text Relations",
    "Textual Clues + Strict Logic  =  Valid Inference (No Speculation!)",
    "Drawing evidence-based conclusions and logical inferences from scientific and social science passages.",
    "Soal Inference ('What can be inferred from the passage?', 'It can be logically concluded that...') menguji kemampuan menarik simpulan yang tidak tertulis secara harfiah, tetapi pasti benar berdasarkan bukti di dalam teks.",
    "Berbeda dengan opini bebas, Logical Inference dalam tes standar seperti SNBT bersifat sangat ketat: simpulan harus dapat dibuktikan langsung oleh 1–2 kalimat di dalam bacaan.",
    "1. Ciri Inference yang Benar di UTBK-SNBT",
    "Pilih opsi yang memiliki karakteristik berikut:",
    [
      "Merupakan konsekuensi logis langsung dari fakta di teks (misalnya jika teks menyatakan 'peminjaman buku fisik tetap datar karena pengunjung memakai jurnal digital di laptop', maka inferensinya adalah 'kebiasaan belajar digital membuat perpanjangan jam buka gagal meningkatkan peminjaman buku fisik').",
      "Menggunakan bahasa yang terukur dan hati-hati ('may', 'can', 'tends to', 'suggests', 'is likely to').",
    ],
    "2. Hindari Spekulasi di Luar Teks",
    "Jangan memilih opsi yang:",
    [
      "Membuat prediksi ekstrem di masa depan yang tidak disinggung penulis (mis. 'perpustakaan akan ditutup permanen').",
      "Menyalahkan pihak yang tidak disebutkan di dalam paragraf.",
    ],
    "Dalam soal Inference, opsi yang menggunakan kata 'might', 'can', atau 'likely' jauh lebih sering benar dibandingkan opsi yang menggunakan 'must', 'always', atau 'never'!",
  ),
  createLesson(
    "LBE",
    6,
    "06. Advanced Restatement & Paraphrasing (Part 2)",
    "Paraphrasing, Inference, & Text Relations",
    "Complex Clauses (Not A, but B  |  Double Negation  |  Modifiers)",
    "Mastering advanced sentence restatement involving double negations, restrictive modifiers, and multi-clause academic sentences.",
    "Pada bagian kedua Restatement & Paraphrasing ini, kalimat yang diujikan memiliki struktur akademik yang lebih kompleks: mengandung klausa korelatif ('not a substitute for X, but rather a complement to Y'), negasi ganda ('not uncommon', 'hardly insignificant'), atau klausa partisipatif.",
    "Ketelitian membaca kata pembatas seperti 'not', 'rather than', 'unless', dan 'only when' akan menentukan keberhasilanmu memilih parafrase yang akurat.",
    "1. Membedah Struktur 'Not X, but Y' & 'Rather than'",
    "Perhatikan bagian mana yang ditegaskan dan bagian mana yang ditolak oleh penulis:",
    [
      "Jika kalimat asli berbunyi 'Digital preservation is not a substitute for protecting physical sites, but an insurance policy', maka opsi yang menyatakan 'Digital preservation can replace physical sites' adalah 100% kebalikannya (SALAH).",
      "Pastikan kedua klausa (baik X yang bukan pengganti maupun Y yang menjadi pelengkap) terwakili secara utuh.",
    ],
    "2. Mengurai Double Negation (Negasi Ganda)",
    "Ubah negasi ganda menjadi kalimat positif di kepalamu sebelum melihat opsi:",
    [
      "'not uncommon' = common / frequent.",
      "'cannot survive without X' = requires X to survive / depends on X.",
    ],
    "Potong kalimat panjang menjadi klausa [Sebab/Syarat] dan klausa [Inti], lalu cocokkan keduanya satu per satu dengan opsi A–E!",
  ),
  createLesson(
    "LBE",
    7,
    "07. Relation Between Texts (Hubungan Antar-Teks)",
    "Paraphrasing, Inference, & Text Relations",
    "Text 1 vs. Text 2: Agreement, Disagreement, Example, or Cause-Effect",
    "Comparing and connecting two paired passages (Text 1 & Text 2) on a shared topic.",
    "Soal Paired Passages (Text 1 & Text 2) menyajikan dua teks pendek yang membahas topik serupa. Kamu akan diminta menganalisis hubungan antara Text 1 dan Text 2, titik persamaan keduanya, atau perbedaan sikap kedua penulis.",
    "Kunci utamanya adalah merumuskan 1 kalimat inti untuk Text 1 dan 1 kalimat inti untuk Text 2 segera setelah selesai membaca masing-masing teks.",
    "1. Pola Hubungan Text 1 dan Text 2 yang Umum",
    "Kenali empat pola relasi antar-teks berikut:",
    [
      "General Concept → Specific Case/Application: Text 1 menjelaskan teori/fenomena umum, sedangkan Text 2 memberikan contoh studi kasus nyata.",
      "Problem → Solution / Policy Response: Text 1 memaparkan masalah/ancaman, sedangkan Text 2 membahas solusi atau regulasi untuk mengatasinya.",
      "Opposing Views (Contrast): Text 1 mendukung suatu kebijakan/metode, sedangkan Text 2 mengkritik atau menunjukkan kelemahannya.",
      "Complementary Perspectives: Kedua teks membahas aspek berbeda yang saling melengkapi dari satu fenomena yang sama.",
    ],
    "2. Menjawab Soal 'Both Passages Agree That...'",
    "Untuk soal titik temu kedua teks:",
    [
      "Pilih pernyataan yang terbukti didukung baik di dalam Text 1 maupun di dalam Text 2, bukan pernyataan yang hanya ada di salah satu teks.",
    ],
    "Baca Text 1 lalu langsung jawab soal yang hanya menanyakan Text 1; baru baca Text 2 untuk menjawab soal Text 2 dan soal perbandingan keduanya!",
  ),
  createLesson(
    "LBE",
    8,
    "08. Author Purpose, Tone, & Attitude",
    "Fact, Opinion, & Detailed Information",
    "Tone = Diction (Positive / Neutral-Objective / Critical-Cautionary)",
    "Identifying the author's primary purpose, tone/attitude, potential bias, and intended target audience.",
    "Setiap penulis memilih diksi (pilihan kata) yang mencerminkan tujuan dan sikapnya terhadap topik. Soal Author-Related Questions menanyakan: Mengapa penulis menulis teks ini (Purpose)? Bagaimana nada/sikap penulis (Tone/Attitude)? Dan untuk siapa teks ini ditujukan (Intended Audience)?",
    "Sebagian besar artikel ilmiah populer di SNBT ditulis dengan nada yang terukur dan berbasis bukti, bukan luapan emosi ekstrem.",
    "1. Mengklasifikasikan Author's Tone & Attitude",
    "Gunakan metode Positif (+), Netral (0), atau Negatif (−) berdasarkan kata sifat yang dipakai penulis:",
    [
      "Neutral / Objective / Informative (0): Penulis memaparkan fakta, mekanisme ilmiah, atau dua sisi argumen secara berimbang tanpa memihak.",
      "Supportive / Optimistic / Appreciative (+): Penulis menyoroti keberhasilan inovasi atau manfaat positif suatu pendekatan.",
      "Critical / Cautionary / Concerned (−): Penulis memperingatkan pembaca tentang risiko, dampak buruk, atau kelemahan suatu kebijakan (sering memakai kata 'warn', 'jeopardize', 'overlooked risk').",
    ],
    "2. Menentukan Intended Audience (Target Pembaca)",
    "Hubungkan tingkat teknis bahasa dan topik bacaan dengan kelompok pembacanya:",
    [
      "Teks tentang evaluasi indikator ekonomi makro dan kesejahteraan publik ditujukan bagi 'policymakers, economics students, and informed citizens'.",
      "Hindari opsi audiens yang terlalu sempit/tidak relevan (mis. teknisi reparasi mesin untuk teks kebijakan ekonomi).",
    ],
    "Di UTBK-SNBT, hindari memilih opsi tone yang terlalu kasar atau ekstrem seperti 'hostile', 'furious', 'sarcastic', atau 'indifferent/apathetic'!",
  ),
  createLesson(
    "LBE",
    9,
    "09. Statements: Opinion and Fact",
    "Fact, Opinion, & Detailed Information",
    "Fact = Verifiable Data/Event  |  Opinion = Judgment/Value/Should",
    "Distinguishing objective factual statements from subjective opinions, value judgments, and policy recommendations.",
    "Kemampuan membedakan Fakta (Fact) dan Opini (Opinion) sangat krusial dalam literasi kritis. Fakta adalah pernyataan yang kebenarannya dapat diverifikasi secara objektif melalui data, eksperimen, atau catatan sejarah, sedangkan Opini adalah penilaian subjektif, interpretasi, prediksi masa depan, atau rekomendasi normatif.",
    "Di soal LBE, kamu bisa diminta menunjuk kalimat mana yang merupakan opini penulis, atau menjelaskan mengapa suatu kalimat dikategorikan sebagai opini/fakta.",
    "1. Penanda Bahasa untuk Fakta vs. Opini",
    "Cermati kata kunci penanda di dalam kalimat:",
    [
      "Penanda Fakta (Objective): Tanggal/tahun historis, persentase statistik, hasil pengukuran laboratorium, laporan peristiwa ('In 2024, researchers recorded a 28% decrease...').",
      "Penanda Opini (Subjective/Normative): Kata kerja modal saran/keharusan ('should', 'ought to', 'must'), kata sifat penilaian ('most inspiring', 'unfair', 'reckless', 'best'), atau klaim nilai ('arguably', 'it is essential that').",
    ],
    "2. Hati-Hati dengan 'Quoted Opinion'",
    "Perhatikan perbedaan halus ini:",
    [
      "Bahwa seorang tokoh mengucapkan sesuatu adalah fakta historis, tetapi ISI ucapan yang mengandung kata 'should' atau penilaian nilai tetap merupakan pernyataan normatif/opini.",
    ],
    "Jika sebuah kalimat mengandung kata rekomendasi seperti 'schools should integrate...' atau kata sifat superlatif subjektif, kalimat tersebut adalah Opini!",
  ),
  createLesson(
    "LBE",
    10,
    "10. Statements: True and False",
    "Fact, Opinion, & Detailed Information",
    "Cross-Check Subject + Verb + Modifier against Passage Evidence",
    "Verifying whether specific statements are TRUE or FALSE according to the passage.",
    "Soal True and False Statements ('Which of the following statements is TRUE/FALSE according to the passage?') menguji ketelitian kamu mencocokkan detail teks dengan lima pernyataan di opsi jawaban.",
    "Pembuat soal sering merancang empat pernyataan salah dengan cara mengubah satu kata kunci (misalnya mengubah 'novices' menjadi 'experts', atau mengubah 'increase' menjadi 'decrease') dan menyisakan satu pernyataan yang 100% akurat.",
    "1. Tiga Titik Verifikasi Kalimat",
    "Saat memeriksa setiap opsi, cek tiga komponen ini:",
    [
      "Who/What (Subjek): Apakah pelaku di opsi sama dengan pelaku di teks? (Jangan sampai atribut kelompok A tertukar dengan kelompok B).",
      "Comparison & Trend: Apakah arah perbandingannya tepat (lebih tinggi vs lebih rendah, sebelum vs sesudah)?",
      "Causality: Apakah alasan terjadinya sesuatu sesuai dengan yang dijelaskan di bacaan?",
    ],
    "2. Strategi Menjawab Cepat",
    "Gunakan kata benda unik di tiap opsi untuk melompat langsung ke paragraf yang relevan tanpa membaca ulang seluruh teks.",
    [
      "Beri tanda silang di pikiranmu segera setelah menemukan satu kata di opsi yang bertentangan dengan kalimat teks.",
    ],
    "Perhatikan baik-baik apakah soal menanyakan pernyataan yang TRUE (benar) atau yang FALSE / NOT TRUE (salah)!",
  ),
  createLesson(
    "LBE",
    11,
    "11. Words Meaning: Synonyms & Antonyms",
    "Vocabulary & Reference",
    "Context Clues (Definition, Contrast, Cause-Effect, Examples)",
    "Determining contextual synonyms (equal meaning) and antonyms (inequal/opposite meaning) of academic vocabulary.",
    "Soal Vocabulary in Context menanyakan persamaan kata (synonym / closest in meaning) atau lawan kata (antonym / opposite in meaning) dari sebuah kata yang dicetak tebal di dalam bacaan. Bahkan jika kamu belum pernah melihat kata tersebut sebelumnya, maknanya selalu dapat ditebak dari petunjuk konteks (context clues) di kalimat sekitarnya.",
    "Selain itu, satu kata bahasa Inggris bisa memiliki beberapa arti kamus; kamu harus memilih arti yang sesuai dengan konteks kalimat di bacaan.",
    "1. Empat Jenis Context Clues",
    "Cari petunjuk berikut di kalimat tempat kata tersebut berada:",
    [
      "Definition / Apposition Clue: Penjelasan langsung setelah koma, tanda pisah, atau kata 'or' / 'known as'.",
      "Contrast Clue: Jika ada kata 'however', 'although', 'whereas', 'unlike', atau 'rather than', maka arti kata yang dicari adalah kebalikan dari klausa pasangannya.",
      "Cause-Effect Clue: Lihat akibat yang ditimbulkan (mis. 'a deluge of notifications overwhelmed users' → deluge berarti banjir/jumlah yang sangat melimpah, antonimnya 'shortage').",
      "Prefix/Root Clue: Kenali awalan seperti 'in-/im-/un-' (tidak), 're-' (kembali), 'over-' (berlebihan), 'sub-' (di bawah).",
    ],
    "2. Synonym vs. Antonym Question Stem",
    "Baca batang soal dengan teliti:",
    [
      "Closest in meaning / Equal = cari SINONIM.",
      "Opposite in meaning / Inequal / Antonym = cari LAWAN KATA.",
    ],
    "Substitusikan kata pilihanmu ke dalam kalimat asli: jika kalimat tetap terdengar logis dan alurnya mulus (untuk sinonim), pilihanmu tepat!",
  ),
  createLesson(
    "LBE",
    12,
    "12. Reference (Pronoun & Phrase Reference)",
    "Vocabulary & Reference",
    "Pronoun (it, they, this, such, which)  ←  Look Backward + Check Number/Logic",
    "Tracing pronouns and demonstrative phrases back to their exact noun antecedents in the text.",
    "Soal Reference ('The word \"they\" in paragraph 3 refers to...', 'The phrase \"this phenomenon\" refers to...') menguji kemampuan melacak rujukan kata ganti (pronoun) atau frasa penunjuk ke kata benda (antecedent) yang diwakilinya.",
    "Dalam tata bahasa Inggris, kata ganti hampir selalu merujuk ke kata benda yang disebutkan SEBELUMNYA (di kalimat yang sama atau satu kalimat tepat di depannya) dan harus cocok secara jumlah (singular vs plural) serta logis saat melakukan predikat kalimatnya.",
    "1. Aturan Kesesuaian Tunggal vs. Jamak",
    "Eliminasi opsi yang tidak sesuai jumlahnya:",
    [
      "Singular Pronouns (it, its, this, that): Hanya dapat merujuk pada kata benda tunggal (singular noun) atau satu gagasan klausa utuh.",
      "Plural Pronouns (they, them, their, these, those): Hanya dapat merujuk pada kata benda jamak (plural nouns).",
      "Relative Pronouns (which, who, that): Umumnya merujuk langsung pada frasa kata benda tepat di sebelah kirinya.",
    ],
    "2. Uji Substitusi Subjek–Predikat",
    "Jika ada dua kata benda jamak sebelum kata 'they', cek kata kerja setelah 'they':",
    [
      "Misalnya: 'Effective leaders evaluate ongoing projects... before they initiate new ventures.' Siapa yang bisa 'initiate new ventures'? Tentu 'effective leaders' (manusia), bukan 'ongoing projects' (benda mati).",
    ],
    "Ganti kata ganti tersebut dengan kata benda pilihanmu lalu baca kalimatnya: apakah tindakan predikatnya masuk akal dilakukan oleh kata benda tersebut?",
  ),
  createLesson(
    "LBE",
    13,
    "13. Summary (Merangkum Isi Teks)",
    "Main Idea, Theme, & Purpose",
    "Summary = P1 Main Point + P2 Main Point + P3 Main Point",
    "Selecting the most accurate summary or title that captures all major points of the passage.",
    "Soal Summary meminta kamu memilih kalimat atau rangkaian poin yang merangkum keseluruhan isi bacaan secara berimbang. Sebuah ringkasan yang baik harus mencakup gagasan utama dari awal hingga akhir teks tanpa terjebak pada rincian minor.",
    "Sama seperti menentukan judul terbaik, ringkasan harus merepresentasikan masalah utama sekaligus solusi atau simpulan yang ditawarkan penulis.",
    "1. Kriteria Summary yang Tepat",
    "Pastikan opsi pilihanmu memenuhi tiga syarat:",
    [
      "Comprehensive: Mencakup topik utama dan simpulan akhir penulis.",
      "Accurate: Tidak mengubah fakta atau menambahkan klaim yang bertentangan dengan bacaan.",
      "Objective: Tidak hanya mengutip satu contoh kasus kecil dari salah satu paragraf.",
    ],
    "2. Cara Cepat Mengeliminasi Opsi Summary",
    "Coret opsi yang:",
    [
      "Hanya membahas latar belakang sejarah di paragraf 1.",
      "Menyatakan hal yang berlawanan dengan temuan riset di dalam teks (mis. menyebut multitasking meningkatkan kreativitas padahal teks menyebut sebaliknya).",
    ],
    "Gabungkan kalimat pertama Paragraf 1 dan kalimat terakhir Paragraf penutup; opsi Summary terbaik selalu merangkul kedua kalimat tersebut!",
  ),
  createLesson(
    "LBE",
    14,
    "14. Finding Detailed Information",
    "Fact, Opinion, & Detailed Information",
    "Wh-Questions (What, Why, How, When, Who) → Scan Specific Paragraph",
    "Locating specific factual details, causes, mechanisms, and historical/scientific data in English passages.",
    "Finding Detailed Information menguji kemampuan memindai informasi terperinci yang disebutkan secara eksplisit di dalam teks untuk menjawab pertanyaan spesifik (What, Why, How, By what means, According to paragraph X).",
    "Berbeda dengan soal Main Idea yang melihat gambaran besar, soal Detailed Information menuntut kamu menemukan satu kalimat spesifik di dalam teks dan mencocokkan parafrasenya.",
    "1. Menggunakan Anchor Words (Kata Jangkar)",
    "Pilih kata jangkar terbaik dari pertanyaan untuk melakukan scanning:",
    [
      "Gunakan huruf kapital (nama orang, tempat, mata uang seperti 'Rentenmark', institusi), angka/tahun, atau istilah teknis.",
      "Setelah menemukan kata jangkar di teks, baca kalimat tersebut dari titik ke titik.",
    ],
    "2. Waspadai 'Same-Paragraph Distractors'",
    "Pembuat soal sering mengambil kata-kata dari kalimat lain di paragraf yang sama sebagai opsi pengecoh:",
    [
      "Pastikan detail yang kamu pilih benar-benar menjawab pertanyaan yang diajukan (misalnya jika ditanya 'apa yang menjadi jaminan mata uang baru', pilih 'mortgages on agricultural and industrial land', bukan penyebab inflasi sebelumnya).",
    ],
    "Jangan mengandalkan ingatan; selalu kembali ke paragraf yang ditunjuk dan tunjuk kalimat buktinya sebelum memilih jawaban!",
  ),
  createLesson(
    "LBE",
    15,
    "15. Organization of Ideas & Paragraph Structure",
    "Paraphrasing, Inference, & Text Relations",
    "Text Structure + Paragraph Connection + Preceding/Following Paragraph",
    "Analyzing how the author organizes ideas across paragraphs and predicting preceding or succeeding paragraphs.",
    "Organization of Ideas menguji pemahaman kamu terhadap arsitektur teks: bagaimana penulis menyusun alur gagasannya dari paragraf ke paragraf, bagaimana Paragraf 2 berhubungan dengan Paragraf 1, serta topik apa yang paling logis dibahas pada paragraf sebelum (preceding) atau sesudah (following) bacaan.",
    "Memahami organisasi teks membuat kamu melihat bacaan sebagai kerangka logis yang terstruktur rapi.",
    "1. Pola Organisasi Teks yang Sering Muncul",
    "Kenali pola pengembangan wacana berikut:",
    [
      "Chronological / Historical Progression: Mengurutkan perkembangan suatu konsep atau peristiwa dari masa lalu hingga era modern.",
      "Cause and Effect / Phenomenon and Explanation: Memperkenalkan fenomena unik lalu menjelaskan mekanisme penyebab dan dampaknya.",
      "Problem and Solution / Myth vs. Reality: Membantah anggapan umum yang keliru lalu menyajikan bukti ilmiah yang sebenarnya.",
    ],
    "2. Preceding vs. Following Paragraph Questions",
    "Perhatikan arah pertanyaannya:",
    [
      "Preceding Paragraph (Paragraf Sebelumnya): Lihat kalimat PERTAMA Paragraf 1.",
      "Following/Next Paragraph (Paragraf Berikutnya): Lihat kalimat TERAKHIR Paragraf paling akhir.",
    ],
    "Untuk soal 'How does the author organize the ideas?', cocokkan urutan topik Paragraf 1 → Paragraf 2 → Paragraf 3 dengan urutan yang tertulis di opsi jawaban!",
  ),
  createLesson(
    "LBE",
    16,
    "16. Stated & Unstated Information",
    "Fact, Opinion, & Detailed Information",
    "STATED (Mentioned in Text)  vs.  UNSTATED / NOT MENTIONED (4 True vs 1 False/Absent)",
    "Identifying which details are explicitly stated in the text and which are unstated or fabricated.",
    "Soal Stated–Unstated ('Which of the following is NOT stated/mentioned in the passage?', 'All of the following are mentioned EXCEPT...') meminta kamu memisahkan empat informasi yang tercantum di dalam teks dari satu informasi yang sama sekali tidak disebutkan atau dilebih-lebihkan.",
    "Untuk soal tipe negatif (UNSTATED / EXCEPT), empat opsi akan terbukti ada di dalam bacaan, sedangkan satu opsi yang benar adalah klaim yang tidak pernah ditulis atau bertentangan dengan teks.",
    "1. Strategi Daftar Cek (Checklist Elimination)",
    "Selesaikan soal EXCEPT / UNSTATED dengan sistematis:",
    [
      "Jika soal menyebutkan paragraf tertentu, fokuskan pencarian hanya pada paragraf tersebut.",
      "Cocokkan setiap opsi satu per satu dengan kalimat di teks; beri centang pada 4 opsi yang ada buktinya.",
      "Satu opsi yang tidak memiliki bukti di teks atau menggunakan klaim ekstrem (mis. 'UNESCO has restored every single endangered language to full fluency') adalah jawabannya.",
    ],
    "2. Stated vs. Overstated",
    "Sering kali opsi UNSTATED mengambil topik yang ada di teks tetapi melebih-lebihkannya hingga melampaui fakta bacaan.",
    [
      "Cermati kata 'every single', 'all', 'completely eliminated' sebagai sinyal kuat opsi UNSTATED.",
    ],
    "Jangan lupa: pada soal NOT STATED / EXCEPT, kamu sedang mencari opsi yang TIDAK ADA atau SALAH menurut bacaan!",
  ),
  createLesson(
    "LBE",
    17,
    "17. Purpose of the Text",
    "Main Idea, Theme, & Purpose",
    "Author's Purpose = Action Verb (To explain / To argue / To contrast / To warn) + Core Topic",
    "Determining the primary purpose of the entire passage or the specific rhetorical function of a sentence/paragraph.",
    "Sub-materi penutup LBE ini berfokus pada Purpose of the Text—baik tujuan utama penulisan keseluruhan wacana maupun fungsi retoris mengapa penulis menyertakan suatu paragraf, kutipan, atau kontras tertentu ('Why does the author mention X in paragraph 2?').",
    "Tujuan penulis selalu tercermin dari kata kerja tindakan (action verb) di awal opsi jawaban, seperti 'to explain', 'to illustrate', 'to challenge', 'to contrast', atau 'to warn'.",
    "1. Memilih Action Verb yang Tepat",
    "Cocokkan kata kerja di awal opsi dengan sifat wacananya:",
    [
      "To explain / To describe / To inform: Untuk teks eksposisi ilmiah yang netral (mis. menjelaskan bahwa memori manusia bersifat rekonstruktif).",
      "To argue / To advocate / To urge: Untuk teks opini yang mendorong perubahan kebijakan atau tindakan.",
      "To contrast / To compare: Untuk teks yang membedakan dua konsep atau dua teori.",
      "To refute / To challenge: Untuk teks yang membantah pandangan lama dengan bukti baru.",
    ],
    "2. Rhetorical Purpose of a Specific Detail",
    "Jika ditanya mengapa penulis menyebut suatu contoh atau metafora di Paragraf X:",
    [
      "Baca kalimat utama paragraf tersebut! Setiap contoh atau analogi di dalam paragraf selalu berfungsi untuk mendukung/memperjelas kalimat utama paragraf itu.",
    ],
    "Cek kata pertama pada opsi A–E terlebih dahulu (To explain vs To criticize vs To promote)—langkah ini langsung mengeliminasi separuh opsi!",
  ),
];

export const SNBT_CURRICULUM: Record<
  SnbtSubtestCode,
  ReadonlyArray<SubMaterialLesson>
> = {
  PBM: PBM_LESSONS,
  LBI: LBI_LESSONS,
  LBE: LBE_LESSONS,
  PK: [],
  PM: [],
  PPU: [],
  PU: [],
};

/**
 * Mengelompokkan sub-materi suatu subtes ke dalam daftar Bab (Chapter) untuk modal "Daftar Isi" ala Skilvul.
 */
export function getChaptersForSubtest(
  subtest: SnbtSubtestCode,
): ReadonlyArray<SubtestChapterGroup> {
  const lessons = SNBT_CURRICULUM[subtest] ?? [];
  const groups: SubtestChapterGroup[] = [];
  const map = new Map<string, SubMaterialLesson[]>();

  for (const lesson of lessons) {
    let bucket = map.get(lesson.chapterTitle);
    if (!bucket) {
      bucket = [];
      map.set(lesson.chapterTitle, bucket);
      groups.push({
        chapterTitle: lesson.chapterTitle,
        lessons: bucket,
      });
    }
    bucket.push(lesson);
  }

  return groups;
}
