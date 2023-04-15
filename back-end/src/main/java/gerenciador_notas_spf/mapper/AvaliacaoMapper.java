package gerenciador_notas_spf.mapper;

import gerenciador_notas_spf.dto.AvaliacaoDTO;
import gerenciador_notas_spf.model.AvaliacaoModel;
import org.springframework.beans.BeanUtils;

public class AvaliacaoMapper {
    public AvaliacaoModel toMapper(AvaliacaoDTO objetoEntrada){
        AvaliacaoModel objetoSaida = new AvaliacaoModel();
        BeanUtils.copyProperties(objetoEntrada, objetoSaida);
        return objetoSaida;
    }
}
