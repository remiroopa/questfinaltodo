import { Component, OnInit } from '@angular/core';
import { MediatorService } from '../mediator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  user1: number | null = null;
  task_name: string = '';
  task_description: string = '';
  status: number = 0;
  due_date: Date | null = null;
  reminder_time: Date | null = null;
  tasks: any[] = [];
  allTasks: any[] = [];
  currentTaskId: string = "";  // Updated to use currentTaskId

  constructor(
    private mediatorService: MediatorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('userId');
      this.user1 = userIdParam ? +userIdParam : null;
      this.getTasks();
    });
  }

  // Fetch tasks for the specific user
  getTasks() {
    if (this.user1) {
      this.mediatorService.getTasksByUserId(this.user1).subscribe(
        (resultData: any) => {
          this.allTasks = resultData;
          this.tasks = resultData;
          this.checkReminders();
        },
        error => console.error("Failed to fetch tasks:", error)
      );
    }
  }

  // Add a new task
  addTask() {
    if (this.user1) {
      let bodyData = {
        user1: this.user1,
        task_name: this.task_name,
        task_description: this.task_description,
        status: this.status,
        due_date: this.due_date,
        reminder_time: this.reminder_time
      };
      this.mediatorService.addTask(bodyData).subscribe(
        (res: any) => {
          alert("Task Added Successfully");
          this.getTasks();
          this.resetForm();
        },
        error => console.error("Failed to add task:", error)
      );
    }
  }

  // Reset the form fields
  resetForm(): void {
    this.task_name = '';
    this.task_description = '';
    this.status = 0;
    this.due_date = null;
    this.reminder_time = null;
    this.currentTaskId = "";  // Reset currentTaskId when form is reset
  }

  // Update an existing task
  updateTask() {
    if (this.currentTaskId && this.user1) {
      let bodyData = {
        task_name: this.task_name,
        task_description: this.task_description,
        status: this.status,
        due_date: this.due_date,
        reminder_time: this.reminder_time,
        user1: this.user1
      };
      this.mediatorService.updateTask(this.currentTaskId, bodyData).subscribe(
        (res: any) => {
          alert("Task Updated Successfully");
          this.getTasks();
          this.resetForm();
        },
        error => console.error("Failed to update task:", error)
      );
    }
  }

  // Delete a task
  deleteTask(taskId: number) {
    if (this.user1) {
      const confirmDelete = confirm("Are you sure you want to delete this task?");
      if (confirmDelete) {
        this.mediatorService.deleteTask(taskId).subscribe(
          (res: any) => {
            alert("Task Deleted Successfully");
            this.getTasks();
          },
          error => console.error("Failed to delete task:", error)
        );
      }
    }
  }

  // Set task data in the form for editing
  setUpdate(task: any) {
    this.task_name = task.task_name;
    this.task_description = task.task_description;
    this.status = task.status;
    this.due_date = task.due_date;
    this.reminder_time = task.reminder_time;
    this.currentTaskId = task.id;
  }

  // Filter and show all tasks
  showAllTasks() {
    this.tasks = this.allTasks;
  }

  // Filter and show only completed tasks
  showCompletedTasks() {
    this.tasks = this.allTasks.filter(task => task.status === 1);
  }

  // Filter and show only incomplete tasks
  showIncompleteTasks() {
    this.tasks = this.allTasks.filter(task => task.status === 0);
  }

  // Check for task reminders and display alerts
  checkReminders() {
    const now = new Date();
    this.tasks.forEach(task => {
      const reminderTime = new Date(task.reminder_time);
      if (reminderTime <= now) {
        alert(`Reminder: ${task.task_name}`);
      }
    });
  }
}
