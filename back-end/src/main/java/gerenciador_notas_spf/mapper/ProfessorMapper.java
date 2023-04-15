package gerenciador_notas_spf.mapper;

import gerenciador_notas_spf.dto.ProfessorDTO;
import gerenciador_notas_spf.model.ProfessorModel;
import org.springframework.beans.BeanUtils;

public class ProfessorMapper {
    public ProfessorModel toMapper(ProfessorDTO objetoEntrada){
        ProfessorModel objetoSaida = new ProfessorModel();
        BeanUtils.copyProperties(objetoEntrada, objetoSaida);
        return objetoSaida;
    }
}