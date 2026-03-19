package portifolio_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import portifolio_backend.repository.ProjectRepository;
import portifolio_backend.model.Project;

import java.util.List;
import java.util.Optional;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects(){
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id){
        return projectRepository.findById(id);
    }

    public Project createProject(Project project){
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project projectDetails){
        Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Projeto não encontrado!"));
        project.setTitle(projectDetails.getTitle());
        project.setDiscription(projectDetails.getDiscription());
        project.setImageURL(projectDetails.getImageURL());
        project.setGithubUrl(projectDetails.getGithubUrl());
        project.setTechnologies(projectDetails.getTechnologies());
        return projectRepository.save(project);
        


    }

    public void deleteProject(Long id){
        projectRepository.deleteById(id);
    }

}
