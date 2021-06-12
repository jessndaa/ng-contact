import { Injectable } from '@angular/core';
import { ScreenModel} from '../models/incident.models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IncidentviewComponent } from './incidentview/incidentview.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactModel } from '../models/contact.model';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { DialogContent } from './dialog_type';

@Injectable({
  providedIn: 'root'
})
export class SimpleDialog {

  constructor(private dialog: MatDialog) { }
  showDialog(data?: DialogContent): MatDialogRef<SimpleDialogComponent> {
    return this.dialog.open(SimpleDialogComponent, {
      width: '350px',
      data
    });
  }
}
