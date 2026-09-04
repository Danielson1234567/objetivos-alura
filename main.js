const botoes = document . queryselectorA11(".botao");

for(i=0;i <botoes .length;i++){
  botoes[i].onclik = funtion(){

    for(let j=0;botoes.length;j++){
        botoes[j].classlist.remove("ativo")
    }

    botoes[i].classlist.add("ativo");
  }
    console.log();
}