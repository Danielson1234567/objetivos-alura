const botoes = document.querySelectorAll(".botao");

botoes.forEach((botao) => {
  botao.onclick = function () {
    // Remove a classe "ativo" de todos os botões
    botoes.forEach((b) => b.classList.remove("ativo"));
    
    // Adiciona a classe "ativo" apenas no botão clicado
    botao.classList.add("ativo");
  };
});
