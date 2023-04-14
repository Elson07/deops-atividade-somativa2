//Serve como parametro para restrições na area em que os objetos serão criados 
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;

//Inicio lógica para o nivel de dificuldade
var criaMosquitoTempo = 1500;

var nivel = window.location.search;                                     //search retorna somentes os parametros da url com ponto de interrogação e tudo que estiver a direita 
nivel = nivel.replace("?", "");

if(nivel === "noval"){
    criaMosquitoTempo = 1500;
}else if(nivel === "dificil"){
    criaMosquitoTempo = 1000; 
}else if(nivel === "chucknorris"){
    criaMosquitoTempo = 750;
}
//Fim lógica para o nivel de dificuldade

function ajustaTamanhoPalcoJogo(){
    altura =  window.innerHeight;
    largura = window.innerWidth;
    console.log(largura, altura);
}
ajustaTamanhoPalcoJogo();

//Inicio função cronometro
var cronometro = setInterval(function(){
    tempo -= 1;
    if(tempo < 0){
        clearInterval(cronometro);
        clearInterval(criaMosquito);
        window.location = "vitoria.html";
    }else{
        document.getElementById("cronometro").innerHTML = tempo;        //InnerHTML insere coteudo dentro da tag
    }  
}, 1000);
//FIm função cronometro

//Cria uma posição ramdomica para o mosquito
function posicaoRandomica(){
    //remover o mosquito anterior (caso exista)
    if(document.getElementById("mosquito")){
        document.getElementById("mosquito").remove();

        if(vidas > 3){
            window.location.href = "fim_de_jogo.html";
        }
        else{
            document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png";
            vidas++;
        }
    }
    
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    console.log(posicaoX, posicaoY);

    //Cria o elemento html
    var mosquito = document.createElement('img');                       //Cria um elemento img
    mosquito.src = "imagens/mosquito.png";                              //Especifica o endereço da imagem  
    mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();    //Aplica formatação css na imagem      
    mosquito.style.left = posicaoX + "px";                              //define a posição do elemento no eixo X
    mosquito.style.top = posicaoY + "px";                               //define a posição do elemento no eixo Y
    mosquito.style.position = "absolute";                               //define o tipo de posição, caso contrario left e top não funcionam
    mosquito.id = "mosquito";
    mosquito.onclick = function(){
        this.remove();                                                  //Função anonima onclick, remove o mesquito, usando o ponteiro this, na qual referencia ao objeto mosquito
    }

    document.body.appendChild(mosquito);                                //Adciona o elemento img ao body
}

//Gera a classe do mosquito, que é utilizado como paramentro para fazer a chamada para o estilo css definir o tamanho do mosquito 
function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3);

    switch(classe){
        case 0:
            return "mosquito1";
        case 1:
            return "mosquito2";
        case 2:
            return "mosquito3";
    }
}

//Gera um valor randomico que seve como parametro para definir o lado na quao o mosquito esta olhando, direita ou esquerda 
function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2);

    switch(classe){
        case 0:
            return "ladoA";
        case 1:
            return "ladoB";
    }
}