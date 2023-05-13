package gerenciador_notas_spf.controller;

import gerenciador_notas_spf.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    @Value("${role.professor.password}") private String professorPassword;

    private final ProfessorService professorService;

    @GetMapping("")
    public ResponseEntity<String> findAuth(@RequestParam String email, @RequestParam String senha) {
        if(professorService.existsProfessorWithEmailAndPassword(email, senha))
            return ResponseEntity.status(HttpStatus.OK).body("{'username':'professor','password':'"+professorPassword+"'}");
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("{}");
    }
}