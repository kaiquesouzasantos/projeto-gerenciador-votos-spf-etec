package gerenciador_notas_spf.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "avaliacao")
public class AvaliacaoModel {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String avaliacao;
    private Double nota;

    private UUID apresentacao;
    private UUID professor;
}
