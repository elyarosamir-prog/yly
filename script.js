const grid = document.getElementById("grid");

CHARACTERS.forEach((char) => {
  const card = document.createElement("div");
  card.className = "char-card";

  const prompt = buildPrompt(char.description);

  card.innerHTML = `
    <img src="${char.image}" alt="${char.name}" />
    <h3>${char.name}</h3>
    <div class="char-actions">
      <a class="primary" href="${char.image}" download="${char.id}.jpg">⬇️ تحميل صورة الشخصية</a>
      <button data-prompt="${encodeURIComponent(prompt)}">📋 نسخ البرومبت</button>
    </div>
  `;

  grid.appendChild(card);
});

// نسخ البرومبت للحافظة
grid.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-prompt]");
  if (!btn) return;

  const prompt = decodeURIComponent(btn.dataset.prompt);

  try {
    await navigator.clipboard.writeText(prompt);
  } catch (err) {
    // fallback لو الكليبورد API مش شغالة (بعض المتصفحات القديمة)
    const textarea = document.createElement("textarea");
    textarea.value = prompt;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  const originalText = btn.textContent;
  btn.textContent = "✅ اتنسخ!";
  btn.classList.add("copied");
  setTimeout(() => {
    btn.textContent = originalText;
    btn.classList.remove("copied");
  }, 1800);
});
