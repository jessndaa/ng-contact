import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppState } from '../states/app.state';
import { UserService } from './user.service';
import { ContactService } from './contact.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [UserService, ContactService]
})
export class SharedModule { }
