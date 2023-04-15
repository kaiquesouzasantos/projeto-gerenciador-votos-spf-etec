package gerenciador_notas_spf.repository;

import gerenciador_notas_spf.model.AvaliacaoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AvaliacaoRepository extends JpaRepository<AvaliacaoModel, UUID> {
    boolean existsByApresentacaoAndProfessor(UUID apresentacao, UUID professor);
    Optional<List<AvaliacaoModel>> findAllByApresentacao(UUID apresentacao);
}