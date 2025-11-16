/* ======================================================
   CARROSSEL.JS – Modular e independente
   ====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const carrosseis = document.querySelectorAll(".carousel");

  carrosseis.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const images = Array.from(track.children);
    const btnPrev = carousel.querySelector(".prev");
    const btnNext = carousel.querySelector(".next");
    const indicators = carousel.querySelector(".carousel-indicators");

    let index = 0;

    // Cria indicadores
    images.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      indicators.appendChild(dot);
    });

    const dots = Array.from(indicators.children);

    function mostrarImagem(i) {
      images.forEach((img) => img.classList.remove("active"));
      images[i].classList.add("active");

      dots.forEach((dot) => dot.classList.remove("active"));
      dots[i].classList.add("active");

      index = i;
    }

    // Eventos dos botões
    btnPrev.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      mostrarImagem(index);
    });

    btnNext.addEventListener("click", () => {
      index = (index + 1) % images.length;
      mostrarImagem(index);
    });

    // Indicadores clicáveis
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => mostrarImagem(i));
    });

    // Iniciar primeira imagem
    images[0]?.classList.add("active"); // Corrigido para 'images'

    // Autoplay opcional
    let autoplay = setInterval(() => {
      index = (index + 1) % images.length;
      mostrarImagem(index);
    }, 5000);

    // Pausar quando o mouse passa por cima
    carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
    carousel.addEventListener("mouseleave", () => {
      autoplay = setInterval(() => {
        index = (index + 1) % images.length;
        mostrarImagem(index);
      }, 5000);
    });
  });
});
