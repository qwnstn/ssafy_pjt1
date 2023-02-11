package e101.hishop.jwt;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Base64;

@RunWith(SpringRunner.class)
@SpringBootTest
@Slf4j
public class JwtDecodeTest {

    @Test
    public void decode() throws JSONException {

        String token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEyMzQhIiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VyLWlkIjo1LCJpc3MiOiJodHRwOi8vaGltYXJ0LnNob3AvYXBpL2xvZ2luIiwiZXhwIjoxNjc1NDIyNjQ1fQ.1cRqjP_8pP1kZrgFU8Ut4ULvIpWd4D5X-yT3QuTONeg";
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        JSONObject header = new JSONObject(new String(decoder.decode(chunks[0])));
        JSONObject payload = new JSONObject(new String(decoder.decode(chunks[1])));
        System.out.println(header);
        System.out.println(payload);
//        List<String> roles = (List<String>) payload.get("roles");
        JSONArray roles1 = payload.getJSONArray("roles");
        String a = roles1.get(0).toString();
        for (Object o:
             roles1) {
            System.out.println(o);
            
        }
        System.out.println(a);
//        System.out.println(roles);
//        System.out.println(authorities);
//        System.out.println(authorities.toString());
    }
}
