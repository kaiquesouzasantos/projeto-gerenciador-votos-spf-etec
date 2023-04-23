package gerenciador_notas_spf.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "apresentacao")
public class ApresentacaoModel {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(unique = false)
    private String nome;
    private UUID sala;

    @Transient private Double nota;
    @Transient private List<AvaliacaoModel> avaliacoes;

    public ApresentacaoModel(String nome, UUID sala) {
        this.nome = nome;
        this.sala = sala;
    }
}