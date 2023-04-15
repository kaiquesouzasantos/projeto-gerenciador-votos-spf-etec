package gerenciador_notas_spf.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerException {
    @ExceptionHandler({ExceptionGeneric.class})
    public ResponseEntity<ResponseBody> returnException(ExceptionGeneric exception){
        return ResponseEntity.status(exception.getCorpoResposta().getStatus()).body(exception.getCorpoResposta());
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ResponseBody> returnException(MethodArgumentNotValidException exception){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseBody(
                        exception.getClass().getSimpleName(),
                        "INFORMAÇÕES INCOMPATIVIES COM O ESPERADO",
                        404
                )
        );
    }
}