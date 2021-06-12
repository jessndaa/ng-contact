import { Injectable } from '@angular/core';
import { ScreenModel} from '../models/incident.models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IncidentviewComponent } from './incidentview/incidentview.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class EditContactDialog {

  constructor(private dialog: MatDialog) { }
  showDialog(data?: ContactModel): MatDialogRef<EditContactComponent> {
    return this.dialog.open(EditContactComponent, {
      width: '400px',
      data
    });
  }
}
