import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ApplisComponent } from './applis.component';
import { DesignModule } from '../design/design.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DialogModule } from '../dialog/dialog.module';
// import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ContactTableComponent } from './contact-table/contact-table.component';
import { ContactService } from '../shared/contact.service';
import { AuthGuard } from '../guard/auth.guard';
import { GuardModule } from '../guard/guard.module';

const routes: Routes = [{
  path: '',
  component: ApplisComponent,
  children: [
    {
      path: 'table',
      component: ContactTableComponent,
    }
  ]
}];

@NgModule({
  declarations: [
    ApplisComponent,
    ContactTableComponent,
  ],
  imports: [
    CommonModule,
    DesignModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DialogModule,
    SharedModule,
  ],
})
export class ApplisModule { }
