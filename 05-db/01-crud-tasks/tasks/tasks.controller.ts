import {Controller, Get, Post, Patch, Delete, Body, Param, HttpException, HttpStatus, Query} from "@nestjs/common";
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {Task} from "./entities/task.entity";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {TaskQueryDto} from "./dto/task-query.dto";

@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(createTaskDto);
    }

    @Get()
    async findAll(@Query() params: TaskQueryDto): Promise<Task[]> {
        return this.tasksService.findAll(params);
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<Task> {
        const task = await this.tasksService.findOne(id);
        if (!task) {
            throw new HttpException(`task with id:${id} not found`, HttpStatus.NOT_FOUND);
        }
        return task;
    }

    @Patch(":id")
    async update(@Param("id") id: number, @Body() updateTaskDto: UpdateTaskDto) {
        const updateResult = await this.tasksService.update(id, updateTaskDto);
        if (!updateResult) {
            throw new HttpException(`task with id:${id} not found`, HttpStatus.NOT_FOUND);
        }
        return updateResult;
    }

    @Delete(":id")
    async remove(@Param('id') id: number) {
        const removeRes = await this.tasksService.remove(id);
        if (!removeRes) {
            throw new HttpException(`task with id:${id} not found`, HttpStatus.NOT_FOUND);
        }
        return {
            "message": "Task deleted successfully"
        }
    }
}
