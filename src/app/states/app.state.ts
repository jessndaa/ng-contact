import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export class AppState {

    public static apibaseurl = `http://167.172.166.81:5000/api/`;
    public static userSessiontoken : BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
    public static onRebuildData: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
}
