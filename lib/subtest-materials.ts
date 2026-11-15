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
      "Pengetahuan Kuantitatif menguji pemahaman konsep dasar matematika SMA secara logis dan analitis, termasuk soal perbandingan kuantitas P vs Q dan kecukupan data.",
    keyPoints: [
      {
        title: "Aljabar, Fungsi & Persamaan",
        detail:
          "Kuasai persamaan dan pertidaksamaan linear/kuadrat, eksponen, nilai mutlak, serta sifat fungsi komposisi dan invers.",
      },
      {
        title: "Geometri Bidang & Ruang",
        detail:
          "Pahami hubungan sudut sejajar, kesebangunan segitiga, sifat lingkaran, serta luas permukaan dan volume bangun.",
      },
      {
        title: "Statistika & Peluang",
        detail:
          "Latih perhitungan mean, median, jangkauan, kaidah pencacahan (permutasi & kombinasi), dan peluang kejadian.",
      },
      {
        title: "Strategi Kecukupan Data (1) & (2)",
        detail:
          "Uji pernyataan (1) dan (2) secara terpisah terlebih dahulu; jangan mengasumsikan bilangan bulat atau positif bila tidak disebutkan.",
      },
    ],
    quickTip:
      "Pada tipe soal P vs Q atau kecukupan data, uji minimal dua contoh nilai berbeda (positif, nol, negatif, atau pecahan) sebelum menyimpulkan.",
  },
  PM: {
    overview:
      "Penalaran Matematika mengukur kemampuan memodelkan persoalan kehidupan nyata ke bentuk matematis, menganalisis tabel/grafik, dan menafsirkan solusi kontekstual.",
    keyPoints: [
      {
        title: "Pemodelan Soal Cerita",
        detail:
          "Identifikasi besaran yang diketahui, tentukan variabel secara jelas, lalu susun persamaan atau pertidaksamaan sebelum berhitung.",
      },
      {
        title: "Proporsi & Aritmetika Terapan",
        detail:
          "Pahami perbandingan senilai dan berbalik nilai, persentase bertingkat, bunga majemuk sederhana, serta kecepatan dan debit.",
      },
      {
        title: "Analisis Grafik, Tabel & Peluang",
        detail:
          "Cermati satuan sumbu grafik, laju perubahan antarperiode, dan estimasi peluang berbasis tabel frekuensi.",
      },
      {
        title: "Pola & Optimasi Kontekstual",
        detail:
          "Gunakan barisan aritmetika/geometri dan perbandingan biaya atau waktu untuk menentukan nilai optimum.",
      },
    ],
    quickTip:
      "Periksa kembali satuan akhir (menit vs jam, ribu vs juta, atau persen vs selisih nominal) karena jebakan sering muncul di tahap konversi.",
  },
  PU: {
    overview:
      "Penalaran Umum menilai ketajaman logika deduktif, kekuatan argumen induktif, kesesuaian pernyataan terhadap bacaan, serta penalaran kuantitatif pola.",
    keyPoints: [
      {
        title: "Logika Deduktif & Implikasi",
        detail:
          "Ingat bahwa P → Q ekuivalen dengan ~Q → ~P (kontraposisi); negasinya adalah P ∧ ~Q.",
      },
      {
        title: "Kesesuaian & Kekuatan Argumen",
        detail:
          "Bedakan simpulan yang pasti benar, pasti salah, dan mungkin terjadi berdasarkan premis pada stimulus.",
      },
      {
        title: "Memperkuat / Memperlemah Pernyataan",
        detail:
          "Cari opsi yang langsung menguatkan atau mematahkan hubungan sebab-akibat inti pada klaim paragraf.",
      },
      {
        title: "Pola Deret & Hubungan Angka",
        detail:
          "Periksa pola loncat 1 atau 2, selisih tingkat dua, rasio perkalian, atau pola operasi antarbaris tabel.",
      },
    ],
    quickTip:
      "Jangan gunakan pengetahuan luar jika bertentangan atau tidak tercantum pada premis teks; pegang logika formal stimulus.",
  },
  PPU: {
    overview:
      "Pengetahuan & Pemahaman Umum berfokus pada kosakata kontekstual, relasi makna antar-kata, pembentukan kata berimbuhan, serta koherensi ide antar-paragraf.",
    keyPoints: [
      {
        title: "Makna Kata & Diksi Kontekstual",
        detail:
          "Uji arti kata dengan membaca kalimat sebelum dan sesudahnya agar tidak terjebak pada makna kamus yang tidak sesuai konteks.",
      },
      {
        title: "Relasi Semantik & Asosiasi",
        detail:
          "Pahami sinonim, antonim, hipernim-hiponim, serta makna perumpamaan atau idiom yang digunakan penulis.",
      },
      {
        title: "Afiksasi & Bentuk Kata",
        detail:
          "Analisis fungsi imbuhan (meN-, ber-, ter-, ke-an, peN-an) dan kesesuaian makna gramatikal dalam kalimat.",
      },
      {
        title: "Kepaduan & Inti Kalimat",
        detail:
          "Temukan subjek dan predikat utama kalimat panjang untuk memahami gagasan pokok tanpa terdistraksi keterangan.",
      },
    ],
    quickTip:
      "Saat mencari pengganti kata, masukkan opsi ke kalimat asli untuk menguji kelancaran makna sekaligus ketepatan kelas katanya.",
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

// Generator untuk membuat SubMaterialLesson terstruktur bagi subtes lainnya (LBI, LBE, PK, PM, PPU, PU)
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

const PK_LESSONS: ReadonlyArray<SubMaterialLesson> = [
  createLesson(
    "PK",
    1,
    "01. Eksponen, Aljabar, SPLTV, & Bentuk Akar",
    "Aljabar, Eksponen, & Persamaan Kuadrat",
    "aᵐ · aⁿ = aᵐ⁺ⁿ  |  √(a+b) ± 2√(ab) = √a ± √b  |  (a+b)² = a² + b² + 2ab",
    "Kompilasi fondasi Pengetahuan Kuantitatif: sifat eksponen, bentuk akar, manipulasi aljabar, SPLTV, dan statistika dasar.",
    "Pengetahuan Kuantitatif (PK) menguji ketajaman manipulasi matematika dasar dan penalaran logis dalam waktu singkat. Soal-soal PK disajikan dalam empat format: pilihan ganda reguler, pilihan pernyataan (1)-(2)-(3)-(4), perbandingan kuantitas P dan Q, serta kecukupan data.",
    "Pada Bagian 01 ini, kamu akan menguasai sifat-sifat eksponen dan bentuk akar sekawan, pemfaktoran identitas aljabar, sistem persamaan linear tiga variabel (SPLTV), hingga rata-rata gabungan.",
    "1. Sifat Eksponen, Bentuk Akar, & Identitas Aljabar",
    "Gunakan penyederhanaan basis prima dan identitas aljabar agar tidak menghitung angka besar:",
    [
      "Ubah bilangan berpangkat ke basis prima terkecil: 64 = 2⁶, 32 = 2⁵, 125 = 5³.",
      "Rasionalkan bentuk akar: √( (a+b) ± 2√(ab) ) = √a ± √b (dengan a > b).",
      "Identitas wajib hafal: a² − b² = (a − b)(a + b) dan a² + b² = (a + b)² − 2ab.",
    ],
    "2. Strategi SPLTV & Perbandingan Kuantitas P vs Q",
    "Pada SPLTV dan soal P vs Q:",
    [
      "Jangan selalu mencari nilai x, y, z satu per satu jika yang ditanyakan adalah kombinasi linearnya; jumlahkan atau kurangkan persamaan secara langsung.",
      "Untuk soal P vs Q, sederhanakan bentuk P dan Q dengan mengurangi suku yang sama di kedua ruas.",
    ],
    "Pada soal pernyataan (1), (2), (3), (4): cek pernyataan (1) dan (4) terlebih dahulu untuk mengeliminasi opsi jawaban dengan cepat!",
  ),
  createLesson(
    "PK",
    2,
    "02. Persamaan Kuadrat & Diskriminan",
    "Aljabar, Eksponen, & Persamaan Kuadrat",
    "x₁ + x₂ = −b/a  |  x₁ · x₂ = c/a  |  D = b² − 4ac",
    "Menguasai rumus Vieta (jumlah & hasil kali akar), syarat jenis akar berdasarkan diskriminan, dan menyusun persamaan kuadrat baru.",
    "Persamaan kuadrat ax² + bx + c = 0 (dengan a ≠ 0) adalah salah satu topik paling sering muncul di PK UTBK-SNBT. Soal jarang sekadar meminta memfaktorkan angka sederhana, melainkan menguji hubungan koefisien dengan sifat akar melalui rumus Vieta dan Diskriminan.",
    "Pemahaman mendalam tentang tanda diskriminan (D > 0, D = 0, D < 0) sangat sering dikombinasikan dengan soal perbandingan kuantitas P dan Q.",
    "1. Rumus Vieta & Sifat Diskriminan (D = b² − 4ac)",
    "Hafalkan rumus operasi akar dan syarat diskriminan berikut:",
    [
      "Jumlah akar: x₁ + x₂ = −b/a  |  Hasil kali akar: x₁ · x₂ = c/a  |  Selisih akar: |x₁ − x₂| = √D / |a|.",
      "Dua akar real berbeda: D > 0.",
      "Akar real kembar (satu akar real): D = 0.",
      "Dua akar imajiner (tidak real / definit): D < 0.",
    ],
    "2. Menyusun Persamaan Kuadrat Baru (PKB)",
    "Gunakan trik cepat invers transformasi untuk akar-akar yang simetris:",
    [
      "Akar kebalikan (1/x₁ dan 1/x₂): balik urutan koefisien menjadi cx² + bx + a = 0.",
      "Akar bergeser (x₁ − k dan x₂ − k): substitusikan (x + k) menggantikan x pada persamaan awal.",
      "Akar kelipatan (n·x₁ dan n·x₂): persamaan baru menjadi a·x² + n·b·x + n²·c = 0.",
    ],
    "Ingat: jika soal menyebut 'memiliki dua akar real BERBEDA', gunakan D > 0 (ketaksamaan tegas); jika hanya menyebut 'memiliki akar real', gunakan D ≥ 0!",
  ),
  createLesson(
    "PK",
    3,
    "03. Fungsi Sepotong (Piecewise Function)",
    "Fungsi & Grafik",
    "Cek Syarat Interval Domain x Terlebih Dahulu → Substitusi ke Rumus Cabang yang Sesuai",
    "Mengevaluasi nilai fungsi sepotong (piecewise), fungsi bersyarat genap/ganjil/bulat, dan komposisi fungsi bertingkat.",
    "Fungsi sepotong (piecewise function) adalah fungsi yang memiliki lebih dari satu rumus definisi bergantung pada interval atau sifat nilai masukannya (domain). Misalnya, rumus berbeda untuk x < 0, 0 ≤ x < 4, dan x ≥ 4, atau rumus berbeda untuk bilangan bulat vs pecahan.",
    "Kesalahan paling sering terjadi ketika peserta langsung mensubstitusikan angka ke rumus baris pertama tanpa memeriksa syarat domainnya.",
    "1. Evaluasi Bertahap Fungsi Bersarang f(f(a))",
    "Kerjakan dari lapisan fungsi paling dalam ke luar:",
    [
      "Langkah 1: Cek nilai input dalam (mis. a = −2), tentukan cabang interval mana yang memuat −2, lalu hitung nilai b = f(−2).",
      "Langkah 2: Gunakan hasil b tersebut sebagai input baru untuk mengecek ulang cabang interval pada perhitungan f(b).",
    ],
    "2. Mencari Input dari Nilai Output yang Diketahui",
    "Jika diketahui f(a) = k dan ditanyakan nilai a:",
    [
      "Uji masing-masing cabang rumus dengan menyamakannya terhadap k.",
      "WAJIB periksa apakah nilai a yang ditemukan memenuhi syarat domain cabang tersebut (jika tidak memenuhi syarat cabang, nilai a tersebut gugur!).",
    ],
    "Saat mencari nilai input a dari f(a) = k pada fungsi sepotong, selalu uji kembali apakah a yang diperoleh masuk ke dalam syarat interval cabang itu!",
  ),
  createLesson(
    "PK",
    4,
    "04. Fungsi Linear & Persamaan Garis",
    "Fungsi & Grafik",
    "m = (y₂ − y₁)/(x₂ − x₁)  |  Sejajar: m₁ = m₂  |  Tegak Lurus: m₁ · m₂ = −1",
    "Gradien garis, persamaan garis lurus, hubungan dua garis (sejajar & tegak lurus), serta analisis kecukupan data (1) & (2).",
    "Persamaan garis lurus y = mx + c dan bentuk implisit ax + by + c = 0 merupakan tulang punggung geometri analitik di PK. Pada modul ini, konsep fungsi linear juga diintegrasikan secara intensif dengan format soal Kecukupan Data (Data Sufficiency).",
    "Dalam soal Kecukupan Data, kamu tidak selalu harus menghitung sampai angka akhir yang rumit; cukup pastikan apakah informasi pada pernyataan (1) atau (2) menghasilkan satu nilai jawaban yang tunggal dan pasti.",
    "1. Rumus Gradien & Kedudukan Dua Garis",
    "Kuasai sifat kemiringan (gradien) garis lurus:",
    [
      "Gradien garis melalui (x₁, y₁) dan (x₂, y₂) adalah m = (y₂ − y₁)/(x₂ − x₁).",
      "Gradien dari bentuk ax + by + c = 0 adalah m = −a/b.",
      "Dua garis sejajar memiliki gradien sama (m₁ = m₂); dua garis saling tegak lurus memenuhi m₁ · m₂ = −1.",
    ],
    "2. Strategi Menjawab Soal Kecukupan Data (A–E)",
    "Ikuti disiplin uji terpisah berikut:",
    [
      "Uji Pernyataan (1) SAJA sambil melupakan Pernyataan (2). Apakah pertanyaan terjawab secara tunggal (Ya/Tidak pasti, atau satu angka pasti)?",
      "Uji Pernyataan (2) SAJA sambil melupakan Pernyataan (1).",
      "Baru gabungkan (1) dan (2) JIKA masing-masing pernyataan secara terpisah belum cukup.",
    ],
    "Pada pertanyaan 'Apakah m bernilai negatif?', jika suatu pernyataan memastikan m = 2 (pasti TIDAK negatif), maka pernyataan tersebut CUKUP untuk menjawab pertanyaan!",
  ),
  createLesson(
    "PK",
    5,
    "05. Fungsi Kuadrat & Titik Ekstrem",
    "Fungsi & Grafik",
    "Sumbu Simetri: xₚ = −b/(2a)  |  Nilai Ekstrem: yₚ = f(xₚ) = −D/(4a)",
    "Karakteristik parabola f(x) = ax² + bx + c, sumbu simetri, nilai maksimum/minimum, dan kedudukan garis terhadap parabola.",
    "Grafik fungsi kuadrat f(x) = ax² + bx + c berbentuk parabola yang terbuka ke atas jika a > 0 (memiliki nilai minimum) dan terbuka ke bawah jika a < 0 (memiliki nilai maksimum).",
    "Soal PK sering menghubungkan titik puncak (xₚ, yₚ), titik potong sumbu koordinat, dan sifat simetri parabola: jika f(x₁) = f(x₂), maka sumbu simetrinya berada tepat di tengah-tengah kedua absis tersebut, yakni xₚ = (x₁ + x₂)/2.",
    "1. Rumus Titik Puncak & Menyusun Fungsi Kuadrat",
    "Pilih bentuk rumus fungsi kuadrat sesuai informasi yang diketahui di soal:",
    [
      "Diketahui titik puncak (xₚ, yₚ): gunakan f(x) = a(x − xₚ)² + yₚ.",
      "Diketahui titik potong sumbu-x di (x₁, 0) dan (x₂, 0): gunakan f(x) = a(x − x₁)(x − x₂).",
      "Titik potong sumbu-y selalu berada di (0, c) karena f(0) = c.",
    ],
    "2. Kedudukan Garis terhadap Parabola",
    "Untuk mencari titik potong/singgung garis y = mx + n dan parabola y = ax² + bx + c:",
    [
      "Samakan kedua persamaan: ax² + (b − m)x + (c − n) = 0.",
      "Berpotongan di 2 titik: D > 0 | Menyinggung (1 titik): D = 0 | Tidak berpotongan: D < 0.",
    ],
    "Trik cepat simetri: jika diketahui f(1) = f(5) = 0, jangan substitusi satu-satu! Langsung simpulkan sumbu simetrinya adalah xₚ = (1 + 5)/2 = 3.",
  ),
  createLesson(
    "PK",
    6,
    "06. Fungsi Komposisi & Fungsi Invers",
    "Fungsi & Grafik",
    "(f ∘ g)(x) = f(g(x))  |  f(a) = b  ⇔  f⁻¹(b) = a",
    "Menentukan rumus dan nilai fungsi komposisi, fungsi invers, serta mencari fungsi komponen yang belum diketahui.",
    "Fungsi komposisi menggabungkan dua fungsi secara berurutan, sedangkan fungsi invers membalik pemetaan dari daerah hasil kembali ke daerah asal. Kedua konsep ini merupakan langganan tetap di setiap gelombang UTBK-SNBT.",
    "Kunci kecepatan pada materi ini adalah memanfaatkan sifat ekuivalensi invers f⁻¹(b) = a ⇔ f(a) = b sehingga kamu jarang perlu mencari rumus umum f⁻¹(x) jika yang ditanyakan hanyalah nilai pada satu titik angka.",
    "1. Sifat Penting Invers & Komposisi",
    "Gunakan sifat-sifat berikut untuk memangkas langkah aljabar:",
    [
      "Sifat Dibalik tanpa Mencari Rumus Invers: Jika ditanya f⁻¹(7) pada f(x) = 2x + 3, cukup cari x yang membuat 2x + 3 = 7 → x = 2.",
      "Invers Fungsi Pecahan Linear: Jika f(x) = (ax + b)/(cx + d), maka f⁻¹(x) = (−dx + b)/(cx − a) (tukar posisi dan tanda antara a dan d).",
      "Invers Komposisi: (f ∘ g)⁻¹(x) = (g⁻¹ ∘ f⁻¹)(x).",
    ],
    "2. Mencari Fungsi dari Komposisi yang Diketahui",
    "Bedakan dua kasus berikut:",
    [
      "Diketahui f(x) dan (f ∘ g)(x), dicari g(x): substitusikan g(x) langsung ke variabel x pada f(x).",
      "Diketahui g(x) dan (f ∘ g)(x), dicari f(k): cari nilai x yang membuat g(x) = k, lalu substitusikan nilai x itu ke (f ∘ g)(x)!",
    ],
    "Jika diketahui (f ∘ g)(x) dan g(x) lalu ditanya nilai f(5), jangan cari rumus f(x)! Cukup cari x pembuat g(x) = 5 lalu masukkan ke (f ∘ g)(x).",
  ),
  createLesson(
    "PK",
    7,
    "07. Operasi Aljabar & Sistem Persamaan",
    "Aljabar, Eksponen, & Persamaan Kuadrat",
    "ax + by = c  |  Pemfaktoran & Penyederhanaan Pecahan Aljabar",
    "Operasi suku banyak, pengurangan aljabar, persamaan pecahan, sistem persamaan linear dua variabel (SPLDV), dan pemodelan umur/harga.",
    "Kemahiran mengoperasikan bentuk aljabar dengan cepat dan bebas salah tanda (plus/minus) adalah fondasi seluruh soal kuantitatif. Banyak kesalahan di UTBK terjadi pada hal sederhana seperti kalimat 'pengurangan A dari B' yang seharusnya dihitung sebagai B − A, bukan A − B.",
    "Sub-materi ini melatih ketelitian manipulasi aljabar, eliminasi-substitusi SPLDV, serta penerjemahan kalimat soal cerita (seperti perbandingan umur atau selisih bilangan) ke dalam persamaan linear.",
    "1. Ketelitian Tanda pada Pengurangan & Pecahan Aljabar",
    "Perhatikan struktur bahasa matematika pada soal:",
    [
      "'Hasil pengurangan P dari Q' berarti Q − P (berikan tanda kurung pada seluruh suku P sebelum membuka tanda minus).",
      "Pada pecahan aljabar (x² − y²)/(x − y), faktorkan pembilang menjadi (x − y)(x + y) lalu sederhanakan menjadi x + y (untuk x ≠ y).",
    ],
    "2. Pemodelan SPLDV (Soal Umur & Bilangan)",
    "Saat memodelkan soal umur:",
    [
      "Jika umur sekarang adalah A dan B, maka n tahun yang lalu umur mereka masing-masing adalah (A − n) dan (B − n) — keduanya berkurang n, sehingga jumlah umur mereka berkurang 2n!",
      "Selisih umur dua orang selalu tetap (konstan) sepanjang waktu.",
    ],
    "Ingat: 'Kurangkan A dari B' = B − A, sedangkan 'Kurangkan A dengan B' = A − B. Jangan sampai terbalik!",
  ),
  createLesson(
    "PK",
    8,
    "08. Operasi Khusus Bilangan Real",
    "Aljabar, Eksponen, & Persamaan Kuadrat",
    "a ⊕ b = Rumus(a, b)  →  Kerjakan di Dalam Kurung Terlebih Dahulu",
    "Menyelesaikan soal simbol operasi biner baru (⊕, ⊗, ★, ◆) beserta operasi bersarang dan persamaan variabel.",
    "Soal Operasi Khusus mendefinisikan simbol baru (seperti a ⊕ b, a ⊗ b, atau a ★ b) dengan aturan aritmetika tertentu yang hanya berlaku untuk soal tersebut. Tipe soal ini hampir selalu muncul minimal 1–2 nomor di setiap paket PK UTBK-SNBT.",
    "Kunci utamanya adalah membaca posisi variabel kiri (elemen pertama) dan variabel kanan (elemen kedua) secara disiplin, serta mendahulukan operasi yang berada di dalam tanda kurung.",
    "1. Aturan Evaluasi Operasi Biner Baru",
    "Ikuti langkah substitusi berurutan:",
    [
      "Untuk menghitung p ⊕ (q ⊕ r), hitung terlebih dahulu nilai k = (q ⊕ r) dengan memasang a = q dan b = r.",
      "Setelah memperoleh angka k, hitung p ⊕ k dengan memasang a = p dan b = k.",
      "Jangan mengasumsikan sifat komutatif (a ⊕ b belum tentu sama dengan b ⊕ a) kecuali rumusnya simetris!",
    ],
    "2. Mencari Nilai Variabel di Dalam Operasi Khusus",
    "Jika diketahui (x ⊕ 3) = 15 dan ditanyakan nilai x:",
    [
      "Substitusikan a = x dan b = 3 ke dalam definisi rumus sehingga terbentuk persamaan aljabar biasa dalam variabel x, lalu selesaikan.",
    ],
    "Hati-hati dengan bilangan negatif saat disubstitusikan ke operasi pangkat atau pengurangan: selalu bungkus angka negatif dengan tanda kurung, mis. (−2)² = 4!",
  ),
  createLesson(
    "PK",
    9,
    "09. Bangun Datar & Geometri Koordinat",
    "Geometri & Trigonometri",
    "L_segitiga_sama_sisi = (s²/4)√3  |  Jarak = √((x₂−x₁)² + (y₂−y₁)²)",
    "Perhitungan luas, keliling, diagonal, dan koordinat titik sudut pada segitiga, persegi, trapesium, jajargenjang, dan lingkaran.",
    "Geometri bidang datar dan koordinat Kartesius di PK menguji kemampuan visualisasi bangun serta hubungan antara panjang sisi, tinggi, dan luas. Banyak soal menjadi sangat singkat apabila kamu mengenali tripel Pythagoras dan rumus khusus segitiga sama sisi.",
    "Pada bidang koordinat Kartesius, panjang ruas garis yang sejajar sumbu-x cukup dihitung dari selisih absis |x₂ − x₁|, sedangkan garis sejajar sumbu-y dari selisih ordinat |y₂ − y₁|.",
    "1. Rumus Cepat Segitiga & Bangun Segiempat",
    "Hafalkan hubungan metrik berikut:",
    [
      "Segitiga sama sisi bersisi s: Tinggi t = (s/2)√3 dan Luas L = (s²/4)√3 = (t²/3)√3.",
      "Belah ketupat & Layang-layang: Luas L = ½ · d₁ · d₂, dengan kedua diagonal berpotongan tegak lurus.",
      "Trapesium: Luas L = ½ · (jumlah sisi sejajar) · tinggi.",
    ],
    "2. Sifat Titik Sudut pada Geometri Koordinat",
    "Pada jajargenjang ABCD dengan urutan titik berputar konsisten:",
    [
      "Berlaku hubungan vektor titik sudut: A + C = B + D, sehingga koordinat titik keempat dapat langsung dihitung dengan C = B + D − A!",
    ],
    "Hafalkan tripel Pythagoras dasar: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25) beserta kelipatannya untuk menghemat waktu hitung akar!",
  ),
  createLesson(
    "PK",
    10,
    "10. Kesebangunan & Kekongruenan",
    "Geometri & Trigonometri",
    "Segitiga Sebangun: a₁/a₂ = b₁/b₂ = c₁/c₂ = k  →  Luas₁ / Luas₂ = k²",
    "Perbandingan sisi-sisi bersesuaian pada segitiga sebangun, garis sejajar dalam segitiga, dan proyeksi segitiga siku-siku.",
    "Dua bangun datar dikatakan sebangun jika sudut-sudut yang bersesuaian sama besar dan sisi-sisi yang bersesuaian memiliki perbandingan yang sama (konstan = faktor skala k).",
    "Dalam soal PK, kesebangunan sering muncul pada segitiga yang dipotong garis sejajar salah satu sisinya, bayangan tiang/gedung, serta segitiga siku-siku yang ditarik garis tinggi ke sisi miringnya.",
    "1. Perbandingan Sisi vs. Perbandingan Luas",
    "Perhatikan perbedaan pangkat pada rasio panjang dan rasio luas:",
    [
      "Jika rasio sisi-sisi bersesuaian dua segitiga sebangun adalah k = s₁ : s₂, maka rasio keliling dan rasio tingginya juga s₁ : s₂.",
      "NAMUN rasio luas kedua segitiga sebangun tersebut adalah kuadrat dari rasio sisinya: L₁ : L₂ = s₁² : s₂²!",
    ],
    "2. Garis Tinggi ke Sisi Miring Segitiga Siku-Siku",
    "Pada segitiga siku-siku ABC (siku-siku di B) dengan garis tinggi BD tegak lurus sisi miring AC:",
    [
      "Gunakan kesamaan luas: ½ · AB · BC = ½ · AC · BD → BD = (AB · BC) / AC.",
      "Sifat proyeksi (Dalil Proyeksi/Air Mancur): BD² = AD · DC dan AB² = AD · AC.",
    ],
    "Untuk mencari garis tinggi ke sisi miring segitiga siku-siku, rumus tercepat adalah (perkalian dua sisi siku-siku) dibagi (sisi miring)!",
  ),
  createLesson(
    "PK",
    11,
    "11. Trigonometri Sudut Lancip",
    "Geometri & Trigonometri",
    "sin α = de/mi  |  cos α = sa/mi  |  tan α = de/sa  |  sin²α + cos²α = 1",
    "Perbandingan trigonometri pada segitiga siku-siku, nilai sudut istimewa (0°, 30°, 45°, 60°, 90°), dan identitas dasar.",
    "Trigonometri sudut lancip di PK berfokus pada perbandingan sisi segitiga siku-siku (depan, samping, miring) serta pemanfaatan identitas Pythagoras sin²α + cos²α = 1.",
    "Jika satu perbandingan trigonometri diketahui (misalnya sin α = 2/3 atau tan α = 3/4), kamu dapat langsung menggambar segitiga siku-siku bantu dan mencari sisi ketiga menggunakan teorema Pythagoras.",
    "1. Perbandingan Segitiga Siku-Siku & Sudut Berpenyiku",
    "Kuasai hubungan dasar berikut:",
    [
      "sin α = depan / miring, cos α = samping / miring, tan α = depan / samping = sin α / cos α.",
      "Sudut Berpenyiku (Komplemen α + β = 90°): berlaku sin α = cos β dan tan α = cot β = 1 / tan β.",
    ],
    "2. Tabel Sudut Istimewa Wajib Hafal",
    "Hafalkan nilai sin, cos, dan tan untuk sudut istimewa:",
    [
      "30°: sin 30° = ½, cos 30° = ½√3, tan 30° = ⅓√3.",
      "45°: sin 45° = ½√2, cos 45° = ½√2, tan 45° = 1.",
      "60°: sin 60° = ½√3, cos 60° = ½, tan 60° = √3.",
    ],
    "Jika diketahui sin α + cos α = p, kuadratkan kedua ruas menjadi (sin²α + cos²α) + 2 sin α cos α = p² → 1 + 2 sin α cos α = p²!",
  ),
  createLesson(
    "PK",
    12,
    "12. Trigonometri Kuadran & Identitas",
    "Geometri & Trigonometri",
    "Kuadran I: Semua (+) | II: sin (+) | III: tan (+) | IV: cos (+)",
    "Nilai trigonometri di empat kuadran, sudut berelasi (180°±α, 360°−α), aturan sinus/kosinus, dan luas segitiga.",
    "Bagian penutup PK ini memperluas konsep trigonometri ke sudut tumpul dan sudut di Kuadran I sampai IV (0° hingga 360°), serta penerapannya pada segitiga sembarang.",
    "Kunci utama sudut berelasi adalah menentukan TANDA positif/negatif sesuai kuadrannya terlebih dahulu, kemudian menentukan besar sudut lancip relasinya terhadap sumbu mendatar (180° atau 360°).",
    "1. Aturan Tanda Kuadran & Sudut Berelasi",
    "Gunakan jembatan keledai 'Semua Sindikat Tangan Kosong':",
    [
      "Kuadran I (0°–90°): Semua positif.",
      "Kuadran II (90°–180°, relasi 180° − α): Hanya sin (dan csc) yang positif; cos(180° − α) = −cos α.",
      "Kuadran III (180°–270°, relasi 180° + α): Hanya tan (dan cot) yang positif.",
      "Kuadran IV (270°–360°, relasi 360° − α atau −α): Hanya cos (dan sec) yang positif.",
    ],
    "2. Luas Segitiga & Aturan Kosinus",
    "Untuk segitiga sembarang ABC:",
    [
      "Luas Segitiga jika diketahui 2 sisi dan 1 sudut apit: L = ½ · a · b · sin C.",
      "Aturan Kosinus: c² = a² + b² − 2ab cos C.",
    ],
    "Selalu gunakan relasi terhadap 180° atau 360° agar nama fungsi trigonometri TIDAK berubah (sin tetap sin, cos tetap cos); tinggal sesuaikan tanda +/− kuadrannya!",
  ),
];

const PM_LESSONS: ReadonlyArray<SubMaterialLesson> = [
  createLesson(
    "PM",
    1,
    "01. Geometri Lingkaran, Laju, & Rute Perjalanan",
    "Geometri Kontekstual & Bangun Ruang",
    "Lintasan Roda = n × 2πr  |  Waktu Tempuh = Jarak / Kecepatan",
    "Pemodelan putaran roda, laju perubahan kontekstual, aritmetika data penumpang/biaya, serta rute perjalanan.",
    "Penalaran Matematika (PM) menguji kemampuan menerapkan konsep matematika dalam konteks dunia nyata. Setiap paket PM di UTBK-SNBT berbasis stimulus (cerita kontekstual, tabel tarif, atau skema rute) yang diikuti beberapa pertanyaan berantai.",
    "Pada Paket 1 ini, kamu akan melatih pemodelan keliling lingkaran pada putaran roda, perbandingan laju, perhitungan biaya tiket penerbangan, dan akumulasi waktu perjalanan antar-titik.",
    "1. Putaran Roda & Keliling Lingkaran",
    "Hubungkan jari-jari roda (r) atau diameter (d) dengan panjang lintasan (s):",
    [
      "Satu putaran penuh roda menempuh jarak sejauh keliling lingkaran: K = 2πr = πd.",
      "Panjang lintasan untuk n putaran adalah s = n × K, sehingga banyak putaran n = s / K.",
    ],
    "2. Analisis Tabel Biaya & Rute Perjalanan",
    "Saat membaca stimulus rute atau jadwal:",
    [
      "Pisahkan waktu tempuh perjalanan di jalan dengan waktu singgah/tunggu di setiap pos.",
      "Pastikan satuan waktu sudah seragam (ubah jam ke menit atau sebaliknya) sebelum menjumlahkan.",
    ],
    "Catat angka-angka kunci dari stimulus di kertas buram saat membaca soal pertama karena angka yang sama akan dipakai lagi di soal nomor berikutnya!",
  ),
  createLesson(
    "PM",
    2,
    "02. Pythagoras, Bangun Gabungan, & Jangkauan",
    "Geometri Kontekstual & Bangun Ruang",
    "c = √(a² + b²)  |  Luas Jangkauan Pancaran = πr² (atau Juring Lingkaran)",
    "Penerapan teorema Pythagoras pada tali/tangga, luas bangun datar gabungan, serta daerah jangkauan sinyal/sprinkler.",
    "Banyak persoalan fisik sehari-hari—seperti panjang tali penyangga tiang, jangkauan pancaran penyiram tanaman (sprinkler), atau luas lahan gabungan—dapat disederhanakan menjadi segitiga siku-siku, trapesium, dan lingkaran.",
    "Dalam sub-materi ini, fokus utama adalah menerjemahkan deskripsi posisi benda (utara-selatan, tinggi tiang, jarak mendatar, radius pancaran) menjadi sketsa geometri datar.",
    "1. Pemodelan Pythagoras Kontekstual",
    "Kenali situasi yang membentuk segitiga siku-siku:",
    [
      "Tiang vertikal dengan tinggi h yang diikat tali ke pasak sejauh x di tanah: panjang tali miring adalah s = √(h² + x²).",
      "Pergerakan ke arah Timur/Barat (sumbu-x) dilanjutkan ke Utara/Selatan (sumbu-y) saling tegak lurus.",
    ],
    "2. Daerah Jangkauan Melingkar (Sprinkler / Pemancar)",
    "Sebuah alat penyiram air atau pemancar sinyal dengan jangkauan sejauh r ke segala arah:",
    [
      "Menjangkau daerah berbentuk lingkaran penuh dengan diameter d = 2r dan luas L = πr².",
      "Jika diletakkan di sudut siku-siku tembok, daerah yang terjangkau di dalam taman adalah ¼ lingkaran.",
    ],
    "Selalu buat sketsa kecil segitiga atau lingkaran dari soal cerita agar tidak tertukar antara jari-jari (r) dan diameter (2r)!",
  ),
  createLesson(
    "PM",
    3,
    "03. Bangun Ruang, Prisma, Limas, & Jaring-Jaring",
    "Geometri Kontekstual & Bangun Ruang",
    "V_prisma = Luas Alas × t  |  LP_balok = 2(pl + pt + lt)  |  V_limas = ⅓ × Luas Alas × t",
    "Perhitungan volume, kapasitas, luas permukaan pengecatan/bahan, dan analisis ukuran bangun ruang tiga dimensi.",
    "Geometri ruang dalam Penalaran Matematika sering muncul dalam konteks pembuatan kemasan produk, kapasitas tangki air, kebutuhan cat dinding/atap, atau konstruksi tenda berbentuk prisma dan limas.",
    "Kunci utamanya adalah mengidentifikasi bangun ruang apa yang dimaksud, bagian mana saja yang dihitung luas permukaannya (misalnya bak terbuka tanpa tutup hanya menghitung 5 sisi), serta konversi satuan volume.",
    "1. Rumus Volume & Luas Permukaan Prisma/Balok",
    "Pastikan rumus dasar berikut dikuasai di luar kepala:",
    [
      "Balok berukuran panjang p, lebar l, tinggi t: Volume V = p × l × t dan Luas Permukaan LP = 2(pl + pt + lt).",
      "Prisma tegak sembarang: Volume V = Luas Alas × tinggi prisma.",
      "Diagonal ruang balok: d_ruang = √(p² + l² + t²).",
    ],
    "2. Konversi Satuan Volume Kontekstual",
    "Perhatikan konversi ke liter pada soal tangki/kolam:",
    [
      "1 m³ = 1.000 dm³ = 1.000 liter.",
      "1 liter = 1 dm³ = 1.000 cm³ (ml/cc).",
    ],
    "Saat menghitung luas permukaan balok LP = 2(pl + pt + lt), kalikan ketiga pasangan ukuran terlebih dahulu (pl, pt, lt), jumlahkan, baru kalikan 2!",
  ),
  createLesson(
    "PM",
    4,
    "04. Optimasi Wadah, Penampang, & Volume",
    "Geometri Kontekstual & Bangun Ruang",
    "Karton (P × L) dipotong ujung x cm  →  Kotak berukuran (P − 2x) × (L − 2x) × x",
    "Pemodelan pembuatan kotak dari lembaran karton, luas penampang, diagonal ruang, dan penentuan ukuran optimum.",
    "Salah satu masalah klasik paling populer di Penalaran Matematika adalah pembuatan wadah/kotak tanpa tutup dari selembar karton persegi panjang yang keempat sudutnya dipotong berbentuk persegi berukuran x × x lalu dilipat ke atas.",
    "Soal tipe ini menguji kemampuan kamu memodelkan ukuran baru setelah pelipatan dan mengevaluasi bagaimana perubahan nilai x memengaruhi luas alas serta volume kotak.",
    "1. Rumus Kotak Hasil Lipatan Karton",
    "Jika karton awal berukuran panjang P dan lebar L dipotong persegi bersisi x di keempat sudutnya:",
    [
      "Panjang alas kotak menjadi: p = P − 2x (berkurang 2x karena dipotong di ujung kiri dan kanan!).",
      "Lebar alas kotak menjadi: l = L − 2x.",
      "Tinggi kotak menjadi: t = x.",
      "Luas alas kotak = (P − 2x)(L − 2x) dan Volume kotak = (P − 2x)(L − 2x)·x.",
    ],
    "2. Syarat Batas Domain Ukuran (Interval Fisik)",
    "Dalam konteks nyata, panjang, lebar, dan tinggi harus bernilai positif:",
    [
      "Syarat x > 0 dan L − 2x > 0 → 0 < x < L/2.",
    ],
    "Jangan lupa mengurangi panjang dan lebar karton dengan 2x (bukan x saja) karena pemotongan sudut dilakukan di kedua ujung sisi!",
  ),
  createLesson(
    "PM",
    5,
    "05. Fungsi Linear/Kuadrat & Laju Perubahan",
    "Pemodelan Fungsi & Perubahan Kuantitas",
    "Perubahan Δy = v · Δt  |  y(t) = y₀ + v·t",
    "Memodelkan besaran yang berubah terhadap waktu secara linear maupun kuadratik (riak air, gerak lurus, dan skala).",
    "Banyak fenomena sehari-hari melibatkan besaran yang berubah secara teratur seiring berjalannya waktu (t), seperti meluasnya jari-jari riak air di kolam, bertambahnya tinggi tanaman, atau berkurangnya bahan bakar kendaraan.",
    "Dalam sub-materi ini, kamu berlatih menyusun fungsi matematis f(t) dari laju perubahan konstan dan menghitung nilai besaran turunan (seperti keliling atau luas) pada detik ke-t.",
    "1. Laju Perubahan Linear terhadap Waktu",
    "Jika suatu besaran bertambah secara konstan sebesar v satuan setiap detik:",
    [
      "Pertambahan setelah t detik adalah Δr = v × t.",
      "Jika terdapat nilai awal r₀ pada t = 0, maka nilai pada detik ke-t adalah r(t) = r₀ + v·t.",
    ],
    "2. Dampak Perubahan Linear pada Luas & Volume",
    "Perhatikan hubungan pangkat saat jari-jari berubah:",
    [
      "Jika jari-jari lingkaran pada detik ke-t adalah r(t) = 2t, maka luasnya tumbuh secara kuadratik: L(t) = π·(2t)² = 4πt².",
      "Jika jari-jari menjadi k kali lipat, maka luas menjadi k² kali lipat dan volume menjadi k³ kali lipat.",
    ],
    "Baca dengan cermat apakah soal menanyakan 'pertambahan nilai' (Δy) atau 'nilai akhir total' (y₀ + Δy)!",
  ),
  createLesson(
    "PM",
    6,
    "06. Pemodelan Fungsi dalam Fenomena Alam",
    "Pemodelan Fungsi & Perubahan Kuantitas",
    "Substitusi Variabel Kontekstual ke Rumus Model & Interpretasi Makna Koefisien",
    "Menerapkan model fungsi matematika untuk menganalisis fenomena fisika, biologi, dan lingkungan.",
    "Pada Paket 6 ini, pemodelan fungsi diperluas untuk membaca hubungan antarvariabel pada fenomena alam—seperti lintasan gerak benda, pertumbuhan populasi, penyusutan zat, dan konversi suhu/kedalaman.",
    "Kamu tidak perlu menghafal rumus fisika atau biologi yang rumit karena rumus atau pola hubungan variabel selalu diberikan di dalam teks stimulus; tugasmu adalah menafsirkan arti setiap variabel dan melakukan substitusi dengan tepat.",
    "1. Menafsirkan Gradien dan Konstanta dalam Model Kontekstual",
    "Pada model linear y = a·x + b:",
    [
      "Konstanta b (saat x = 0) menyatakan kondisi awal (initial value) sebelum proses dimulai.",
      "Koefisien a (gradien) menyatakan laju perubahan y untuk setiap kenaikan 1 satuan x.",
    ],
    "2. Pola Kuadratik (Gerak Parabola / Lintasan)",
    "Pada model kuadrat h(t) = −at² + bt + c:",
    [
      "Waktu saat mencapai tinggi maksimum adalah t_maks = b / (2a).",
      "Benda kembali menyentuh tanah ketika h(t) = 0.",
    ],
    "Selalu periksa satuan variabel di dalam rumus (apakah t dalam detik, menit, atau jam) sebelum memasukkan angka dari soal!",
  ),
  createLesson(
    "PM",
    7,
    "07. Statistika Kelas & Klasemen Pertandingan",
    "Statistika, Data, & Kombinatorika Terapan",
    "Jumlah Nilai (Σx) = n × Rata-rata  |  Total Poin = (Menang × p_M) + (Seri × p_S)",
    "Rata-rata gabungan nilai siswa, perubahan rata-rata saat data ditambah/dikurangi, serta logika poin klasemen olahraga.",
    "Statistika terapan dan tabel klasemen turnamen adalah dua konteks favorit di Penalaran Matematika karena menguji ketajaman berhitung logis tanpa rumus yang berbelit-belit.",
    "Kunci utama soal rata-rata adalah segera mengubah kalimat 'rata-rata n siswa adalah x̄' menjadi 'Total Nilai = n × x̄'. Sementara untuk soal klasemen pertandingan, perhatikan jumlah laga yang dimainkan, poin menang/seri/kalah, dan banyak pertandingan antar-tim.",
    "1. Rumus Rata-Rata Gabungan & Perubahan Data",
    "Gunakan konsep Total Nilai:",
    [
      "Total nilai n siswa dengan rata-rata x̄ adalah Σx = n · x̄.",
      "Rata-rata gabungan dua kelompok: x̄_gab = (n₁·x̄₁ + n₂·x̄₂) / (n₁ + n₂).",
      "Jika 1 siswa baru masuk dan rata-rata naik, maka: Nilai siswa baru = Total Baru − Total Lama.",
    ],
    "2. Logika Klasemen & Sistem Kompetisi (Round-Robin)",
    "Dalam turnamen olahraga:",
    [
      "Total Poin = (Banyak Menang × Poin Menang) + (Banyak Seri × Poin Seri) + (Banyak Kalah × Poin Kalah).",
      "Jika n tim saling bertemu tepat satu kali (setengah kompetisi), total pertandingan seluruhnya adalah C(n, 2) = n(n − 1)/2.",
    ],
    "Setiap kali membaca kata 'rata-rata', langsung kalikan banyak data dengan rata-ratanya untuk mendapatkan Jumlah Total!",
  ),
  createLesson(
    "PM",
    8,
    "08. Data Penduduk, Diagram, & Ukuran Penyebaran",
    "Statistika, Data, & Kombinatorika Terapan",
    "Bagian Diagram = (Sudut/360°) × Total  =  (Persen/100%) × Total",
    "Membaca tabel demografi, diagram batang/lingkaran, rasio proporsi, rata-rata, jangkauan, dan simpangan data.",
    "Literasi membaca data visual (tabel, diagram batang, diagram garis, dan diagram lingkaran) merupakan kompetensi inti Penalaran Matematika. Soal sering menggabungkan persentase dari diagram lingkaran dengan perbandingan rasio pada tabel.",
    "Selain ukuran pemusatan (mean, median, modus), pahami pula ukuran penyebaran data seperti jangkauan (range), kuartil, dan simpangan rata-rata/baku sederhana.",
    "1. Proporsi pada Diagram Lingkaran & Rasio",
    "Hubungkan persentase atau sudut pusat dengan nilai total:",
    [
      "Nilai kategori A = (%A / %B) × Nilai kategori B (tidak perlu mencari total keseluruhan jika sudah diketahui nilai salah satu kategori!).",
      "Pada rasio A : B = p : q, jika diketahui jumlah A + B = S, maka A = (p / (p + q)) × S.",
    ],
    "2. Ukuran Pemusatan & Penyebaran Data",
    "Kenali sifat perubahan data terhadap statistik:",
    [
      "Jika setiap data ditambah konstanta k, maka rata-rata, median, dan modus ikut bertambah k, TETAPI jangkauan dan simpangan baku TIDAK BERUBAH!",
      "Jika setiap data dikali k, maka semua ukuran pemusatan dan ukuran penyebaran ikut dikali k.",
    ],
    "Ingat sifat emas statistika: menambah angka yang sama ke seluruh data menggeser rata-rata, tetapi tidak mengubah selisih/simpangan antardata!",
  ),
  createLesson(
    "PM",
    9,
    "09. Kombinatorika & Peluang Kontekstual",
    "Statistika, Data, & Kombinatorika Terapan",
    "Permutasi (Urutan Penting): P(n,r) = n!/(n−r)!  |  Kombinasi (Tim/Pasangan): C(n,r) = n!/(r!(n−r)!)",
    "Kaidah pencacahan (aturan perkalian, permutasi, kombinasi) dan perhitungan peluang kejadian dalam masalah nyata.",
    "Sub-materi penutup Penalaran Matematika ini membahas kaidah pencacahan (counting principles) dan peluang kejadian dalam skenario nyata: pemilihan anggota tim, penyusunan jadwal/tempat duduk, banyaknya jabat tangan, hingga peluang terambilnya sampel.",
    "Langkah paling krusial sebelum menghitung adalah menentukan apakah urutan pemilihan diperhatikan (Permutasi) atau urutan tidak diperhatikan (Kombinasi).",
    "1. Membedakan Aturan Perkalian, Permutasi, dan Kombinasi",
    "Gunakan pertanyaan uji 'Apakah AB berbeda dengan BA?':",
    [
      "Aturan Perkalian (Filling Slots): Jika kejadian 1 punya m cara dan kejadian 2 punya n cara, maka total cara keduanya terjadi berurutan adalah m × n.",
      "Permutasi (AB ≠ BA, urutan/jabatan penting): Memilih Ketua-Sekretaris-Bendahara, menyusun kode PIN/angka, atau urutan duduk berjajar.",
      "Kombinasi (AB = BA, urutan tidak penting): Memilih 3 wakil delegasi, memilih soal yang dikerjakan, atau banyak jabat tangan antar n orang yakni C(n, 2) = n(n − 1)/2.",
    ],
    "2. Rumus Peluang Kejadian",
    "Peluang kejadian A didefinisikan sebagai:",
    [
      "P(A) = n(A) / n(S), dengan n(A) banyak kejadian yang diharapkan dan n(S) total seluruh titik sampel.",
      "Peluang komplemen ('minimal satu'): P(minimal 1) = 1 − P(tidak ada sama sekali).",
    ],
    "Untuk menghitung C(n, 2) seperti banyak jabat tangan atau banyak pertandingan antar n peserta, gunakan rumus kilat: n × (n − 1) dibagi 2!",
  ),
];

const PPU_LESSONS: ReadonlyArray<SubMaterialLesson> = [
  createLesson(
    "PPU",
    1,
    "01. Makna Kata Kontekstual & Diksi",
    "Morfologi, Kosakata, & Relasi Makna",
    "Makna Kontekstual = Arti Kamus yang Selaras dengan Kalimat Sebelum & Sesudah",
    "Menentukan arti kata ilmiah/serapan dan ketepatan diksi berdasarkan konteks kalimat wacana.",
    "Pengetahuan dan Pemahaman Umum (PPU) menguji keluasan kosakata bahasa Indonesia serta kepekaan memahami makna kata di dalam konteks kalimat. Satu kata dapat memiliki makna denotatif (lugas), konotatif (kiasan), maupun makna khusus sesuai bidang keilmuan.",
    "Ketika menghadapi kata serapan atau istilah akademik (seperti 'euforia', 'memitigasi', 'mengakomodasi', 'anomali'), jangan hanya mengandalkan tebakan bunyi; perhatikan objek dan keterangan yang mengikuti kata tersebut di dalam kalimat.",
    "1. Cara Menentukan Makna Kata dari Konteks",
    "Gunakan petunjuk di dalam kalimat:",
    [
      "Perhatikan hubungan sebab-akibat atau tujuan di dalam kalimat (mis. 'memitigasi dampak kekeringan melalui pembangunan embung' → mengurangi risiko dampak buruk).",
      "Perhatikan kolokasi (kata pasangan yang lazim): 'mengakomodasi kebutuhan', 'mereduksi kesenjangan'.",
    ],
    "2. Menguji Penggantian Kata (Substitusi)",
    "Saat diminta mencari kata pengganti:",
    [
      "Masukkan opsi jawaban ke dalam kalimat asli.",
      "Pastikan kelas katanya sama (verba diganti verba, nomina diganti nomina) dan nuansa formalitasnya tetap terjaga.",
    ],
    "Jika ragu dengan arti istilah serapan, hubungkan dengan kata bahasa Inggris asalnya (mitigate → mengurangi risiko, accommodate → memenuhi kebutuhan, reduce → mengurangi)!",
  ),
  createLesson(
    "PPU",
    2,
    "02. Sinonim, Antonim, & Relasi Semantik",
    "Morfologi, Kosakata, & Relasi Makna",
    "Sinonim (=)  |  Antonim (><)  |  Hipernim (Umum) › Hiponim (Khusus)",
    "Memahami relasi makna antarkata: persamaan makna, pertentangan makna, serta hierarki hipernim-hiponim.",
    "Relasi semantik membahas bagaimana makna suatu kata berhubungan dengan makna kata lainnya. Dalam UTBK-SNBT, selain sinonim dan antonim kontekstual, soal PPU sering menanyakan relasi cakupan makna seperti hipernim–hiponim (kata umum dan kata khusus) serta polisemi dan homonim.",
    "Memahami hierarki makna membantu kamu mengenali bagaimana penulis mengganti istilah spesifik dengan istilah payung agar kalimat tidak monoton.",
    "1. Jenis-Jenis Relasi Makna di PPU",
    "Bedakan empat relasi semantik berikut:",
    [
      "Sinonim: Kata yang memiliki makna sama/mirip dalam konteks (mereduksi = mengurangi; akselerasi = percepatan).",
      "Antonim: Kata yang bermakna berlawanan (sporadis >< kontinu; progresif >< regresif/statis; akut >< kronis).",
      "Hipernim & Hiponim: Hipernim adalah kategori umum (mis. Kendaraan, Sastra), sedangkan Hiponim adalah anggota khususnya (mis. Kereta Api, Puisi).",
      "Polisemi: Satu kata yang memiliki banyak makna yang masih berkaitan (mis. 'kepala' pada kepala sekolah, kepala keluarga, kepala kereta).",
    ],
    "2. Menjaga Kesetaraan Urutan pada Relasi Pasangan Kata",
    "Jika soal menanyakan pasangan berelasi Hipernim : Hiponim, pastikan opsi yang dipilih juga berurutan Umum : Khusus, bukan Khusus : Umum.",
    [
      "Periksa apakah kata kedua benar-benar merupakan jenis dari kata pertama (dan bukan sekadar bagian fisik/meronimi).",
    ],
    "Bedakan Hiponim (jenis dari) dan Meronim (bagian fisik dari): 'Kereta Api adalah jenis Kendaraan' (Hiponim), sedangkan 'Roda adalah bagian dari Kendaraan' (Meronim)!",
  ),
  createLesson(
    "PPU",
    3,
    "03. Afiksasi (Imbuhan) & Makna Gramatikal",
    "Morfologi, Kosakata, & Relasi Makna",
    "Imbuhan Sama (ber- / meN- / peN-an)  →  Bandingkan Makna Gramatikalnya dalam Kalimat",
    "Menganalisis variasi makna gramatikal yang muncul ketika kata dasar mendapat imbuhan.",
    "Satu imbuhan yang sama dalam bahasa Indonesia dapat melahirkan makna gramatikal yang berbeda-beda bergantung pada kata dasar yang dilekatinya. Misalnya, awalan 'ber-' pada 'bersepeda' bermakna mengendarai, pada 'bertani' bermakna bekerja sebagai, dan pada 'berpelukan' bermakna saling.",
    "Soal PPU sangat gemar menanyakan: 'Kata berimbuhan X pada kalimat di atas memiliki makna yang sama dengan kata berimbuhan X pada kalimat manakah di bawah ini?'",
    "1. Variasi Makna Gramatikal Imbuhan Populer",
    "Kenali variasi makna imbuhan yang sering keluar di SNBT:",
    [
      "Awalan ber-: memakai/mengendarai (bersepeda, bermobil, berbaju), menghasilkan/mempunyai (bertelur, bernama), melakukan pekerjaan (bertani), resiprokal/saling (bersalaman).",
      "Awalan meN-: menuju ke (melaut, menepi, mendarat), menjadi (mengeras, mencair, menguning), melakukan tindakan dengan alat (menyapu, mencangkul).",
      "Konfiks peN-...-an vs per-...-an: peN-...-an menyatakan proses/perbuatan aktif (pemukiman = proses memukimkan), sedangkan per-...-an menyatakan tempat/hal (permukiman = kawasan tempat bermukim).",
    ],
    "2. Trik 파라frase Kalimat",
    "Untuk mencari makna imbuhan yang sama:",
    [
      "Ubah kata berimbuhan di soal menjadi frasa penjelas (mis. 'bersepeda' = 'naik/mengendarai sepeda'), lalu cari opsi yang bisa diubah dengan frasa penjelas yang persis sama ('bermobil' = 'naik/mengendarai mobil').",
    ],
    "Jangan terkecoh oleh kata dasar yang mirip; uji dengan mengganti imbuhannya menjadi kata kerja penjelas ('mengendarai', 'menuju ke', 'menjadi')!",
  ),
  createLesson(
    "PPU",
    4,
    "04. Kelompok Kata (Frasa) & Pasangan Idiomatis",
    "Frasa, Klausa, & Kepaduan Paragraf",
    "Frasa Endosentris (DM / MD)  |  Pasangan Idiomatis Baku (bergantung pada, terdiri atas)",
    "Menganalisis struktur kelompok kata (frasa), kesamaan pola frasa, keambiguan frasa, dan pasangan kata idiomatis.",
    "Frasa adalah gabungan dua kata atau lebih yang bersifat nonpredikatif (tidak membentuk subjek-predikat baru) dan menduduki satu fungsi sintaksis di dalam kalimat. Di PPU, kamu sering diminta mencari frasa yang memiliki pola struktur yang sama dengan frasa bercetak tebal pada teks.",
    "Selain struktur kelas kata pembentuk frasa (seperti Nomina + Nomina atau Adverbia + Adjektiva), cermati pula pasangan kata berpreposisi tetap (ungkapan idiomatis) dalam bahasa Indonesia.",
    "1. Menentukan Pola Kelas Kata Pembentuk Frasa",
    "Bedah kelas kata setiap unsur pembentuk frasa:",
    [
      "Frasa Nominal (Inti Kata Benda): 'studi lapangan' (Nomina + Nomina), 'meja kayu' (Nomina + Nomina), 'kemeja putih' (Nomina + Adjektiva).",
      "Frasa Verbal (Inti Kata Kerja): 'sedang membaca' (Adverbia/Aspek + Verba), 'telah selesai' (Adverbia + Verba).",
      "Frasa Adjektival (Inti Kata Sifat): 'sangat cepat' (Adverbia + Adjektiva), 'cukup efektif' (Adverbia + Adjektiva).",
      "Frasa Preposisional (Diawali Kata Depan): 'di perpustakaan', 'ke pasar', 'dari desa'.",
    ],
    "2. Daftar Pasangan Kata Idiomatis Baku",
    "Hafalkan pasangan tetap berikut:",
    [
      "bergantung pada (bukan tergantung dari / bergantung terhadap).",
      "terdiri atas (bukan terdiri dari).",
      "sesuai dengan (bukan sesuai sama), sejalan dengan, disebabkan oleh, berdiskusi tentang.",
    ],
    "Saat mencari frasa yang sepola dengan [Kata 1 + Kata 2], tentukan kelas kata (Benda/Kerja/Sifat) dari Kata 1 dan Kata 2 secara berurutan!",
  ),
  createLesson(
    "PPU",
    5,
    "05. Kepaduan Paragraf & Kalimat Sumbang",
    "Frasa, Klausa, & Kepaduan Paragraf",
    "Kohesi (Rujukan & Konjungsi) + Koherensi (Satu Topik Utuh, Bebas Kalimat Sumbang)",
    "Mengidentifikasi kalimat tidak padu (sumbang), melengkapi kalimat rumpang, dan melacak rujukan pronomina.",
    "Paragraf yang padu (koheren) hanya membicarakan satu gagasan pokok dari kalimat pertama hingga kalimat terakhir. Apabila terdapat satu kalimat yang tiba-tiba melenceng membahas subtopik lain yang tidak mendukung kalimat utama, kalimat tersebut disebut kalimat sumbang (tidak padu).",
    "Selain mendeteksi kalimat sumbang, sub-materi ini juga membahas cara mengisi bagian rumpang di tengah paragraf agar jembatan logika antarkalimat tetap utuh.",
    "1. Cara Cepat Mendeteksi Kalimat Sumbang",
    "Bandingkan subjek bahasan tiap kalimat:",
    [
      "Tentukan topik bersama yang mengikat mayoritas kalimat (misalnya 4 kalimat membahas dampak menunda waktu belajar/prokrastinasi).",
      "Cari 1 kalimat yang walaupun memakai satu kata yang mirip, intinya membahas hal di luar topik (misalnya membahas harga jual tablet di toko daring).",
    ],
    "2. Melengkapi Kalimat Rumpang & Kata Rujukan",
    "Saat mengisi kalimat rumpang di posisi (3) di antara kalimat (2) dan (4):",
    [
      "Perhatikan kata rujukan di awal kalimat (4) (mis. 'Dengan bekal bahasa yang kuat tersebut...').",
      "Kalimat (3) yang kamu pilih wajib mengandung konsep yang dirujuk oleh kata 'tersebut' pada kalimat (4)!",
    ],
    "Untuk soal melengkapi kalimat rumpang, petunjuk terkuat hampir selalu berada pada kata pertama kalimat tepat SETELAH bagian rumpang tersebut!",
  ),
  createLesson(
    "PPU",
    6,
    "06. Gagasan Utama & Simpulan Bacaan PPU",
    "Frasa, Klausa, & Kepaduan Paragraf",
    "Gagasan Utama = Inti Paragraf  |  Sikap Penulis = Diksi Penilaian",
    "Merumuskan gagasan utama, simpulan padat, dan sikap penulis pada teks singkat PPU.",
    "Wacana pada subtes PPU umumnya berukuran lebih ringkas (1–3 paragraf padat) dibandingkan wacana LBI, namun menggunakan kosakata dan struktur kalimat yang lebih abstrak/akademik.",
    "Pada sub-materi penutup PPU ini, kamu akan melatih ketajaman menyarikan gagasan utama paragraf, menarik simpulan yang menggabungkan dua aspek manfaat/masalah, serta mengenali sikap penulis.",
    "1. Merangkum Dua Sisi Informasi dalam Simpulan",
    "Jika sebuah paragraf memaparkan dua dimensi manfaat (misalnya manfaat ekologis hutan bakau sebagai penahan abrasi dan manfaat ekonomis sebagai tempat pemijahan kepiting/ikan):",
    [
      "Pilih opsi simpulan yang merangkum KEDUA dimensi tersebut sekaligus, bukan opsi yang hanya menyebutkan salah satu manfaat.",
    ],
    "2. Mengenali Sikap Penulis (Author's Attitude)",
    "Amati bagaimana penulis menutup paragrafnya:",
    [
      "Konstruktif & Solutif: Memaparkan masalah lalu menawarkan langkah perbaikan nyata.",
      "Kritis & Waspada: Menyoroti celah atau bahaya dari suatu kebijakan/kebiasaan.",
      "Objektif & Informatif: Menyajikan fakta penelitian secara netral.",
    ],
    "Gagasan utama selalu bersifat umum dan memayungi kalimat lainnya; hindari memilih kalimat yang hanya berisi rincian angka atau contoh!",
  ),
];

const PU_LESSONS: ReadonlyArray<SubMaterialLesson> = [
  createLesson(
    "PU",
    1,
    "01. Logika Deduktif, Implikasi, & Kontraposisi",
    "Penalaran Deduktif & Induktif",
    "Modus Ponens: (p → q), p ⊢ q  |  Modus Tollens: (p → q), ~q ⊢ ~p  |  Kontraposisi: ~q → ~p",
    "Hukum penarikan kesimpulan formal (Modus Ponens, Modus Tollens, Silogisme), ekuivalensi implikasi, dan negasi.",
    "Penalaran Umum (PU) menguji ketajaman logika formal dalam menarik kesimpulan yang 100% sah dari premis-premis yang diberikan. Dalam logika deduktif, sebuah kesimpulan dinilai dari keabsahan strukturnya terhadap premis, bukan dari asumsi di luar teks.",
    "Lebih dari separuh soal deduktif PU menggunakan kalimat bersyarat (implikasi 'Jika p, maka q'). Menguasai rumus Modus Ponens, Modus Tollens, Silogisme, Kontraposisi, dan Negasi Implikasi akan membuat kamu menjawab soal-soal ini dalam hitungan detik.",
    "1. Tiga Aturan Penarikan Kesimpulan Sah",
    "Pastikan struktur premis memenuhi salah satu dari tiga hukum berikut:",
    [
      "Modus Ponens: Premis 1 (p → q) dan Premis 2 (p terjadi) → Kesimpulan: q terjadi.",
      "Modus Tollens: Premis 1 (p → q) dan Premis 2 (~q / akibat tidak terjadi) → Kesimpulan: ~p (sebab tidak terjadi).",
      "Silogisme Hipotetis: Premis 1 (p → q) dan Premis 2 (q → r) → Kesimpulan: p → r.",
      "WASPADA JEBAKAN SESAT PIKIR: Dari (p → q) dan (~p), TIDAK DAPAT disimpulkan ~q! Begitu pula dari (p → q) dan (q), TIDAK DAPAT disimpulkan p!",
    ],
    "2. Ekuivalensi & Negasi (Ingkaran) Implikasi",
    "Dua rumus wajib hafal untuk mengubah bentuk kalimat 'Jika p, maka q':",
    [
      "Ekuivalensi (Setara): (p → q) ≡ (~q → ~p) (Kontraposisi: balik posisi dan beri negasi di kedua ruas) ≡ (~p ∨ q).",
      "Negasi / Ingkaran: ~(p → q) ≡ (p ∧ ~q) ('p terjadi, TETAPI q tidak terjadi' — perhatikan bahwa kata 'Jika' hilang pada bentuk negasi!).",
    ],
    "Ingat: Implikasi 'Jika p maka q' HANYA setara dengan Kontraposisinya ('Jika TIDAK q, maka TIDAK p'), bukan dengan kebalikannya ('Jika q maka p')!",
  ),
  createLesson(
    "PU",
    2,
    "02. Silogisme Kategoris & Kuantor",
    "Penalaran Deduktif & Induktif",
    "Semua A adalah B + Sebagian C adalah A  →  Sebagian C adalah B",
    "Penarikan kesimpulan pada premis berkuantor (Semua, Sebagian/Beberapa, Tidak ada) dan aturan ingkaran kuantor.",
    "Selain kalimat bersyarat 'Jika... maka...', penalaran deduktif juga sering menggunakan pernyataan berkuantor: Kuantor Universal ('Semua / Setiap / Seluruh'), Kuantor Eksistensial ('Sebagian / Beberapa / Ada / Sementara'), dan Kuantor Negatif ('Tidak ada').",
    "Cara paling visual dan anti-salah untuk menyelesaikan soal kuantor adalah membayangkan irisan himpunan (Diagram Venn).",
    "1. Hukum Silogisme Kuantor (Semua vs. Sebagian)",
    "Pegang tiga aturan emas penggabungan kuantor berikut:",
    [
      "Semua A adalah B + Semua B adalah C → Semua A adalah C.",
      "Semua A adalah B + Sebagian C adalah A → Sebagian C adalah B (jika salah satu premis 'Sebagian', kesimpulan TIDAK BOLEH 'Semua'!).",
      "Tidak ada A yang merupakan B (A dan B saling lepas) + x adalah anggota B → x pasti BUKAN anggota A.",
    ],
    "2. Ingkaran (Negasi) Pernyataan Berkuantor",
    "Saat mencari ingkaran pernyataan berkuantor, balik jenis kuantornya dan ingkarkan predikatnya:",
    [
      "Negasi dari 'Semua x bersifat P' adalah 'Ada / Beberapa / Sebagian x yang TIDAK bersifat P'.",
      "Negasi dari 'Ada / Sebagian x yang bersifat P' adalah 'Semua x TIDAK bersifat P' (atau 'Tidak ada x yang bersifat P').",
    ],
    "Jangan pernah memilih 'Semua X tidak...' sebagai negasi dari 'Semua X...'; negasi dari 'Semua' selalu berubah menjadi 'Ada / Sebagian'!",
  ),
  createLesson(
    "PU",
    3,
    "03. Kesesuaian Pernyataan & Simpulan Logis",
    "Penalaran Deduktif & Induktif",
    "Pasti Benar (100% Terbukti)  |  Mungkin Benar  |  Pasti Salah (Kontradiksi)",
    "Menyelesaikan teka-teki analitik (urutan antrean/meja bundar) dan mengevaluasi derajat kepastian pernyataan.",
    "Sub-materi ini menggabungkan dua keterampilan penting PU: (1) Penalaran Analitik (menyusun urutan posisi, antrean, jadwal, atau posisi duduk meja bundar berdasarkan sejumlah syarat) dan (2) Evaluasi Kesesuaian Pernyataan (membedakan klaim yang Pasti Benar, Mungkin Benar, atau Pasti Salah).",
    "Pada soal urutan/posisi duduk, kunci tercepat adalah langsung menuliskan slot posisi (_ _ _ _ _) dan menguji syarat yang paling pasti terlebih dahulu.",
    "1. Strategi Penalaran Analitik (Urutan & Meja Bundar)",
    "Gunakan simbol visual untuk menerjemahkan syarat:",
    [
      "'B tepat di depan C' → tulis sebagai satu blok gandeng [B C].",
      "'A di urutan pertama' → kunci posisi 1 untuk A.",
      "Pada meja bundar dengan 6 kursi, 'berseberangan' berarti berjarak 3 kursi (kursi 1 berseberangan dengan kursi 4).",
    ],
    "2. Membedakan Pasti Benar vs. Pasti Salah",
    "Saat membaca paragraf pendek PU:",
    [
      "Pasti Benar: Didukung secara eksplisit atau merupakan kesimpulan deduktif langsung dari premis teks.",
      "Pasti Salah: Bertentangan langsung dengan fakta atau syarat yang tertulis di dalam teks.",
    ],
    "Untuk soal urutan posisi, gunakan syarat yang paling spesifik (mis. 'A di ujung pertama') untuk langsung mencoret opsi A–E yang melanggar syarat tersebut!",
  ),
  createLesson(
    "PU",
    4,
    "04. Memperkuat & Memperlemah Argumen",
    "Penalaran Deduktif & Induktif",
    "Argumen: [Sebab X] → [Akibat Y]  |  Perkuat: Bukti X → Y  |  Perlemah: Faktor Lain / X tanpa Y",
    "Penalaran induktif kritis: mengidentifikasi fakta baru yang paling memperkuat, memperlemah, atau relevan untuk mengevaluasi klaim.",
    "Soal Memperkuat (Strengthen) dan Memperlemah (Weaken) Argumen adalah ciri khas Penalaran Umum UTBK-SNBT modern. Sebuah argumen di dalam soal biasanya terdiri atas sebuah kesimpulan/klaim kausalitas ('Kebijakan X menyebabkan hasil Y') yang didasarkan pada suatu pengamatan.",
    "Tugasmu bukanlah mendebat topik secara umum, melainkan mencari fakta tambahan di opsi A–E yang secara langsung menguatkan atau mematahkan JEMBATAN SEBAB-AKIBAT antara X dan Y.",
    "1. Cara Memperkuat Argumen (Strengthen)",
    "Pilih opsi yang menunjukkan salah satu dari tiga hal berikut:",
    [
      "Memberikan data empiris/studi terkontrol yang membuktikan bahwa ketika Sebab X diterapkan, Akibat Y memang meningkat secara signifikan.",
      "Menunjukkan mekanisme ilmiah/logis mengapa X secara langsung menghasilkan Y.",
      "Menyingkirkan kemungkinan faktor pengganggu lain.",
    ],
    "2. Cara Memperlemah Argumen (Weaken)",
    "Pilih opsi yang menyerang asumsi hubungan X → Y:",
    [
      "Menunjukkan adanya Faktor Penyebab Lain (Alternative Cause): misalnya penurunan penjualan bukan karena harga kertas naik, melainkan karena jalan di depan toko sedang ditutup untuk renovasi.",
      "Menunjukkan bahwa Sebab X tidak benar-benar terjadi pada objek tersebut, atau X terjadi tetapi Y tidak berubah.",
    ],
    "Sebelum membaca opsi A–E, garis bawahi dahulu apa [SEBAB] dan apa [AKIBAT] pada klaim tokoh di soal; jawaban yang benar wajib menyentuh hubungan kedua hal itu!",
  ),
  createLesson(
    "PU",
    5,
    "05. Pola Barisan Bilangan & Huruf",
    "Penalaran Kuantitatif",
    "Cek Selisih Bertingkat (+d)  |  Rasio (×r)  |  Pola Loncat Larik Ganjil-Genap",
    "Mengenali pola deret angka satu larik, dua larik (loncat), deret bertingkat, bilangan kuadrat/kubik, dan barisan huruf.",
    "Bagian Penalaran Kuantitatif di subtes PU selalu menyertakan soal pola barisan bilangan atau pola angka dalam gambar/tabel. Berbeda dengan rumus barisan aritmetika baku di matematika SMA, pola barisan di PU lebih bervariasi dan menuntut kejelian mengenali keteraturan selisih atau rasio.",
    "Jika selisih antar-suku berdekatan terlihat naik-turun secara drastis (misalnya 4, 10, 9, 20, 16, 40, 25), itu adalah sinyal kuat bahwa barisan tersebut terdiri atas DUA LARIK (pola loncat satu suku).",
    "1. Empat Pola Barisan Paling Populer di SNBT",
    "Uji keempat pola ini secara berurutan:",
    [
      "Pola Selisih Bertingkat: Hitung selisih suku berdekatan (U₂−U₁, U₃−U₂, ...). Jika selisihnya membentuk pola (+4, +6, +8, +10) atau (+4, +8, +16, +32), lanjutkan selisih berikutnya.",
      "Pola Dua Larik (Loncat 1 Suku): Pisahkan suku bernomor ganjil (U₁, U₃, U₅, U₇) dan suku bernomor genap (U₂, U₄, U₆, U₈).",
      "Pola Pangkat / Kuadrat / Kubik: Kenali angka 1, 4, 9, 16, 25, 36, 49 (n²) dan 1, 8, 27, 64, 125 (n³) beserta variasinya (n² ± 1 atau n(n+1)).",
      "Pola Fibonacci: Suku berikutnya merupakan jumlah dari dua suku sebelumnya (Uₙ = Uₙ₋₁ + Uₙ₋₂).",
    ],
    "2. Mengubah Barisan Huruf ke Angka",
    "Untuk soal deret huruf, ubah huruf ke nomor urut alfabet (A=1, E=5, J=10, O=15, T=20, Z=26) lalu cari pola angkanya.",
    [
      "Menghafal kelipatan 5 (E-J-O-T-Y = 5-10-15-20-25) mempercepat konversi huruf ke angka.",
    ],
    "Jika angka-angka pada deret naik lalu turun secara bergantian (mis. 4, 10, 9, 20, 16, 40), jangan hitung selisih bersebelahan—langsung cek pola loncat satu suku!",
  ),
  createLesson(
    "PU",
    6,
    "06. Penalaran Data Tabel, Grafik, & Operasi Bilangan",
    "Penalaran Kuantitatif",
    "% Perubahan = ((Nilai Akhir − Nilai Awal) / Nilai Awal) × 100%",
    "Operasi cepat pecahan/desimal, perbandingan rasio berantai, dan penafsiran tren kenaikan/penurunan pada tabel serta grafik.",
    "Sub-materi terakhir PU ini berfokus pada kecepatan berhitung praktis: membandingkan nilai pecahan, menyamakan rasio berantai (A : B dan B : C), serta menghitung persentase kenaikan atau penurunan dari tabel dan grafik.",
    "Dalam soal tabel/grafik PU, kamu sering diminta mencari periode dengan 'persentase kenaikan tertinggi' (yang berbeda dengan 'selisih kenaikan nominal tertinggi'!).",
    "1. Selisih Nominal vs. Persentase Kenaikan",
    "Perhatikan rumus pembaginya:",
    [
      "Selisih Kenaikan Nominal = Nilai Akhir − Nilai Awal.",
      "Persentase Kenaikan = ((Nilai Akhir − Nilai Awal) / Nilai Awal) × 100% (pembaginya selalu Nilai Awal periode tersebut!).",
      "Untuk nilai kenaikan nominal yang sama, Nilai Awal yang lebih kecil akan menghasilkan persentase kenaikan yang lebih besar.",
    ],
    "2. Menyamakan Rasio Berantai & Membandingkan Pecahan",
    "Gunakan teknik cepat berikut:",
    [
      "Rasio Berantai: Jika A : B = 3 : 4 dan B : C = 6 : 5, samakan angka milik B ke KPK(4, 6) = 12, sehingga A : B : C = 9 : 12 : 10.",
      "Membandingkan Pecahan: Gunakan kali silang (a/b vs c/d → bandingkan a·d dengan b·c) atau samakan penyebut ke KPK terdekat.",
    ],
    "Hati-hati: 'naik sebesar 40%' dari 50 menghasilkan 70, sedangkan 'naik menjadi 40%' berarti nilainya turun menjadi 20. Cermati kata 'sebesar' vs 'menjadi'!",
  ),
];

export const SNBT_CURRICULUM: Record<
  SnbtSubtestCode,
  ReadonlyArray<SubMaterialLesson>
> = {
  PBM: PBM_LESSONS,
  LBI: LBI_LESSONS,
  LBE: LBE_LESSONS,
  PK: PK_LESSONS,
  PM: PM_LESSONS,
  PPU: PPU_LESSONS,
  PU: PU_LESSONS,
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
