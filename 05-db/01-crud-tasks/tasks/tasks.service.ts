import {Injectable} from "@nestjs/common";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./entities/task.entity";
import {Repository, UpdateResult, DeleteResult} from "typeorm";
import {TaskQueryDto} from "./dto/task-query.dto";

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {
    }

    async create(createTaskDto: CreateTaskDto) {
        return this.taskRepository.save(createTaskDto);
    }

    async findAll({limit = 10, page = 1}: TaskQueryDto) {
        let start = (page - 1) * limit;
        return this.taskRepository.find({
            skip: start,
            take: limit
        });
    }

    async findOne(id: number) {
        return this.taskRepository.findOne({where: {id}});
    }

    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<null | Task> {
        const {affected}: UpdateResult = await this.taskRepository.update(id, updateTaskDto);
        if (!affected) {
            return null;
        }
        return this.findOne(id);
    }

    async remove(id: number): Promise<number> {
        const {affected}: DeleteResult = await this.taskRepository.delete(id);
        return affected;
    }
}
