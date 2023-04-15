package gerenciador_notas_spf.mapper;

import gerenciador_notas_spf.dto.ApresentacaoDTO;
import gerenciador_notas_spf.model.ApresentacaoModel;
import org.springframework.beans.BeanUtils;

public class ApresentacaoMapper {
    public ApresentacaoModel toMapper(ApresentacaoDTO objetoEntrada){
        ApresentacaoModel objetoSaida = new ApresentacaoModel();
        BeanUtils.copyProperties(objetoEntrada, objetoSaida);
        return objetoSaida;
    }
}
