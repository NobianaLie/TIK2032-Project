<?php
class Article {
    private $conn;
    private $table_name = "articles";

    public $id;
    public $title;
    public $category;
    public $image_url;
    public $content;
    public $excerpt;
    public $author;
    public $created_at;
    public $updated_at;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Fungsi untuk mendapatkan semua artikel
    public function getAllArticles() {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE status = 'published' 
                 ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Fungsi untuk mendapatkan artikel berdasarkan ID
    public function getArticleById($id) {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE id = ? AND status = 'published'";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt;
    }

    // Fungsi untuk mendapatkan artikel berdasarkan kategori
    public function getArticlesByCategory($category) {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE category = ? AND status = 'published' 
                 ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $category);
        $stmt->execute();
        return $stmt;
    }

    // Fungsi untuk mencari artikel
    public function searchArticles($keyword) {
        $query = "SELECT * FROM " . $this->table_name . " 
                 WHERE (title LIKE ? OR content LIKE ?) AND status = 'published' 
                 ORDER BY created_at DESC";
        
        $search_term = '%' . $keyword . '%';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $search_term);
        $stmt->bindParam(2, $search_term);
        $stmt->execute();
        return $stmt;
    }

    // Fungsi untuk format tanggal Indonesia
    public function formatDate($date) {
        $bulan = array(
            1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        );
        
        $pecahkan = explode('-', date('Y-m-d', strtotime($date)));
        return $pecahkan[2] . ' ' . $bulan[(int)$pecahkan[1]] . ' ' . $pecahkan[0];
    }
}
?>