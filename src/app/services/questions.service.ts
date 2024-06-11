import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(environment.uri + environment.questions);
  }

  insert(question: string): Observable<any> {
    return this.http.post(environment.uri + environment.questions, {
      question: question
    });
  }

  update(question: Question): Observable<any> {
    return this.http.put(environment.uri + environment.questions + `/${question.id}`, {
      question: question.question,
      people: question.people.map((person: any) => person.id)
    });
  }

  delete(id: number) {
    return this.http.delete(environment.uri + environment.questions + `/${id}`);
  }
}
