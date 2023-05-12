package gerenciador_notas_spf.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    @Value("${role.admin.password}") private String adminPassword;
    @Value("${role.professor.password}") private String professorPassword;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic(withDefaults())
                .authorizeHttpRequests(
                        authorize ->
                                authorize
                                        .requestMatchers(
                                                "/professor", "/professor/**", "/apresentacao", "/apresentacao/**",
                                                "/avaliacao", "/avaliacao/**"
                                        ).hasAnyRole("ADMIN", "PROFESSOR")
                                        .requestMatchers("/professor/save").hasAnyRole("ADMIN")
                                        .requestMatchers("/relatorio", "/relatorio/classificacao", "/sala", "/sala/**", "/professor/auth", "/apresentacao/limites").permitAll()
                                        .anyRequest().authenticated()
                )
                .headers().frameOptions().disable().and()
                .cors().disable()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
        configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/swagger-ui/**", "/v3/api-docs/**");
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsManager(
                User.builder().username("admin").password("{noop}"+adminPassword).roles("ADMIN").build(),
                User.builder().username("professor").password("{noop}"+professorPassword).roles("PROFESSOR").build()
        );
    }
}
