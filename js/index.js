const login = document.getElementById("formularioLogin");

const dadosUser = JSON.parse(localStorage.getItem("dadosConta"));

function fazerlogin(event) {
  event.preventDefault();
  if (dadosUser === null) {
    alert("Não existe nenhum usuário cadastrado");
  }
  const email = login.email.value;
  const password = login.password.value;

  const user = dadosUser.find((usuario) => {
    return usuario.email === email && usuario.password === password;
  });

  if (!user) {
    alert("E-mail ou Senha incorretos");
    formularioLogin.reset();
    return;
  } else {
    location.href = "./mural.html";
  }
}
login.addEventListener("submit", fazerlogin);
