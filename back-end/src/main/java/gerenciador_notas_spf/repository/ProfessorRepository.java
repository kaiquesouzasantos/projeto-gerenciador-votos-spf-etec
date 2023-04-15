package gerenciador_notas_spf.repository;

import gerenciador_notas_spf.model.ProfessorModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProfessorRepository extends JpaRepository<ProfessorModel, UUID> {
    Optional<ProfessorModel> findByEmail(String email);
    boolean existsByNomeOrEmail(String nome, String email);
    boolean existsByEmailAndSenha(String email, String senha);
}
