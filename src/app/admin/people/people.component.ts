import { Component } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question } from '../../models/question.model';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
  people: Person[] = [];
  newName: string = '';
  find: string = '';
  personQuestions: any = {
    person: null,
    question: []
  };
  allQuestions: Question[] = [];
  block: boolean = false;

  constructor(
    private service: PeopleService,
    private questionService: QuestionsService
  ) { }

  ngOnInit() {
    this.refreshTable();
    this.questionService.getAll().subscribe((question: Question[]) => {
      this.allQuestions = question;
    });
  }

  refreshTable() {
    this.block = false;
    this.newName = '';
    this.find = '';
    this.people = [];
    this.personQuestions.person = null;
    this.personQuestions.questions = [];
    this.service.getAll().subscribe((people: Person[]) => {
      people.sort((a, b) => (a.name < b.name) ? -1 : 1);
      this.people = people;
    });
  }

  filteredPeople() {
    if (!this.find) {
      return this.people;
    }

    const regex = new RegExp(this.find, 'i');
    return this.people.filter(person => person.name.match(regex));
  }

  save(person: Person) {
    this.service.update(person).subscribe(() => { });
  }

  saveNew() {
    this.service.insert(this.newName).subscribe(() => {
      this.refreshTable();
    });
  }

  delete(id: number) {
    if (confirm(`Tem certeza que deseja apagar o personagem de ID ${id}?`)) {
      this.service.delete(id).subscribe(() => {
        this.refreshTable();
      });
    }
  }

  saveQuestions() {
    this.block = false;
    if (this.personQuestions.id) {
      this.save(this.personQuestions);
    }
  }

  getQuestions(person: Person) {
    if (!this.block) {
      this.personQuestions = new Person();
      this.personQuestions.id = person?.id || 0;
      this.personQuestions.name = person?.name || '';
      // Completa com personagens
      this.service.getPerson(person.id).subscribe((person: Person) => {
        this.personQuestions.questions = person?.questions || [];
      });
    }
  }

  hasQuestion(question: Question): boolean {
    return this.personQuestions?.questions?.some((thisQuestion: any) => thisQuestion.id === question.id) || false;
  }

  toggleQuestionSelection(question: Question) {
    this.block = true;
    const questions = this.personQuestions?.questions || [];
    const index = questions.findIndex((thisQuestion: Question) => thisQuestion.id == question.id);

    if (index > -1) {
      questions.splice(index, 1);
    } else {
      questions.push(question);
    }
  }

}
