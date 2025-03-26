import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmetteurComponent } from './emetteur/emetteur.component';
import { LoginUtilisateurComponent } from './login-utilisateur/login-utilisateur.component';
import { AQComponent } from './aq/aq.component';
import { HSEComponent } from './hse/hse.component';

const routes: Routes = [
  {path:'',redirectTo:"user/login",pathMatch:'full'},
  {path:'user/login',component:LoginUtilisateurComponent,title:"login_page"},
  {path:'user/emetteur',component:EmetteurComponent,title:"emetteur_Dashbord"},
  {path:'user/AQ',component:AQComponent,title:"AQ_Dashbord"},
  {path:'user/HSE',component:HSEComponent,title:"HSE_Dashbord"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
