import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactModel } from 'src/app/models/contact.model';
import { UserService } from 'src/app/shared/user.service';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  formGroup: FormGroup = this._fb.group({
    pseudo: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    public dialogRef: MatDialogRef<EditContactComponent>, @Inject(MAT_DIALOG_DATA) public contact: ContactModel,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if(!this.formGroup.valid) return;
    this.dialogRef.close(this.formGroup.value);
  }

}
