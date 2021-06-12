import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContactModel } from '../models/contact.model';
import { AppState } from '../states/app.state';
import { ContactState } from '../states/contact.state';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  _headers = {
    Authorization : 'Bearer ' + AppState.userSessiontoken.value,
    accept: 'application/json'
  };
  _contactSubject: BehaviorSubject<ContactModel[] | undefined> = new  BehaviorSubject<ContactModel[] | undefined>(undefined);
  constructor(private http: HttpClient) { }
  getAllContacts(){
    this._headers.Authorization = 'Bearer ' + AppState.userSessiontoken.value;
    return this.http.get<ContactModel[]>(`${AppState.apibaseurl}${"contacts"}`, {
      headers: this._headers
    }).pipe(tap((e)=> this._contactSubject.next(e)));
  }
  fillContact(contact: ContactModel[]){
    this._contactSubject.next(contact);
  }
  get contacts$(): Observable<ContactModel[] | undefined> { return this._contactSubject.asObservable();}
  get contacts(): ContactModel[] | undefined { return ContactState.instance.contacts;}
  getOneContact(contact: ContactModel){
    this._headers.Authorization = 'Bearer ' + AppState.userSessiontoken.value;
    return this.http.get<ContactModel>(`${AppState.apibaseurl}contact/${contact.id}`, {
      headers: this._headers
    });
  }
  createContact(contact: ContactModel){
    this._headers.Authorization = 'Bearer ' + AppState.userSessiontoken.value;
    return this.http.post<ContactModel>(`${AppState.apibaseurl}contact`, contact, {
      headers: this._headers
    }).pipe(tap((e)=>{
      const filtered = ContactState.instance.contacts ?? [];
      if(e != null) filtered.unshift(e);
      ContactState.instance.fillContact(filtered);
    }));
  }
  deleteContact(contact: ContactModel){
    this._headers.Authorization = 'Bearer ' + AppState.userSessiontoken.value;
    return this.http.delete<boolean>(`${AppState.apibaseurl}contact/${contact.id}`, {
      headers: this._headers,
    }).pipe(tap((e)=>{
      if(e){
        const filtered = ContactState.instance.contacts?.filter(
          (value, index, array)=> value.id != contact.id
        );
        return ContactState.instance.fillContact(filtered ?? []);
      }
    }));
  }
  updateContact(contact: ContactModel){
    this._headers.Authorization = 'Bearer ' + AppState.userSessiontoken.value;
    return this.http.put<boolean>(`${AppState.apibaseurl}contact`, contact, {
      headers: this._headers
    }).pipe(tap((e)=>{
      if(e){
        const filtered = ContactState.instance.contacts ?? [];
        for (let index = 0; index < filtered.length; index++) {
          const element = filtered[index];
          if(element.id == contact.id)
            filtered[index] = {
              ...filtered[index],
              ...contact,
            }
        }
        return ContactState.instance.fillContact(filtered);
      }
    }));
  }
}
