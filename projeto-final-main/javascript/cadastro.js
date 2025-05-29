const form = document.getElementById("form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const senhaConfirmacao = document.getElementById("senha-confirmacao");
const telefone = document.getElementById("telefone");
const endereco = document.getElementById("endereco");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkForm();
});

nome.addEventListener("blur", () => checkInput(nome, "Preencha o nome do usuário!"));
email.addEventListener("blur", () => checkInput(email, "O email é obrigatório."));
senha.addEventListener("blur", checkInputPassword);
senhaConfirmacao.addEventListener("blur", checkInputPasswordConfirmation);
telefone.addEventListener("blur", () => checkInput(telefone, "O telefone é obrigatório."));
endereco.addEventListener("blur", () => checkInput(endereco, "O endereço é obrigatório."));

function checkInput(input, errorMessage) {
    if (input.value.trim() === "") {
        errorInput(input, errorMessage);
    } else {
        clearError(input);
    }
}

function checkInputPassword() {
    const valor = senha.value.trim();
    if (valor === "") {
        errorInput(senha, "A senha é obrigatória.");
    } else if (valor.length < 8) {
        errorInput(senha, "A senha precisa ter no mínimo 8 caracteres.");
    } else {
        clearError(senha);
    }
}

function checkInputPasswordConfirmation() {
    const valorSenha = senha.value.trim();
    const valorConfirmacao = senhaConfirmacao.value.trim();
    if (valorConfirmacao === "") {
        errorInput(senhaConfirmacao, "A confirmação de senha é obrigatória.");
    } else if (valorConfirmacao !== valorSenha) {
        errorInput(senhaConfirmacao, "As senhas não são iguais.");
    } else {
        clearError(senhaConfirmacao);
    }
}

function checkForm() {
    checkInput(nome, "Preencha o nome do usuário!");
    checkInput(email, "O email é obrigatório.");
    checkInputPassword();
    checkInputPasswordConfirmation();
    checkInput(telefone, "O telefone é obrigatório.");
    checkInput(endereco, "O endereço é obrigatório.");

    const formItems = form.querySelectorAll(".form-content");
    const isValid = [...formItems].every(item => !item.classList.contains("error"));
    if (isValid) {
        form.submit();
    }
}

function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("span.error-message");
    textMessage.innerText = message;
    formItem.classList.add("error");
}

function clearError(input) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("span.error-message");
    textMessage.innerText = "";
    formItem.classList.remove("error");
}
