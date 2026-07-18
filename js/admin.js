const API_URL =
  "http://localhost:3000";

const logoutButton =
  document.querySelector("#logout-button");

let csrfToken = "";

const statusFilter =
  document.querySelector("#status-filter");

const messagesContainer =
  document.querySelector(
    "#messages-container"
  );

const dashboardFeedback =
  document.querySelector(
    "#dashboard-feedback"
  );

const adminName =
  document.querySelector("#admin-name");

const adminEmail =
  document.querySelector("#admin-email");

const totalCount =
  document.querySelector("#total-count");

const newCount =
  document.querySelector("#new-count");

const readCount =
  document.querySelector("#read-count");

const archivedCount =
  document.querySelector(
    "#archived-count"
  );

const statusLabels = {
  new: "Nova",
  read: "Lida",
  archived: "Arquivada"
};

function getCsrfTokenFromCookie() {
  const cookies = document.cookie
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);

  const csrfCookie = cookies.find((item) =>
    item.startsWith("portfolio_csrf=")
  );

  if (!csrfCookie) {
    return "";
  }

  const value = csrfCookie.split("=")[1];

  return decodeURIComponent(value || "");
}

async function refreshCsrfToken() {
  try {
    const data = await apiRequest(
      "/api/auth/csrf"
    );

    csrfToken = data.csrfToken || "";
  } catch {
    csrfToken = "";
  }
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

        ...(csrfToken
          ? {
              "X-CSRF-Token": csrfToken
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
        "Resposta inválida do servidor."
    }));

  if (!response.ok) {
    if (response.status === 401) {
      window.location.replace(
        "./login.html"
      );
    }

    const error = new Error(
      data.message ||
      "Não foi possível concluir a operação."
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

function showFeedback(
  message = "",
  type = ""
) {
  dashboardFeedback.textContent =
    message;

  dashboardFeedback.className =
    "feedback";

  if (type) {
    dashboardFeedback.classList.add(
      type
    );
  }
}

function updateStats(stats) {
  totalCount.textContent =
    stats.total;

  newCount.textContent =
    stats.new;

  readCount.textContent =
    stats.read;

  archivedCount.textContent =
    stats.archived;
}

function createTextElement(
  tagName,
  className,
  text
) {
  const element =
    document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  element.textContent = text;

  return element;
}

function formatDate(dateValue) {
  const date = new Date(dateValue);

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      dateStyle: "long",
      timeStyle: "short"
    }
  ).format(date);
}

async function changeStatus(
  contactId,
  status
) {
  showFeedback(
    "Atualizando status..."
  );

  try {
    await apiRequest(
      `/api/admin/contacts/${
        encodeURIComponent(contactId)
      }`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status
        })
      }
    );

    showFeedback(
      "Status atualizado.",
      "success"
    );

    await loadContacts();
  } catch (error) {
    showFeedback(
      error.message,
      "error"
    );
  }
}

async function removeContact(
  contactId
) {
  const confirmed = window.confirm(
    "Deseja excluir esta mensagem permanentemente?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await apiRequest(
      `/api/admin/contacts/${
        encodeURIComponent(contactId)
      }`,
      {
        method: "DELETE"
      }
    );

    showFeedback(
      "Mensagem excluída.",
      "success"
    );

    await loadContacts();
  } catch (error) {
    showFeedback(
      error.message,
      "error"
    );
  }
}

function createMessageCard(contact) {
  const article =
    document.createElement("article");

  article.className =
    "message-card";

  const header =
    document.createElement("div");

  header.className =
    "message-card__header";

  const identity =
    document.createElement("div");

  identity.append(
    createTextElement(
      "h2",
      "message-card__name",
      contact.name
    )
  );

  const email =
    createTextElement(
      "a",
      "message-card__email",
      contact.email
    );

  email.href =
    `mailto:${contact.email}`;

  identity.append(email);

  identity.append(
    createTextElement(
      "p",
      "message-card__date",
      formatDate(contact.createdAt)
    )
  );

  const select =
    document.createElement("select");

  select.className =
    "message-card__status";

  Object.entries(
    statusLabels
  ).forEach(([status, label]) => {
    const option =
      document.createElement("option");

    option.value = status;
    option.textContent = label;
    option.selected =
      status === contact.status;

    select.append(option);
  });

  select.addEventListener(
    "change",
    () => {
      changeStatus(
        contact.id,
        select.value
      );
    }
  );

  header.append(identity, select);

  const message =
    createTextElement(
      "p",
      "message-card__body",
      contact.message
    );

  const actions =
    document.createElement("div");

  actions.className =
    "message-card__actions";

  const deleteButton =
    document.createElement("button");

  deleteButton.type = "button";

  deleteButton.className =
    "button button--danger";

  deleteButton.textContent =
    "Excluir mensagem";

  deleteButton.addEventListener(
    "click",
    () => removeContact(contact.id)
  );

  actions.append(deleteButton);

  article.append(
    header,
    message,
    actions
  );

  return article;
}

function renderContacts(contacts) {
  messagesContainer.replaceChildren();

  if (contacts.length === 0) {
    messagesContainer.append(
      createTextElement(
        "p",
        "empty-state",
        "Nenhuma mensagem encontrada."
      )
    );

    return;
  }

  const fragment =
    document.createDocumentFragment();

  contacts.forEach((contact) => {
    fragment.append(
      createMessageCard(contact)
    );
  });

  messagesContainer.append(fragment);
}

async function loadContacts() {
  showFeedback(
    "Carregando mensagens..."
  );

  const filter =
    statusFilter.value;

  const query = filter
    ? `?status=${
        encodeURIComponent(filter)
      }`
    : "";

  const data = await apiRequest(
    `/api/admin/contacts${query}`
  );

  updateStats(data.stats);
  renderContacts(data.contacts);
  showFeedback("");
}

async function loadAuthenticatedUser() {
  const data =
    await apiRequest("/api/auth/me");

  adminName.textContent =
    data.user.name;

  adminEmail.textContent =
    data.user.email;
}

async function logout() {
  logoutButton.disabled = true;
  logoutButton.textContent =
    "Saindo...";

  try {
    await apiRequest(
      "/api/auth/logout",
      {
        method: "POST"
      }
    );
  } finally {
    window.location.replace(
      "./login.html"
    );
  }
}

statusFilter.addEventListener(
  "change",
  () => {
    loadContacts().catch((error) => {
      showFeedback(
        error.message,
        "error"
      );
    });
  }
);

logoutButton.addEventListener(
  "click",
  logout
);

async function initialize() {
  try {
    csrfToken = getCsrfTokenFromCookie();
    await refreshCsrfToken();
    await loadAuthenticatedUser();
    await loadContacts();
  } catch (error) {
    showFeedback(
      error.message,
      "error"
    );
  }
}

initialize();
