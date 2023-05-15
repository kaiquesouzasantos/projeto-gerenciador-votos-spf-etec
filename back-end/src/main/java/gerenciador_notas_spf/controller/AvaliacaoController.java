package gerenciador_notas_spf.controller;

import gerenciador_notas_spf.dto.AvaliacaoDTO;
import gerenciador_notas_spf.model.AvaliacaoModel;
import gerenciador_notas_spf.service.AvaliacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/avaliacao")
@RequiredArgsConstructor
public class AvaliacaoController {
    private final AvaliacaoService avaliacaoService;

    @PostMapping("/save")
    @CacheEvict(value = "relatorio", allEntries = true)
    public ResponseEntity<AvaliacaoModel> save(@RequestBody @Valid AvaliacaoDTO avaliacao) {
        return ResponseEntity.status(HttpStatus.CREATED).body(avaliacaoService.save(avaliacao));
    }

    @PutMapping("")
    @CacheEvict(value = "relatorio", allEntries = true)
    public ResponseEntity<AvaliacaoModel> update(@RequestBody AvaliacaoModel avaliacao) {
        return ResponseEntity.status(HttpStatus.CREATED).body(avaliacaoService.update(avaliacao));
    }

    @DeleteMapping("")
    @CacheEvict(value = "relatorio", allEntries = true)
    public ResponseEntity<Void> delete(@RequestParam UUID id) {
        avaliacaoService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
    
    @GetMapping("")
    public ResponseEntity<AvaliacaoModel> findById(@RequestParam UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(avaliacaoService.findById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<AvaliacaoModel>> listAll() {
        return ResponseEntity.status(HttpStatus.OK).body(avaliacaoService.listAll());
    }
}
