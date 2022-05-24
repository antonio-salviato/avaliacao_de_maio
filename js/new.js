const login = document.querySelector("#newAccount");
const recuperarLocalStorage = () => {
  const dadosUser = JSON.parse(localStorage.getItem("dadosConta") || "[]");
  return dadosUser;
};

const atualizarStorage = (dadosConta) => {
  localStorage.setItem("dadosConta", JSON.stringify(dadosConta));
};

function salvar(event) {
  event.preventDefault();
  const dadosEmail = login.email.value;
  const dadosPassword = login.password.value;
  const dadosConfirmPassword = login.confirmPassword.value;
  if (dadosEmail.length < 3) {
    alert("Preencha com um e-mail válido.");
    return;
  }
  if (dadosPassword.length < 4) {
    alert("Preencha a senha com no mínimo 4 dígitos.");
    return;
  }
  if (dadosPassword !== dadosConfirmPassword) {
    alert("Senhas não conferem.");
    return;
  }
  const dadosUser = recuperarLocalStorage();
  dadosUser.push({
    email: dadosEmail,
    password: dadosPassword,
  });
  atualizarStorage(dadosUser);
  alert("usuário adicionado com sucesso");
  location.href = "./index.html";
}

login.addEventListener("submit", salvar);
