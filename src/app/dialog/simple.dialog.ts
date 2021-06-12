import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
