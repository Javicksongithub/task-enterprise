package com.enterprise.task_enterprise.service;

import com.enterprise.task_enterprise.dto.TaskRequestDTO;
import com.enterprise.task_enterprise.dto.TaskResponseDTO;
import com.enterprise.task_enterprise.model.Task;
import com.enterprise.task_enterprise.repository.TaskRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;



    private AutoCloseable closeable;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        if (closeable != null) {
            closeable.close();
        }
    }

    @Test
    void shouldCreateTaskSuccessfully() {
        TaskRequestDTO request = new TaskRequestDTO();
        request.setTitle("Estudar Spring Boot");
        request.setDescription("Praticar arquitetura limpa");

        Task task = new Task();
        task.setId(1L);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());

        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskResponseDTO response = taskService.create(request);

        assertNotNull(response);
        assertEquals("Estudar Spring Boot", response.getTitle());
        verify(taskRepository, times(1)).save(any(Task.class));
    }
}