
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Github, ExternalLink, Code2, PlusCircle, Trash2, Lock, Loader2, Mail, Star } from 'lucide-react';
import './App.css';

// const API_URL = 'https://site-portifolio-2ah7.onrender.com/api/projects';

const MOCK_PROJECTS = [
  {
    "id": 2,
    "title": "IA de reconhecimentos de Placas",
    "discription": "Modelo de inteligência artificial para o reconhecimento de placas de trânsito. Apesar de ser um projeto simples, tenho relativo apreço por ele já que foi o começo de minha jornada de aprendizado com IA.",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-aLm60SbKAH-kvwo73odvjt8uc51hE2537w&s",
    "projectUrl": "https://colab.research.google.com/drive/1OAvqLaPEo0p28W3NGXqzF41zM2IpRUcx?usp=sharing",
    "githubUrl": "https://colab.research.google.com/drive/1OAvqLaPEo0p28W3NGXqzF41zM2IpRUcx?usp=sharing",
    "technologies": "IA, Visão Computacional, Python, Tensorflow, Pandas,  Pytesseract",
    "destaque": null
  },
  {
    "id": 3,
    "title": "Este portfólio",
    "discription": "Projeto de criação deste site, desenvolvi uma aplicação simples com o intuito de armazenar e expor meus projetos que não poderiam ser enviados para o GitHub, como os de IA.",
    "imageURL": "https://static.vecteezy.com/ti/vetor-gratis/p1/7555824-icone-portfolio-adequado-para-arte-simbolo-longa-sombra-estilo-design-simples-design-editavel-modelo-ilustracao-simples-vetor.jpg",
    "projectUrl": "",
    "githubUrl": "https://github.com/MikhaelVinicius/Site_portifolio",
    "technologies": "Java, JavaScript, React, SpringBoot, PostgreSQL",
    "destaque": null
  },
  {
    "id": 5,
    "title": "Extração de dados sobre Cancer de Pele",
    "discription": "Projeto de aprendizado de maquina que identifica e classifica tipos específicos de câncer de pele e seus resultados foram apresentados em uma apresentação. ",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksAKJY--S8F1eEUwB8SBFwyHz8w65Z90hgQ&s",
    "projectUrl": "https://www.canva.com/design/DAGTftpNM_A/3eNTRiFAvJoR8vphzNzPKw/edit?utm_content=DAGTftpNM_A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
    "githubUrl": "https://colab.research.google.com/drive/1uD9vdq7Be_wow3X3qDlPT3KFYjJWB2VD?usp=sharing",
    "technologies": " Python, Tensorflow, Pandas,  Numpy, Seaborn",
    "destaque": null
  },
  {
    "id": 6,
    "title": "Diagnóstico de Doenças em Plantas por Imagem",
    "discription": "(EM DESENVOLVIMENTO)",
    "imageURL": "https://acientistaagricola.pt/wp-content/uploads/2018/06/manchas-das-folhas.jpg",
    "projectUrl": "https://colab.research.google.com/drive/1-jgcN4vQcgdlicyD2vl8IMzy7ngdnfYo?usp=sharing",
    "githubUrl": "https://colab.research.google.com/drive/1-jgcN4vQcgdlicyD2vl8IMzy7ngdnfYo?usp=sharing",
    "technologies": "Deep Learning, Transfer Learning, . Arquiteturas EfficientNet e ResNet50, TensorFlow",
    "destaque": null
  },
  {
    "id": 7,
    "title": "Fuzzy Investimentos ",
    "discription": "Projeto para aprendizado utiliza lógica fuzzy para transformar 10 indicadores financeiros em uma recomendação clara de investimento. Ele avaliar ativos como Ouro, Euro, Dólar e Real, classificando-os entre Não Recomendado e Recomendado.",
    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPtGlr08B1cjEpEz8hBZ9u4L2sVK7otrqhg&s",
    "projectUrl": "https://colab.research.google.com/drive/1-s4c-lPKp4IIpMnyzfsIUTyHfHguzh5D?usp=sharing",
    "githubUrl": "https://colab.research.google.com/drive/1-s4c-lPKp4IIpMnyzfsIUTyHfHguzh5D?usp=sharing",
    "technologies": "Python, Scikit-Fuzzy, NumPy, Logíca Fuzzy",
    "destaque": null
  },
  {
    "id": 8,
    "title": "Backend Ecommerce Microserviços",
    "discription": "Este projeto backend de microserviços desenvolvida em Python (FastAPI) utiliza o Docker Compose para orquestrar serviços independentes de Pedidos, Pagamentos e Estoque que se comunicam de forma resiliente via RabbitMQ.",
    "imageURL": "https://site.alphacode.com.br/wp-content/uploads/2017/05/91993-ecommerce-e-loja-fisica-entenda-quais-sao-as-diferencas.jpg",
    "projectUrl": "",
    "githubUrl": "https://github.com/MikhaelVinicius/Ecommerce-microservice.git",
    "technologies": "Python, Microserviços, FastAPI, Docker, RabbitMQ",
    "destaque": null
  },
  {
    "id": 4,
    "title": "Monitor de Segurança com IA",
    "discription": "Este projeto é um monitor de segurança desenvolvido com Streamlit que utiliza o modelo de inteligência artificial YOLO para realizar a detecção automatizada de Equipamentos de Proteção (EPIs) em imagens. ",
    "imageURL": "https://mapa-da-obra-producao.s3.amazonaws.com/wp-content/uploads/2018/09/assessoria-de-obras.jpg",
    "projectUrl": "https://ppp-detector-app.streamlit.app/",
    "githubUrl": "https://colab.research.google.com/drive/1FfoLlciFfiB9db9zkZomDnDgGTq902lX?usp=sharing",
    "technologies": "Python, YOLO, Streamilt, roboflow",
    "destaque": true
  },
  {
    "id": 10,
    "title": "Visite Arcoverde",
    "discription": "(Em Finalização) Projeto de desenvolvimento web sobre site de turismo para a cidade de Arcoverde-PE. A aplicação envolve Java Springboot e React. Construção do backend e deploy concluídos. Exige ajustes e finalização de algumas parte do front.",
    "imageURL": "https://upload.wikimedia.org/wikipedia/commons/4/44/Arcoverde_20230921_130602831.jpg",
    "projectUrl": "https://arcoverde-site-turismo.vercel.app",
    "githubUrl": "https://github.com/MikhaelVinicius/Arcoverde_site_turismo",
    "technologies": "Spring Security com JWT, Spring Data JPA, Arquitetura em Camadas, React.js, Tailwind CSS",
    "destaque": true
  },
  {
    "id": 11,
    "title": "Streaming de Música",
    "discription": "Streaming de música 100% funcional, projetado em React, Tailwind, Redux e RapidAPI.",
    "imageURL": "https://novabrasilfm.com.br/app/uploads/2024/10/streaming_musica.png",
    "projectUrl": "",
    "githubUrl": "https://github.com/MikhaelVinicius/StreamingDeMusicaBayonetta.git",
    "technologies": "React, Tailwind CSS, Redux, RapidAPI",
    "destaque": null
  }
];

