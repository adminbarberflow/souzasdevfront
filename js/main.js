const API_URL = "http://localhost:3000";

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const navigationLinks = document.querySelectorAll(".navigation a");
const currentYear = document.querySelector("#current-year");
const apiIndicator = document.querySelector("#api-indicator");
const apiMessage = document.querySelector("#api-message");
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");
const submitButton = contactForm.querySelector(
  'button[type="submit"]'
);

function toggleMenu() {
  const isOpen = navigation.classList.toggle("active");

  menuButton.classList.toggle("active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

  menuButton.setAttribute("aria-expanded", String(isOpen));

  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
}

function closeMenu() {
  navigation.classList.remove("active");
  menuButton.classList.remove("active");
  document.body.classList.remove("menu-open");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
}

function showFormFeedback(message, type) {
  formFeedback.textContent = message;
  formFeedback.className = "form-feedback";

  if (type) {
    formFeedback.classList.add(type);
  }
}

function setFormLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading
    ? "Enviando..."
    : "Enviar mensagem";
}

async function checkApiStatus() {
  try {
    const response = await fetch(`${API_URL}/api/status`);

    if (!response.ok) {
      throw new Error("O backend respondeu com erro.");
    }

    const data = await response.json();

    apiIndicator.classList.add("online");
    apiIndicator.classList.remove("offline");
    apiMessage.textContent = data.message;
  } catch (error) {
    apiIndicator.classList.add("offline");
    apiIndicator.classList.remove("online");
    apiMessage.textContent = "Backend desconectado.";

    console.error(error);
  }
}

async function handleContactForm(event) {
  event.preventDefault();

  showFormFeedback("");
  setFormLoading(true);

  const formData = new FormData(contactForm);

  const contactData = {
    name: formData.get("name")?.trim(),
    email: formData.get("email")?.trim(),
    message: formData.get("message")?.trim()
  };

  if (
    !contactData.name ||
    !contactData.email ||
    !contactData.message
  ) {
    showFormFeedback(
      "Preencha todos os campos.",
      "error"
    );

    setFormLoading(false);
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    });

    const data = await response.json();

    if (!response.ok) {
      const validationMessages = data.errors
        ? Object.values(data.errors).join(" ")
        : data.message;

      throw new Error(
        validationMessages || "Não foi possível enviar a mensagem."
      );
    }

    showFormFeedback(data.message, "success");
    contactForm.reset();
  } catch (error) {
    showFormFeedback(
      error.message || "Erro ao conectar com o servidor.",
      "error"
    );

    console.error(error);
  } finally {
    setFormLoading(false);
  }
}

menuButton.addEventListener("click", toggleMenu);

navigationLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

contactForm.addEventListener("submit", handleContactForm);

currentYear.textContent = new Date().getFullYear();

checkApiStatus();
