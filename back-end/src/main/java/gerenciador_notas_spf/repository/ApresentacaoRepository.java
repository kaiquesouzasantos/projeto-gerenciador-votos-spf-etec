package gerenciador_notas_spf.repository;

import gerenciador_notas_spf.model.ApresentacaoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ApresentacaoRepository extends JpaRepository<ApresentacaoModel, UUID> {
    boolean existsByNomeAndSala(String nome, UUID sala);
    List<ApresentacaoModel> findAllBySala(UUID sala);
}