var timeoutID;

function calcularDatas() {
  var hoje = new Date();
  var dia = hoje.getDate();
  var mes = hoje.getMonth();

  // Definir o incremento do mês com base no dia atual para a primeira data
  if (dia <= 23) {
    mes += 1;
  } else {
    mes += 2;
  }

  var vencimentos = [
    { inicio: 1, fim: 6, diaIdeal: 7 },
    { inicio: 7, fim: 11, diaIdeal: 10 },
    { inicio: 12, fim: 15, diaIdeal: 12 },
    { inicio: 16, fim: 18, diaIdeal: 15 },
    { inicio: 19, fim: 23, diaIdeal: 20 },
    { inicio: 24, fim: 28, diaIdeal: 1 },
    { inicio: 29, fim: 31, diaIdeal: 7 },
  ];

  var vencimentoIdeal = 0;
  for (var i = 0; i < vencimentos.length; i++) {
    var faixa = vencimentos[i];
    if (dia >= faixa.inicio && dia <= faixa.fim) {
      vencimentoIdeal = faixa.diaIdeal;
      break;
    }
  }

  // Ajustar o mês se necessário para a primeira data
  if (mes > 11) {
    mes -= 12; // Se o mês passar de dezembro, voltar para janeiro do próximo ano
    hoje.setFullYear(hoje.getFullYear() + 1); // Incrementar o ano
  }

  var primeiraData = new Date(hoje.getFullYear(), mes, vencimentoIdeal);

  // Calcular a segunda data com base na primeira data (vencimentoIdeal)
  var segundoVencimento = 0;
  switch (vencimentoIdeal) {
    case 1:
      segundoVencimento = 7;
      break;
    case 7:
      segundoVencimento = 10;
      break;
    case 10:
      segundoVencimento = 12;
      break;
    case 12:
      segundoVencimento = 15;
      break;
    case 15:
      segundoVencimento = 20;
      break;
    case 20:
      segundoVencimento = 1;
      mes += 1; // Avançar para o próximo mês
      if (mes > 11) {
        mes -= 12;
        hoje.setFullYear(hoje.getFullYear() + 1);
      }
      break;
    default:
      segundoVencimento = 1;
      break;
  }

  var segundaData = new Date(hoje.getFullYear(), mes, segundoVencimento);

  // Formatar as datas para exibição
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var primeiraDataFormatada = primeiraData.toLocaleDateString("pt-BR", options);
  var segundaDataFormatada = segundaData.toLocaleDateString("pt-BR", options);

  // Exibir as datas na tela
  document.getElementById("resultado1").textContent = primeiraDataFormatada;
  document.getElementById("resultado2").textContent = segundaDataFormatada;
}

// Chamar a função calcularDatas ao carregar a página
calcularDatas();

function calcularResultados() {
  // Captura dos valores digitados pelo usuário
  var diasMes = parseInt(document.getElementById("diasMes").value);
  var diasTrabalhados = parseInt(
    document.getElementById("diasTrabalhados").value
  );
  var metaOperacao = parseInt(document.getElementById("metaOperacao").value);
  var vendasAceitas = parseInt(document.getElementById("vendasAceitas").value);

  // Cálculos
  var diasRestantes = diasMes - diasTrabalhados;
  var mediaOperacional = vendasAceitas / diasTrabalhados;
  var vendasFaltantes = metaOperacao - vendasAceitas;
  var vendasFaltantesDia = vendasFaltantes / diasRestantes;
  var projecao = mediaOperacional * diasMes;

  // Atualiza os valores na tabela
  document.getElementById("diasRestantes").textContent = diasRestantes;
  document.getElementById("mediaOperacional").textContent =
    mediaOperacional.toFixed(2);
  document.getElementById("vendasFaltantes").textContent = vendasFaltantes;
  document.getElementById("vendasFaltantesDia").textContent =
    vendasFaltantesDia.toFixed(2);
  document.getElementById("projecao").textContent = projecao.toFixed(2);

  var dadosProjecao = {
    diasMes: diasMes,
    diasTrabalhados: diasTrabalhados,
    metaOperacao: metaOperacao,
    vendasAceitas: vendasAceitas,
  };
  localStorage.setItem("dadosProjecao", JSON.stringify(dadosProjecao));
}

function toggleCampanha(button) {
  var tabela = document.getElementById("tabelaCampanha");
  if (tabela.style.display === "block") {
    tabela.style.display = "none";
    button.classList.remove("active");
  } else {
    tabela.style.display = "block";
    button.classList.add("active");
  }
}

function toggleLinks(button) {
  var tabela = document.getElementById("links");
  if (tabela.style.display === "block") {
    tabela.style.display = "none";
    button.classList.remove("active");
  } else {
    tabela.style.display = "block";
    button.classList.add("active");
  }
}

function toggleVencimento(button) {
  var tabela = document.getElementById("vencimentos");
  if (tabela.style.display === "block") {
    tabela.style.display = "none";
    button.classList.remove("active");
  } else {
    tabela.style.display = "block";
    button.classList.add("active");
  }
}

