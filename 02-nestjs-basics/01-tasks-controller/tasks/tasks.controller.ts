import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get, NotFoundException,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import {TasksService} from "./tasks.service";
import {Task, TaskStatus} from "./task.model";
import {TaskErrors} from "./task-status.enum";

@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Get(":id")
    getTaskById(@Param("id") id: string) {
        const document = this.tasksService.getTaskById(id);
        if (!document) {
            throw new NotFoundException(TaskErrors.TASK_NOT_FOUND);
        }
        return document;
    }

    @Post()
    createTask(@Body() task: Task) {
        this.validateTask(task);
        return this.tasksService.createTask(task);
    }

    @Patch(":id")
    updateTask(@Param("id") id: string, @Body() task: Task) {
        const document = this.tasksService.updateTask(id, task);
        if (!document) {
            throw new NotFoundException(TaskErrors.TASK_NOT_FOUND);
        }
        return document;
    }

    @Delete(":id")
    deleteTask(@Param("id") id: string) {
        return this.tasksService.deleteTask(id);
    }

    private validateTask(task: Task) {
        if (typeof task.title !== 'string' || task.title.trim() === '') {
            throw new BadRequestException(TaskErrors.TASK_TITLE_INCORRECT);
        }
        if (typeof task.description !== 'string' || task.description.trim() === '') {
            throw new BadRequestException(TaskErrors.TASK_DESCRIPTION_INCORRECT);
        }
        if (!Object.values(TaskStatus).includes(task.status as TaskStatus)) {
            throw new BadRequestException(TaskErrors.TASK_STATUS_INCORRECT);
        }
    }

}
