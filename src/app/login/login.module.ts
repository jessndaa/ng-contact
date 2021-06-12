import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { DesignModule } from '../design/design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from '../dialog/dialog.module';

const routes: Routes = [{ path: '', component: LoginComponent }];


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    DesignModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers:[]
})
export class LoginModule { }
