$(document).ready(function() {
    // Função para alternar o menu no mobile
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    // Manipulação das seções e navegação ativa
    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

       
    });

$('.categorias ul li').on('click', function () {
    $('.categorias ul li').removeClass('active');
    $(this).addClass('active');
});

$(document).ready(function () {
    var currentUrl = window.location.href;

    $('.categorias ul li a').each(function () {
        if (this.href === currentUrl) {
            $(this).parent().addClass('active');
        }
    });
    $('.categorias ul li').on('click', function () {
        $('.categorias ul li').removeClass('active');
        $(this).addClass('active');
    });
});


// Chama a função
activeLink();


    // Função de rolagem reveladora para animações
    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    });

    function adicionarAoCarrinho(nome, preco, imagem) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
        // Verificar se o produto já existe no carrinho
        const produtoExistente = carrinho.find((produto) => produto.nome === nome);
        if (produtoExistente) {
            produtoExistente.quantidade += 1;
        } else {
            carrinho.push({
                nome: nome,
                preco: preco,
                quantidade: 1,
                imagem: imagem,
            });
        }
    
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert('Produto adicionado ao carrinho!');
    }
    function exibirCarrinho() {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const carrinhoDiv = document.getElementById("itens-carrinho");
        carrinhoDiv.innerHTML = "";
    
        let total = 0;
        carrinho.forEach((produto) => {
            const itemRow = document.createElement("tr");
    
            itemRow.innerHTML = `
                <td>
                    <div class="product">
                        <img src="${produto.imagem}" alt="${produto.nome}" style="width: 75px; height: 100px;" />
                        <div class="info">
                            <div class="name">${produto.nome}</div>
                        </div>
                    </div>
                </td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>
                    <div class="qty">
                        <button onclick="alterarQuantidade('${produto.nome}', -1)"><i class="bx bx-minus"></i></button>
                        <span>${produto.quantidade}</span>
                        <button onclick="alterarQuantidade('${produto.nome}', 1)"><i class="bx bx-plus"></i></button>
                    </div>
                </td>
                <td>R$ ${(produto.preco * produto.quantidade).toFixed(2)}</td>
                <td>
                    <button class="remove" onclick="removerProduto('${produto.nome}')"><i class="bx bx-x"></i></button>
                </td>
            `;
    
            carrinhoDiv.appendChild(itemRow);
            total += produto.preco * produto.quantidade;
        });
    
        document.getElementById("subtotal").innerText = `R$ ${total.toFixed(2)}`;
        document.getElementById("total").innerText = `R$ ${total.toFixed(2)}`;
    }
    
    function alterarQuantidade(nomeProduto, alteracao) {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const produto = carrinho.find((produto) => produto.nome === nomeProduto);
    
        if (produto) {
            produto.quantidade = Math.max(1, produto.quantidade + alteracao);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            exibirCarrinho();
        }
    }
    
    function removerProduto(nomeProduto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho = carrinho.filter((produto) => produto.nome !== nomeProduto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        exibirCarrinho();
    }
    
// Script para destacar o link ativo no menu
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav ul.nav li a");
    const urlAtual = window.location.pathname.split("/").pop();

    links.forEach((link) => {
        if (link.getAttribute("href") === urlAtual) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});


});
