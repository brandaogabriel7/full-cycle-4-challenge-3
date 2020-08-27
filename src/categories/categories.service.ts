import { Injectable } from "@nestjs/common";
import { Category } from "./dto/category.interface";

@Injectable()
export class CategoriesService {
    getAllCategories(): Category[] {
        return [{ name: 'This endpoint returns all categories'}];
    }
}