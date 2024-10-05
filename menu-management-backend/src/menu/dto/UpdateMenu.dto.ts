import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  depth?: number;

  @IsOptional()
  @IsString()
  parentId?: string; // Include if parentId is required for the update
}
