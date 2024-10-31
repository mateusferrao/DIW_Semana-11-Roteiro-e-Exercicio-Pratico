window.addEventListener("load", () => {
    imprimeDados();
    restauraModal();
})

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
                data-bs-target="#exampleModal2" onclick="editaCard(${i})"><i
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

function editaCard(index) {
    let objDados = leDados();
    let btnSalvar = document.getElementById('btnSalvar');

    document.getElementById('inputNovoTitulo').value = objDados.cards[index].titulo;
    document.getElementById('inputNovoSubtitulo').value = objDados.cards[index].subtitulo;
    document.getElementById('inputNovaDesc').value = objDados.cards[index].texto;

    btnSalvar.addEventListener("click", () => {
        let novoTitulo = document.getElementById('inputNovoTitulo').value;
        let novoSubtitulo = document.getElementById('inputNovoSubtitulo').value;
        let novaDesc = document.getElementById('inputNovaDesc').value;

        objDados.cards[index].titulo = novoTitulo;
        objDados.cards[index].subtitulo = novoSubtitulo;
        objDados.cards[index].texto = novaDesc;

        salvaDados(objDados);
        imprimeDados();
        
    });
}


