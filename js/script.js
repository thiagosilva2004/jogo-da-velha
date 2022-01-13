const celulas = document.querySelectorAll(".celula"); // serve para selecionar todos da classe celula

const CONDICOES_VENCEDOR = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; // As condições para que haja um vencedor

let fimDeJogo = false; // boleano que serve para ver se o jogo terminou ou não
let comecoJogo = false; // boleano que serve para ver se o jogo começou
let player;
let boot;

function ComecarJogo(jogador){
    const bttX = document.getElementById('bttJogarX'); // constante com do btt "jogar como X"
    const bttO = document.getElementById('bttJogarO'); // constante com do btt "jogar como O"

    // verifica qual sinal o jogador escolheu para jogar

    if(jogador === "X"){ 
        player = "X";
        boot = "O";
        comecoJogo = true;
        bttX.style.visibility = "hidden";     
        bttO.style.visibility = "hidden";   
    }else if(jogador === "O"){
        player = "O";
        boot = "X";
        comecoJogo = true;
        bttX.style.visibility = "hidden";     
        bttO.style.visibility = "hidden";    
    }else{
        alert("erro");
        Reiniciar();
    }
}

// let checarTurno = true; // se for true é o JOGADOR_X, e o contraio o JOGADOR_O

document.addEventListener("click", (Event) => { // chamada quando acontece um click
    if(Event.target.matches(".celula") && comecoJogo === true && fimDeJogo === false){  // verifica se o clique é em uma opçao quadro do jogo
        let id = Event.target.id; // armazena o id do quadro clicado
        if(!isNaN(id)){ // verifica se é um numero
            if(!celulas[id].classList.contains("X") && !celulas[id].classList.contains("O")){ // verifica se essa opçao já foi jogada
                Jogar(id, player);
                setTimeout(() => Boot(boot), 500); // chama a função boot depois de 500 milisegundos = 0,50s
            }else{
                alert("casa já marcada");
            }
        }
    }
    
});

function Boot(Boot){
    const posicoesDisponiveis = [];

    for (index in celulas) {
        if(!isNaN(index)){
            if(!celulas[index].classList.contains("X") && !celulas[index].classList.contains("O")){
                posicoesDisponiveis.push(index);
            }
        }
    }

    const posicaoAleatoria = Math.floor(Math.random() * posicoesDisponiveis.length); 

    if(!fimDeJogo){
        Jogar(posicoesDisponiveis[posicaoAleatoria], boot);  
    }
    
}

function Jogar(id, turno){
    const celula = document.getElementById(id);
    celula.textContent = turno;
    celula.classList.add(turno);
    
    ChecarVencedor(turno);
}

function ChecarVencedor(turno){
    const vencedor = CONDICOES_VENCEDOR.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno);
        });
    });

    if(vencedor){
        EncerrarJogo(turno);
    }else if(ChecarEmpate()){
        EncerrarJogo();
    }
}

function EncerrarJogo(vencedor=null){
    fimDeJogo = true;
    const mensg = document.getElementById('mensg');
    const bttReiniciar = document.getElementById('bttReiniciar');
    const h2 = document.createElement("h2");

    bttReiniciar.style.visibility = "visible";
    h2.style.marginTop = "10px";

    mensg.appendChild(h2);
    // telaEscura.appendChild(h3);

    if(vencedor){
        h2.innerHTML = "O player <span>" + vencedor + "</span> venceu";
    }else{
        
        h2.innerHTML = 'Empate!';
    }

}

function ChecarEmpate(){
    let x = 0;
    let o = 0;

    for (index in celulas) {
        if(!isNaN(index)){   // verifica se é um numero
            if(celulas[index].classList.contains(player)){ // conta as casas marcadas com x
                x++;
            }

            if(celulas[index].classList.contains(boot)){ // conta as casas marcadas com o
                o++;
            }
        }
    }

    return x + o === 9 ? true : false; // se a soma das variasveis for 9 retorna true, senão false
}

function Reiniciar(){
    location.reload();
}

