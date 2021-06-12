import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditContactDialog } from '../dialog/edit_contact.dialog';
import { ContactModel } from '../models/contact.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../shared/contact.service';
import { UserSessionState } from '../states/uer_session.state';
import { Router } from '@angular/router';
import { ContactState } from '../states/contact.state';
import { EditUseDialog } from '../dialog/edit_user.dialog';
import { UserModel } from '../models/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-applis',
  templateUrl: './applis.component.html',
  styleUrls: ['./applis.component.scss']
})
export class ApplisComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  user = UserSessionState.instance.user$;
  constructor(private editContactDlg: EditContactDialog, private editUser: EditUseDialog, private _router: Router, private breakpointObserver: BreakpointObserver, private _userService: UserService, private _conService: ContactService, private _snackBar: MatSnackBar) {
    this.user.subscribe(user =>{
      if(!user) _router.navigate(['/'])
    });
  }
  disconnect(){
    UserSessionState.instance.disconnect();
  }
  updateAcount(){
    this.editUser.show(UserSessionState.instance.user!)
    .afterClosed()
    .subscribe(async (e)=>{
      if(e){
        var ref = this._snackBar.open(`modification en cours...`)
        await this._userService.update({
          name: e.pseudo,
          password: e.password
        })
        ref.dismiss();
        this._snackBar.open('modifié avec succes!', undefined, {
          duration: 3000
        });
      }
    });
  }
  addContact(){
    this.editContactDlg.showDialog()
    .afterClosed().subscribe((data?: ContactModel) =>{
      if(data){
        var ref = this._snackBar.open(`Ajout de ${data.name} en cours...`)
        this._conService.createContact(data)
          .subscribe((e)=> {
            if(e) {
              ContactState.instance.size.subscribe((size) => {
                if(size == 1) window.location.reload(); //! fix table don't change on one elemeny
              })
              ref.dismiss();
              this._snackBar.open('Ajouté avec succes!', undefined, {
                duration: 3000
              });
            }
          });
      }
    });
  }
}
