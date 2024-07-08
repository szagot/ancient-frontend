import { Question } from "./question.model";

export class Person {
    id: number = 0;
    name: string = '';
    questions: Question[] = [];
}
