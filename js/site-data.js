export const siteData = {
  brand: "Souzas Dev",
  logo: "<Dev.>",

  apiUrl: ["localhost", "127.0.0.1"].includes(
    window.location.hostname
  )
    ? "http://localhost:3000"
    : "https://api.souzasdev.com",

  contact: {
    email: "",
    whatsapp: "",
    github: "https://github.com/adminbarberflow",
    linkedin: "",
    location: "Brasil"
  },

  hero: {
    eyebrow: "Desenvolvimento web em constante evolução",
    titleStart: "Construindo soluções digitais e",
    titleHighlight: "evoluindo a cada projeto.",
    description:
      "Sou um desenvolvedor em formação contínua. Crio sites e sistemas web com dedicação, transparência e responsabilidade, aplicando meus estudos em projetos reais e ampliando minhas habilidades a cada novo desafio."
  },
  about: {
    eyebrow: "Sobre a Souzas Dev",
    title: "Aprendizado transformado em projetos reais.",
    paragraphs: [
      "A Souzas Dev nasceu como um espaço para transformar estudos, ideias e desafios em experiências práticas de desenvolvimento web.",
      "Estou construindo minha experiência por meio de projetos reais, estudando frontend, backend, APIs, bancos de dados e boas práticas de desenvolvimento.",
      "Não pretendo transmitir que sei tudo. Meu compromisso é entender cada necessidade, pesquisar quando necessário, trabalhar dentro do que consigo entregar e evoluir continuamente com cada projeto."
    ]
  },
  stats: [
    {
      value: "Projetos reais",
      label: "Conhecimento aplicado em soluções funcionais"
    },
    {
      value: "Evolução contínua",
      label: "Estudo e prática em cada novo desafio"
    },
    {
      value: "Transparência",
      label: "Escopo, limitações e progresso comunicados com clareza"
    },
    {
      value: "Dedicação",
      label: "Cuidado com cada etapa do desenvolvimento"
    }
  ],
  services: [
    {
      number: "01",
      title: "Sites institucionais",
      description:
        "Sites responsivos para apresentar negócios, serviços, informações importantes e formas de contato."
    },
    {
      number: "02",
      title: "Landing pages",
      description:
        "Páginas direcionadas à divulgação de serviços, campanhas, produtos e captação de contatos."
    },
    {
      number: "03",
      title: "Portfólios digitais",
      description:
        "Portfólios personalizados para apresentar projetos, habilidades, experiências e identidade profissional."
    },
    {
      number: "04",
      title: "Pequenas soluções web",
      description:
        "Formulários integrados, APIs, áreas administrativas e funcionalidades compatíveis com o escopo definido."
    }
  ],
  technologies: [
    {
      category: "Frontend",
      items: [
        {
          name: "HTML5",
          icon: "devicon-html5-plain colored",
          description:
            "Estrutura e organiza o conteúdo das páginas."
        },
        {
          name: "CSS3",
          icon: "devicon-css3-plain colored",
          description:
            "Define estilos, layouts e adaptação responsiva."
        },
        {
          name: "JavaScript",
          icon: "devicon-javascript-plain colored",
          description:
            "Adiciona interatividade e comportamento às páginas."
        }
      ]
    },
    {
      category: "Backend",
      items: [
        {
          name: "Node.js",
          icon: "devicon-nodejs-plain colored",
          description:
            "Executa a API e as regras da aplicação no servidor."
        },
        {
          name: "API REST",
          symbol: "API",
          description:
            "Conecta frontend e backend por meio de endpoints HTTP."
        }
      ]
    },
    {
      category: "Banco de dados",
      items: [
        {
          name: "PostgreSQL",
          icon: "devicon-postgresql-plain colored",
          description:
            "Banco relacional utilizado para persistência em produção."
        },
        {
          name: "Supabase",
          image: "https://cdn.simpleicons.org/supabase/3ECF8E?viewbox=auto",
          description:
            "Hospeda e gerencia o PostgreSQL utilizado pela aplicação."
        },
        {
          name: "SQLite",
          icon: "devicon-sqlite-plain colored",
          description:
            "Banco leve utilizado no desenvolvimento e nos testes locais."
        }
      ]
    },
    {
      category: "Infraestrutura",
      items: [
        {
          name: "Vercel",
          image: "https://cdn.simpleicons.org/vercel/FFFFFF?viewbox=auto",
          description:
            "Publica e entrega o frontend com deploy contínuo."
        },
        {
          name: "Render",
          image: "https://cdn.simpleicons.org/render/46E3B7?viewbox=auto",
          description:
            "Hospeda e executa a API Node.js em produção."
        },
        {
          name: "Cloudflare",
          image: "https://cdn.simpleicons.org/cloudflare/F38020?viewbox=auto",
          description:
            "Gerencia DNS, SSL, proxy e camadas de segurança."
        }
      ]
    },
    {
      category: "Ferramentas",
      items: [
        {
          name: "Git",
          icon: "devicon-git-plain colored",
          description:
            "Registra e controla as alterações do código."
        },
        {
          name: "GitHub",
          icon: "devicon-github-original",
          description:
            "Hospeda os repositórios e integra o fluxo de deploy."
        },
        {
          name: "npm",
          icon: "devicon-npm-original-wordmark colored",
          description:
            "Gerencia dependências e scripts dos projetos Node.js."
        },
        {
          name: "VS Code",
          icon: "devicon-vscode-plain colored",
          description:
            "Editor utilizado para escrever e organizar o código."
        }
      ]
    }
  ],
  projects: [
    {
      category: "Projeto autoral em evolução",
      title: "Souzas Dev",
      subtitle: "Portfólio e plataforma administrativa",
      icon: "devicon-javascript-plain colored",

      coverImage:
        "/assets/images/projects/souzas-dev.webp",

      coverAlt:
        "Página inicial do projeto Souzas Dev",

      overview:
        "A Souzas Dev é um projeto autoral criado para transformar meus estudos em uma aplicação web real, reunindo apresentação profissional, contato com visitantes e gerenciamento administrativo.",

      challenge:
        "O desafio foi desenvolver uma solução completa sem depender de frameworks no frontend, conectando interface, API, autenticação e banco de dados em uma estrutura organizada.",

      solution:
        "Desenvolvi um site responsivo com formulário integrado ao backend, área de login protegida e painel administrativo para visualizar e organizar as mensagens recebidas.",

      features: [
        "Site institucional responsivo",
        "Formulário conectado à API",
        "Login administrativo com JWT",
        "Cookie de autenticação HttpOnly",
        "Painel de gerenciamento de mensagens",
        "Status de mensagens novas, lidas e arquivadas",
        "Banco de dados SQLite",
        "Frontend e backend em repositórios separados"
      ],

      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Node.js",
        "SQLite",
        "JWT",
        "Git",
        "GitHub"
      ],

      learning: [
        "Estruturação de uma aplicação frontend sem frameworks",
        "Criação de uma API utilizando recursos nativos do Node.js",
        "Integração entre formulário, servidor e banco de dados",
        "Autenticação com JWT e cookies protegidos",
        "Organização de código em módulos",
        "Controle de versões com Git e GitHub"
      ],

      nextSteps: [
        "Publicar frontend e backend",
        "Configurar domínio e HTTPS",
        "Adicionar proteção antispam",
        "Criar testes automatizados",
        "Melhorar acessibilidade e experiência mobile",
        "Adicionar novos projetos reais ao portfólio"
      ],

      frontendUrl:
        "https://github.com/adminbarberflow/souzasdevfront",

      backendUrl:
        "https://github.com/adminbarberflow/souzasdevback"
    },
    {
      slug: "cafeteria-conceito",
      category: "Website institucional / Cardápio digital",
      title: "Cafeteria Conceito",
      subtitle: "Experiência digital para uma cafeteria fictícia",
      status: "Projeto concluído",
      year: "2026",

      coverImage:
        "/assets/images/projects/cafeteria-conceito.webp",

      coverAlt:
        "Página inicial do projeto Cafeteria Conceito",

      overview:
        "Site conceitual de uma cafeteria, desenvolvido com foco em uma experiência minimalista, responsiva e agradável para apresentação de produtos e cardápio digital.",

      complementaryDescription:
        "Uma experiência digital clean e elegante para uma cafeteria fictícia, com cardápio interativo, filtros por categoria, informações institucionais e localização ilustrativa.",

      challenge:
        "Criar uma página que transmitisse a sensação de uma cafeteria moderna e acolhedora sem utilizar excesso de elementos, cores ou animações. O cardápio precisava ser fácil de consultar e funcionar bem em diferentes tamanhos de tela.",

      solution:
        "Foi desenvolvida uma interface minimalista, com tipografia editorial, paleta inspirada em tons de café e bastante espaço visual. O cardápio é renderizado dinamicamente com JavaScript e pode ser filtrado por categorias.",

      features: [
        "Cardápio digital",
        "Filtros de produtos",
        "Layout responsivo",
        "Menu mobile",
        "Informações institucionais",
        "Mapa ilustrativo",
        "Navegação por âncoras",
        "Tratamento de falhas no carregamento das imagens",
        "Boas práticas básicas de acessibilidade"
      ],

      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Git",
        "GitHub",
        "GitHub Pages"
      ],

      highlights: [
        "Desenvolvimento mobile-first",
        "Layout totalmente responsivo",
        "Identidade visual minimalista",
        "Cardápio digital dinâmico",
        "Filtros por categoria",
        "Produtos renderizados com JavaScript",
        "Imagens otimizadas e armazenadas localmente",
        "Navegação acessível",
        "Localização fictícia e mapa ilustrativo",
        "Publicação automatizada pelo GitHub Pages"
      ],

      result:
        "O resultado é uma demonstração leve, responsiva e profissional, preparada para representar uma solução real que poderia ser adaptada para cafeterias, restaurantes e outros negócios do setor alimentício.",

      demoUrl:
        "https://adminbarberflow.github.io/cafeteria-frontend/",

      codeUrl:
        "https://github.com/adminbarberflow/cafeteria-frontend",

      caseUrl:
        "/cases/cafeteria-conceito"
    }
  ]
};