function toggleTabela(button) {
  var tabela = document.getElementById("tabelaMeta");
  if (tabela.style.display === "block") {
    tabela.style.display = "none";
    button.classList.remove("active");
  } else {
    tabela.style.display = "block";
    button.classList.add("active");
  }
}

function toggleProjecao(button) {
  var tabela = document.getElementById("tabelaProjecao");
  if (tabela.style.display === "block") {
    tabela.style.display = "none";
    button.classList.remove("active");
  } else {
    tabela.style.display = "block";
    button.classList.add("active");
  }
}

function toggleCaixaTexto(button) {
  var caixaTexto = document.getElementById("caixaTexto");
  if (caixaTexto.style.display === "block") {
    fecharCaixaTexto(); // Chama fecharCaixaTexto() ao fechar a caixa de texto
    caixaTexto.style.display = "none";
    button.classList.remove("active");
  } else {
    caixaTexto.style.display = "block";
    button.classList.add("active");
  }
}

// Funções para aumentar e diminuir a fonte do texto na caixa de texto
function aumentarFonte() {
  var textoCaixa = document.getElementById("textoCaixa");
  var fontSize = window.getComputedStyle(textoCaixa).fontSize;
  textoCaixa.style.fontSize = parseInt(fontSize) * 1.2 + "px";
}

function diminuirFonte() {
  var textoCaixa = document.getElementById("textoCaixa");
  var fontSize = window.getComputedStyle(textoCaixa).fontSize;
  textoCaixa.style.fontSize = parseInt(fontSize) / 1.2 + "px";
}

function fecharCaixaTexto() {
  var textoCaixa = document.getElementById("textoCaixa").value;
  console.log("Texto a ser salvo:", textoCaixa);
  localStorage.setItem("textoCaixa", textoCaixa);
  document.getElementById("caixaTexto").style.display = "none";
}

// Função para adicionar uma nova ligação
function adicionarLigacao() {
  // Obter valores dos campos
  var numero = document.getElementById("numero").value;
  var horaData = document.getElementById("horaData").value;
  var nome = document.getElementById("nome").value;
  var observacao = document.getElementById("observacao").value;

  // Validar se o número de telefone foi preenchido
  if (numero.trim() === "") {
    alert("Por favor, preencha o número de telefone.");
    return;
  }

  // Limpar os campos
  document.getElementById("numero").value = "";
  document.getElementById("horaData").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("observacao").value = "";

  // Criar objeto de ligação
  var ligacao = {
    numero: numero,
    hora: horaData,
    nome: nome,
    observacao: observacao,
  };

  // Obter lista de ligações do Local Storage ou inicializar uma nova lista
  var listaDeLigacoes =
    JSON.parse(localStorage.getItem("listaDeLigacoes")) || [];

  // Adicionar nova ligação à lista
  listaDeLigacoes.push(ligacao);

  // Ordenar a lista por dia e hora
  listaDeLigacoes.sort(function (a, b) {
    return new Date(a.hora) - new Date(b.hora);
  });

  // Armazenar lista atualizada no Local Storage
  localStorage.setItem("listaDeLigacoes", JSON.stringify(listaDeLigacoes));

  // Atualizar a exibição da lista
  exibirLista();

  // Configurar alarme para a nova ligação
  configurarAlarme(horaData, nome);
}

// Função para limpar todas as ligações
function limparLigacoes() {
  var confirmacao = confirm(
    "Tem certeza de que deseja limpar todas as ligações?"
  );
  if (confirmacao) {
    localStorage.removeItem("listaDeLigacoes");
    exibirLista(); // Atualizar a exibição da lista para mostrar que as ligações foram removidas
  }
}

// Função para exibir a lista de ligações
function exibirLista() {
  var listaDeLigacoes =
    JSON.parse(localStorage.getItem("listaDeLigacoes")) || [];
  var listaHTML = "";

  if (listaDeLigacoes.length > 0) {
    // Verificar se há ligações antes de exibir
    // Iterar sobre cada ligação na lista
    listaDeLigacoes.forEach(function (ligacao, index) {
      // Se for a primeira ligação ou o dia for diferente do anterior, exibir o dia
      if (
        index === 0 ||
        new Date(ligacao.hora).toDateString() !==
          new Date(listaDeLigacoes[index - 1].hora).toDateString()
      ) {
        listaHTML +=
          "<h2>" + new Date(ligacao.hora).toLocaleDateString() + "</h2>";
      }

      // Exibir informações da ligação com botões para editar e marcar como feita
      listaHTML += "<div class='ligacao-item'>";
      listaHTML +=
        "<p><strong>" +
        new Date(ligacao.hora).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) +
        "</strong> - " +
        ligacao.numero +
        "-00" +
        ligacao.numero +
        "- " +
        ligacao.nome;
      if (ligacao.observacao) {
        listaHTML += " (" + ligacao.observacao + ")";
      }
      listaHTML += "</p>";
      listaHTML +=
        "<button class='feito-button' onclick='marcarComoFeita(" +
        index +
        ")'>Feito</button>";
      listaHTML +=
        "<button class='editar-button' onclick='editarLigacao(" +
        index +
        ")'>Editar</button>";
      listaHTML += "</div>";
    });
  } else {
    listaHTML = "<p>Nenhuma ligação registrada.</p>";
  }

  // Atualizar conteúdo da lista
  document.getElementById("lista").innerHTML = listaHTML;
}

