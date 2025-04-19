package backend.backend.Controller;

import backend.backend.DTO.TaskDTO;
import backend.backend.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("task")
public class TaskController {
    @Autowired
    TaskService taskService;

    @GetMapping()
    public List<TaskDTO> getAllTasks() {
        return taskService.findAllTask();
    }

    @GetMapping("/user/{userId}")
    public List<TaskDTO> getTasksByUserId(@PathVariable Integer userId) {
        return taskService.getAllTaskByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO dto) {
        Optional<TaskDTO> created = taskService.createTask(dto);
        return created.map(ResponseEntity::ok).orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Integer id, @RequestBody TaskDTO dto) {
        Optional<TaskDTO> updated = taskService.updateTask(id, dto);
        return updated.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        boolean deleted = taskService.deleteTask(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("status/{id}")
    public ResponseEntity<?> statusUpdate(@PathVariable Integer id) {
        taskService.statusUpdate(id);
        return ResponseEntity.ok("updated status");
    }
}
