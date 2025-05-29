<?php
session_start();
require_once 'db.php';

$login = trim($_POST['login'] ?? '');
$senha = $_POST['senha'] ?? '';

if (!$login || !$senha) {
    $_SESSION['msg'] = ['type' => 'error', 'text' => 'Por favor, preencha usuário e senha.'];
    header('Location: login.html');
    exit;
}

$stmt = $conn->prepare("SELECT id, nome, email, senha FROM usuarios WHERE email = ? OR nome = ?");
$stmt->bind_param("ss", $login, $login);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    $_SESSION['msg'] = ['type' => 'error', 'text' => 'Usuário não encontrado.'];
    header('Location: login.html');
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($senha, $user['senha'])) {
    $_SESSION['msg'] = ['type' => 'error', 'text' => 'Senha incorreta.'];
    header('Location: login.html');
    exit;
}

$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['nome'];

header('Location: carrinho.php');
exit;
