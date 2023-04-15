package gerenciador_notas_spf.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SalaDTO {
    @NotEmpty @NotEmpty
    private String nome;
}
