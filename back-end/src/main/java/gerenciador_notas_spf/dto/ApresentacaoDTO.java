package gerenciador_notas_spf.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.UUID;

@Data
public class ApresentacaoDTO {
    @NotEmpty
    private String nome;

    @NotNull
    private UUID sala;
}
