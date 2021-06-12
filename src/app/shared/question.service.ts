import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../states/app.state';
import { QuestionModel } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  page = 'questionfiche';
  constructor(private http: HttpClient) { }

  getQuestion() {
    return this.http.get<QuestionModel[]>( `${AppState.apibaseurl}${this.page}`);
  }

  postQuestion(data: QuestionModel) {
    return this.http.post( `${AppState.apibaseurl}${this.page}`, data).toPromise();
  }
  getReponseByUser(CodeQuestion: any,idIncidentVsgb: any)
  {
    return this.http.get<any[]>( `${AppState.apibaseurl}affichequestion/?CodeQuestion=${CodeQuestion}&&idIncidentVsgb=${idIncidentVsgb}`);
  }
}
