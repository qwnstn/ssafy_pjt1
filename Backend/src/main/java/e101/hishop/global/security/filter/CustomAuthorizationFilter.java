package e101.hishop.global.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().equals("/api/login") || request.getServletPath().equals("/api/refresh-token")) {
            filterChain.doFilter(request, response);
        } else {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                try {
                    String token = authorizationHeader.substring("Bearer ".length());
                    Algorithm algorithm = Algorithm.HMAC256("e101ssafy!@".getBytes());
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);

                    String username = decodedJWT.getSubject();
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

                    log.info("AUTHORIZATION======================== {}====={} ===", authorities, roles);

                    stream(roles).forEach(role -> {
                        authorities.add(new SimpleGrantedAuthority(role));
                    });
//                    authorities.add(new SimpleGrantedAuthority(claim));
                    log.info("AUTHORIZATION======================== {}", username);
                    log.info("AUTHORIZATION======================== {}", token);
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);
                } catch (JWTVerificationException e) {
//                    e.printStackTrace();
//                    log.error("=== {}", e.printStackTrace());
                    //TODO 적합한 예외처리 클래스 구현
                    log.error("Error login in: {} ", e.getMessage());
                    //header에 error 존재하면 login창으로 redirect
                    response.setHeader("error", e.getMessage());
                    response.setHeader("error-type", e.getClass().getSimpleName());
                    response.setStatus(HttpStatus.FORBIDDEN.value());
//                    response.sendError(HttpStatus.FORBIDDEN.value());

//                    Map<String, String> error = new HashMap<>();
//                    error.put("error", e.getMessage());
//                    response.setContentType(APPLICATION_JSON_VALUE);
//                    new ObjectMapper().writeValue(response.getOutputStream(), error);
                }
            }
            else{
                //TODO 인증안될때 거부기능으로 변경?
                filterChain.doFilter(request, response);

            }
        }
    }
}
