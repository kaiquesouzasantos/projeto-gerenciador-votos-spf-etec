package gerenciador_notas_spf.service;

import gerenciador_notas_spf.model.ApresentacaoModel;
import gerenciador_notas_spf.model.RelatorioModel;
import gerenciador_notas_spf.model.SalaModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RelatorioService {
    public RelatorioModel getRelatorio(SalaModel sala, List<ApresentacaoModel> apresentacoes) {
        return new RelatorioModel(
                sala,
                this.getNota(apresentacoes),
                apresentacoes
        );
    }

    private Double getNota(List<ApresentacaoModel> apresentacoes) {
        return apresentacoes
                .stream()
                .map(ApresentacaoModel::getNota)
                .reduce(Double::sum)
                .orElse(0.00);
    }
}
