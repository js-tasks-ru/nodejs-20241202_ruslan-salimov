import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | null{
    const task = this.tasks.find((elem) => elem.id === id);
    if(!task){
      return null;
    }
    return task;
  }

  createTask(task: Task): Task {
    task["id"] = `id${Math.random().toString(16).slice(2)}`
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, update: Task): Task | null {
    let index = this.tasks.findIndex(item => item.id === id);
    if(index === -1){
      return null;
    }
    this.tasks[index] = {...this.tasks[index], ...update};
    return this.tasks[index];
  }

  deleteTask(id: string): Task {
    let index = this.tasks.findIndex(item => item.id === id);
    let elem = this.tasks[index];
    this.tasks.splice(index, 1);
    return elem;
  }
}
