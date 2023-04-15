package gerenciador_notas_spf.service;

import gerenciador_notas_spf.dto.ApresentacaoDTO;
import gerenciador_notas_spf.exception.ExceptionGeneric;
import gerenciador_notas_spf.mapper.ApresentacaoMapper;
import gerenciador_notas_spf.model.ApresentacaoModel;
import gerenciador_notas_spf.model.AvaliacaoModel;
import gerenciador_notas_spf.repository.ApresentacaoRepository;
import gerenciador_notas_spf.repository.AvaliacaoRepository;
import gerenciador_notas_spf.repository.SalaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApresentacaoService {
    private final ApresentacaoRepository apresentacaoRepository;
    private final AvaliacaoRepository avaliacaoRepository;
    private final SalaRepository salaRepository;

    private static final List<String> APRESENTACOES = List.of("GRITO DE GUERRA", "SOSIA/PARODIA", "PAINEL", "SHOW DE TALENTOS");

    @Transactional(rollbackOn = ExceptionGeneric.class)
    public ApresentacaoModel save(ApresentacaoDTO apresentacao) {
        verifyNome(apresentacao);
        verifyForeign(apresentacao);
        verifySameApresentacao(apresentacao);
        verifiLimitApresentacao(apresentacao);

        return this.getFull(apresentacaoRepository.save(new ApresentacaoMapper().toMapper(apresentacao)));
    }

    public ApresentacaoModel update(ApresentacaoModel apresentacao) {
        if(!this.existsForeing(apresentacao.getSala()))
            throw new ExceptionGeneric("SALA INVALIDA", "SALA INVALIDA", HttpStatus.BAD_REQUEST.value());

        return this.getFull(apresentacaoRepository.save(this.findById(apresentacao.getId())));
    }

    @Transactional(rollbackOn = ExceptionGeneric.class)
    public void delete(UUID id) {
        apresentacaoRepository.deleteById(id);
    }

    public List<ApresentacaoModel> listAll() {
        return apresentacaoRepository.findAll();
    }
    public List<ApresentacaoModel> listAllFull() {
        return apresentacaoRepository.findAll().stream().map(this::getFull).collect(Collectors.toList());
    }

    public List<ApresentacaoModel> listAllBySala(UUID sala) {
        return apresentacaoRepository.findAllBySala(sala).stream().map(this::getFull).collect(Collectors.toList());
    }

    public ApresentacaoModel findById(UUID id) {
        return apresentacaoRepository.findById(id).map(this::getFull)
                .orElseThrow(() -> new ExceptionGeneric("APRESENTACAO NO CONTENT", "APRESENTACAO NOT FOUND", HttpStatus.NO_CONTENT.value()));
    }

    private ApresentacaoModel getFull(ApresentacaoModel apresentacao) {
        apresentacao.setAvaliacoes(
                avaliacaoRepository.findAllByApresentacao(apresentacao.getId())
                        .orElseThrow(() -> new ExceptionGeneric("AVALIACOES NO CONTENT", "AVALIACOES NOT FOUND", HttpStatus.NO_CONTENT.value()))
        );

        apresentacao.setNota(
                apresentacao.getAvaliacoes().stream().map(AvaliacaoModel::getNota).reduce(Double::sum).orElse(0.00)
        );

        return apresentacao;
    }

    private void verifyForeign(ApresentacaoDTO apresentacao) {
        if(!this.existsForeing(apresentacao.getSala()))
            throw new ExceptionGeneric("SALA INVALIDA", "SALA INVALIDA", HttpStatus.BAD_REQUEST.value());
    }

    private void verifyNome(ApresentacaoDTO apresentacao) {
        if(!APRESENTACOES.contains(apresentacao.getNome()))
            throw new ExceptionGeneric("APRESENTACAO INVALIDA", "APRESENTACAO INVALIDA", HttpStatus.BAD_REQUEST.value());
    }

    private void verifySameApresentacao(ApresentacaoDTO apresentacao) {
        if(this.existsSameApresentacaoWithNomeAndSala(apresentacao.getNome(), apresentacao.getSala()))
            throw new ExceptionGeneric("APRESENTACAO JA EXISTENTE", "APRESENTACAO JA EXISTENTE", HttpStatus.CONFLICT.value());
    }

    private void verifiLimitApresentacao(ApresentacaoDTO apresentacao) {
        if(this.listAllBySala(apresentacao.getSala()).size() > 4)
            throw new ExceptionGeneric("NUMERO DE APRESENTACOES EXCEDIDO", "NUMERO DE APRESENTACOES EXCEDIDO", HttpStatus.CONFLICT.value());
    }

    private boolean existsSameApresentacaoWithNomeAndSala(String nome, UUID salaId) {
        return apresentacaoRepository.existsByNomeAndSala(nome, salaId);
    }

    private boolean existsForeing(UUID salaId) {
        return salaRepository.existsById(salaId);
    }
}