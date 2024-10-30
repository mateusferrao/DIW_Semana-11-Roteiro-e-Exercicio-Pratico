function salvaDados(dados){
    localStorage.setItem('cards',JSON.stringify(dados));
}

function leDados(){
    let strDados = localStorage.getItem('cards');
    let objDados;

    if(strDados){
        objDados = JSON.parse(strDados);
    }else{
        objDados = {cards: [
            {titulo: "Teste", subtitulo: "teste", texto: "teste"}
        ]}
    }

    return objDados;
}

function incluirCard(){
    
}
