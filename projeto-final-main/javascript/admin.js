document.addEventListener("DOMContentLoaded", function() {
    function loadAdminData() {
        const totalPedidos = 120;
        const totalUsuarios = 450;
        const totalVendas = 25000.50;

        document.getElementById("total-pedidos").textContent = totalPedidos;
        document.getElementById("total-usuarios").textContent = totalUsuarios;
        document.getElementById("total-vendas").textContent = `R$ ${totalVendas.toFixed(2)}`;
    }

    function loadRecentOrders() {
        const pedidos = [
            { id: 1, cliente: "João Silva", status: "Concluído", valor: 120.50, data: "2025-04-16" },
            { id: 2, cliente: "Maria Souza", status: "Pendente", valor: 80.00, data: "2025-04-15" },
            { id: 3, cliente: "Carlos Oliveira", status: "Concluído", valor: 200.75, data: "2025-04-14" }
        ];

        const tableBody = document.querySelector("#tabela-pedidos tbody");
        pedidos.forEach(pedido => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${pedido.id}</td>
                <td>${pedido.cliente}</td>
                <td>${pedido.status}</td>
                <td>R$ ${pedido.valor.toFixed(2)}</td>
                <td>${pedido.data}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function loadUsers() {
        const usuarios = [
            { id: 1, nome: "João Silva", email: "joao@gmail.com", status: "Ativo" },
            { id: 2, nome: "Maria Souza", email: "maria@gmail.com", status: "Ativo" },
            { id: 3, nome: "Carlos Oliveira", email: "carlos@gmail.com", status: "Inativo" }
        ];

        const tableBody = document.querySelector("#tabela-usuarios tbody");
        usuarios.forEach(usuario => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.status}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    loadAdminData();
    loadRecentOrders();
    loadUsers();
});
