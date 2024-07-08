import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(environment.uri + environment.people);
  }

  getPerson(id: number): Observable<any>{
    return this.http.get(environment.uri + environment.people + `/${id}`);
  }

  insert(name: string): Observable<any>{
    return this.http.post(environment.uri + environment.people, {
      name: name
    });
  }

  update(person: Person): Observable<any>{
    return this.http.put(environment.uri + environment.people + `/${person.id}`, {
      name: person.name,
      questionIds: person.questions.map((question: any) => question.id)
    });
  }

  delete(id: number){
    return this.http.delete(environment.uri + environment.people + `/${id}`);
  }
}
