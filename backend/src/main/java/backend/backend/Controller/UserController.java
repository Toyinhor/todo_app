package backend.backend.Controller;

import backend.backend.Config.JwtUtil;
import backend.backend.DTO.UserDTO;
import backend.backend.Entity.UserEntity;
import backend.backend.Service.CustomUserDetailService;
import backend.backend.Service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO dto) {
        userService.registerUser(dto);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        final UserDetails userDetails = customUserDetailService.loadUserByUsername(dto.getEmail());
        final String token = jwtUtil.generateToken(userDetails.getUsername());

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("/me")
    public UserEntity getUserInfo(@RequestBody TokenRequest token) {
        String tk = token.getToken();
        return userService.findUserByEmail(jwtUtil.extractUsername(tk));
    }

    public static class TokenRequest {
        private String token;

        // Getter + Setter
        public String getToken() {
            return token;
        }
        public void setToken(String token) {
            this.token = token;
        }
    }


    @Data
    @AllArgsConstructor
    class JwtResponse {
        private String token;
    }

}