function App() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [loading, setLoading] = useState(false); // Carregamento desativado
  const [showForm, setShowForm] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    discription: '',
    imageURL: '',
    projectUrl: '',
    githubUrl: '',
    technologies: '',
    destaque: false
  });

  /* Função original mantida comentada
  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      setLoading(false);
    }
  };
  */

  useEffect(() => {
    // fetchProjects();
  }, []);

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
      setAuthError('Senha incorreta! Acesso negado.');
    }
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setPendingAction(null);
  };

  const handleDelete = (id) => {
    if(window.confirm('Tem certeza que deseja excluir este projeto?')) {
      // Atualização apenas no estado local
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleToggleDestaque = (project) => {
    // Atualização apenas no estado local
    setProjects(projects.map(p => 
      p.id === project.id ? { ...p, destaque: !p.destaque } : p
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cria um novo projeto localmente gerando um ID com a data atual
    const newProject = {
      ...formData,
      id: Date.now()
    };
    
    setProjects([...projects, newProject]);
    setFormData({ title: '', discription: '', imageURL: '', projectUrl: '', githubUrl: '', technologies: '', destaque: false });
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Separa os projetos
  const projetosDestaque = projects.filter(p => p.destaque === true);
  const outrosProjetos = projects.filter(p => p.destaque !== true);

  // Renderiza o card
  const renderProjectCard = (project) => (
    <div key={project.id} className="project-card">
      <div className="project-image-wrapper">
        <img src={project.imageURL || 'https://via.placeholder.com/400x250'} alt={project.title} />
        
        {/* BOTÕES DE ADMIN: Só aparecem se o usuário estiver logado */}
        {isAuthenticated && (
          <div className="admin-actions">
            <button 
              onClick={() => handleToggleDestaque(project)} 
              className={`btn-action ${project.destaque ? 'btn-star-active' : 'btn-star'}`}
              title={project.destaque ? "Remover dos Destaques" : "Adicionar aos Destaques"}
            >
              <Star size={16} fill={project.destaque ? "#f59e0b" : "none"} color={project.destaque ? "#f59e0b" : "currentColor"} />
            </button>
            
            <button onClick={() => handleDelete(project.id)} className="btn-action btn-delete" title="Excluir">
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
              <Github size={18} /> Código
            </a>
          )}
          {project.projectUrl && (
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <ExternalLink size={18} /> Acessar
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-wrapper">
      {authModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon"><Lock size={32} /></div>
            <h3>Acesso Restrito</h3>
            <p>Por favor, insira a senha para continuar.</p>
            <form onSubmit={handlePasswordSubmit}>
              <input type="password" className="form-input" placeholder="Digite a senha..." value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} autoFocus />
              {authError && <span className="error-text">{authError}</span>}
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeAuthModal}>Cancelar</button>
                <button type="submit" className="btn-primary btn-submit">Desbloquear</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-content">
          <h1>Meu Portfólio</h1>
          <button className="btn-primary" onClick={() => requireAuth(() => setShowForm(!showForm))}>
            <PlusCircle size={18} />
            {showForm ? 'Fechar Formulário' : 'Novo Projeto'}
          </button>
        </div>
      </nav>

      <main className="main-container">
        {/* Cabeçalho de Perfil */}
        <div className="profile-header">
          <h1>Mikhael Soel</h1>
          <div className="profile-links">
            <a href="mailto:mikhaelvini@gmail.com" className="profile-link">
              <Mail size={18} /> mikhaelvini@gmail.com
            </a>
            <a href="https://github.com/MikhaelVinicius" target="_blank" rel="noopener noreferrer" className="profile-link">
              <Github size={18} /> GitHub
            </a>
          </div>
        </div>

        {showForm && (
          <div className="form-container">
            <h2>Adicionar Novo Projeto</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Título do Projeto" className="form-input" required />
                <input type="text" name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="URL da Imagem de Capa" className="form-input" required />
                <input type="text" name="projectUrl" value={formData.projectUrl} onChange={handleChange} placeholder="URL do Projeto (Deploy)" className="form-input" />
                <input type="text" name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="URL do Repositório (GitHub)" className="form-input" required />
                <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Tecnologias (ex: React, Java, Spring)" className="form-input full-width" required />
                <textarea name="discription" value={formData.discription} onChange={handleChange} placeholder="Descrição do Projeto" rows="4" className="form-input full-width" required />
                
                <div className="form-input full-width" style={{display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', border: 'none'}}>
                  <input type="checkbox" id="destaque" name="destaque" checked={formData.destaque} onChange={(e) => setFormData({...formData, destaque: e.target.checked})} style={{width: 'auto'}}/>
                  <label htmlFor="destaque" style={{color: 'var(--text-main)', cursor: 'pointer'}}>Marcar como Destaque</label>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Salvar Projeto</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading-state" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
             <Loader2 className="spinner" size={48} />
             <p className="loading-title">Buscando projetos...</p>
             <div className="loading-warning">
                <p><strong>Aviso:</strong> O servidor backend pode estar "dormindo".</p>
                <p>O primeiro carregamento pode demorar até 1 minuto para despertar. Obrigado pela paciência!</p>
             </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <Code2 size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.2rem' }}>Nenhum projeto encontrado.</p>
            <p style={{ marginTop: '0.5rem' }}>Adicione seu primeiro projeto acima!</p>
          </div>
        ) : (
          <div className="portfolio-content">
            
            {projetosDestaque.length > 0 && (
              <div className="section-destaques" style={{ marginBottom: '4rem' }}>
                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Star fill="#f59e0b" color="#f59e0b" /> Projetos em Destaque
                </h2>
                <div className="projects-grid">
                  {projetosDestaque.map(renderProjectCard)}
                </div>
              </div>
            )}

            {outrosProjetos.length > 0 && (
              <div className="section-outros">
                <h2 style={{ color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                  {projetosDestaque.length > 0 ? 'Outros Projetos' : 'Todos os Projetos'}
                </h2>
                <div className="projects-grid">
                  {outrosProjetos.map(renderProjectCard)}
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}

export default App;