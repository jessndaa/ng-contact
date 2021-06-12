import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export class AppState {

    public static apibaseurl = environment.production ? `http://${window.location.host.split(':')[0]}:5000/api/` : `http://${window.location.host.split(':')[0]}:5000/api/`;
    public static userSessiontoken : BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
    public static onRebuildData: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
}
