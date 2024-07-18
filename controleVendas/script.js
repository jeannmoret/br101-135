let nextVendaId = parseInt(localStorage.getItem("nextVendaId")) || 1;

function toggleResumo(button) {
  let tabela = document.getElementById("contadoresDiarios");
  if (tabela.style.display === "block") {
    tabela.style.display = "none";
  } else {
    tabela.style.display = "block";
  }
}

// Função para adicionar uma nova venda
function adicionarVenda() {
  // Obter valores dos campos
  let nomeVendas = document.getElementById("nomeVendas").value;
  let cpfVendas = document.getElementById("cpfVendas").value;
  let numeroVendas = document.getElementById("numeroVendas").value;
  let horaDataVendas = document.getElementById("horaDataVendas").value;
  let planoVendas = document.getElementById("planoVendas").value;

  // Validar se o número de telefone foi preenchido
  if (numeroVendas.trim() === "") {
    alert("Por favor, preencha o número de telefone.");
    return;
  }

  // Limpar os campos
  document.getElementById("nomeVendas").value = "";
  document.getElementById("cpfVendas").value = "";
  document.getElementById("numeroVendas").value = "";
  document.getElementById("horaDataVendas").value = "";
  document.getElementById("planoVendas").value = "Smart";

  // Criar objeto de venda com ID único
  let venda = {
    id: nextVendaId,
    nome: nomeVendas,
    cpf: cpfVendas,
    numero: numeroVendas,
    horaData: horaDataVendas,
    plano: planoVendas,
  };

  // Obter lista de vendas do Local Storage ou inicializar uma nova lista
  let listaDeVendas = JSON.parse(localStorage.getItem("listaDeVendas")) || [];

  // Adicionar nova venda à lista
  listaDeVendas.push(venda);

  // Incrementar o próximo ID único
  nextVendaId++;

  // Armazenar lista atualizada e próximo ID no Local Storage
  localStorage.setItem("listaDeVendas", JSON.stringify(listaDeVendas));
  localStorage.setItem("nextVendaId", nextVendaId);

  // Atualizar a exibição da lista
  exibirListaVendas();
}

// Função para limpar todas as vendas
function limparVendas() {
  let confirmacao = confirm(
    "Tem certeza de que deseja limpar todas as vendas?"
  );
  if (confirmacao) {
    localStorage.removeItem("listaDeVendas");
    localStorage.removeItem("nextVendaId");
    nextVendaId = 1; // Reiniciar o contador de IDs únicos
    exibirListaVendas(); // Atualizar a exibição da lista para mostrar que as vendas foram removidas
  }
}

// Função para exibir a lista de vendas
function exibirListaVendas() {
  let listaDeVendas = JSON.parse(localStorage.getItem("listaDeVendas")) || [];
  let listaHTML = "";
  let totals = {};
  let totalVendasMes = 0;

  // Ordenar as vendas por data
  listaDeVendas.sort(function (a, b) {
    return new Date(b.horaData) - new Date(a.horaData);
  });

  if (listaDeVendas.length > 0) {
    let dataAtual = null;

    listaDeVendas.forEach(function (venda) {
      let dataVenda = new Date(venda.horaData).toDateString();

      // Verificar se a data atual mudou
      if (dataVenda !== dataAtual) {
        // Fechar o bloco anterior, se houver
        if (dataAtual !== null) {
          listaHTML += "</div>"; // Fechar o bloco da data anterior
        }

        // Iniciar novo bloco de data
        listaHTML += "<div class='data-venda'>";
        listaHTML +=
          "<h2>" + new Date(venda.horaData).toLocaleDateString() + "</h2>";
        listaHTML += "</div>";
        dataAtual = dataVenda;
      }

      // Incrementar contadores com base no plano
      if (!totals[dataVenda]) {
        totals[dataVenda] = {
          total: 0,
          smart: 0,
          ilimitadas: 0,
          nubank: 0,
          conectado: 0,
        };
      }

      if (venda.plano === "Smart") {
        totals[dataVenda].smart++;
        totals[dataVenda].total++;
        totals[dataVenda].conectado++;
        totalVendasMes++;
      } else if (venda.plano === "Ligações Ilimitadas") {
        totals[dataVenda].ilimitadas++;
        totals[dataVenda].total++;
        totals[dataVenda].conectado++;
        totalVendasMes++;
      } else if (venda.plano === "Nubank") {
        totals[dataVenda].nubank++;
        totals[dataVenda].total++;
        totals[dataVenda].conectado += 0.5;
        totalVendasMes += 0.5;
      }

      // Exibir informações da venda
      listaHTML += "<div class='venda-item'>";
      listaHTML += "<p><strong>Nome:</strong> " + venda.nome + "</p>";
      listaHTML += "<p><strong>CPF:</strong> " + venda.cpf + "</p>";
      listaHTML += "<p><strong>Número:</strong> " + venda.numero + "</p>";
      listaHTML += "<p><strong>Plano:</strong> " + venda.plano + "</p>";
      listaHTML += "<div class='botoes'>";
      listaHTML +=
        "<button class='feito-button' onclick='excluirVenda(" +
        venda.id +
        ")'>Excluir</button>";
      listaHTML +=
        "<button class='editar-button' onclick='editarVenda(" +
        venda.id +
        ")'>Editar</button>";
      listaHTML += "</div>";
      listaHTML += "</div>";
    });

    // Fechar o último bloco de data
    listaHTML += "</div>";
  } else {
    listaHTML = "<p>Nenhuma venda registrada.</p>";
  }

  // Atualizar conteúdo da lista de vendas
  document.getElementById("listaVendas").innerHTML = listaHTML;

  // Atualizar contador de vendas do mês
  document.getElementById("totalVendasMes").textContent =
    "Total de Vendas no Mês: " + totalVendasMes;

  // Atualizar contadores diários
  let contadoresDiariosHTML = "<div class='contadores-diarios'>";
  for (let dia in totals) {
    contadoresDiariosHTML += "<div class='venda-resumo'>";
    contadoresDiariosHTML +=
      "<p><strong>" + new Date(dia).toLocaleDateString() + "</strong></p>";
    contadoresDiariosHTML +=
      "<p><strong>Dia:</strong><p class='color-venda-resumo'> " +
      totals[dia].total +
      "</p></p>";
    contadoresDiariosHTML +=
      "<p><strong>Smart:</strong><p class='color-venda-resumo'> " +
      totals[dia].smart +
      "</p></p>";
    contadoresDiariosHTML +=
      "<p><strong>LI:</strong><p class='color-venda-resumo'> " +
      totals[dia].ilimitadas +
      "</p></p>";
    contadoresDiariosHTML +=
      "<p><strong>Nubank:</strong><p class='color-venda-resumo'> " +
      totals[dia].nubank +
      "</p></p>";
    contadoresDiariosHTML +=
      "<p><strong>Conectado:</strong> <p class='color-venda-resumo'>" +
      totals[dia].conectado +
      "</p></p>";
    contadoresDiariosHTML += "</div>";
  }
  contadoresDiariosHTML += "</div>";
  document.getElementById("contadoresDiarios").innerHTML =
    contadoresDiariosHTML;
}

