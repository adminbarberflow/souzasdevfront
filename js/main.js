import { siteData } from "./site-data.js";

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  document.querySelectorAll(selector);

const menuButton = $("#menu-button");
const navigation = $("#navigation");
const navigationLinks = $$(".navigation a[href^='#']");
const header = $("#header");
const scrollProgress = $("#scroll-progress");

const contactForm = $("#contact-form");
const contactSubmit = $("#contact-submit");
const formFeedback = $("#form-feedback");
const serviceStatus = $("#service-status");
const serviceMessage = $("#service-message");

function setText(selector, value) {
  const element = $(selector);

  if (element) {
    element.textContent = value;
  }
}

function createElement(
  tagName,
  className = "",
  text = ""
) {
  const element =
    document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

function populateMainContent() {
  setText(
    "#hero-eyebrow",
    siteData.hero.eyebrow
  );

  setText(
    "#hero-title-start",
    siteData.hero.titleStart
  );

  setText(
    "#hero-title-highlight",
    siteData.hero.titleHighlight
  );

  setText(
    "#hero-description",
    siteData.hero.description
  );

  setText(
    "#about-eyebrow",
    siteData.about.eyebrow
  );

  setText(
    "#about-title",
    siteData.about.title
  );

  setText(
    "#current-year",
    new Date().getFullYear()
  );

  document.title =
    `${siteData.brand} | Desenvolvimento Web`;
}

function renderAbout() {
  const container = $("#about-text");
  const fragment =
    document.createDocumentFragment();

  siteData.about.paragraphs.forEach(
    (paragraph) => {
      fragment.append(
        createElement("p", "", paragraph)
      );
    }
  );

  container.replaceChildren(fragment);
}

function renderStats() {
  const container = $("#stats-grid");
  const fragment =
    document.createDocumentFragment();

  siteData.stats.forEach((stat) => {
    const article =
      createElement("article", "stat-card");

    article.append(
      createElement(
        "strong",
        "",
        stat.value
      ),
      createElement(
        "p",
        "",
        stat.label
      )
    );

    fragment.append(article);
  });

  container.replaceChildren(fragment);
}

function renderServices() {
  const container = $("#services-grid");
  const fragment =
    document.createDocumentFragment();

  siteData.services.forEach(
    (service) => {
      const article =
        createElement(
          "article",
          "service-card reveal"
        );

      article.append(
        createElement(
          "span",
          "service-card__number",
          service.number
        ),
        createElement(
          "h3",
          "",
          service.title
        ),
        createElement(
          "p",
          "",
          service.description
        ),
        createElement(
          "span",
          "service-card__arrow",
          "↗"
        )
      );

      fragment.append(article);
    }
  );

  container.replaceChildren(fragment);
}

function renderTechnologies() {
  const container =
    $("#technologies-list");

  const fragment =
    document.createDocumentFragment();

  const setTechnologyState = (
    item,
    isOpen
  ) => {
    const description =
      item.querySelector(
        ".technology-item__description"
      );

    item.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    item.setAttribute(
      "aria-label",
      `${item.dataset.technology}: ${
        isOpen
          ? "ocultar descrição"
          : "mostrar descrição"
      }`
    );

    description.hidden =
      !isOpen;
  };

  siteData.technologies.forEach(
    (technology, index) => {
      const item =
        createElement(
          "button",
          "technology-item"
        );

      item.type = "button";

      item.dataset.technology =
        technology.name;

      item.setAttribute(
        "aria-expanded",
        "false"
      );

      item.setAttribute(
        "aria-label",
        `${technology.name}: mostrar descrição`
      );

      const icon =
        createElement(
          "i",
          technology.icon
        );

      icon.setAttribute(
        "aria-hidden",
        "true"
      );

      const name =
        createElement(
          "strong",
          "",
          technology.name
        );

      const description =
        createElement(
          "span",
          "technology-item__description",
          technology.description
        );

      description.id =
        `technology-description-${index + 1}`;

      description.hidden =
        true;

      item.setAttribute(
        "aria-controls",
        description.id
      );

      const toggle =
        createElement(
          "span",
          "technology-item__toggle",
          "+"
        );

      toggle.setAttribute(
        "aria-hidden",
        "true"
      );

      item.append(
        icon,
        name,
        description,
        toggle
      );

      item.addEventListener(
        "click",
        () => {
          const shouldOpen =
            item.getAttribute(
              "aria-expanded"
            ) !== "true";

          container
            .querySelectorAll(
              '.technology-item[aria-expanded="true"]'
            )
            .forEach(
              (openItem) => {
                setTechnologyState(
                  openItem,
                  false
                );
              }
            );

          if (shouldOpen) {
            setTechnologyState(
              item,
              true
            );
          }
        }
      );

      item.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key === "Escape" &&
            item.getAttribute(
              "aria-expanded"
            ) === "true"
          ) {
            setTechnologyState(
              item,
              false
            );

            item.focus();
          }
        }
      );

      fragment.append(item);
    }
  );

  container.replaceChildren(fragment);
}

