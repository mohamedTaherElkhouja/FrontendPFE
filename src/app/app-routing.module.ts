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
import { LoginAdminComponent } from './login-admin/login-admin.component';  // <= 🔥 IMPORT AdminLogin

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
      { path: 'dashbaord', component: EmetteurDashboardComponent, title: "emetteur_Dashbord" }
    ]
  },

  { path: 'user/AQ', component: AQComponent, title: "AQ_Dashbord" },
  { path: 'user/HSE', component: HSEComponent, title: "HSE_Dashbord" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
