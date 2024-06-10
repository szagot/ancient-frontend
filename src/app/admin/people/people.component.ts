import { Component } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {

  constructor(private service: PeopleService){
    this.get();
  }

  get(){
    this.service.getAll().subscribe((peoples: Person[])=>{
      // TODO: começar dev
      console.log(peoples);
    });
  }
}
