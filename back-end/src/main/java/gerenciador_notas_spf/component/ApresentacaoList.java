package gerenciador_notas_spf.component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApresentacaoList {
    private static final int PROFESSORES = 3;
    private static final Map<String, Double> APRESENTACOES = Map.of(
            // NOME_APRESENTACAO, LIMITE_PONTUACAO
            "GRITO DE GUERRA", 2000.0,
            "SOSIA/PARODIA", 3500.0,
            "PAINEL", 3500.0,
            "SHOW DE TALENTOS", 5000.0
    );

    public static Map<String, Double> getMapApresentacoes() {
        return APRESENTACOES;
    }

    public static List<String> getListApresentacoes() {
        return APRESENTACOES.keySet().stream().toList();
    }

    public static Map<String, Double> getMapApresentacoesLimitadas() {
        Map<String, Double> apresentacoesLimitadas = new HashMap<>();

        APRESENTACOES.forEach(
                (chave, valor) -> apresentacoesLimitadas.put(chave, valor /= PROFESSORES)
        );

        return apresentacoesLimitadas;
    }
}
