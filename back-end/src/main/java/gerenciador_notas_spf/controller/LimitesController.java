package gerenciador_notas_spf.controller;

import gerenciador_notas_spf.service.ApresentacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/limites")
@RequiredArgsConstructor
public class LimitesController {
    private final ApresentacaoService apresentacaoService;

    @GetMapping("")
    public ResponseEntity<Map<String, Double>> listApresentacoesLimitadas() {
        return ResponseEntity.status(HttpStatus.OK).body(apresentacaoService.listApresentacaoLimitada());
    }
}