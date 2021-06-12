import { Injectable } from '@angular/core';
import { ScreenModel} from '../models/incident.models';
import { MatDialog } from '@angular/material/dialog';
import { IncidentviewComponent } from './incidentview/incidentview.component';

@Injectable({
  providedIn: 'root'
})
export class IncidentviewDialog {

  constructor(private dialog: MatDialog) { }
  showDialog(data?: ScreenModel) {
    this.dialog.open(IncidentviewComponent, {
      width: '400px',
      data
    });
  }
}