// Função para marcar uma ligação como feita
function marcarComoFeita(index) {
  var listaDeLigacoes =
    JSON.parse(localStorage.getItem("listaDeLigacoes")) || [];

  // Confirmar ação com o usuário
  var confirmacao = confirm(
    "Tem certeza de que deseja marcar esta ligação como feita?"
  );
  if (confirmacao) {
    listaDeLigacoes.splice(index, 1); // Remover a ligação do array
    localStorage.setItem("listaDeLigacoes", JSON.stringify(listaDeLigacoes)); // Atualizar o Local Storage
    exibirLista(); // Atualizar a exibição da lista
  }
}

// Função para editar uma ligação
function editarLigacao(index) {
  var listaDeLigacoes =
    JSON.parse(localStorage.getItem("listaDeLigacoes")) || [];
  var ligacao = listaDeLigacoes[index];

  // Preencher os campos do formulário com os dados da ligação selecionada
  document.getElementById("numero").value = ligacao.numero;
  document.getElementById("horaData").value = ligacao.hora;
  document.getElementById("nome").value = ligacao.nome;
  document.getElementById("observacao").value = ligacao.observacao;

  document.getElementById("numero").focus();

  // Remover a ligação do array
  listaDeLigacoes.splice(index, 1);

  // Atualizar o Local Storage
  localStorage.setItem("listaDeLigacoes", JSON.stringify(listaDeLigacoes));

  // Atualizar a exibição da lista
  exibirLista();
}

// Função para configurar o alarme para uma ligação
function configurarAlarme(hora, nome) {
  var dataAlarme = new Date(hora);
  var agora = new Date();

  if (dataAlarme > agora) {
    var tempoParaAlarme = dataAlarme - agora;
    timeoutID = setTimeout(function () {
      mostrarNotificacao(nome);
    }, tempoParaAlarme);
  }
}

// Função para mostrar uma notificação
function mostrarNotificacao(nome) {
  alert("Ligação de " + nome + " está marcada agora!");
}

function salvarDados() {
  var entrada = document.getElementById("entrada").value;
  var pausa1 = document.getElementById("pausa1").value;
  var voltaPausa1 = document.getElementById("voltaPausa1").value;
  var almoco = document.getElementById("almoco").value;
  var voltaAlmoco = document.getElementById("voltaAlmoco").value;
  var pausa2 = document.getElementById("pausa2").value;
  var voltaPausa2 = document.getElementById("voltaPausa2").value;
  var saida = document.getElementById("saida").value;

  var dadosEscala = {
    entrada: entrada,
    pausa1: pausa1,
    voltaPausa1: voltaPausa1,
    almoco: almoco,
    voltaAlmoco: voltaAlmoco,
    pausa2: pausa2,
    voltaPausa2: voltaPausa2,
    saida: saida,
  };

  localStorage.setItem("dadosEscala", JSON.stringify(dadosEscala));
}

function restaurarDadosEscala() {
  var dadosSalvos = localStorage.getItem("dadosEscala");
  if (dadosSalvos) {
    var dadosEscala = JSON.parse(dadosSalvos);
    document.getElementById("entrada").value = dadosEscala.entrada;
    document.getElementById("pausa1").value = dadosEscala.pausa1;
    document.getElementById("voltaPausa1").value = dadosEscala.voltaPausa1;
    document.getElementById("almoco").value = dadosEscala.almoco;
    document.getElementById("voltaAlmoco").value = dadosEscala.voltaAlmoco;
    document.getElementById("pausa2").value = dadosEscala.pausa2;
    document.getElementById("voltaPausa2").value = dadosEscala.voltaPausa2;
    document.getElementById("saida").value = dadosEscala.saida;
  }
}

// Exibir lista quando a página carregar
window.onload = function () {
  exibirLista();
  restaurarDadosEscala();

  // Carregar o texto da caixa de texto do localStorage, se existir
  var textoSalvo = localStorage.getItem("textoCaixa");
  if (textoSalvo) {
    document.getElementById("textoCaixa").value = textoSalvo;
  }
  var dadosSalvos = localStorage.getItem("dadosProjecao");
  if (dadosSalvos) {
    var dadosProjecao = JSON.parse(dadosSalvos);
    document.getElementById("diasMes").value = dadosProjecao.diasMes;
    document.getElementById("diasTrabalhados").value =
      dadosProjecao.diasTrabalhados;
    document.getElementById("metaOperacao").value = dadosProjecao.metaOperacao;
    document.getElementById("vendasAceitas").value =
      dadosProjecao.vendasAceitas;

    // Após carregar os dados, recalcula os resultados
    calcularResultados();
  }
};
