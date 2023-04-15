package gerenciador_notas_spf.mapper;

import gerenciador_notas_spf.dto.SalaDTO;
import gerenciador_notas_spf.model.SalaModel;
import org.springframework.beans.BeanUtils;

public class SalaMapper {
    public SalaModel toMapper(SalaDTO objetoEntrada){
        SalaModel objetoSaida = new SalaModel();
        BeanUtils.copyProperties(objetoEntrada, objetoSaida);
        return objetoSaida;
    }
}
