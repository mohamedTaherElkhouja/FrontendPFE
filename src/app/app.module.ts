import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUtilisateurComponent } from './login-utilisateur/login-utilisateur.component';
import { FormsModule } from '@angular/forms';
import { EmetteurComponent } from './emetteur/emetteur.component';
import { AQComponent } from './aq/aq.component';
import { HSEComponent } from './hse/hse.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginUtilisateurComponent,
    EmetteurComponent,
    AQComponent,
    HSEComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
