package gerenciador_notas_spf.controller;

import gerenciador_notas_spf.dto.ApresentacaoDTO;
import gerenciador_notas_spf.model.ApresentacaoModel;
import gerenciador_notas_spf.service.ApresentacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/apresentacao")
@RequiredArgsConstructor
public class ApresentacaoController {
    private final ApresentacaoService apresentacaoService;

    @PostMapping("/save")
    public ResponseEntity<ApresentacaoModel> save(@RequestBody @Valid ApresentacaoDTO apresentacao) {
        return ResponseEntity.status(HttpStatus.CREATED).body(apresentacaoService.save(apresentacao));
    }

    @PutMapping("")
    public ResponseEntity<ApresentacaoModel> save(@RequestBody ApresentacaoModel apresentacao) {
        return ResponseEntity.status(HttpStatus.OK).body(apresentacaoService.update(apresentacao));
    }

    @GetMapping("")
    public ResponseEntity<ApresentacaoModel> findById(@RequestParam UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(apresentacaoService.findById(id));
    }

    @DeleteMapping("")
    public ResponseEntity<Void> delete(@RequestParam UUID id) {
        apresentacaoService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @GetMapping("/limites")
    public ResponseEntity<Map<String, Double>> listApresentacoesLimitadas() {
        return ResponseEntity.status(HttpStatus.OK).body(apresentacaoService.listApresentacaoLimitada());
    }

    @GetMapping("/all")
    public ResponseEntity<List<ApresentacaoModel>> listAll(@RequestParam(required = false) boolean full) {
        if(full)
            return ResponseEntity.status(HttpStatus.OK).body(apresentacaoService.listAllFull());

        return ResponseEntity.status(HttpStatus.OK).body(apresentacaoService.listAll());
    }
}