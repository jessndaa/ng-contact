import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogContent } from '../dialog_type';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent implements OnInit {
  message?: string;
  image?: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogContent) { }

  ngOnInit(): void {
    this.image = this.data.image!;
    this.message = this.data.message!;
  }

}
