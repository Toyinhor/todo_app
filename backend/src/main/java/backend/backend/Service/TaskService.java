package backend.backend.Service;

import backend.backend.DTO.TaskDTO;
import backend.backend.Entity.TaskEntity;
import backend.backend.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;

    private TaskDTO toDTO(TaskEntity task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setSummary(task.getSummary());
        dto.setStatus(task.getStatus());
        dto.setUserId(task.getUserId());
        return dto;
    }

    public List<TaskDTO> getAllTaskByUserId(Integer userId) {
        List<TaskEntity> list = taskRepository.findAll();
        List<TaskDTO> dtoList = new ArrayList<>();
        for (TaskEntity task : list) {
            if (task.getUserId().equals(userId)) {
                dtoList.add(toDTO(task));
            }
        }

        return dtoList;
    }

    public List<TaskDTO> findAllTask(){
        List<TaskEntity> list = taskRepository.findAll();
        List<TaskDTO> dtoList = new ArrayList<>();
        for (TaskEntity task : list) {
            dtoList.add(toDTO(task));
        }
        return dtoList;
    }

    public Optional<TaskDTO> createTask(TaskDTO dto) {
        TaskEntity task = new TaskEntity();
        task.setTitle(dto.getTitle());
        task.setSummary(dto.getSummary());
        task.setStatus(dto.getStatus());
        task.setUserId(dto.getUserId());

        return Optional.of(toDTO(taskRepository.save(task)));
    }

    public Optional<TaskDTO> updateTask(Integer id, TaskDTO dto) {
        TaskEntity task = taskRepository.findById(id).get();
        task.setTitle(dto.getTitle());
        task.setSummary(dto.getSummary());
        task.setStatus(dto.getStatus());
        task.setUserId(dto.getUserId());
        return Optional.of(toDTO(taskRepository.save(task)));
    }

   public boolean deleteTask(Integer id) {
        TaskEntity task = taskRepository.findById(id).get();
        taskRepository.delete(task);
        return true;
   }

   public void statusUpdate(Integer id){
        TaskEntity task = taskRepository.findById(id).get();
        if (task.getStatus().equals("in-progress")) {
            task.setStatus("done");
        } else if (task.getStatus().equals("done")) {
            task.setStatus("in-progress");
        }
   }

}
