import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Code2, PlusCircle, Trash2, Lock, Mail, Star, Terminal, User } from 'lucide-react';
import './App.css';

const MOCK_PROJECTS = [
  {
    "id": 14,
    "title": "DocuMind — RAG & Busca Semântica",
    "discription": "Sistema Full-Stack de RAG (Retrieval-Augmented Generation). Permite análise de documentos em PDF via chat em tempo real com rastreabilidade de fontes, conectando LLM a um banco vetorial para precisão sem alucinações.",
    "imageURL": "https://i0.wp.com/businessaifuture.com/wordpress/wp-content/files/businessaifuture.com/2024/01/RAG-em-IA-Revolucionando-a-Precisao-do-Conteudo-Gerado.webp?fit=1200%2C600&ssl=1",
    "projectUrl": "",
    "githubUrl": "https://github.com/MikhaelVinicius/DocuMind",
    "technologies": "Java 21, Spring Boot, LangChain4j, PostgreSQL (pgvector), React",
    "destaque": true
  },
  {
    "id": 12,
    "title": "SkillSwap",
    "discription": "Plataforma universitária de troca de habilidades por economia de tempo. Implementei algoritmo de match reverso, sistema financeiro de saldo de horas com retenção (escrow), chat contextualizado e assinaturas Premium.",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdir42Ct2p5tANeyq8bptvf3QK4cz_CGRdYw&s",
    "projectUrl": "",
    "githubUrl": "https://github.com/PauloHenriqque/SkillSwap.git",
    "technologies": "Java, Spring Boot, Spring Security, JWT, PostgreSQL",
    "destaque": true
  },
  {
    "id": 13,
    "title": "Detecção de Patologias Asfálticas com IA",
    "discription": "Projeto focado na detecção automatizada de buracos e falhas no asfalto. Utiliza modelos de visão computacional para processar imagens da via e identificar patologias, auxiliando no mapeamento e segurança do trânsito.",
    "imageURL": "https://www.onsv.org.br/source/files/c/2094/Ocorrencias_de_transito_causadas_por_buracos_na_via-763336_2000-1200-0-0.jpg",
    "projectUrl": "https://colab.research.google.com/drive/1zpaOyiDwGv-rjkdbVjVHuHPUnusgU8Hl",
    "githubUrl": "https://colab.research.google.com/drive/1zpaOyiDwGv-rjkdbVjVHuHPUnusgU8Hl",
    "technologies": "Visão Computacional, Python, Deep Learning",
    "destaque": null
  },
  {
    "id": 2,
    "title": "Reconhecimento de Placas",
    "discription": "Modelo de inteligência artificial para o reconhecimento de placas de trânsito. O projeto que marcou o início da minha jornada no aprendizado prático de IA e extração de dados.",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-aLm60SbKAH-kvwo73odvjt8uc51hE2537w&s",
    "projectUrl": "https://colab.research.google.com/drive/1OAvqLaPEo0p28W3NGXqzF41zM2IpRUcx?usp=sharing",
    "githubUrl": "https://colab.research.google.com/drive/1OAvqLaPEo0p28W3NGXqzF41zM2IpRUcx?usp=sharing",
    "technologies": "Python, Tensorflow, Pandas, Pytesseract",
    "destaque": null
  },
  {
    "id": 3,
    "title": "Este portfólio",
    "discription": "Projeto full-stack desenvolvido para armazenar e expor meus projetos técnicos, desenhado de forma independente para servir como catálogo profissional.",
    "imageURL": "https://static.vecteezy.com/ti/vetor-gratis/p1/7555824-icone-portfolio-adequado-para-arte-simbolo-longa-sombra-estilo-design-simples-design-editavel-modelo-ilustracao-simples-vetor.jpg",
    "projectUrl": "",
    "githubUrl": "https://github.com/MikhaelVinicius/Site_portifolio",
    "technologies": "Java, React, SpringBoot, PostgreSQL",
    "destaque": null
  },
  {
    "id": 5,
    "title": "Diagnóstico de Câncer de Pele",
    "discription": "Projeto de aprendizado de máquina que identifica e classifica tipos específicos de lesões cutâneas, aplicando técnicas de processamento de dados e estatística.",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksAKJY--S8F1eEUwB8SBFwyHz8w65Z90hgQ&s",
    "projectUrl": "https://www.canva.com/design/DAGTftpNM_A/3eNTRiFAvJoR8vphzNzPKw/edit?utm_content=DAGTftpNM_A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    "githubUrl": "https://colab.research.google.com/drive/1uD9vdq7Be_wow3X3qDlPT3KFYjJWB2VD?usp=sharing",
    "technologies": "Python, Tensorflow, Numpy, Seaborn",
    "destaque": null
  },
  {
    "id": 6,
    "title": "Diagnóstico Botânico por IA",
    "discription": "(EM DESENVOLVIMENTO) Classificação de patologias em plantas utilizando abordagens avançadas de Transfer Learning para análise de imagens agrícolas.",
    "imageURL": "https://acientistaagricola.pt/wp-content/uploads/2018/06/manchas-das-folhas.jpg",
    "projectUrl": "https://colab.research.google.com/drive/1-jgcN4vQcgdlicyD2vl8IMzy7ngdnfYo?usp=sharing",
    "githubUrl": "https://colab.research.google.com/drive/1-jgcN4vQcgdlicyD2vl8IMzy7ngdnfYo?usp=sharing",
    "technologies": "Deep Learning, EfficientNet, ResNet50",
    "destaque": null
  },
  {
    "id": 7,
    "title": "Fuzzy Investimentos",
    "discription": "Sistema de apoio à decisão que utiliza lógica fuzzy para transformar 10 indicadores financeiros em recomendações claras e objetivas de investimento.",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPtGlr08B1cjEpEz8hBZ9u4L2sVK7otrqhg&s",
    "projectUrl": "https://colab.research.google.com/drive/1-s4c-lPKp4IIpMnyzfsIUTyHfHguzh5D?usp=sharing",
    "githubUrl": "https://colab.research.google.com/drive/1-s4c-lPKp4IIpMnyzfsIUTyHfHguzh5D?usp=sharing",
    "technologies": "Python, Scikit-Fuzzy, Lógica Fuzzy",
    "destaque": null
  },
  {
    "id": 8,
    "title": "Microsserviços Ecommerce",
    "discription": "Backend orquestrado em contentores utilizando arquitetura de microsserviços, com módulos independentes comunicando de forma resiliente.",
    "imageURL": "https://site.alphacode.com.br/wp-content/uploads/2017/05/91993-ecommerce-e-loja-fisica-entenda-quais-sao-as-diferencas.jpg",
    "projectUrl": "",
    "githubUrl": "https://github.com/MikhaelVinicius/Ecommerce-microservice.git",
    "technologies": "Python, FastAPI, Docker, RabbitMQ",
    "destaque": null
  },
  {
    "id": 4,
    "title": "Monitor de Segurança com YOLO",
    "discription": "Aplicação interativa desenvolvida com Streamlit que utiliza o modelo YOLO para realizar a detecção automatizada de Equipamentos de Proteção (EPIs).",
    "imageURL": "https://mapa-da-obra-producao.s3.amazonaws.com/wp-content/uploads/2018/09/assessoria-de-obras.jpg",
    "projectUrl": "https://ppp-detector-app.streamlit.app/",
    "githubUrl": "https://colab.research.google.com/drive/1FfoLlciFfiB9db9zkZomDnDgGTq902lX?usp=sharing",
    "technologies": "Python, YOLO, Streamlit, Roboflow",
    "destaque": true
  },
  {
    "id": 10,
    "title": "Visite Arcoverde",
    "discription": "(Em Finalização) Plataforma de turismo full-stack com backend estruturado em camadas. Gerenciamento de rotas turísticas e sistema de autenticação integrado.",
    "imageURL": "https://upload.wikimedia.org/wikipedia/commons/4/44/Arcoverde_20230921_130602831.jpg",
    "projectUrl": "https://arcoverde-site-turismo.vercel.app",
    "githubUrl": "https://github.com/MikhaelVinicius/Arcoverde_site_turismo",
    "technologies": "Spring Security, JWT, React.js, Tailwind",
    "destaque": true
  },
  {
    "id": 11,
    "title": "Streaming de Música",
    "discription": "Aplicação de streaming responsiva e fluida com gestão avançada de estado global e consumo de dados em tempo real através de APIs externas.",
    "imageURL": "https://novabrasilfm.com.br/app/uploads/2024/10/streaming_musica.png",
    "projectUrl": "",
    "githubUrl": "https://github.com/MikhaelVinicius/StreamingDeMusicaBayonetta.git",
    "technologies": "React, Tailwind CSS, Redux, RapidAPI",
    "destaque": null
  }
];

