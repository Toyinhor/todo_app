package backend.backend.DTO;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;
import java.time.Instant;

@Data
public class TaskDTO implements Serializable {
    private Integer id;
    private String title;
    private String summary;
    private String status;
    private Integer userId;
    private Instant createdAt;
}
