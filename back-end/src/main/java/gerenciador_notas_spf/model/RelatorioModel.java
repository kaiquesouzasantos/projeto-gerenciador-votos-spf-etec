package gerenciador_notas_spf.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RelatorioModel {
    private SalaModel sala;
    private Double nota;
    private List<ApresentacaoModel> apresentacoes;
}
