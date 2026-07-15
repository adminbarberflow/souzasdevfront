const API_URL =
  "http://localhost:3000";

const loginForm =
  document.querySelector("#login-form");

const emailInput =
  document.querySelector("#email");

const passwordInput =
  document.querySelector("#password");

const emailError =
  document.querySelector("#email-error");

const passwordError =
  document.querySelector("#password-error");

const passwordToggle =
  document.querySelector("#password-toggle");

const loginButton =
  document.querySelector("#login-button");

const formFeedback =
  document.querySelector("#form-feedback");

const apiIndicator =
  document.querySelector("#api-indicator");

const apiMessage =
  document.querySelector("#api-message");

function showFeedback(
  message = "",
  type = ""
) {
  formFeedback.textContent = message;
  formFeedback.className =
    "form-feedback";

  if (type) {
    formFeedback.classList.add(type);
  }
}

function setLoading(isLoading) {
  loginButton.disabled = isLoading;

  loginButton.textContent = isLoading
    ? "Entrando..."
    : "Entrar no painel";
}

function clearValidation() {
  emailError.textContent = "";
  passwordError.textContent = "";

  emailInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");
}

function validateForm() {
  clearValidation();

  let isValid = true;

  const email =
    emailInput.value
      .trim()
      .toLowerCase();

  const password =
    passwordInput.value;

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    emailError.textContent =
      "Informe um e-mail válido.";

    emailInput.classList.add("invalid");
    isValid = false;
  }

  if (password.length < 12) {
    passwordError.textContent =
      "A senha deve possuir pelo menos 12 caracteres.";

    passwordInput.classList.add("invalid");
    isValid = false;
  }

  return {
    isValid,
    email,
    password
  };
}

async function apiRequest(
  path,
  options = {}
) {
  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...options,
      credentials: "include",

      headers: {
        ...(options.body
          ? {
              "Content-Type":
                "application/json"
            }
          : {}),

        ...options.headers
      }
    }
  );

  const data = await response
    .json()
    .catch(() => ({
      message:
        "O servidor retornou uma resposta inválida."
    }));

  if (!response.ok) {
    const error = new Error(
      data.message ||
      "Não foi possível concluir a operação."
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

async function checkApiStatus() {
  try {
    await apiRequest("/api/status");

    apiIndicator.classList.add("online");
    apiIndicator.classList.remove(
      "offline"
    );

    apiMessage.textContent =
      "Servidor conectado";
  } catch {
    apiIndicator.classList.add("offline");
    apiIndicator.classList.remove(
      "online"
    );

    apiMessage.textContent =
      "Servidor desconectado";
  }
}

async function checkExistingSession() {
  try {
    await apiRequest("/api/auth/me");

    window.location.replace(
      "./admin.html"
    );
  } catch {
    // O usuário ainda não está autenticado.
  }
}

passwordToggle.addEventListener(
  "click",
  () => {
    const isVisible =
      passwordInput.type === "text";

    passwordInput.type =
      isVisible
        ? "password"
        : "text";

    passwordToggle.textContent =
      isVisible
        ? "Mostrar"
        : "Ocultar";

    passwordToggle.setAttribute(
      "aria-label",
      isVisible
        ? "Mostrar senha"
        : "Ocultar senha"
    );

    passwordToggle.setAttribute(
      "aria-pressed",
      String(!isVisible)
    );
  }
);

loginForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    showFeedback("");

    const validation =
      validateForm();

    if (!validation.isValid) {
      return;
    }

    setLoading(true);

    try {
      await apiRequest(
        "/api/auth/login",
        {
          method: "POST",

          body: JSON.stringify({
            email:
              validation.email,
            password:
              validation.password
          })
        }
      );

      showFeedback(
        "Login realizado. Redirecionando...",
        "success"
      );

      window.location.replace(
        "./admin.html"
      );
    } catch (error) {
      showFeedback(
        error.message ||
        "Não foi possível entrar."
      );
    } finally {
      setLoading(false);
    }
  }
);

sessionStorage.removeItem(
  "portfolioAdminToken"
);

checkApiStatus();
checkExistingSession();
