package gerenciador_notas_spf.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class AvaliacaoDTO {
    @NotEmpty @NotEmpty
    private String avaliacao;

    @NotNull @Min(0) @Max(5000)
    private Double nota;

    @NotNull
    private UUID apresentacao;

    @NotNull
    private UUID professor;
}
