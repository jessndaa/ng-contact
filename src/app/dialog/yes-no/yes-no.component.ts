import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogContent, DialogResult } from '../dialog_type';

@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss']
})
export class YesNoComponent implements OnInit {
  title: string = "";
  message: string = "";
  constructor(public dialogRef: MatDialogRef<YesNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogContent) {
      this.title = data.title!;
      this.message = data.message!;
    }

  ngOnInit(): void {
  }
  onYes(){
    this.dialogRef.close(DialogResult.YES);
  }
  onNo(){
    this.dialogRef.close(DialogResult.NO);
  }
}