function createProjectLink(
  label,
  url,
  className = ""
) {
  if (!url) {
    return null;
  }

  const link =
    createElement(
      "a",
      className,
      label
    );

  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  return link;
}

function renderProjects() {
  const container =
    $("#projects-grid");

  const fragment =
    document.createDocumentFragment();

  siteData.projects.forEach(
    (project) => {
      const article =
        createElement(
          "article",
          "project-preview reveal"
        );

      const visual =
        createElement(
          "div",
          "project-preview__visual"
        );

      const iconWrapper =
        createElement(
          "div",
          "project-preview__icon"
        );

      const icon =
        createElement(
          "i",
          project.icon
        );

      icon.setAttribute(
        "aria-hidden",
        "true"
      );

      iconWrapper.append(icon);

      visual.append(
        createElement(
          "span",
          "project-preview__category",
          project.category
        ),
        iconWrapper
      );

      const content =
        createElement(
          "div",
          "project-preview__content"
        );

      const tags =
        createElement(
          "div",
          "project-preview__tags"
        );

      project.technologies
        .slice(0, 5)
        .forEach(
          (technology) => {
            tags.append(
              createElement(
                "span",
                "",
                technology
              )
            );
          }
        );

      const link =
        createElement(
          "a",
          "project-preview__link",
          "Ver case completo \u2192"
        );

      link.href =
        "./case-souzas-dev.html";

      content.append(
        tags,
        createElement(
          "h3",
          "",
          project.title
        ),
        createElement(
          "p",
          "project-preview__subtitle",
          project.subtitle
        ),
        createElement(
          "p",
          "project-preview__description",
          project.overview
        ),
        link
      );

      article.append(
        visual,
        content
      );

      fragment.append(article);
    }
  );

  container.replaceChildren(fragment);
}

function createContactLink(
  label,
  value,
  href
) {
  if (!value) {
    return null;
  }

  const link =
    createElement(
      "a",
      "contact-link"
    );

  link.href = href;
  link.target =
    href.startsWith("http")
      ? "_blank"
      : "_self";

  if (link.target === "_blank") {
    link.rel = "noopener noreferrer";
  }

  link.append(
    createElement("span", "", label),
    createElement("strong", "", value)
  );

  return link;
}

function renderContactLinks() {
  const container =
    $("#contact-links");

  const links = [
    createContactLink(
      "E-mail",
      siteData.contact.email,
      `mailto:${siteData.contact.email}`
    ),

    createContactLink(
      "Localização",
      siteData.contact.location,
      "#contato"
    ),

    createContactLink(
      "GitHub",
      "Ver perfil",
      siteData.contact.github
    ),

    createContactLink(
      "LinkedIn",
      "Conectar",
      siteData.contact.linkedin
    )
  ].filter(Boolean);

  container.replaceChildren(...links);
}

function renderSocials() {
  const container =
    $("#hero-socials");

  const socials = [
    {
      label: "GitHub",
      url: siteData.contact.github
    },
    {
      label: "LinkedIn",
      url: siteData.contact.linkedin
    },
    {
      label: "E-mail",
      url: siteData.contact.email
        ? `mailto:${siteData.contact.email}`
        : ""
    }
  ].filter((item) => item.url);

  socials.forEach((social) => {
    const link =
      createElement(
        "a",
        "",
        social.label
      );

    link.href = social.url;

    if (social.url.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    container.append(link);
  });
}

function configureWhatsApp() {
  const button =
    $("#whatsapp-button");

  if (!siteData.contact.whatsapp) {
    button.hidden = true;
    return;
  }

  const number =
    siteData.contact.whatsapp.replace(
      /\D/g,
      ""
    );

  const message =
    encodeURIComponent(
      "Olá! Conheci a Souzas Dev pelo site e gostaria de conversar sobre um projeto."
    );

  button.href =
    `https://wa.me/${number}?text=${message}`;

  button.hidden = false;
}

function toggleMenu() {
  const isOpen =
    navigation.classList.toggle("active");

  menuButton.classList.toggle(
    "active",
    isOpen
  );

  document.body.classList.toggle(
    "menu-open",
    isOpen
  );

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuButton.setAttribute(
    "aria-label",
    isOpen
      ? "Fechar menu"
      : "Abrir menu"
  );
}

function closeMenu(
  {
    restoreFocus = false
  } = {}
) {
  navigation.classList.remove("active");
  menuButton.classList.remove("active");

  document.body.classList.remove(
    "menu-open"
  );

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "Abrir menu"
  );

  if (restoreFocus) {
    menuButton.focus();
  }
}

