package gerenciador_notas_spf;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@OpenAPIDefinition(
        info = @Info(
                title = "Gerenciamento de Votos - SPF",
                version = "1.0.0",
                description = "Sistema de gerenciamento de votos em apresentacoes da Semana Paulo Freire.",
                // termsOfService = "",

                contact = @Contact(
                        name = "Kaique Souza Santos",
                        email = "kaiquesouzasantos905@gmail.com"
                ),

                license = @License(
                        name = "license",
                        url = ""
                )
        )
)

@EnableCaching
@SpringBootApplication
public class GerenciadorNotasSpfApplication {
    public static void main(String[] args) {
        SpringApplication.run(GerenciadorNotasSpfApplication.class, args);
    }
}