import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactModel } from '../models/contact.model';
import { UserSessionState } from './uer_session.state';

export class ContactState {
    private static _instance?: ContactState;
    static get  instance(): ContactState{
      return ContactState._instance ??= new ContactState();
    }
    private _contacts: BehaviorSubject<ContactModel[]> = new BehaviorSubject<ContactModel[]>([]);

    public get contacts$() {
        return this._contacts.asObservable();
    }
    public get contacts() {
        return this._contacts.value;
    }

    public setContacts(contacts: ContactModel[]) {
      this._contacts.next(contacts);
    }
    fillContact(contacts: ContactModel[]){
      this._contacts.next(contacts);
      UserSessionState.instance.setContact(contacts);
    }
    public addContact(contact: ContactModel) {
        this.fillContact([
            contact,
            ...this._contacts.value,
        ]);
    }
    public get size(): Observable<number> {
        return this.contacts$.pipe(map((e) => e.length));
    }
}
