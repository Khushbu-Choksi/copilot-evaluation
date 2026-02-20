import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task.component';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch tasks.';
        this.isLoading = false;
      }
    });
  }
}
