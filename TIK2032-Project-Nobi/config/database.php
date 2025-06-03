<?php
class Database {
    private $host = 'localhost';
    private $db_name = 'portofolio_blog';
    private $username = 'root'; // sesuaikan dengan username MySQL Anda
    private $password = '';     // sesuaikan dengan password MySQL Anda
    private $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>