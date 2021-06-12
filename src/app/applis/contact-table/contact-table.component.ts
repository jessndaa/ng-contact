import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { DialogResult } from 'src/app/dialog/dialog_type';
import { EditContactDialog } from 'src/app/dialog/edit_contact.dialog';
import { YesNoDialog } from 'src/app/dialog/yes_no.dialog';
import { ContactModel } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/shared/contact.service';
import { ContactState } from 'src/app/states/contact.state';
import { ContactTableDataSource} from './contact-table-datasource';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ContactModel>;
  dataSource: ContactTableDataSource;
  inputTextChanged$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'prename', 'phone', 'email', 'position', 'society', 'societyAdress',  'modify', 'delete',];
  temps: ContactModel[] = [];
  constructor( private editContactDlg: EditContactDialog, private yesNoDial: YesNoDialog, private _conService: ContactService, private _snackBar: MatSnackBar) {
    this.dataSource = new ContactTableDataSource();
    this.initSearchlistener();
  }

  initSearchlistener(){
    this.temps = ContactState.instance.contacts;
    this.inputTextChanged$
    .asObservable()
    .pipe(debounceTime(300), tap(e => e == '' ? null :
      ContactState.instance.setContacts(
        this.temps.filter((val) => val.name!.toString().toLocaleLowerCase().indexOf(e) > - 1)
      )))
    .subscribe(()=>{});
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if(this.table) this.table.dataSource = this.dataSource;
    this.initSearchlistener();
  }
  seach(event: any) {
    const item = event.target.value;
    if (item.trim() === '') {
      ContactState.instance.setContacts(this.temps);
    }
    if (this.inputTextChanged$.value !== item.trim()) {
      this.inputTextChanged$.next(item.trim());
    }
  }
  modify(contact: ContactModel){
    this.editContactDlg.showDialog(contact)
    .afterClosed().subscribe((data?: ContactModel) =>{
      if(data){
        var ref = this._snackBar.open(`Modification de ${contact.name} en cours...`)
        this._conService.updateContact(data)
          .subscribe((e)=> {
            if(e) {
              ref.dismiss();
              this._snackBar.open('Modifié avec succes!', undefined, {
                duration: 3000
              })
            }
          });
      }
    });
  }
  delete(contact: ContactModel){
    this.yesNoDial.show(
      {
        message: `Voulez-vous vraiment supprimer "${contact.name}" dans la liste des contacts?`,
        title: "Suppression de " + contact.name
      },
      (res)=>{
      if(res == DialogResult.YES){
        var ref = this._snackBar.open(`Supprssion de ${contact.name} en cours...`)
        this._conService.deleteContact(contact)
          .subscribe(val => {
            ref.dismiss();
            this.temps = ContactState.instance.contacts;
            this._snackBar.open('Supprimé avec succes!', undefined, {
              duration: 3000
            })
          });
      }
    })
  }
}
