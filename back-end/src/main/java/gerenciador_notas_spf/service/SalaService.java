package gerenciador_notas_spf.service;

import gerenciador_notas_spf.dto.SalaDTO;
import gerenciador_notas_spf.exception.ExceptionGeneric;
import gerenciador_notas_spf.mapper.SalaMapper;
import gerenciador_notas_spf.model.SalaModel;
import gerenciador_notas_spf.repository.SalaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SalaService {
    private final SalaRepository salaRepository;

    @Transactional(rollbackOn = ExceptionGeneric.class)
    public SalaModel save(SalaDTO sala) {
        verifySameNome(sala);
        return salaRepository.save(new SalaMapper().toMapper(sala));
    }

    @Transactional(rollbackOn = ExceptionGeneric.class)
    public void delete(UUID id) {
        salaRepository.deleteById(id);
    }

    public List<SalaModel> listAll() {
        return salaRepository.findAll();
    }

    public SalaModel findById(UUID id) {
        return salaRepository.findById(id)
                .orElseThrow(() -> new ExceptionGeneric("SALA NO CONTENT", "SALA NOT FOUND", HttpStatus.NO_CONTENT.value()));
    }

    private void verifySameNome(SalaDTO sala) {
        if(this.existsSameSalaWithNome(sala.getNome()))
            throw new ExceptionGeneric("SALA JA EXISTENTE", "SALA JA EXISTENTE", HttpStatus.CONFLICT.value());
    }

    private boolean existsSameSalaWithNome(String nome) {
        return salaRepository.existsByNome(nome);
    }
}