function handleMenuKeydown(event) {
  const isOpen =
    navigation.classList.contains("active");

  if (
    event.key !== "Escape" ||
    !isOpen
  ) {
    return;
  }

  closeMenu({
    restoreFocus: true
  });
}

function handleOutsideMenuPointer(event) {
  const isOpen =
    navigation.classList.contains("active");

  if (!isOpen) {
    return;
  }

  const clickedNavigation =
    navigation.contains(event.target);

  const clickedMenuButton =
    menuButton.contains(event.target);

  if (
    clickedNavigation ||
    clickedMenuButton
  ) {
    return;
  }

  closeMenu();
}

function handleMenuResize() {
  const isDesktop =
    window.innerWidth > 820;

  const isOpen =
    navigation.classList.contains("active");

  if (
    isDesktop &&
    isOpen
  ) {
    closeMenu();
  }
}

function updateHeader() {
  const scrollTop =
    window.scrollY;

  header.classList.toggle(
    "scrolled",
    scrollTop > 20
  );

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    documentHeight > 0
      ? (scrollTop / documentHeight) * 100
      : 0;

  scrollProgress.style.width =
    `${progress}%`;
}

function initializeSectionNavigation() {
  const sections =
    $$("main section[id]");

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          navigationLinks.forEach(
            (link) => {
              const target =
                link.getAttribute("href");

              link.classList.toggle(
                "active",
                target ===
                  `#${entry.target.id}`
              );
            }
          );
        });
      },
      {
        rootMargin:
          "-35% 0px -55% 0px",
        threshold: 0
      }
    );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

function initializeRevealAnimations() {
  const elements =
    $$(".reveal");

  const observer =
    new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12
      }
    );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

function showFormFeedback(
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

function setFormLoading(isLoading) {
  contactSubmit.disabled = isLoading;

  contactSubmit.innerHTML = isLoading
    ? "Enviando..."
    : 'Enviar mensagem <span aria-hidden="true">↗</span>';
}

async function apiRequest(
  path,
  options = {}
) {
  const response = await fetch(
    `${siteData.apiUrl}${path}`,
    options
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

    error.data = data;
    throw error;
  }

  return data;
}

async function checkApiStatus() {
  try {
    await apiRequest("/api/status");

    serviceStatus.className =
      "service-status online";

    serviceMessage.textContent =
      "Formulário disponível";
  } catch {
    serviceStatus.className =
      "service-status offline";

    serviceMessage.textContent =
      "Serviço temporariamente indisponível";
  }
}

async function handleContactSubmit(event) {
  event.preventDefault();

  showFormFeedback("");

  const formData =
    new FormData(contactForm);

  const contact = {
    name:
      formData.get("name")?.trim() || "",
    email:
      formData.get("email")?.trim() || "",
    message:
      formData.get("message")?.trim() || ""
  };

  if (
    contact.name.length < 2 ||
    !contact.email ||
    contact.message.length < 10
  ) {
    showFormFeedback(
      "Preencha corretamente todos os campos.",
      "error"
    );

    return;
  }

  setFormLoading(true);

  try {
    const data = await apiRequest(
      "/api/contact",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(contact)
      }
    );

    showFormFeedback(
      data.message,
      "success"
    );

    contactForm.reset();
  } catch (error) {
    const validationMessages =
      error.data?.errors
        ? Object.values(
            error.data.errors
          ).join(" ")
        : error.message;

    showFormFeedback(
      validationMessages ||
        "Não foi possível enviar a mensagem.",
      "error"
    );
  } finally {
    setFormLoading(false);
  }
}

function initialize() {
  populateMainContent();
  renderAbout();
  renderStats();
  renderServices();
  renderTechnologies();
  renderProjects();
  renderContactLinks();
  renderSocials();
  configureWhatsApp();

  menuButton.addEventListener(
    "click",
    toggleMenu
  );

  navigationLinks.forEach((link) => {
    link.addEventListener(
      "click",
      closeMenu
    );
  });


  document.addEventListener(
    "keydown",
    handleMenuKeydown
  );

  document.addEventListener(
    "pointerdown",
    handleOutsideMenuPointer
  );

  window.addEventListener(
    "resize",
    handleMenuResize,
    {
      passive: true
    }
  );
  contactForm.addEventListener(
    "submit",
    handleContactSubmit
  );

  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );

  updateHeader();
  initializeSectionNavigation();
  initializeRevealAnimations();
  checkApiStatus();
}

initialize();




