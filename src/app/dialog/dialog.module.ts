import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../design/material.design';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { YesNoComponent } from './yes-no/yes-no.component';
import { YesNoDialog } from './yes_no.dialog';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { EditContactDialog } from './edit_contact.dialog';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUseDialog } from './edit_user.dialog';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { SimpleDialog } from './simple.dialog';




@NgModule({
  declarations: [
    YesNoComponent,
    EditContactComponent,
    EditContactComponent,
    EditUserComponent,
    SimpleDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    YesNoComponent,
    EditContactComponent,
    EditContactComponent,
    SimpleDialogComponent
  ],
  providers: [SimpleDialog, YesNoDialog, EditContactDialog, EditUseDialog]
})
export class DialogModule { }