function App() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

  const [formData, setFormData] = useState({
    title: '', discription: '', imageURL: '', projectUrl: '', githubUrl: '', technologies: '', destaque: false
  });

  const requireAuth = (action) => {
    if (isAuthenticated) {
      action();
    } else {
      setPendingAction(() => action); 
      setAuthError('');
      setPasswordInput('');
      setAuthModalOpen(true); 
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'soel2024') {
      setIsAuthenticated(true);
      setAuthModalOpen(false);
      if (pendingAction) {
        pendingAction(); 
        setPendingAction(null);
      }
    } else {
      setAuthError('Credenciais inválidas.');
    }
  };

  const handleDelete = (id) => {
    if(window.confirm('Tem certeza que deseja excluir este registro?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleToggleDestaque = (project) => {
    setProjects(projects.map(p => 
      p.id === project.id ? { ...p, destaque: !p.destaque } : p
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = { ...formData, id: Date.now() };
    setProjects([newProject, ...projects]); // Adiciona no início da lista
    setFormData({ title: '', discription: '', imageURL: '', projectUrl: '', githubUrl: '', technologies: '', destaque: false });
    setShowForm(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const projetosDestaque = projects.filter(p => p.destaque === true);
  const outrosProjetos = projects.filter(p => p.destaque !== true);

  const renderProjectCard = (project) => (
    <article key={project.id} className="project-card">
      <div className="project-image-wrapper">
        <img src={project.imageURL || 'https://via.placeholder.com/400x250'} alt={`Capa do projeto ${project.title}`} loading="lazy" />
        
        {isAuthenticated && (
          <div className="admin-actions">
            <button onClick={() => handleToggleDestaque(project)} className={`btn-action ${project.destaque ? 'btn-star-active' : 'btn-star'}`} title="Alternar Destaque">
              <Star size={16} fill={project.destaque ? "#f59e0b" : "none"} color={project.destaque ? "#f59e0b" : "white"} />
            </button>
            <button onClick={() => handleDelete(project.id)} className="btn-action btn-delete" title="Excluir Projeto">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.discription}</p>
        
        <div className="tech-badges">
          {project.technologies && project.technologies.split(',').map((tech, index) => (
            <span key={index} className="tech-badge">{tech.trim()}</span>
          ))}
        </div>

        <div className="project-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <Github size={18} /> Repositório
            </a>
          )}
          {project.projectUrl && (
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <div className="app-wrapper">
      {/* Modal de Autenticação */}
      {authModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary)' }}>
              <Lock size={40} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Acesso Restrito</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Autenticação necessária para gerenciar o portfólio.</p>
            <form onSubmit={handlePasswordSubmit}>
              <input type="password" style={{ marginBottom: '0.5rem' }} className="form-input" placeholder="Insira a chave de acesso" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} autoFocus />
              {authError && <span style={{ color: 'var(--danger)', fontSize: '0.85rem', display: 'block', marginBottom: '1rem', textAlign: 'left' }}>{authError}</span>}
              <div className="form-actions" style={{ marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setAuthModalOpen(false)} style={{ background: 'transparent', color: 'var(--text-main)', border: 'none', padding: '0.5rem 1rem' }}>Cancelar</button>
                <button type="submit" className="btn-primary">Autorizar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navbar Otimizada */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={24} color="var(--primary)"/> DevPortfolio
          </h1>
          <button className="btn-primary" onClick={() => requireAuth(() => setShowForm(!showForm))}>
            <PlusCircle size={18} /> {showForm ? 'Fechar Painel' : 'Gerenciar'}
          </button>
        </div>
      </nav>

      {/* Hero Section Profissional */}
      <header className="hero-section">
        <h2 className="hero-title">Mikhael Soel</h2>
        <p className="hero-subtitle">Engenheiro de Software & Entusiasta em Inteligência Artificial. Construindo soluções robustas de backend, interfaces dinâmicas e modelos de visão computacional.</p>
        <div className="profile-links">
          <a href="https://github.com/MikhaelVinicius" target="_blank" rel="noopener noreferrer" className="profile-link">
            <Github size={18} /> GitHub
          </a>
          <a href="mailto:mikhaelvini@gmail.com" className="profile-link">
            <Mail size={18} /> Contacto
          </a>
          {/* Adicione o link do seu LinkedIn aqui se desejar */}
          <a href="#" className="profile-link" onClick={(e) => e.preventDefault()}>
             <User size={18} /> Currículo
          </a>
        </div>
      </header>

      <main className="main-container">
        {/* Formulário Administrativo */}
        {showForm && (
          <section className="form-container">
            <h2 className="section-title">Adicionar Registro Tecnológico</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Título da Solução" className="form-input" required />
                <input type="text" name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="URL da Arquitetura/Capa" className="form-input" required />
                <input type="text" name="projectUrl" value={formData.projectUrl} onChange={handleChange} placeholder="URL de Produção (Opcional)" className="form-input" />
                <input type="text" name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="URL do Código Fonte" className="form-input" required />
                <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Stack (ex: Java, Spring Boot, React)" className="form-input full-width" required />
                <textarea name="discription" value={formData.discription} onChange={handleChange} placeholder="Resumo técnico e impacto do projeto..." rows="4" className="form-input full-width" required />
                
                <div className="full-width" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '0.5rem' }}>
                  <input type="checkbox" id="destaque" name="destaque" checked={formData.destaque} onChange={(e) => setFormData({...formData, destaque: e.target.checked})} style={{ width: '18px', height: '18px', cursor: 'pointer' }}/>
                  <label htmlFor="destaque" style={{ color: 'var(--text-main)', cursor: 'pointer', userSelect: 'none', fontWeight: '500' }}>Fixar na secção de destaques</label>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Processar Inserção</button>
              </div>
            </form>
          </section>
        )}

        {/* Listagem de Projetos */}
        {projetosDestaque.length > 0 && (
          <section style={{ marginBottom: '5rem' }}>
            <h2 className="section-title" style={{ color: 'var(--text-main)' }}>
              <Star color="var(--accent)" fill="var(--accent)" /> Engenharia em Destaque
            </h2>
            <div className="projects-grid">
              {projetosDestaque.map(renderProjectCard)}
            </div>
          </section>
        )}

        {outrosProjetos.length > 0 && (
          <section>
            <h2 className="section-title" style={{ color: 'var(--text-main)' }}>
              <Code2 color="var(--text-muted)" /> Arquivo de Projetos & IA
            </h2>
            <div className="projects-grid">
              {outrosProjetos.map(renderProjectCard)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
