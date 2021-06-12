import { Injectable } from '@angular/core';
import { ScreenModel} from '../models/incident.models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IncidentviewComponent } from './incidentview/incidentview.component';
import { YesNoComponent } from './yes-no/yes-no.component';
import { DialogContent, DialogResult } from './dialog_type';
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
