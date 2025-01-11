import {PartialType} from "@nestjs/mapped-types";
import {CreateTaskDto} from "./create-task.dto";
import {IsBoolean, IsOptional, IsString} from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
    @IsOptional()
    @IsBoolean()
    isCompleted: boolean;
}
