package com.example.demo.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.iamneo.ecom.config.JwtAuthenticationFilter;
import com.iamneo.ecom.constant.Api;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	  @Bean
      public CorsConfigurationSource corsConfigurationSource() {
              CorsConfiguration configuration = new CorsConfiguration();
              configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
              configuration.setAllowCredentials(true);
              configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
              configuration.setAllowedOrigins(Arrays.asList(Api.REACT));
              UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
              source.registerCorsConfiguration("/**", configuration);
              return source;
      }
}
