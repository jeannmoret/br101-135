const showAudioButton = document.getElementById("showAudioButton");
const audioPlayer = document.getElementById("audioPlayer");

// Adiciona um ouvinte de evento ao botão
showAudioButton.addEventListener("click", () => {
  // Mostra o reprodutor de áudio
  if (audioPlayer.style.display === "none") {
    audioPlayer.style.display = "block";
    showAudioButton.textContent = "Fechar Ligação";
  } else {
    audioPlayer.style.display = "none";
    showAudioButton.textContent = "Ligação";
  }
});

function toggleContent(id) {
  // Esconde todas as contra-argumentações
  var contraArgs = document.getElementsByClassName("contra-argumentacao");
  for (var i = 0; i < contraArgs.length; i++) {
    contraArgs[i].style.display = "none";
  }

  // Remove a classe 'active' de todos os botões
  var buttons = document.getElementsByClassName("toggle-button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  // Mostra a contra-argumentação específica
  var contentId = "content" + id;
  var content = document.getElementById(contentId);
  if (content) {
    content.style.display = "block";
  }

  // Adiciona a classe 'active' ao botão clicado
  var button = document.querySelector(".toggle-button:nth-of-type(" + id + ")");
  if (button) {
    button.classList.add("active");
  }
}
