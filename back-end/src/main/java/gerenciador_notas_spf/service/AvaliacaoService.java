package gerenciador_notas_spf.service;

import gerenciador_notas_spf.component.ApresentacaoList;
import gerenciador_notas_spf.dto.AvaliacaoDTO;
import gerenciador_notas_spf.exception.ExceptionGeneric;
import gerenciador_notas_spf.mapper.AvaliacaoMapper;
import gerenciador_notas_spf.model.ApresentacaoModel;
import gerenciador_notas_spf.model.AvaliacaoModel;
import gerenciador_notas_spf.repository.ApresentacaoRepository;
import gerenciador_notas_spf.repository.AvaliacaoRepository;
import gerenciador_notas_spf.repository.ProfessorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AvaliacaoService {
    private final AvaliacaoRepository avaliacaoRepository;
    private final ProfessorRepository professorRepository;
    private final ApresentacaoRepository apresentacaoRepository;

    private static final int LIMITE_PROFESSORES = 3;
    private static final Map<String, Double> APRESENTACOES = ApresentacaoList.getMapApresentacoes();

    @Transactional(rollbackOn = ExceptionGeneric.class)
    public AvaliacaoModel save(AvaliacaoDTO avaliacao) {
        verifyForeign(avaliacao);
        verifySameAvaliacao(avaliacao);
        verifyLimitAvaliacao(avaliacao);
        verifyLimitNota(avaliacao);

        return avaliacaoRepository.save(new AvaliacaoMapper().toMapper(avaliacao));
    }

    @Transactional(rollbackOn = ExceptionGeneric.class)
    public void delete(UUID id) {
        avaliacaoRepository.deleteById(id);
    }

    public AvaliacaoModel update(AvaliacaoModel avaliacao) {
        verifyExistsAvaliacao(avaliacao.getId());

        return avaliacaoRepository.save(avaliacao);
    }

    public List<AvaliacaoModel> listAll()  {
        return avaliacaoRepository.findAll();
    }

    public AvaliacaoModel findById(UUID id) {
        return avaliacaoRepository.findById(id)
                .orElseThrow(() -> new ExceptionGeneric("AVALIACAO NO CONTENT", "AVALIACAO NOT FOUND", HttpStatus.NO_CONTENT.value()));
    }

    private void verifyForeign(AvaliacaoDTO avaliacao) {
        if(!this.existsForeing(avaliacao.getApresentacao(), avaliacao.getProfessor()))
            throw new ExceptionGeneric("CHAVES ESTRANGEIRAS INVALIDAS", "CHAVES ESTRANGEIRAS INVALIDAS", HttpStatus.BAD_REQUEST.value());
    }

    private void verifySameAvaliacao(AvaliacaoDTO avaliacao) {
        if(this.existsSameAvaliacaoWithProfessor(avaliacao.getApresentacao(), avaliacao.getProfessor()))
            throw new ExceptionGeneric("AVALIACAO JA ATRIBUIDA", "AVALIACAO JA ATRIBUIDA", HttpStatus.CONFLICT.value());
    }

    private void verifyLimitAvaliacao(AvaliacaoDTO avaliacao) {
        if(avaliacaoRepository.countByApresentacao(avaliacao.getApresentacao()) >= LIMITE_PROFESSORES)
            throw new ExceptionGeneric("NUMERO DE AVALIACOES EXCEDIDO", "NUMERO DE AVALIACOES EXCEDIDO", HttpStatus.CONFLICT.value());
    }

    private void verifyLimitNota(AvaliacaoDTO avaliacao) {
        Double notaLimite = returnNotaLimit(avaliacao);

        if(avaliacao.getNota() > notaLimite)
            throw new ExceptionGeneric(
                    "NOTA ATRIBUIDA ESTA ACIMA DO PERMITIDO",
                    "NOTA ATRIBUIDA ESTA ACIMA DO PERMITIDO PARA A APRESENTACAO, O LIMITE PARA ESSA APRESENTACAO E DE " + notaLimite + " PONTOS",
                    HttpStatus.BAD_REQUEST.value());
    }

    private void verifyExistsAvaliacao(UUID avaliacao) {
        if(!this.existsAvaliacao(avaliacao))
            throw new ExceptionGeneric("AVALIACAO INEXISTENTE NA BASE DE DADOS", "AVALIACAO INEXISTENTE NA BASE DE DADOS", HttpStatus.CONFLICT.value());
    }

    private Double returnNotaLimit(AvaliacaoDTO avaliacao) {
        Optional<ApresentacaoModel> apresentacao = apresentacaoRepository.findById(avaliacao.getApresentacao());

        if(apresentacao.isEmpty())
            throw new ExceptionGeneric("APRESENTACAO INEXISTENTE NA BASE DE DADOS", "APRESENTACAO INEXISTENTE NA BASE DE DADOS", HttpStatus.BAD_REQUEST.value());
        return APRESENTACOES.get(apresentacao.map(ApresentacaoModel::getNome).map(String::toUpperCase).get()) / LIMITE_PROFESSORES;
    }

    private boolean existsSameAvaliacaoWithProfessor(UUID apresentacaoId,UUID professorId) {
        return avaliacaoRepository.countByApresentacaoAndProfessor(apresentacaoId, professorId) > 0;
    }

    private boolean existsForeing(UUID apresentacaoId, UUID professorId) {
        return(apresentacaoRepository.existsById(apresentacaoId) || professorRepository.existsById(professorId));
    }

    private boolean existsAvaliacao(UUID avaliacaoId) {
        return avaliacaoRepository.existsById(avaliacaoId);
    }
}
