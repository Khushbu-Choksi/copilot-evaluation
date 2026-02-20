import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

export interface Task {
  id: any;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  ngOnInit() {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.sortTasksByDueDate();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        alert('Failed to load tasks.');
      }
    });
  }
  @Input() tasks: Task[] = [];
  showForm = false;
  taskForm: FormGroup;
  showMessage = false;
  isLoading = false;
  errorMessage = '';
  editingTask: Task | null = null;
  dueDateSortAsc = true;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', Validators.required]
    }, { validators: this.priorityDueDateValidator });
  }
  sortByDueDate() {
    this.dueDateSortAsc = !this.dueDateSortAsc;
    this.sortTasksByDueDate();
  }

  sortTasksByDueDate() {
    this.tasks = [...this.tasks].sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return this.dueDateSortAsc ? dateA - dateB : dateB - dateA;
    });
  }

  // Custom validator: If due date is within 7 days, priority must be High
  priorityDueDateValidator(form: FormGroup) {
    const dueDate = form.get('dueDate')?.value;
    const priority = form.get('priority')?.value;
    if (dueDate && priority) {
      const due = new Date(dueDate);
      const now = new Date();
      // Zero out time for accurate day comparison
      due.setHours(0,0,0,0);
      now.setHours(0,0,0,0);
      const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      if (diff >= 0 && diff <= 7 && priority !== 'High') {
        return { priorityDueDate: true };
      }
    }
    return null;
  }

  onAddTaskClick() {
    this.showForm = true;
    this.showMessage = false;
    this.editingTask = null;
    this.taskForm.reset();
  }

  onSubmitTask() {
    if (this.taskForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      if (this.editingTask && this.editingTask.id != null) {
        // Edit mode
        const updatedTask: Task = {
          ...this.taskForm.value,
          createdAt: this.editingTask.createdAt,
          id: this.editingTask.id
        };
        this.taskService.updateTask(updatedTask, this.editingTask.id).subscribe({
          next: (result) => {
            this.tasks = this.tasks.map(t => t.id === result.id ? result : t);
            this.sortTasksByDueDate();
            this.showForm = false;
            this.showMessage = true;
            this.taskForm.reset();
            this.editingTask = null;
            this.isLoading = false;
            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          },
          error: (err) => {
            this.isLoading = false;
            alert('Failed to update task.');
          }
        });
      } else {
        // Add mode
        const newTask: Task = {
          ...this.taskForm.value,
          createdAt: new Date().toISOString()
        };
        this.taskService.createTask(newTask).subscribe({
          next: (createdTask) => {
            this.tasks = [...this.tasks, createdTask];
            this.sortTasksByDueDate();
            this.showForm = false;
            this.showMessage = true;
            this.taskForm.reset();
            this.isLoading = false;
            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          },
          error: (err) => {
            this.isLoading = false;
            alert('Failed to add task.');
          }
        });
      }
    } else {
      this.taskForm.markAllAsTouched();
      if (this.taskForm.errors?.['priorityDueDate']) {
        this.errorMessage = 'If due date is within 7 days, priority must be High.';
      } else {
        this.errorMessage = '';
      }
    }
  }

  onEditTask(task: Task) {
    this.showForm = true;
    this.editingTask = task;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
    });
  }

  onReorderTasks(updatedTasks: Task[]) {
    this.tasks = updatedTasks;
  }
}

