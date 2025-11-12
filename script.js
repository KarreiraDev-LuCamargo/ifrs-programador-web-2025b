/* ===================================================
   SCRIPT.JS - Interatividade + Modo Escuro + Lightbox
   Autor: Luciano Francisco Camargo
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#cadastroForm");
  const mensagemBox = document.querySelector("#mensagemSucesso");
  const mensagemTexto = document.querySelector("#mensagemTexto");
  const btnFechar = document.querySelector("#fecharMensagem");
  const toggleTheme = document.querySelector("#toggleTheme");
  const body = document.body;

  /* ======= Alternância de tema ======= */
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") ativarModoEscuro(true);

  if (toggleTheme) {
    toggleTheme.addEventListener("click", () => {
      const modoEscuroAtivo = body.classList.toggle("dark-mode");
      toggleTheme.setAttribute("aria-pressed", modoEscuroAtivo);
      toggleTheme.textContent = modoEscuroAtivo ? "☀️" : "🌙";
      localStorage.setItem("tema", modoEscuroAtivo ? "escuro" : "claro");
    });
  }

  function ativarModoEscuro(ativar) {
    if (ativar) {
      body.classList.add("dark-mode");
      toggleTheme.textContent = "☀️";
      toggleTheme.setAttribute("aria-pressed", "true");
    } else {
      body.classList.remove("dark-mode");
      toggleTheme.textContent = "🌙";
      toggleTheme.setAttribute("aria-pressed", "false");
    }
  }

  /* ======= Validação do formulário (se existir) ======= */
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nome = document.querySelector("#nome").value.trim();
      const idade = document.querySelector("#idade").value.trim();

      if (nome === "" || idade === "") {
        exibirMensagem("⚠️ Por favor, preencha todos os campos.", false);
        return;
      }

      if (isNaN(idade) || idade <= 0) {
        exibirMensagem("❌ Insira uma idade válida.", false);
        return;
      }

      exibirMensagem(
        `✅ Cadastro realizado com sucesso!<br><strong>${nome}</strong>, ${idade} anos.`
      );
      form.reset();
    });
  }

  if (btnFechar && mensagemBox) {
    btnFechar.addEventListener("click", () =>
      mensagemBox.classList.add("oculto")
    );
  }

  function exibirMensagem(texto, sucesso = true) {
    mensagemTexto.innerHTML = texto;
    mensagemBox.style.backgroundColor = sucesso
      ? "var(--success-bg)"
      : "var(--error-bg)";
    mensagemBox.style.borderColor = sucesso
      ? "var(--success-border)"
      : "var(--error-border)";
    mensagemTexto.style.color = sucesso
      ? "var(--success-text)"
      : "var(--error-text)";
    mensagemBox.classList.remove("oculto");
    mensagemBox.focus();
  }

  /* ======= Lightbox Global ======= */
  const galleryImgs = document.querySelectorAll(".galeria img");
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCaption = document.getElementById("lightbox-caption");
  const lbClose = document.getElementById("lightbox-close");
  const lbOverlay = document.getElementById("lightbox-overlay");

  if (galleryImgs.length && lb) {
    galleryImgs.forEach((img) => {
      img.addEventListener("click", () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt || "";
        lbCaption.textContent = img.alt || "";
        lb.classList.remove("oculto");
        lb.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        lbClose.focus();
      });
    });

    function fecharLB() {
      lb.classList.add("oculto");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    lbClose.addEventListener("click", fecharLB);
    lbOverlay.addEventListener("click", fecharLB);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lb.classList.contains("oculto")) fecharLB();
    });
  }
});
// Detecta imagens quebradas e marca no console
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    console.warn('Imagem não encontrada:', img.src);
    img.classList.add('img-not-found');
    img.alt = img.alt || 'Imagem não disponível';
    // fallback visual opcional:
    img.src = 'assets/images/placeholder.png'; // crie um placeholder nessa pasta
  });
});
