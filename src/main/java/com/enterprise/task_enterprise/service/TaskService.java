package com.enterprise.task_enterprise.service;
import com.enterprise.task_enterprise.dto.TaskRequestDTO;
import com.enterprise.task_enterprise.dto.TaskResponseDTO;
import com.enterprise.task_enterprise.model.Task;
import com.enterprise.task_enterprise.repository.TaskRepository;
import com.enterprise.task_enterprise.service.TaskService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {


    private final TaskRepository taskRepository;

    // Injeção de dependencias via construto (padrão recomendado no Spring)
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;

    }

    public List<TaskResponseDTO> findAll() {
        return taskRepository.findAll().stream().map(TaskResponseDTO::new).collect(Collectors.toList());
    }


    public TaskResponseDTO findById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com o ID: " + id));
        return new TaskResponseDTO(task);
    }


    public TaskResponseDTO create(TaskRequestDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());

        Task savedTask = taskRepository.save(task);
        return new TaskResponseDTO(savedTask);
    }

    public TaskResponseDTO toggleCompleted(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com o ID:" + id));

        task.setCompleted(!task.isCompleted());
        Task updatedTask = taskRepository.save(task);
        return new TaskResponseDTO(updatedTask);
    }

    public void delete(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Tarefa não encontrada para eexlusão");
        }
        taskRepository.deleteById(id);
    }

}



