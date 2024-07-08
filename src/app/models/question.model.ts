import { Person } from "./person.model";

export class Question {
    id: number = 0;
    question: string = '';
    characters: Person[] = [];
}
