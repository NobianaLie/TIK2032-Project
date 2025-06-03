<?php
include_once 'config/database.php';
include_once 'classes/Article.php';

$database = new Database();
$db = $database->getConnection();
$article = new Article($db);

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id > 0) {
    $stmt = $article->getArticleById($id);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$row) {
        header("Location: blog.php");
        exit();
    }
} else {
    header("Location: blog.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($row['title']); ?> - My Portofolio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>My Portofolio</h1>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="blog.php">Blog</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="article-detail">
            <div class="container">
                <a href="blog.php" class="back-link">← Kembali ke Blog</a>
                
                <article class="single-article">
                    <h1><?php echo htmlspecialchars($row['title']); ?></h1>
                    <div class="article-meta">
                        Ditulis pada: <?php echo $article->formatDate($row['created_at']); ?> | 
                        Kategori: <?php echo htmlspecialchars($row['category']); ?> |
                        Penulis: <?php echo htmlspecialchars($row['author']); ?>
                    </div>
                    
                    <?php if (!empty($row['image_url'])): ?>
                        <img src="<?php echo htmlspecialchars($row['image_url']); ?>" 
                             alt="<?php echo htmlspecialchars($row['title']); ?>" class="article-image">
                    <?php endif; ?>
                    
                    <div class="article-content">
                        <?php echo nl2br($row['content']); ?>
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
</body>
</html>