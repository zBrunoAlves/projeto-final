<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo 'Você precisa estar logado.';
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data || !isset($data['items']) || !is_array($data['items'])) {
    http_response_code(400);
    echo 'Dados inválidos.';
    exit;
}

require_once 'db.php';

$user_id = $_SESSION['user_id'];
$items = $data['items'];

$conn->begin_transaction();

try {
    $stmt = $conn->prepare("INSERT INTO pedidos (usuario_id, data) VALUES (?, NOW())");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $pedido_id = $conn->insert_id;
    $stmt->close();

    $stmt = $conn->prepare("INSERT INTO pedido_itens (pedido_id, produto_nome, quantidade, preco_unitario) VALUES (?, ?, ?, ?)");
    foreach ($items as $item) {
        $nome = $item['name'];
        $quantidade = $item['quantity'];
        $preco = $item['price'];
        $stmt->bind_param("isid", $pedido_id, $nome, $quantidade, $preco);
        $stmt->execute();
    }
    $stmt->close();

    $conn->commit();
    echo "Compra finalizada com sucesso!";
} catch (Exception $e) {
    $conn->rollback();
    http_response_code(500);
    echo "Erro ao salvar pedido.";
}
?>
