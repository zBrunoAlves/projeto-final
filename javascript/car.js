$(document).ready(function () {
    // Variável para armazenar os itens do carrinho
    var cartItems = [];

    // Função para atualizar o carrinho no painel lateral
    function updateCart() {
        var cartTotal = 0;
        $('#cart-items').empty(); // Limpar itens do carrinho

        // Adicionar cada item ao carrinho
        cartItems.forEach(function (item) {
            $('#cart-items').append(
                `<li>
                    <span>${item.name} - R$${item.price.toFixed(2)}</span>
                    <span>Quantidade: ${item.quantity}</span>
                    <span>R$${(item.price * item.quantity).toFixed(2)}</span>
                </li>`
            );
            cartTotal += item.price * item.quantity; // Atualizar o total
        });

        // Atualizar o total no painel
        $('#cart-total').text(`Total: R$${cartTotal.toFixed(2)}`);

        // Exibir o carrinho se houver itens
        if (cartItems.length > 0) {
            $('#cart').show();
        } else {
            $('#cart').hide();
        }

        // Atualizar a contagem de itens no ícone do carrinho
        $('#cart-count').text(cartItems.length); // Atualizar número de itens
        $('#cart-count').show(); // Exibir a contagem
    }

    // Evento de clique no botão "Adicionar ao Carrinho"
    $('.btn-default').on('click', function () {
        var productName = $(this).data('name');
        var productPrice = parseFloat($(this).data('price'));

        // Verificar se o item já existe no carrinho
        var existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {
            // Se o item já existir, aumentar a quantidade
            existingItem.quantity += 1;
        } else {
            // Se o item não existir, adicionar ao carrinho
            cartItems.push({ name: productName, price: productPrice, quantity: 1 });
        }

        // Atualizar o carrinho
        updateCart();
    });

    // Exibir ou esconder o carrinho ao clicar no ícone do carrinho
    $('#cart-icon').on('click', function () {
        $('#cart').toggle(); // Exibe ou esconde o carrinho ao clicar no ícone
    });

    // Função de finalização de compra
    window.checkout = function() {
        alert("Finalizando a compra...");
        // Aqui você pode adicionar a lógica para finalização de compra, redirecionamento, etc.
    };

    // Esconder o carrinho inicialmente
    $('#cart').hide();
});
