package gerenciador_notas_spf.service;

import gerenciador_notas_spf.dto.ProfessorDTO;
import gerenciador_notas_spf.exception.ExceptionGeneric;
import gerenciador_notas_spf.mapper.ProfessorMapper;
import gerenciador_notas_spf.model.ProfessorModel;
import gerenciador_notas_spf.repository.ProfessorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfessorService {
    private final ProfessorRepository professorRepository;

    @Transactional(rollbackOn = ExceptionGeneric.class)
    public ProfessorModel save(ProfessorDTO professor) {
        if(this.existsSameProfessorWithNomeOrEmail(professor.getNome(), professor.getEmail()))
            throw new ExceptionGeneric("PROFESSOR JA EXISTENTE", "PROFESSOR JA EXISTENTE", HttpStatus.CONFLICT.value());

        return professorRepository.save(new ProfessorMapper().toMapper(professor));
    }

    public void delete(UUID id) {
        professorRepository.deleteById(id);
    }

    public List<ProfessorModel> listAll() {
        return professorRepository.findAll();
    }

    public ProfessorModel findById(UUID id) {
        return professorRepository.findById(id)
                .orElseThrow(() -> new ExceptionGeneric("PROFESSOR NO CONTENT", "PROFESSOR NOT FOUND", HttpStatus.NO_CONTENT.value()));
    }

    public ProfessorModel findByEmail(String email) {
        return professorRepository.findByEmail(email)
                .orElseThrow(() -> new ExceptionGeneric("PROFESSOR NO CONTENT", "PROFESSOR NOT FOUND", HttpStatus.NO_CONTENT.value()));
    }

    public boolean existsProfessorWithEmailAndPassword(String email, String senha) {
        return professorRepository.existsByEmailAndSenha(email, senha);
    }

    private boolean existsSameProfessorWithNomeOrEmail(String nome, String email) {
        return professorRepository.existsByNomeOrEmail(nome, email);
    }
}