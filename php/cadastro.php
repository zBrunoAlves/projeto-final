<?php
session_start();
require_once 'db.php';

$nome = trim($_POST['nome'] ?? '');
$email = trim($_POST['email'] ?? '');
$senha = $_POST['senha'] ?? '';
$senha_confirmacao = $_POST['senha_confirmacao'] ?? '';
$telefone = trim($_POST['telefone'] ?? '');
$endereco = trim($_POST['endereco'] ?? '');

if (!$nome || !$email || !$senha || !$senha_confirmacao) {
    $_SESSION['msg'] = ['type' => 'error', 'text' => 'Por favor, preencha todos os campos obrigatórios.'];
    header("Location: /Projeto/projeto-final-main/cadastro.html");
    exit;
}

if ($senha !== $senha_confirmacao) {
    $_SESSION['msg'] = ['type' => 'error', 'text' => 'As senhas não conferem.'];
    header("Location: /Projeto/projeto-final-main/cadastro.html");
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['msg'] = ['type' => 'error', 'text' => 'Email inválido.'];
    header("Location: /Projeto/projeto-final-main/cadastro.html");
    exit;
}

$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $_SESSION['msg'] = ['type' => 'error', 'text' => 'Este email já está cadastrado.'];
    $stmt->close();
    header("Location: /Projeto/projeto-final-main/cadastro.html");
    exit;
}
$stmt->close();

$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha, telefone, endereco) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nome, $email, $senha_hash, $telefone, $endereco);

if ($stmt->execute()) {
    $_SESSION['msg'] = ['type' => 'success', 'text' => 'Cadastro realizado com sucesso!'];
    header("Location: /Projeto/projeto-final-main/login.html");
    exit;
} else {
    $_SESSION['msg'] = ['type' => 'error', 'text' => 'Erro ao cadastrar: ' . $conn->error];
    header("Location: /Projeto/projeto-final-main/cadastro.html");
    exit;
}

$stmt->close();
$conn->close();
