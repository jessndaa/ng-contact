import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { YesNoComponent } from './yes-no/yes-no.component';
import { DialogContent, DialogResult } from './dialog_type';

@Injectable({
  providedIn: 'root'
})
export class YesNoDialog {

  constructor(private dialog: MatDialog) { }
  show(content: DialogContent, onResult: (res: DialogResult) => void): void {
    const dialogRef = this.dialog.open(YesNoComponent, {
      width: '400px',
      data: content
    });
    dialogRef.afterClosed().subscribe(onResult);
  }
}
