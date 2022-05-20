const form = document.querySelector("#mural");
const corpoTabela = document.querySelector("#tbody");
const recuperarLocalStorage = () => {
    const msgem = JSON.parse(localStorage.getItem("dadosMsg") || "[]");
    return msgem;
};
const atualizarLocalStorage = (msgem) => {
    localStorage.setItem("dadosMsg", JSON.stringify(msgem));
};
const salvarMsgem = (event) => {
    // remove o comportamento padrão do subtmit
    event.preventDefault();
    // pega as informações dos inputs no html e passa para as variaveis
    const descricao = form.descricao.value;
    const msg = form.msg.value;
    // recupera a lista de produto no localStorage
    const msgem = recuperarLocalStorage();
    // insere o novo produto na lista
    msgem.push({
        id: definirID() + 1,
        descricao: descricao,
        msg: msg,
        
    });
    // atualiza o localStorage com o novo produto adicionado
    atualizarLocalStorage(msgem);
    alert("Produto adicionado com sucesso");
    // atualiza a tabela com o novo produto adicionado
    preencherTabela();
    // limpa os inputs
    form.reset();
};
const preencherTabela = () => {
    // recupera a lista de produtos do localStorage
    const msgem = recuperarLocalStorage();
    // limpa a tabela no html
    corpoTabela.innerHTML = "";
    // percorre a lista de produtos
    for (const message of msgem) {
        // para cada produto vamos criar uma linha nova no corpo da table
        corpoTabela.innerHTML += `
        <tr>
            <td>${message.id}</td>
            <td>${message.descricao}</td>
            <td>${message.msg}</td>
             <td>
                <img src="./assets/lixo.svg" alt="imagem de lixeira" width="40" onclick="removeProduto(${message.id})" >
            </td>
        </tr>
      `;
    }
};
const removeProduto = (id) => {
    // recupera a lista do localStorage
    const msgem = recuperarLocalStorage();
    // procura o indice do produto na lista conforme o identificado passado
    const indiceMsg = msgem.findIndex((message) => message.id === id);
    // quando o findIndex não encontra ele retorna -1
    // então por isso é verificado se o indice é menor que o 0
    if (indiceMsg < 0)
        return;
    // remove o produto da lista
    msgem.splice(indiceMsg, 1);
    // atualiza o localStorage
    atualizarLocalStorage(msgem);
    alert("Mensagem removida com sucesso");
    // atualiza a tabela no html
    preencherTabela();
};
const definirID = () => {
    // guardar o maior ID encontrado na lista de produtos
    let max = 0;
    // recupera a lista de produtos do localStorage
    const msgem = recuperarLocalStorage();
    // percorre a lista de produtos para atualizar e obter o maior
    msgem.forEach((message) => {
        if (message.id > max) {
            max = message.id;
        }
    });
    return max;
};
// submit
// if (form !== null)
// variavel === undefined = FALSE
// variavel === null = FALSE
// variavel === 0 = FALSE
// variavel === "" = FALSE
// variavel !== undefined = TRUE
// variavel !== null = TRUE
// variavel === 1 = TRUE
// variavel === "qualquer valor" = TRUE
form.addEventListener("submit", salvarMsgem);
// assim que o conteúdo html é carregado é chamado a função para
// preencher a tabela com os produtos cadastrados
document.addEventListener("DOMContentLoaded", preencherTabela);
