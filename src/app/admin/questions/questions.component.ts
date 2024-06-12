import { Component } from '@angular/core';
import { Question } from '../../models/question.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionsService } from '../../services/questions.service';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  questions: Question[] = [];
  newQuestion: string = '';
  find: string = '';
  personQuestions: Question = new Question();
  allPeople: Person[] = [];
  block: boolean = false;

  constructor(
    private service: QuestionsService,
    private peopleService: PeopleService
  ) {

  }

  ngOnInit() {
    this.refreshTable();
    this.peopleService.getAll().subscribe((people: Person[]) => {
      people.sort((a, b) => (a.name < b.name) ? -1 : 1);
      this.allPeople = people;
    });
  }

  refreshTable() {
    this.block = false;
    this.newQuestion = '';
    this.find = '';
    this.questions = [];
    this.personQuestions = new Question();
    this.service.getAll().subscribe((questions: Question[]) => {
      this.questions = questions;
    });
  }

  filteredQuestion() {
    if (!this.find) {
      return this.questions;
    }

    const regex = new RegExp(this.find, 'i');
    return this.questions.filter(question => question.question.match(regex));
  }

  hasPerson(person: Person): boolean {
    return this.personQuestions.people.some((thisPerson: any) => thisPerson.id === person.id);
  }

  togglePersonSelection(person: any) {
    this.block = true;
    const index = this.personQuestions.people.findIndex((thisPerson: any) => thisPerson.id === person.id);
    if (index > -1) {
      this.personQuestions.people.splice(index, 1);
    } else {
      this.personQuestions.people.push(person);
    }
  }

  save(question: Question) {
    this.service.update(question).subscribe(() => {
      this.refreshTable();
    });
  }

  saveNew() {
    this.service.insert(this.newQuestion).subscribe(() => {
      this.refreshTable();
    });
  }

  savePersons() {
    this.block = false;
    if (this.personQuestions.id) {
      this.save(this.personQuestions);
    }
  }

  getPersons(question: Question) {
    if (!this.block) {
      this.personQuestions = new Question();
      this.personQuestions = question;
    }
  }

  delete(id: number) {
    if (confirm(`Tem certeza que deseja apagar a pergunta de ID ${id}?`)) {
      this.service.delete(id).subscribe(() => {
        this.refreshTable();
      });
    }
  }
}
