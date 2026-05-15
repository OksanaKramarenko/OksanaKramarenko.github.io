const burger = document.querySelector("#burger");
const nav = document.querySelector("#nav");
const navLinks = document.querySelectorAll(".nav a");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.18,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const certificateTrack = document.querySelector("#certificatesTrack");
const certificateCards = document.querySelectorAll(".certificate-card");
const certPrev = document.querySelector(".cert-prev");
const certNext = document.querySelector(".cert-next");

let certificateIndex = 2;

function updateCertificates() {
  const total = certificateCards.length;

  certificateCards.forEach((card, index) => {
    card.classList.remove("active", "prev-1", "next-1", "prev-2", "next-2");

    const diff = (index - certificateIndex + total) % total;

    if (diff === 0) card.classList.add("active");
    if (diff === 1) card.classList.add("next-1");
    if (diff === 2) card.classList.add("next-2");
    if (diff === total - 1) card.classList.add("prev-1");
    if (diff === total - 2) card.classList.add("prev-2");
  });
}

certNext.addEventListener("click", () => {
  certificateIndex = (certificateIndex + 1) % certificateCards.length;
  updateCertificates();
});

certPrev.addEventListener("click", () => {
  certificateIndex =
    (certificateIndex - 1 + certificateCards.length) % certificateCards.length;
  updateCertificates();
});

window.addEventListener("resize", updateCertificates);

updateCertificates();

const articlesTrack = document.querySelector("#articlesTrack");
const articleCards = document.querySelectorAll(".article-card");
const articlePrev = document.querySelector(".article-prev");
const articleNext = document.querySelector(".article-next");

let articleIndex = 0;

function getArticlesPerView() {
  if (window.innerWidth <= 720) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function updateArticlesSlider() {
  if (!articlesTrack || !articleCards.length) return;

  const perView = getArticlesPerView();
  const maxIndex = Math.max(articleCards.length - perView, 0);

  if (articleIndex > maxIndex) articleIndex = maxIndex;

  const gap = window.innerWidth <= 720 ? 18 : 28;
  const cardWidth = articleCards[0].getBoundingClientRect().width;

  articlesTrack.style.transform = `translateX(-${articleIndex * (cardWidth + gap)}px)`;
}

if (articleNext && articlePrev) {
  articleNext.addEventListener("click", () => {
    const perView = getArticlesPerView();
    const maxIndex = Math.max(articleCards.length - perView, 0);

    articleIndex = articleIndex >= maxIndex ? 0 : articleIndex + 1;
    updateArticlesSlider();
  });

  articlePrev.addEventListener("click", () => {
    const perView = getArticlesPerView();
    const maxIndex = Math.max(articleCards.length - perView, 0);

    articleIndex = articleIndex <= 0 ? maxIndex : articleIndex - 1;
    updateArticlesSlider();
  });

  window.addEventListener("resize", updateArticlesSlider);
  updateArticlesSlider();
}

/* MODAL */

/* MODAL */

const articleModal = document.querySelector("#articleModal");
const articleModalTitle = document.querySelector("#articleModalTitle");
const articleModalText = document.querySelector("#articleModalText");
const articleModalClose = document.querySelector(".article-modal-close");
const articleModalBackdrop = document.querySelector(".article-modal-backdrop");
const articleMoreButtons = document.querySelectorAll(".article-more");

articleMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    articleModalTitle.textContent = button.dataset.title;

    /* АБЗАЦИ */

    const formattedText = button.dataset.text
      .split("\n\n")
      .map((paragraph) => `<p>${paragraph.trim()}</p>`)
      .join("");

    articleModalText.innerHTML = formattedText;

    articleModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeArticleModal() {
  articleModal.classList.remove("active");
  document.body.style.overflow = "";
}

if (articleModalClose && articleModalBackdrop) {
  articleModalClose.addEventListener("click", closeArticleModal);
  articleModalBackdrop.addEventListener("click", closeArticleModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && articleModal.classList.contains("active")) {
    closeArticleModal();
  }
});
