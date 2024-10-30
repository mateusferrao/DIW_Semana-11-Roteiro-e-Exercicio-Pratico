window.addEventListener("load", () => {
    imprimeDados();
    restauraModal();
})

function restauraModal(){
    let tituloModal = document.getElementById('exampleModalLabel');
    let btnModal = document.getElementById('btnAdd');

    inputTitulo.setAttribute("placeholder", "Título");
    inputSubtitulo.setAttribute("placeholder", "Subtítulo");
    inputDesc.setAttribute("placeholder", "Descrição");

    tituloModal.innerHTML = `Novo Card`;
    btnModal.innerHTML = `Adicionar`;
    
}

function salvaDados(dados) {
    localStorage.setItem('cards', JSON.stringify(dados));
}

function leDados() {
    let strDados = localStorage.getItem('cards');
    let objDados;

    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = { cards: [] }
    }

    return objDados;
}

function imprimeDados() {
    let objDados = leDados();
    let telaTo = document.getElementById('toDoList');
    let telaFav = document.getElementById('favoritos');
    let strToHtml = ``;
    let strFavHtml = ``;

    for (let i = 0; i < objDados.cards.length; i++) {
        const estrelaPreenchida = objDados.cards[i].favorito ? "bi-star-fill" : "bi-star";

        if (objDados.cards[i].favorito) {
            strFavHtml += `<div class="card mx-auto my-3 border-2 border-success rounded" style="width: 25rem;">
                    <div class="card-body bg-success">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-success btn mx-2 id="btnFav${i}" onclick="alteraEstrela(${i})"><i class="bi ${estrelaPreenchida}"></i></button>
                        </div>
                        <h5 class="card-title text-white">${objDados.cards[i].titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${objDados.cards[i].subtitulo}</h6>
                        <p class="card-text text-white">${objDados.cards[i].texto}</p>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-success btn mx-2" data-bs-toggle="modal"
                data-bs-target="#exampleModal" onclick="editaCard(${i})"><i
                                    class="bi bi-pencil-fill"></i></button>
                            <button type="button" class="btn btn-success btn"><i class="bi bi-trash3-fill"></i></button>
                        </div>
                    </div>
                </div>`
        } else {
            strToHtml += `<div class="card mx-auto my-3 border-2 border-success rounded" style="width: 25rem;">
                    <div class="card-body bg-success">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-success btn mx-2 id="btnFav${i}" onclick="alteraEstrela(${i})"><i class="bi ${estrelaPreenchida}"></i></button>
                        </div>
                        <h5 class="card-title text-white">${objDados.cards[i].titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${objDados.cards[i].subtitulo}</h6>
                        <p class="card-text text-white">${objDados.cards[i].texto}</p>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-success btn mx-2" data-bs-toggle="modal"
                data-bs-target="#exampleModal" onclick="editaCard(${i})"><i
                                    class="bi bi-pencil-fill"></i></button>
                            <button type="button" class="btn btn-success btn"><i class="bi bi-trash3-fill"></i></button>
                        </div>
                    </div>
                </div>`
        }

    }

    telaTo.innerHTML = strToHtml;
    telaFav.innerHTML = strFavHtml;
}

function incluirCard() {
    let objDados = leDados();

    inputTitulo.removeAttribute("placeholder","Novo título");
    inputTitulo.setAttribute("placeholder","Título");
    inputSubtitulo.removeAttribute("placeholder","Novo subtítulo");
    inputSubtitulo.setAttribute("placeholder","Subtítulo");
    inputDesc.removeAttribute("placeholder","Nova descrição");
    inputDesc.setAttribute("placeholder","Descrição");

    let strTitulo = document.getElementById('inputTitulo').value;
    let strSubtitutulo = document.getElementById('inputSubtitulo').value;
    let strTexto = document.getElementById('inputDesc').value;

    let novoCard = {
        titulo: strTitulo,
        subtitulo: strSubtitutulo,
        texto: strTexto
    };

    objDados.cards.push(novoCard);

    salvaDados(objDados);

    imprimeDados();
}

function alteraEstrela(index) {
    let objDados = leDados();

    objDados.cards[index].favorito = !objDados.cards[index].favorito;

    salvaDados(objDados);

    imprimeDados();
}

/*function editaCard(index) {
    let objDados = leDados();

    let inputTitulo = document.getElementById('inputTitulo');
    let inputSubtitulo = document.getElementById('inputSubtitulo');
    let inputDesc = document.getElementById('inputDesc');
    let tituloModal = document.getElementById('exampleModalLabel');
    let btnModal = document.getElementById('btnAdd');

    inputTitulo.removeAttribute("placeholder","Título");
    inputTitulo.setAttribute("placeholder","Novo título");
    inputSubtitulo.removeAttribute("placeholder","Subtítulo");
    inputSubtitulo.setAttribute("placeholder","Novo subtítulo");
    inputDesc.removeAttribute("placeholder","Descrição");
    inputDesc.setAttribute("placeholder","Nova descrição");

    tituloModal.innerHTML = `Editar Card`
    btnModal.innerHTML = `Salvar`;

    objDados.cards[index].titulo = inputTitulo.value || objDados.cards[index].titulo;
    objDados.cards[index].subtitulo = inputSubtitulo.value || objDados.cards[index].subtitulo;
    objDados.cards[index].texto = inputDesc.value || objDados.cards[index].texto;

    salvaDados(objDados);

    imprimeDados();

}*/
