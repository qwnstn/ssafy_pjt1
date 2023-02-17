package e101.hishop;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Base64;
import java.util.List;

@Configuration
public class AppConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    public static PasswordEncoder testPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static JSONObject jwtDecode(String token) throws JSONException {

        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        JSONObject header = new JSONObject(new String(decoder.decode(chunks[0])));
        JSONObject payload = new JSONObject(new String(decoder.decode(chunks[1])));
        return null;
    }
}