import { BehaviorSubject } from 'rxjs';
import { ContactModel } from '../models/contact.model';
import { UserModel } from '../models/user.model';
import { AppState } from './app.state';
import { ContactState } from './contact.state';

export class UserSessionState {
    private static _instance?: UserSessionState;
    static get  instance(): UserSessionState{

      return UserSessionState._instance ??= new UserSessionState();
    }
    private userSubject: BehaviorSubject<UserModel | undefined> = new BehaviorSubject<UserModel | undefined>(undefined);

    public get user$() {
      return this.userSubject.asObservable();
    }
    public get user() {
        return this.userSubject.value;
    }
    setContact(contacts: ContactModel[]){
      this.user!.contacts = contacts;
      this.userSubject.next(this.user!);
      localStorage.setItem("user", JSON.stringify(this.user!));
    }
    disconnect(): void {
      this.userSubject.next(undefined);
      AppState.userSessiontoken.next(undefined);
      localStorage.clear();
    }
    public setUser(user: UserModel) {
      this.userSubject.next(user);
      AppState.userSessiontoken.next(user.id);
      ContactState.instance.fillContact(user.contacts ?? []);
      localStorage.setItem("user", JSON.stringify(user));
    }
    public get exist(): boolean {
        return this.userSubject.value ? true : false;
    }
}
