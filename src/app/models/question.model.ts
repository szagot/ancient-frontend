export class Question {
    id: number;
    question: string;
    people: Array<number>;
    
    constructor(id: number, question: string){
        this.id = id;
        this.question = question;
        this.people = [];
    }

}
