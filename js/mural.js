const form = document.querySelector("#mural");
const corpoTabela = document.querySelector("#tbody");
let botaoEditar = false;
let editIndex = 0;

const recuperarLocalStorage = () => {
  const msgem = JSON.parse(localStorage.getItem("dadosMsg") || "[]");
  return msgem;
};
const atualizarLocalStorage = (msgem) => {
  localStorage.setItem("dadosMsg", JSON.stringify(msgem));
};
const salvarMsgem = (event) => {
  event.preventDefault();
  const descricao = form.descricao.value;
  const msg = form.msg.value;

  const msgem = recuperarLocalStorage();
  if (botaoEditar == true) {
    alert("Mensagem alterada com sucesso");
    msgem[editIndex].descricao = descricao;
    msgem[editIndex].msg = msg;
    botaoEditar = false;
  } else {
    msgem.push({
      id: definirID() + 1,
      descricao: descricao,
      msg: msg,
    });
  }

  atualizarLocalStorage(msgem);
  alert("Mensagem adicionada!");

  preencherTabela();

  form.reset();
};
const preencherTabela = () => {
  const msgem = recuperarLocalStorage();
  corpoTabela.innerHTML = "";
  for (const message of msgem) {
    corpoTabela.innerHTML += `
        <tr>
            <td>${message.id}</td>
            <td>${message.descricao}</td>
            <td>${message.msg}</td>
             <td>
             <img src="./assets/edit_ico.svg" alt="editar" width="40" onclick="editar(${message.id})" >
             <img src="./assets/lixo.svg" alt="imagem de lixeira" width="40" onclick="removeMsg(${message.id})" >
             
            </td>
        </tr>
      `;
  }
};

const editar = (id) => {
  const lista = recuperarLocalStorage();
  const indiceMsg = lista.findIndex((message) => message.id === id);
  form.descricao.value = lista[indiceMsg].descricao;
  form.msg.value = lista[indiceMsg].msg;
  botaoEditar = true;
  editIndex = indiceMsg;
};

const removeMsg = (id) => {
  if (confirm("Você tem certeza que deseja apagar esse recado?"));
  const msgem = recuperarLocalStorage();
  const indiceMsg = msgem.findIndex((message) => message.id === id);
  if (indiceMsg < 0) return;
  msgem.splice(indiceMsg, 1);
  atualizarLocalStorage(msgem);
  alert("Mensagem removida com sucesso");
  preencherTabela();
};

const definirID = () => {
  let max = 0;
  const msgem = recuperarLocalStorage();
  msgem.forEach((message) => {
    if (message.id > max) {
      max = message.id;
    }
  });
  return max;
};

form.addEventListener("submit", salvarMsgem);
document.addEventListener("DOMContentLoaded", preencherTabela);
