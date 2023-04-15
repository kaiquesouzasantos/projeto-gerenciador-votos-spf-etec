package gerenciador_notas_spf.repository;

import gerenciador_notas_spf.model.SalaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SalaRepository extends JpaRepository<SalaModel, UUID> {
    boolean existsByNome(String nome);
}
