import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmetteurComponent } from './emetteur/emetteur.component';
import { LoginUtilisateurComponent } from './login-utilisateur/login-utilisateur.component';
import { AQComponent } from './aq/aq.component';
import { HSEComponent } from './hse/hse.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './emetteur/dashboard/dashboard.component';
import { EmetteurDashboardComponent } from './emetteur-dashboard/emetteur-dashboard.component';
import { LoginAdminComponent } from './Admin/login-admin/login-admin.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard//admin-dashboard.component';
import { UsersPerviewComponent } from './users-perview/users-perview.component';
import { PVDechetAdminComponent } from './Admin/pvdechet-admin/pvdechet-admin.component';
import { SettingComponent } from './Admin/setting/setting.component';
import { AqValidesComponent } from './aq/aq-valides/aq-valides.component';
import { HseValidesComponent } from './hse/hse-valides/hse-valides.component';
import { ProfilEmetteurComponent } from './Users/profil-emetteur/profil-emetteur.component';
import { ProfilAqComponent } from './Users/profil-aq/profil-aq.component';
import { ProfilHseComponent } from './Users/profil-hse/profil-hse.component';
import { ProfileAdminComponent } from './Admin/profile-admin/profile-admin.component';
const routes: Routes = [
  { path: '', redirectTo: "user/login", pathMatch: 'full' },

  { path: 'user/login', component: LoginUtilisateurComponent, title: "login_page" },
  { path: 'user/forgetPassword', component: ForgetPasswordComponent, title: "FP_Dashboard" },
  { path: 'user/resetPassword/:token', component: ResetPasswordComponent, title: "Reset_Password" },

  { path: 'admin/login', component: LoginAdminComponent, title: "Admin_Login" }, // <= 🔥 AJOUTE ADMIN LOGIN

  {
    path: 'emetteur',
    component: DashboardLayoutComponent,
    children: [
      { path: 'emetteurdashaord', component: DashboardLayoutComponent, title: "DashbordLayout" },
      { path: 'pv', component: EmetteurComponent, title: "PV de déchets" },
      { path: 'dashbaord', component: EmetteurDashboardComponent, title: "emetteur_Dashbord" },
      {path : 'profil', component: ProfilEmetteurComponent, title: "emetteur_profil" },
      
    ]
  },
  {path: 'aq/profile', component: ProfilAqComponent, title: "AQ_profil"},
  { path: 'aq/valides', component: AqValidesComponent },
  {path :'hse/valides',component:HseValidesComponent},
{path :'hse/profile',component:ProfilHseComponent,title:"HSE_profil"},
  
  // Other routes
  {path:'user/AQ',component:AQComponent,title:"AQ_Dashbord"},
  {path:'user/HSE',component:HSEComponent,title:"HSE_Dashbord"},
  // Admin routes :
  {path:"admin/login", component :LoginAdminComponent , title :"Admin_login"},
  {path:"admin/dashboard",component:AdminDashboardComponent,title:"Admin_Dashbord"},
  {path:"admin/users",component:UsersPerviewComponent,title:"Admin_Users_Perview"},
  {path:"admin/pvdechet",component:PVDechetAdminComponent,title:"Admin_PVDechet"},
  {path:"admin/settings",component:SettingComponent,title:"Admin_Settings"},
  {path:'admin/profile',component:ProfileAdminComponent,title:"Admin_profil"},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
