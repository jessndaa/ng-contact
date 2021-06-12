import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from '../states/app.state';
import { ContactService } from '../shared/contact.service';
import { ContactState } from '../states/contact.state';
import { UserSessionState } from '../states/uer_session.state';
import { SimpleDialog } from '../dialog/simple.dialog';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup = this._fb.group({
    pseudo: ['', Validators.required],
    password: ['', Validators.required],
  });
  isLoading?: Observable<boolean>;
  selectedEcole: any;
  errorLogged?: Observable<boolean>;
  idLoading?: Observable<boolean>;
  user = UserSessionState.instance.user$;
  constructor(private _fb: FormBuilder,
    private _dialog: SimpleDialog,
    private _userService: UserService,
    private route: Router
  ) {
    if(localStorage.getItem('user'))
        UserSessionState.instance.setUser( JSON.parse(localStorage.getItem('user')!) as UserModel);
    this.user.subscribe(user =>{
      if(user) route.navigate(['/app/table'])
    });
  }

  ngOnInit() {
  }
  async createAccount(){
    this._markFormGroupTouched(this.formGroup);
    if(!this.formGroup.valid) return;
    const v = this.formGroup?.value;
    try {
      this.isLoading = of(true);
      await this._userService.Create({
        name: v.pseudo,
        password: v.password
      });
      this._dialog.showDialog(
        {
          image : 'assets/illustration/undraw_fans_gr54-svg.png',
          message : "Felicitation! vous avez réussi à créer un compte, connectez-vous pour commencez à ajouter vos contacts"
        }
      ).afterClosed().subscribe(()=>{
        this.formGroup.setValue({
          pseudo: "",
          password: ""
        });
        this.formGroup.markAsUntouched();
      });
    } catch (error) {
      this.errorLogged = of(true);
    } finally{
      this.isLoading = of(false);
    }
  }
  private _markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this._markFormGroupTouched(control);
      }
    });
  }
  async loginAccount() {
    this._markFormGroupTouched(this.formGroup);
    if(!this.formGroup.valid) return;
    const v = this.formGroup?.value;
    this.isLoading = of(true);
    this.errorLogged = of(false);
    try {
      var resp = await this._userService.Authenticate({
        name: v.pseudo,
        password: v.password
      });
      if(resp != null){
        UserSessionState.instance.setUser(resp);
        this.route.navigate(['/app/table'])
      }
    } catch (error) {
      this.errorLogged = of(true);
    } finally{
      this.isLoading = of(false);
    }
  }
}
