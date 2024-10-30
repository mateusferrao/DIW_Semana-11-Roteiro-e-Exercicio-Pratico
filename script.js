window.addEventListener("load", () => {
    imprimeDados();
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
    let tela = document.getElementById('toDoList');
    let strHtml = ``;

    for (let i = 0; i < objDados.cards.length; i++) {
        strHtml += `<div class="card mx-auto my-3 border-2 border-success rounded" style="width: 25rem;">
                    <div class="card-body bg-success">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-success btn mx-2"><i class="bi bi-star"></i></button>
                        </div>
                        <h5 class="card-title text-white">${objDados.cards[i].titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${objDados.cards[i].subtitulo}</h6>
                        <p class="card-text text-white">${objDados.cards[i].texto}</p>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-success btn mx-2"><i
                                    class="bi bi-pencil-fill"></i></button>
                            <button type="button" class="btn btn-success btn"><i class="bi bi-trash3-fill"></i></button>
                        </div>
                    </div>
                </div>`
    }

    tela.innerHTML = strHtml;
}

function incluirCard() {
    let objDados = leDados();
    let btnAdd = document.getElementById('btnAdd');

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

