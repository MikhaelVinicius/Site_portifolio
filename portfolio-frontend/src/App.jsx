import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Github, ExternalLink, Code2, PlusCircle, Trash2 } from 'lucide-react';
import './App.css'; // Importando o CSS tradicional

const API_URL = 'http://localhost:8080/api/projects'; 

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Mantive a grafia "discription" igual ao seu backend em Java
  const [formData, setFormData] = useState({
    title: '',
    discription: '',
    imageURL: '',
    projectUrl: '',
    githubUrl: '',
    technologies: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ title: '', discription: '', imageURL: '', projectUrl: '', githubUrl: '', technologies: '' });
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Meu Portfólio</h1>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            <PlusCircle size={18} />
            {showForm ? 'Fechar Formulário' : 'Novo Projeto'}
          </button>
        </div>
      </nav>

      <main className="main-container">
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
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Salvar Projeto</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <p>Carregando projetos...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <Code2 size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.2rem' }}>Nenhum projeto encontrado.</p>
            <p style={{ marginTop: '0.5rem' }}>Adicione seu primeiro projeto acima!</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image-wrapper">
                  <img src={project.imageURL || 'https://via.placeholder.com/400x250'} alt={project.title} />
                  <button onClick={() => handleDelete(project.id)} className="btn-delete" title="Excluir">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.discription}</p>
                  
                  <div className="tech-badges">
                    {project.technologies && project.technologies.split(',').map((tech, index) => (
                      <span key={index} className="tech-badge">
                        {tech.trim()}
                      </span>
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;