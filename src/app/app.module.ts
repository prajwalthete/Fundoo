import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { SigninComponent } from './components/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CreatenoteComponent } from './components/createnote/createnote.component';

import { FormsModule } from '@angular/forms';
import { FundooheaderComponent } from './components/fundooheader/fundooheader.component';

//for header
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


//sidenav
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotecontainerComponent } from './components/notecontainer/notecontainer.component';
import { TrashcontainerComponent } from './components/trashcontainer/trashcontainer.component';
import { ArchivecontainerComponent } from './components/archivecontainer/archivecontainer.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    FundooheaderComponent,
    SidenavComponent,
    NotecontainerComponent,
    TrashcontainerComponent,
    ArchivecontainerComponent,
    CreatenoteComponent,
   
  
   
   
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
