import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScreenModel } from 'src/app/models/incident.models';
import { of, Observable } from 'rxjs';
import { QuestionService } from 'src/app/shared/question.service';
import { IncidentService } from 'src/app/shared/incident.service';
import { AppState } from 'src/app/states/app.state';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/compiler/src/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-incidentview',
  templateUrl: './incidentview.component.html',
  styleUrls: ['./incidentview.component.scss']
})
export class IncidentviewComponent implements OnInit {
  questionsData?: Observable<any[]>;
  tabs = [''];
  formGroup: FormGroup = this.fb.group( {
    Name: [Validators.required],
    Time: [Validators.required],
    FullName: [],
    Url: []
  });
  afficheReponse? : Observable<any>;
  incident?: Observable<ScreenModel>;
  // TODO : Get promotion list
  promotions?: string[];
  appState = AppState.apibaseurl;
  // ? current selected eleveId
  selectedEleveId?: string;
  curentFileDownloadUrl?:string;
  screencontent?: ScreenModel[];
  isAdd = false;
  isFileDown = false;
  ecran = [
    {
      "Name":"Ecran1GH",
      "Detail":"Entré grand hotel"
    },
    {
      "Name":"Ecran2ESC",
      "Detail":"Entré salon congo"
    },
    {
      "Name":"Ecran3SC",
      "Detail":"Salle congo"
    },
    {
      "Name":"Ecran4SL",
      "Detail":"Salle lubumbashi"
    },
    {
      "Name":"Ecran5SK",
      "Detail":"Salle kasai"
    },
    {
      "Name":"Ecran6RECP",
      "Detail":"Recption Pullman"
    },
    {
      "Name":"Ecran7CE1",
      "Detail":"Couloir Premier niveau"
    },
    {
      "Name":"Ecran8ST",
      "Detail":"Salon Tumba"
    },
    {
      "Name":"Ecran9MASS",
      "Detail":"Salle MASALA"
    },
    {
      "Name":"Ecran10SSAL",
      "Detail":"Salle Sallonga"
    },
    {
      "Name":"Ecran11STONK",
      "Detail":"Salle Tonka"
    },
    {
      "Name":"Ecran12SCOM",
      "Detail":"Salle Combava"
    },
    {
      "Name":"Ecran13AS1",
      "Detail":"Assensseur 1"
    },
    {
      "Name":"Ecran14AS2",
      "Detail":"Assensseur 2"
    },
    {
      "Name":"Ecran15AS3",
      "Detail":"Assensseur 3"
    },
    {
      "Name":"Ecran16E",
      "Detail":"Ecran reserve"
    },
  ];
  currentFileName="Cliquer pour télécharger un fichier";
  constructor( @Inject(MAT_DIALOG_DATA) private _incident: ScreenModel, private http: HttpClient, private screen: IncidentService, private question: QuestionService, private fb: FormBuilder) { }

  async ngOnInit() {
    if (this._incident) {
      this.isAdd = false;
      this.screencontent = await this.screen.getScreenContent(this._incident.Name);
      this.incident = of(this._incident);
      this.questionsData = this.question.getQuestion();
      return
    }
    this.isAdd = true;
  }
  async onDelete(id: string){
    this.http.delete(AppState.apibaseurl+'screen/'+id).subscribe(async(ex)=>{
      this.screencontent =await this.screen.getScreenContent(this._incident.Name);
      AppState.onRebuildData.next(ex.toString());
    });
  }
  onModify(id: string){
    this.http.delete(AppState.apibaseurl+ '');
  }
  onSubmit() {
    if (this.formGroup!.valid) {
      this.http.post(AppState.apibaseurl+'screen/', {...this.formGroup!.value, Url: this.curentFileDownloadUrl}).subscribe(async (ex)=>{
        AppState.onRebuildData.next(ex.toString());
      });
    }
  }
  onFileChange({target}: any){
    this.isFileDown = true;
    const t = target as HTMLInputElement;
    if(t.files == null) return;
    const file: File = t.files[0];
    this.currentFileName = file.name;
    const frmData = new FormData();
    frmData.append('file', file);
    this.http.post(AppState.apibaseurl+'image/', frmData).subscribe(ex=>{
      this.curentFileDownloadUrl = (ex as any).fileUrl;
      this.isFileDown = false;
    });
  }
}
