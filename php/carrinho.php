<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit;
}

echo "<h1>Bem vindo, " . htmlspecialchars($_SESSION['user_name']) . "!</h1>";
echo "<p>Seu carrinho está vazio.</p>";
echo '<p><a href="logout.php">Sair</a></p>';
