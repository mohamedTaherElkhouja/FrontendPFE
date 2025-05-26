import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUtilisateurComponent } from './login-utilisateur/login-utilisateur.component';
import { FormsModule } from '@angular/forms';
import { EmetteurComponent } from './emetteur/emetteur.component';
import { HSEComponent } from './hse/hse.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmetteurDashboardComponent } from './emetteur-dashboard/emetteur-dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { LoginAdminComponent } from './Admin/login-admin/login-admin.component';
import { NavAdminComponent } from './Admin/nav-admin/nav-admin.component';
import { SideAdminComponent } from './Admin/side-admin/side-admin.component';
import { UsersPerviewComponent } from './users-perview/users-perview.component';
import { SearchPipe } from './Admin/Search/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { PVDechetAdminComponent } from './Admin/pvdechet-admin/pvdechet-admin.component';
import {ProfileAdminComponent} from './Admin/profile-admin/profile-admin.component';
import { SettingComponent } from './Admin/setting/setting.component';
import { AQComponent } from './aq/aq.component';
import { AqValidesComponent } from './aq/aq-valides/aq-valides.component';
import { SideAqComponent } from './aq/side-aq/side-aq.component';
import { SideHseComponent } from './hse/side-hse/side-hse.component';
import { HseValidesComponent } from './hse/hse-valides/hse-valides.component';
import { ProfilEmetteurComponent } from './Users/profil-emetteur/profil-emetteur.component';
import { ProfilAqComponent } from './Users/profil-aq/profil-aq.component';
import { ProfilHseComponent } from './Users/profil-hse/profil-hse.component';
import { FilterPipe } from './Admin/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginUtilisateurComponent,
    EmetteurComponent,
    AQComponent,
    HSEComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    EmetteurDashboardComponent,
    AdminDashboardComponent,
    LoginAdminComponent,
    NavAdminComponent,
    SideAdminComponent,
    UsersPerviewComponent,
    SearchPipe,
    PVDechetAdminComponent,
    ProfileAdminComponent,
    SettingComponent,
    HseValidesComponent,
    ProfilEmetteurComponent,
    ProfilAqComponent,
    ProfilHseComponent,
    FilterPipe
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NavbarComponent,
    SidebarComponent,
    NgxPaginationModule,
    DashboardLayoutComponent,
    SideAqComponent,
    SideHseComponent,
    AqValidesComponent,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      tapToDismiss: true,
      enableHtml: true,
      toastClass: 'ngx-toastr toast-animate',
      progressAnimation: 'decreasing',
      newestOnTop: true,
      maxOpened: 3,
      autoDismiss: true,
      preventDuplicates: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