// Função para excluir uma venda
function excluirVenda(id) {
  let listaDeVendas = JSON.parse(localStorage.getItem("listaDeVendas")) || [];

  // Encontrar o índice da venda pelo ID
  let index = listaDeVendas.findIndex(function (venda) {
    return venda.id === id;
  });

  // Confirmar ação com o usuário
  let confirmacao = confirm("Tem certeza de que deseja excluir esta venda?");
  if (confirmacao && index !== -1) {
    listaDeVendas.splice(index, 1); // Remover a venda do array
    localStorage.setItem("listaDeVendas", JSON.stringify(listaDeVendas)); // Atualizar o Local Storage
    exibirListaVendas(); // Atualizar a exibição da lista
  }
}

// Função para editar uma venda
function editarVenda(id) {
  let listaDeVendas = JSON.parse(localStorage.getItem("listaDeVendas")) || [];

  // Encontrar o índice da venda pelo ID
  let index = listaDeVendas.findIndex(function (venda) {
    return venda.id === id;
  });

  if (index !== -1) {
    let venda = listaDeVendas[index];

    // Preencher os campos do formulário com os dados da venda selecionada
    document.getElementById("nomeVendas").value = venda.nome;
    document.getElementById("cpfVendas").value = venda.cpf;
    document.getElementById("numeroVendas").value = venda.numero;
    document.getElementById("horaDataVendas").value = venda.horaData;
    document.getElementById("planoVendas").value = venda.plano;

    document.getElementById("nomeVendas").focus();

    // Remover a venda do array
    listaDeVendas.splice(index, 1);

    // Atualizar o Local Storage
    localStorage.setItem("listaDeVendas", JSON.stringify(listaDeVendas));

    // Atualizar a exibição da lista
    exibirListaVendas();
  }
}

function exportarVendas() {
  let listaDeVendas = JSON.parse(localStorage.getItem("listaDeVendas")) || [];

  if (listaDeVendas.length === 0) {
    alert("Não há vendas para exportar.");
    return;
  }

  let data = JSON.stringify(listaDeVendas, null, 2);
  let blob = new Blob([data], { type: "application/json" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "vendas.json";
  document.body.appendChild(a);
  a.click();

  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

function importarVendas(event) {
  let input = event.target;
  let reader = new FileReader();

  reader.onload = function () {
    try {
      let data = JSON.parse(reader.result);

      // Validar se o arquivo contém uma lista válida de vendas
      if (!Array.isArray(data)) {
        throw new Error(
          "Arquivo inválido. Por favor, selecione um arquivo JSON válido contendo uma lista de vendas."
        );
      }

      // Atualizar a lista de vendas no Local Storage
      localStorage.setItem("listaDeVendas", JSON.stringify(data));
      nextVendaId = data.length + 1; // Atualizar o próximo ID único

      // Atualizar a exibição da lista de vendas
      exibirListaVendas();

      alert("Vendas importadas com sucesso.");
    } catch (error) {
      alert("Erro ao importar vendas: " + error.message);
    }
  };

  reader.readAsText(input.files[0]);
}

// Exibir lista quando a página carregar
window.onload = function () {
  exibirListaVendas();
};
