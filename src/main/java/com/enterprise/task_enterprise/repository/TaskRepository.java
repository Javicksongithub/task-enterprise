package com.enterprise.task_enterprise.repository;

import com.enterprise.task_enterprise.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TaskRepository  extends JpaRepository<Task,Long> {

    //

}
