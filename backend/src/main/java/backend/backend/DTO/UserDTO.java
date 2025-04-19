package backend.backend.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.Instant;
@Data
public class UserDTO implements Serializable {
    private Integer id;
    private String username;
    private String email;
    private String password;
    private Instant createdAt;
}
