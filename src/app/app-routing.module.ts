import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { GuardModule } from './guard/guard.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m=> m.LoginModule)
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () => import('./applis/applis.module').then(m => m.ApplisModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    GuardModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
