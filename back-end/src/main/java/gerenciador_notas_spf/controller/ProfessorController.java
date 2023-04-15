package gerenciador_notas_spf.controller;

import gerenciador_notas_spf.dto.ProfessorDTO;
import gerenciador_notas_spf.model.ProfessorModel;
import gerenciador_notas_spf.service.ProfessorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/professor")
@RequiredArgsConstructor
public class ProfessorController {
    private final ProfessorService professorService;

    @PostMapping("/save")
    public ResponseEntity<ProfessorModel> save(@RequestBody @Valid ProfessorDTO professor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(professorService.save(professor));
    }

    @GetMapping("")
    public ResponseEntity<ProfessorModel> findById(@RequestParam UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(professorService.findById(id));
    }

    @GetMapping("/email")
    public ResponseEntity<ProfessorModel> findByEmail(@RequestParam String email) {
        return ResponseEntity.status(HttpStatus.OK).body(professorService.findByEmail(email));
    }

    @GetMapping("/auth")
    public ResponseEntity<String> findAuth(@RequestParam String email, @RequestParam String senha) {
        if(professorService.existsProfessorWithEmailAndPassword(email, senha))
            return ResponseEntity.status(HttpStatus.OK).body("{'username':'professor','password':'<senha>'}");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("{}");
    }

    @DeleteMapping("")
    public ResponseEntity<Void> delete(@RequestParam UUID id) {
        professorService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProfessorModel>> listAll() {
        return ResponseEntity.status(HttpStatus.OK).body(professorService.listAll());
    }
}