package com.enterprise.task_enterprise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

    public class TaskRequestDTO {

        @NotBlank(message = "O título não pode estar em branco")
        @Size(min = 3, max = 100, message = "O título deve ter entre 3 e 100 caracteres")
        private String title;

        private String description;

        // Construtores
        public TaskRequestDTO() {}

        // Getters e Setters
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

