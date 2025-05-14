import { User } from "./user";

export interface Album extends User {
    userId?: number,
    id?: number,
    title?: string
}