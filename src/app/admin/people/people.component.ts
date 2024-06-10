import { Component } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private service: PeopleService) {
    this.get();
  }

  get() {
    this.service.getAll().subscribe((people: Person[]) => {
      this.people = people;
    });
  }

  save(person: Person) {
    console.log(person);
  }

  saveNew(){
    console.log(this.newName);
  }
}
