package gerenciador_notas_spf.controller;

import gerenciador_notas_spf.dto.SalaDTO;
import gerenciador_notas_spf.model.SalaModel;
import gerenciador_notas_spf.service.SalaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/sala")
@RequiredArgsConstructor
public class SalaController {
    private final SalaService salaService;

    @PostMapping("/save")
    public ResponseEntity<SalaModel> save(@RequestBody @Valid SalaDTO sala) {
        return ResponseEntity.status(HttpStatus.CREATED).body(salaService.save(sala));
    }

    @GetMapping("")
    public ResponseEntity<SalaModel> findById(@RequestParam UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(salaService.findById(id));
    }

    @DeleteMapping("")
    public ResponseEntity<Void> delete(@RequestParam UUID id) {
        salaService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @GetMapping("/all")
    public ResponseEntity<List<SalaModel>> listAll() {
        return ResponseEntity.status(HttpStatus.OK).body(salaService.listAll());
    }
}