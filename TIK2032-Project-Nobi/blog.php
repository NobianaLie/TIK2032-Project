<?php
// Include file konfigurasi dan class
include_once 'config/database.php';
include_once 'classes/Article.php';

// Inisialisasi database
$database = new Database();
$db = $database->getConnection();

// Inisialisasi class Article
$article = new Article($db);

// Ambil parameter untuk filter
$category = isset($_GET['category']) ? $_GET['category'] : '';
$search = isset($_GET['search']) ? $_GET['search'] : '';

// Ambil artikel dari database
if (!empty($search)) {
    $stmt = $article->searchArticles($search);
} elseif (!empty($category)) {
    $stmt = $article->getArticlesByCategory($category);
} else {
    $stmt = $article->getAllArticles();
}

$articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - My Personal Portofolio</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
</head>
<body>
    <header>
        <div class="container">
            <h1>My Portofolio</h1>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="blog.php" class="active">Blog</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="page-header">
            <div class="container">
                <h2>🛎️ Blog</h2>
                <p>Explore a collection of articles covering ideas, insights, and personal perspectives.</p>
            </div>
        </section>

        <section class="blog">
            <div class="container">
                <article class="blog-post">
                    <h3>Perkembangan AI dalam Kehidupan Sehari-hari</h3>
                    <div class="post-meta">Ditulis pada: 11 Maret 2025 | Kategori: Teknologi</div>
                    <img src="img/ini ai.png" alt="HTML Coding" class="post-image">
                    <div class="post-content">
                        <p>Kecerdasan Buatan (Artificial Intelligence/AI) semakin berkembang pesat dan mulai diterapkan dalam berbagai aspek kehidupan. Dari asisten virtual seperti Siri dan Google Assistant hingga mobil tanpa pengemudi, AI telah membawa perubahan besar dalam cara kita berinteraksi dengan teknologi.
                        </p>
                        <p>Manfaat AI dalam Kehidupan Sehari-hari:
                        </p>
                        <ul>
                            <li><strong>&lt;Otomatisasi Tugas&gt;</strong> - AI membantu dalam pekerjaan administratif, analisis data, dan bahkan dalam industri manufaktur.</li>
                            <li><strong>&lt;Personalisasi Pengalaman:&gt;</strong> - Platform seperti Netflix dan Spotify menggunakan AI untuk memberikan rekomendasi yang sesuai dengan preferensi pengguna.
                            </li>
                            <li><strong>&lt;Keamanan Digital&gt;</strong> - Sistem AI dapat mendeteksi aktivitas mencurigakan dan melindungi data dari ancaman siber.</li>
                        <p>Di masa depan, AI diprediksi akan semakin canggih dan dapat membantu manusia dalam berbagai aspek, termasuk kesehatan, pendidikan, dan transportasi.
                        </p>
                    </div>
                </article>

                <article class="blog-post">
                    <h3>Peran Digital Art dalam Dunia Kreatif
                    </h3>
                    <div class="post-meta">Ditulis pada: 5 Maret 2025 | Kategori: Seni</div>
                    <img src="img/seniii.jpg" alt="Seni" class="post-image">
                    <div class="post-content">
                        <p>Seni digital semakin diminati oleh seniman dan penggemar seni di seluruh dunia. Dengan kemajuan teknologi, para seniman kini memiliki lebih banyak alat untuk mengekspresikan kreativitas mereka, mulai dari software desain grafis hingga perangkat seperti tablet gambar digital.
                        </p>
                        <p>Keunggulan Seni Digital:
                        </p>
                        <ol>
                            <li>Fleksibilitas: Mudah diedit dan disesuaikan tanpa harus memulai dari awal.
                            </li>
                            <li>Aksesibilitas: Berbagai aplikasi gratis maupun berbayar memungkinkan siapa saja untuk belajar dan berkarya.
                            </li>
                            <li>Kolaborasi Global: Seniman dapat berbagi karya dan berkolaborasi dengan orang dari seluruh dunia.
                            </li>
                        <p>Seni digital juga telah membuka peluang baru di industri hiburan, periklanan, dan media sosial, menjadikannya salah satu bentuk ekspresi yang paling berkembang saat ini.
                        </p>
                    </div>
                </article>

                <article class="blog-post">
                    <h3>Manfaat Berlari untuk Kesehatan Fisik dan Mental
                    </h3>
                    <div class="post-meta">Ditulis pada: 1 Maret 2025 | Kategori: Olahraga</div>
                    <img src="img/lari.jpg" alt="Olahraga" class="post-image">
                    <div class="post-content">
                        <p>Berlari adalah salah satu olahraga paling sederhana namun memiliki banyak manfaat bagi kesehatan. Tidak hanya meningkatkan kebugaran fisik, tetapi juga memberikan dampak positif pada kesehatan mental.
                        </p>
                        <p>Manfaat Berlari:
                        </p>
                        <h4>Meningkatkan Kesehatan Jantung: Membantu memperlancar peredaran darah dan mengurangi risiko penyakit kardiovaskular.
                        </h4>
                        <h4>Meningkatkan Kesehatan Mental: Berlari dapat membantu mengurangi stres dan meningkatkan mood karena pelepasan endorfin.
                        </h4>
                        <h4>Meningkatkan Daya Tahan Tubuh: Membantu tubuh lebih kuat dan tidak mudah lelah dalam menjalani aktivitas sehari-hari.
                        </h4>
                        <p>Dengan pola latihan yang teratur, berlari dapat menjadi bagian dari gaya hidup sehat yang menyenangkan dan bermanfaat untuk jangka panjang.</p>
                    </div>
                </article>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 My Portofolio.</p>
        </div>
    </footer>
    <!-- Tambahkan ini di dalam <footer> atau di mana pun kamu mau -->
<p id="clock"></p>

<script>
function updateClock() {
    const now = new Date();
    const waktu = now.toLocaleTimeString('id-ID');
    const tanggal = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById("clock").innerText = `⏰ Sekarang: ${tanggal}, ${waktu}`;
}
setInterval(updateClock, 1000);
updateClock();
</script>

</body>
</html>