package gerenciador_notas_spf.controller;

import gerenciador_notas_spf.exception.ExceptionGeneric;
import gerenciador_notas_spf.model.RelatorioModel;
import gerenciador_notas_spf.service.ApresentacaoService;
import gerenciador_notas_spf.service.RelatorioService;
import gerenciador_notas_spf.service.SalaService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/relatorio")
@RequiredArgsConstructor
public class RelatorioController {
    private final RelatorioService relatorioService;
    private final ApresentacaoService apresentacaoService;
    private final SalaService salaService;

    @GetMapping("")
    @Cacheable("relatorio")
    public ResponseEntity<RelatorioModel> findById(@RequestParam UUID salaId) {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(this.getRelatorio(salaId));
        } catch (RuntimeException e){
            throw new ExceptionGeneric("INFORMACOES INSUFICIENTES", "APRESENTACAO NOT FOUND, INFORMACOES INSUFICIENTES", HttpStatus.NO_CONTENT.value());
        }
    }

    private RelatorioModel getRelatorio(UUID salaId) {
        return relatorioService.getRelatorio(
                salaService.findById(salaId),
                apresentacaoService.listAllBySala(salaId)
        );
    }
}