package gerenciador_notas_spf.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ExceptionGeneric extends RuntimeException {
    private final String title, message;
    private final int status;

    public ResponseBody getCorpoResposta(){
        return new ResponseBody(title, message, status);
    }
}