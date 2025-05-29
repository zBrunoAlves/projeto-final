<?php
$servername = "localhost";    // ou IP do seu servidor
$username = "root";    // seu usuário do banco
$password = "";      // sua senha do banco
$dbname = "loja";             // nome do banco

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

echo "Conexão bem-sucedida ao banco de dados '$dbname'!";

$conn->close();
