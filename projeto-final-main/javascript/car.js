$(document).ready(function () {
    function loadCart() {
        var storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            cartItems = JSON.parse(storedCart);
        } else {
            cartItems = [];
        }
        updateCart();
    }

    function saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    var cartItems = [];

    function updateCart() {
        var cartTotal = 0;
        $('#cart-items').empty();

        cartItems.forEach(function (item, index) {
            $('#cart-items').append(
                `<li>
                    <span>${item.name} - R$${item.price.toFixed(2)}</span>
                    <span>Quantidade: ${item.quantity}</span>
                    <span>R$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item-btn" data-index="${index}">Excluir</button>
                    <button class="decrease-item-btn" data-index="${index}">-</button>
                    <button class="increase-item-btn" data-index="${index}">+</button>
                </li>`
            );
            cartTotal += item.price * item.quantity;
        });

        $('#cart-total').text(`Total: R$${cartTotal.toFixed(2)}`);

        if (cartItems.length > 0) {
            $('#cart').show();
        } else {
            $('#cart').hide();
        }

        $('#cart-count').text(cartItems.length);
        $('#cart-count').show();
    }

    $('.btn-default').on('click', function () {
        var productName = $(this).data('name');
        var productPrice = parseFloat($(this).data('price'));

        var existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: 1 });
        }

        saveCart();
        updateCart();
    });

    $('#cart-icon').on('click', function () {
        $('#cart').toggle();
    });

    window.checkout = function() {
    if(cartItems.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }
    fetch('finalizar_compra.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({items: cartItems})
    })
    .then(res => {
        if (!res.ok) throw new Error('Erro na requisição');
        return res.text();
    })
    .then(text => {
        alert(text);
        cartItems = [];
        saveCart();
        updateCart();
    })
    .catch(() => alert('Erro ao finalizar compra'));
};

    $(document).on('click', '.remove-item-btn', function() {
        var index = $(this).data('index');
        cartItems.splice(index, 1);
        saveCart();
        updateCart();
    });

    $(document).on('click', '.decrease-item-btn', function() {
        var index = $(this).data('index');
        var item = cartItems[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cartItems.splice(index, 1);
        }

        saveCart();
        updateCart();
    });

    $(document).on('click', '.increase-item-btn', function() {
        var index = $(this).data('index');
        var item = cartItems[index];

        item.quantity += 1;
        saveCart();
        updateCart();
    });

    $('#clear-cart-btn').on('click', function () {
        cartItems = [];
        saveCart();
        updateCart();
    });

    loadCart();
    $('#cart').hide();
});
