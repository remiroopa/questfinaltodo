import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediatorService {
  private baseUrl: string = 'https://finaltodo-production.up.railway.app';

  constructor(private http: HttpClient) {}

  // User registration
  save(params: any): Observable<any> {
    console.log("Saving user:", params);
    return this.http.post(`${this.baseUrl}/reg`, params);
  }

  // User login
  savelogin(params: any): Observable<any> {
    console.log("Logging in user:", params);
    return this.http.post(`${this.baseUrl}/log`, params);
  }

  // Set task ID for potential usage in other components
  taskid: any = "";
  setid(data: any) {
    this.taskid = data;
  }

  // Get task by ID
  getbyid(taskId: number): Observable<any> {
    console.log("Getting task by ID:", taskId);
    return this.http.get(`${this.baseUrl}/tasks/${taskId}/`);
  }

  // Get all tasks for a specific user
  getTasksByUserId(userId: number): Observable<any> {
    const headers = new HttpHeaders({ 'User-ID': userId.toString() });
    return this.http.get(`${this.baseUrl}/tasks`, { headers });
  }

  // Add a new task
  addTask(taskData: any): Observable<any> {
    const headers = new HttpHeaders({ 'User-ID': taskData.user1.toString() });
    return this.http.post(`${this.baseUrl}/tasks`, taskData, { headers });
  }

  // Update an existing task
  updateTask(taskId: string, taskData: any): Observable<any> {
    const headers = new HttpHeaders({ 'User-ID': taskData.user1.toString() });
    return this.http.put(`${this.baseUrl}/tasks/${taskId}`, taskData, { headers });
  }

  // Delete a task
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${taskId}`);
  }
}
