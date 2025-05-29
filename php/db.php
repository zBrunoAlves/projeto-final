<?php
$servername = "localhost";
$username = "root";  // ou seu usuário MySQL
$password = "";      // sua senha do MySQL, geralmente vazia no XAMPP
$dbname = "loja";    // nome do banco de dados


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
