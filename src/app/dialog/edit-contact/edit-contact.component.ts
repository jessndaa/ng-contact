import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactModel } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/shared/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  formGroup: FormGroup = this.fb.group( {
    name: ["",[Validators.required, ]],
    prename: ["",[Validators.required]],
    phone: ["",[Validators.required, Validators.minLength(9), Validators.maxLength(12), Validators.pattern("(243)[0-9]+|(33)[0-9]+"),]],
    email: ["",[Validators.required, Validators.email, ]],
    position: ["",[Validators.required]],
    society: ["",[Validators.required]],
    societyAdress: ["",[Validators.required]],
  });
  autosave: any;
  constructor(public dialogRef: MatDialogRef<EditContactComponent>, @Inject(MAT_DIALOG_DATA) public contact: ContactModel, private _contactService: ContactService,  private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.contact) this.formGroup.setValue({
      name: this.contact.name,
      prename: this.contact.prename,
      phone: this.contact.phone,
      email: this.contact.email,
      position: this.contact.position,
      society: this.contact.society,
      societyAdress: this.contact.societyAdress,
    });
    else{
      this.autosave = localStorage.getItem("autosave");
      this.formGroup.valueChanges.subscribe(()=>{
        localStorage.setItem("autosave", JSON.stringify(this.formGroup.value))
      });
    }
  }
  reverLastSession(){
    this.formGroup.setValue(
      JSON.parse(this.autosave)
    );
    this.autosave = undefined;

  }
  private _markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this._markFormGroupTouched(control);
      }
    });
  }
  onSubmit(){
    this._markFormGroupTouched(this.formGroup);
    if(!this.formGroup.valid) return;
    localStorage.removeItem("autosave");
    this.dialogRef.close({
      ...(this.contact ?? {}),
      ...this.formGroup.value
    });
  }

}
