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
  find: string = '';

  constructor(private service: PeopleService) {
    this.refreshTable();
  }

  refreshTable() {
    this.newName = '';
    this.find = '';
    this.people = [];
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
    this.service.update(person).subscribe(() => {
      this.refreshTable();
    });
  }

  saveNew() {
    this.service.insert(this.newName).subscribe(() => {
      this.refreshTable();
    });
  }
}
