let faqs = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    faqs = data;
    renderFaqs(faqs);
  });

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  if (searchTerm.trim() === "") {
    renderFaqs(faqs);
    return;
  }

  const filtered = faqs.filter(item =>
    item.pergunta.toLowerCase().includes(searchTerm) ||
    item.resposta.toLowerCase().includes(searchTerm) ||
    (item.tags || []).some(tag => tag.toLowerCase().includes(searchTerm)) ||
    (item.squad || "").toLowerCase().includes(searchTerm)
  );

  renderFaqs(filtered);
});

function renderFaqs(items) {
  const container = document.getElementById("faq-container");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "faq-item";
    card.innerHTML = `
      <h2>${item.pergunta}</h2>
      <p>${item.resposta}</p>
      <p><strong>Squad:</strong> ${item.squad || "Não informado"}</p>
      <p><strong>Título original:</strong> ${item.titulo}</p>
      ${item.tags?.length ? `<p><strong>Tags:</strong> ${item.tags.map(tag => `<span class="tag">${tag.trim()}</span>`).join(" ")}</p>` : ""}
      ${item.link ? `<a href="${item.link}" target="_blank">Abrir item no DevOps</a>` : ""}
    `;
    container.appendChild(card);
  });
}
