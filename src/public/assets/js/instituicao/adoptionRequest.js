
const detalhesPedidosMock = {
    "1": {
        animal: {
            nome: "Ruffe",
            foto: "../../../assets/img/ruffus-detalhe.jpg",
            ong: "ONG Focinho Feliz",
            ongDescricao: "A Focinho Feliz é uma ONG dedicada a transformar a vida de animais em situação de abandono, conectando cães e gatos a famílias que possam oferecer amor, cuidado e um novo lar. Nosso objetivo é incentivar a adoção responsável, promover o bem-estar animal e mostrar que cada adoção é uma nova chance de felicidade.",
            genero: "Macho",
            idade: "2 anos",
            porte: "Grande",
            sobre: "Dobermann dócil, demanda bastante espaço e caminhadas diárias. Brincalhão, deve se alimentar com ração para cães de grande porte, como a Pitucão XG.",
            saude: { vacinado: true, castrado: true, vermifugado: true }
        },
        adotante: {
            nomeCompleto: "José Carlos da Silva",
            cpf: "123.456.789-00",
            dataNascimento: "14/08/1992",
            email: "jose.carlos@email.com",
            respostas: {
                estado: "MG",
                cidade: "Belo Horizonte",
                crianca: "Não possui crianças em casa.",
                cientes: "Sim, todos estão cientes e de acordo.",
                presente: "O pet é para mim mesmo.",
                casaComTelas: "Sim, todas as janelas possuem redes.",
                casaSemTelas: "Não se aplica.",
                apComTelas: "Não se aplica.",
                apSemTelas: "Não se aplica.",
                coberturaComTelas: "Não se aplica.",
                coberturaSemTelas: "Não se aplica.",
                terreoComTelas: "Não se aplica.",
                terreoSemTelas: "Não se aplica."
            }
        }
    },
    "2": {
        animal: {
            nome: "Luna",
            foto: "../../../assets/img/luna-detalhe.jpg",
            ong: "ONG Focinho Feliz",
            ongDescricao: "A Focinho Feliz é uma ONG dedicada a transformar a vida de animais...",
            genero: "Fêmea",
            idade: "1 ano",
            porte: "Médio",
            sobre: "Gatinha muito dócil e carinhosa, ideal para apartamento.",
            saude: { vacinado: true, castrado: true, vermifugado: false }
        },
        adotante: {
            nomeCompleto: "Maria Eduarda Santos",
            cpf: "987.654.321-11",
            dataNascimento: "22/03/1998",
            email: "maria.eduarda@email.com",
            respostas: {
                estado: "MG",
                cidade: "Contagem",
                crianca: "Sim, um filho de 7 anos.",
                cientes: "Sim, todos de acordo.",
                presente: "O pet é para mim e minha família.",
                casaComTelas: "Não se aplica.",
                casaSemTelas: "Não se aplica.",
                apComTelas: "Sim, apartamento totalmente telado.",
                apSemTelas: "Não se aplica.",
                coberturaComTelas: "Não se aplica.",
                coberturaSemTelas: "Não se aplica.",
                terreoComTelas: "Não se aplica.",
                terreoSemTelas: "Não se aplica."
            }
        }
    }
};


document.addEventListener("DOMContentLoaded", () => {

    const idPedido = localStorage.getItem("idPedidoSelecionado") || "1"; 


    renderizarDadosDoPedido(idPedido);


    configurarBotoesAcao(idPedido);
});


function renderizarDadosDoPedido(id) {
    const dados = detalhesPedidosMock[id];

    if (!dados) {
        alert("Pedido não encontrado!");
        window.location.href = "../pedidosAdocao/pedidosAdocao.html";
        return;
    }


    document.querySelector(".animal-foto-detalhe").src = dados.animal.foto;
    document.querySelector(".ong-header-inline h2").innerText = dados.animal.ong;
    document.querySelector(".animal-ong-info p").innerText = dados.animal.ongDescricao;
    document.querySelector(".animal-nome-titulo").innerText = dados.animal.nome;
    document.querySelector(".animal-descricao-bloco p").innerText = dados.animal.sobre;

    
    const tags = document.querySelectorAll(".tag-item");
    tags[0].innerHTML = `<img src="../../../assets/img/icon-mars.svg" class="tag-icon-img" alt="Gênero"> ${dados.animal.genero}`;
    tags[1].innerHTML = `<img src="../../../assets/img/icon-calendar.svg" class="tag-icon-img" alt="Idade"> ${dados.animal.idade}`;
    tags[2].innerHTML = `<img src="../../../assets/img/icon-paw.svg" class="tag-icon-img" alt="Porte"> ${dados.animal.porte}`;


    document.querySelector(".animal-descricao-bloco h4").innerText = `Sobre o ${dados.animal.nome}`;


    document.querySelector(".item-vacinado").style.display = dados.animal.saude.vacinado ? "flex" : "none";
    document.querySelector(".item-castrado").style.display = dados.animal.saude.castrado ? "flex" : "none";
    document.querySelector(".item-vermifugado").style.display = dados.animal.saude.vermifugado ? "flex" : "none";



    const inputs = document.querySelectorAll(".solicitacao-input-readonly");
    
  
    inputs[0].value = dados.adotante.nomeCompleto;
    inputs[1].value = dados.adotante.cpf;
    inputs[2].value = dados.adotante.dataNascimento;
    inputs[3].value = dados.adotante.email;
    
    inputs[4].value = dados.adotante.respostas.estado;
    inputs[5].value = dados.adotante.respostas.city || dados.adotante.respostas.cidade;
    inputs[6].value = dados.adotante.respostas.crianca;
    inputs[7].value = dados.adotante.respostas.cientes;
    inputs[8].value = dados.adotante.respostas.presente;
    
    inputs[9].value = dados.adotante.respostas.casaComTelas;
    inputs[10].value = dados.adotante.respostas.casaSemTelas;
    inputs[11].value = dados.adotante.respostas.apComTelas;
    inputs[12].value = dados.adotante.respostas.apSemTelas;
    inputs[13].value = dados.adotante.respostas.coberturaComTelas;
    inputs[14].value = dados.adotante.respostas.coberturaSemTelas;
    inputs[15].value = dados.adotante.respostas.terreoComTelas;
    inputs[16].value = dados.adotante.respostas.terreoSemTelas;
}


function configurarBotoesAcao(id) {
    const btnRecusar = document.getElementById("btnRecusarPedido");
    const btnAceitar = document.getElementById("btnAceitarPedido");


    if (btnRecusar) {
        btnRecusar.addEventListener("click", () => {
            const confirmacao = confirm("Tem certeza de que deseja recusar este pedido de adoção?");
            if (confirmacao) {

                
             
                window.location.href = "../recusaPedido/recusaPedido.html"; 
            }
        });
    }


    if (btnAceitar) {
        btnAceitar.addEventListener("click", () => {

            window.location.href = "../sucessoPedido/sucessoPedido.html";
        });
    }
}