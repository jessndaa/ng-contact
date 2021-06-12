import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IncidentService } from './incident.service';
import { QuestionService } from './question.service';
import { DashService } from './dash.service';
import { AppState } from '../states/app.state';
import { UserService } from './user.service';
import { ContactService } from './contact.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [ IncidentService, QuestionService, DashService, UserService, ContactService]
})
export class SharedModule { }
