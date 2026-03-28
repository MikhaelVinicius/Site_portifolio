import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Github, ExternalLink, Code2, PlusCircle, Trash2, Lock, Loader2, Mail, Star } from 'lucide-react';
import './App.css';

const API_URL = 'https://site-portifolio-2ah7.onrender.com/api/projects';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchProjects();
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

  const handleDelete = async (id) => {
    if(window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProjects(); 
      } catch (error) {
        console.error("Erro ao deletar projeto:", error);
      }
    }
  };

  const handleToggleDestaque = async (project) => {
    try {
      const updatedProject = { ...project, destaque: !project.destaque };
      await axios.put(`${API_URL}/${project.id}`, updatedProject);
      fetchProjects(); 
    } catch (error) {
      console.error("Erro ao atualizar destaque:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ title: '', discription: '', imageURL: '', projectUrl: '', githubUrl: '', technologies: '', destaque: false });
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
    }
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