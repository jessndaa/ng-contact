import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '../models/user.model';
import { EditUserComponent } from './edit-user/edit-user.component';

@Injectable({
  providedIn: 'root'
})
export class EditUseDialog {

  constructor(private dialog: MatDialog) { }
  show(user: UserModel): MatDialogRef<EditUserComponent> {
    return  this.dialog.open(EditUserComponent, {
      width: '300px',
      data: user
    });
  }
}
