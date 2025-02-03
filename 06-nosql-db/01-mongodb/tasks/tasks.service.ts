import {Injectable, NotFoundException} from "@nestjs/common";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Task} from "./schemas/task.schema";
import {Model, ObjectId} from "mongoose";

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private TaskModel: Model<Task>) {
    }

    create(createTaskDto: CreateTaskDto) {
        return this.TaskModel.create(createTaskDto);
    }

    async findAll() {
        return this.TaskModel.find();
    }

    async findOne(id: ObjectId) {
        const task = await this.TaskModel.findById(id).exec();
        if (!task) throw new NotFoundException("Task not found");
        return task;
    }

    async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
        const doc = await this.TaskModel
            .findByIdAndUpdate({_id: id}, updateTaskDto, {new: true})
            .exec();
        if (!doc) throw new NotFoundException("Task not found")
        return doc;
    }

    async remove(id: ObjectId) {
        const deletedTask = await this.TaskModel.findByIdAndDelete(id).exec();
        if (!deletedTask) throw new NotFoundException("Task not found");
        return deletedTask;
    }
}
