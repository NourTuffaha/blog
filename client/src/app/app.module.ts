import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';  // Import AppRoutingModule
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegisterComponent,
    // HomeComponent,
    AppRoutingModule , 

  ],
  imports: [
    BrowserModule,
     FormsModule, 
     LoginComponent,
     RegisterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
