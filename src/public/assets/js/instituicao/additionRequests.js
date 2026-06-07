const pedidosMock = [
    {
        id: "1",
        data: "12 / 05 / 2026",
        adotante: "José Carlos da Silva",
        pet: "Ruffus"
    },
    {
        id: "2",
        data: "08 / 05 / 2026",
        adotante: "Maria Eduarda Santos",
        pet: "Luna"
    },
    {
        id: "3",
        data: "05 / 05 / 2026",
        adotante: "Antônio Marcos Ferreira",
        pet: "Bob"
    },
    {
        id: "4",
        data: "28 / 04 / 2026",
        adotante: "Clara Costa Lima",
        pet: "Miau"
    }
];


document.addEventListener("DOMContentLoaded", () => {
    carregarPedidos();
});


function carregarPedidos() {

    const listaContainer = document.querySelector(".pedidos-lista");
    
  
    if (listaContainer) {
        listaContainer.innerHTML = "";
    } else {
        console.error("Container '.pedidos-lista' não encontrado no HTML.");
        return;
    }

    
    if (pedidosMock.length === 0) {
        listaContainer.innerHTML = `<p class="ong-list-empty">Nenhum pedido de adoção pendente.</p>`;
        return;
    }

    
    pedidosMock.forEach(pedido => {
       
        const pedidoItem = document.createElement("div");
        pedidoItem.classList.add("pedido-item");

      
        pedidoItem.innerHTML = `
            <span class="pedido-dado pedido-data">${pedido.data}</span>
            <span class="pedido-dado pedido-adotante">${pedido.adotante}</span>
            <span class="pedido-dado pedido-pet">${pedido.pet}</span>
            <button type="button" class="pedido-btn" onclick="verSolicitacao('${pedido.id}')">Ver solicitação</button>
        `;

      
        listaContainer.appendChild(pedidoItem);
    });
}

/**
 * Função acionada ao clicar em "Ver solicitação"
 * @param {string} id 
 */
function verSolicitacao(id) {
   
    localStorage.setItem("idPedidoSelecionado", id);
    
  
    window.location.href = "../detalhesPedido/detalhesPedido.html";
}