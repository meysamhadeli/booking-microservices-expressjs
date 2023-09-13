import {Role} from "../enums/role";
import {FindOptionsOrderValue} from "typeorm";

export class SearchDto {
  page: number = 1;
  pageSize: number = 10;
  orderBy?: string = "id";
  order?: FindOptionsOrderValue = "desc";
  searchTerm?: string;
}
