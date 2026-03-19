package portifolio_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import portifolio_backend.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {



}
