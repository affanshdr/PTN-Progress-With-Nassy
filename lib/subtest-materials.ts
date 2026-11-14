import type { SnbtSubtestCode } from "@/lib/supabase/types";

export interface SubtestMaterialGuide {
  overview: string;
  keyPoints: ReadonlyArray<{
    title: string;
    detail: string;
  }>;
  quickTip: string;
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
