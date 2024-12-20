import {IsEnum, IsInt, IsOptional, Min} from "class-validator";
import {TaskStatus} from "./task.model";
import {Type} from "class-transformer";

export default class TasksQuery{

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number
}