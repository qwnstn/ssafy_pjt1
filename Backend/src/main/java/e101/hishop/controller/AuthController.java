package e101.hishop.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import e101.hishop.domain.dto.request.SignUpReqDto;
import e101.hishop.domain.entity.User;
import e101.hishop.global.common.CommonResponse;
import e101.hishop.repository.UserJPARepository;
import e101.hishop.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final UserJPARepository userJPARepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/sign-up")
    public CommonResponse signup(@RequestBody @Validated SignUpReqDto dto) {
        return CommonResponse.builder()
                .data(Map.of("userId", authService.signUp(dto.toUsersEntity())))
                .build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<String> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        log.info("RESRESH=============================");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refreshToken = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String logindId = decodedJWT.getSubject();
                List<String> roles = new ArrayList<>();
                User users = userJPARepository.findByLoginId(logindId).orElseThrow(() -> new EntityNotFoundException("Employee not found with id:" + logindId));
                roles.add(users.getRole().toString());
                String accessToken = JWT.create()
                        .withSubject(logindId)
                        .withExpiresAt(new Date(System.currentTimeMillis() + 1 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        //TODO 추후 User auth 객체로 변경
                        .withClaim("roles", roles)
                        .withClaim("user-id", users.getId())
                        .sign(algorithm);

                response.setHeader("access-token", accessToken);
                response.setHeader("refresh-token", refreshToken);
            } catch (Exception e) {
                //TODO 적합한 예외처리 클래스 구현
                log.error("Error login in: {} ", "refrsh fail");
                response.setHeader("error", "refresh fail");
                response.setStatus(HttpStatus.BAD_REQUEST.value());
            }
        } else {
            throw new RuntimeException("refresh token is missing");

        }
        return new ResponseEntity<>("발급완료", HttpStatus.OK);
    }
}