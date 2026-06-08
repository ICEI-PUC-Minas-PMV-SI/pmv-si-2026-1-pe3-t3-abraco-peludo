
const animaisDetalhesMock = {
    "1": {
        nome: "Ruffe",
        foto: "../../../assets/img/img-cao-1.svg",
        ong: "ONG Focinho Feliz",
        ongDescricao: "A Focinho Feliz é uma ONG dedicada a transformar a vida de animais em situação de abandono, conectando cães e gatos a famílias que possam oferecer amor, cuidado e um novo lar. Nosso objetivo é incentivar a adoção responsável, promover o bem-estar animal e mostrar que cada adoção é uma nova chance de felicidade.",
        telefone: "(11) 98877-6655",
        localizacao: "Belo Horizonte - MG",
        genero: "Macho",
        idade: "2 anos",
        porte: "Grande",
        sobre: "Dobermann dócil, demanda bastante espaço e caminhadas diárias. Brincalhão, deve se alimentar com ração para cães de grande porte, como a Pitucão XG. Ele adora brincar com bolinhas de tênis no parque e é extremamente sociável com outros animais e crianças.",
        saude: { vacinado: true, castrado: true, vermifugado: true }
    }
};

document.addEventListener("DOMContentLoaded", () => {

    const idAnimal = localStorage.getItem("idAnimalSelecionado") || "1";
    
    carregarPerfilDoPet(idAnimal);
    configurarBotaoAdocao(idAnimal);
});

function carregarPerfilDoPet(id) {
    const pet = animaisDetalhesMock[id];
    if (!pet) return;


    document.querySelector(".pet-foto-principal").src = pet.foto;
    document.querySelector(".ong-title-inline h2").innerText = pet.ong;
    document.querySelector(".pet-ong-box p").innerText = pet.ongDescricao;
    

    const badges = document.querySelectorAll(".ong-badge-item");
    if (badges.length >= 2) {
      
        const imgTelefone = badges[0].querySelector("img");
        const imgLocalizacao = badges[1].querySelector("img");

        if (imgTelefone) {
            badges[0].innerHTML = ""; 
            badges[0].appendChild(imgTelefone); 
            badges[0].appendChild(document.createTextNode(` ${pet.telefone}`)); 
        }
        if (imgLocalizacao) {
            badges[1].innerHTML = ""; 
            badges[1].appendChild(imgLocalizacao); 
            badges[1].appendChild(document.createTextNode(` ${pet.localizacao}`)); 
        }
    }


  
    document.querySelector(".pet-nome-main").innerText = pet.nome;
    document.querySelector(".pet-about-section h2").innerText = `Sobre o ${pet.nome}`;

  
    const limiteCaracteres = 400; 
    let textoSobreOriginal = pet.sobre;
    
    if (textoSobreOriginal.length > limiteCaracteres) {
        textoSobreOriginal = textoSobreOriginal.substring(0, limiteCaracteres) + "...";
    }
    
    document.querySelector(".pet-about-section p").innerText = textoSobreOriginal;


    const tags = document.querySelectorAll(".tag-item");
    if (tags.length >= 3) {
        const imgGenero = tags[0].querySelector("img");
        const imgIdade = tags[1].querySelector("img");
        const imgPorte = tags[2].querySelector("img");


        if (imgGenero) {
            tags[0].innerHTML = "";
            tags[0].appendChild(imgGenero);
            tags[0].appendChild(document.createTextNode(` ${pet.genero}`));
        }
        if (imgIdade) {
            tags[1].innerHTML = "";
            tags[1].appendChild(imgIdade);
            tags[1].appendChild(document.createTextNode(` ${pet.idade}`));
        }
        if (imgPorte) {
            tags[2].innerHTML = "";
            tags[2].appendChild(imgPorte);
            tags[2].appendChild(document.createTextNode(` ${pet.porte}`));
        }
    }

    document.querySelector(".item-vacina").style.display = pet.saude.vacinado ? "flex" : "none";
    document.querySelector(".item-castra").style.display = pet.saude.castrado ? "flex" : "none";
    document.querySelector(".item-vermifuga").style.display = pet.saude.vermifugado ? "flex" : "none";
}


function configurarBotaoAdocao(id) {
    const btnAdotar = document.getElementById("btnQueroAdotar");
    if (btnAdotar) {
        btnAdotar.addEventListener("click", () => {
            
            localStorage.setItem("idAnimalParaAdocao", id);
            
            window.location.href = "../formularioAdocao/formulario.html";
        });
    }
}