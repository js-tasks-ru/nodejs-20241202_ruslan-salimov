import {Controller, Get, Query, UsePipes, ValidationPipe} from "@nestjs/common";
import {TasksService} from "./tasks.service";
import {TaskStatus} from "./task.model";
import TasksQuery from "./tasks.query";

@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Get()
    @UsePipes(new ValidationPipe({transform: true}))
    getTasks(
        @Query() params: TasksQuery
    ) {
        console.log(`page - ${params.page} - ${typeof params.page}`)
    return this.tasksService.getFilteredTasks(params);
    }
}
