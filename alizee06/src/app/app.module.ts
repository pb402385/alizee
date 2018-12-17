import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderResponsiveComponent } from './includes/header-responsive/header-responsive.component';
import { FooterResponsiveComponent } from './includes/footer-responsive/footer-responsive.component';
import { HomeComponent } from './pages/public/home/home.component';
import { ContactComponent } from './pages/public/footer/contact/contact.component';
import { FaqComponent } from './pages/public/footer/faq/faq.component';

import { UtilsService } from './services/utils.service';
import { ErrorLogService } from './services/error-log/error-log.service';
import { CategorieService } from './services/api/categorie.service';
import { ProduitService } from './services/api/produit.service';
import { TarifService } from './services/api/tarif.service';

import { 
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatSelectModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatIconModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatCardModule,
  MatProgressBarModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatGridListModule
 } from '@angular/material';
import { MenuComponent } from './includes/menu/menu.component';
import { DietetiqueComponent } from './pages/public/menu/dietetique/dietetique.component';
import { TarifsComponent } from './pages/public/menu/tarifs/tarifs.component';
import { SoinsVisageComponent } from './pages/public/menu/soins-visage/soins-visage.component';
import { SoinsCorpsComponent } from './pages/public/menu/soins-corps/soins-corps.component';
import { TemplateComponent } from './includes/template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderResponsiveComponent,
    FooterResponsiveComponent,
    HomeComponent,
    ContactComponent,
    FaqComponent,
    MenuComponent,
    DietetiqueComponent,
    TarifsComponent,
    SoinsVisageComponent,
    SoinsCorpsComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressBarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatGridListModule
  ],
  providers: [UtilsService, ErrorLogService, CategorieService, ProduitService, TarifService],
  bootstrap: [AppComponent]
})
export class AppModule { }
