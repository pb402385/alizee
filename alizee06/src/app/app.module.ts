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
import { TwinslimComponent } from './includes/soins-corps/twinslim/twinslim.component';
import { DervabrasionComponent } from './includes/soins-corps/dervabrasion/dervabrasion.component';
import { MicroComponent } from './includes/soins-corps/micro/micro.component';
import { MesoliftComponent } from './includes/soins-corps/mesolift/mesolift.component';
import { InjectionsComponent } from './includes/soins-corps/injections/injections.component';
import { PeelingComponent } from './includes/soins-visage/peeling/peeling.component';
import { MiltatherapieComponent } from './includes/soins-visage/miltatherapie/miltatherapie.component';
import { InjectionsVisageComponent } from './includes/soins-visage/injections-visage/injections-visage.component';
import { MesoliftVisageComponent } from './includes/soins-visage/mesolift-visage/mesolift-visage.component';
import { MicroVisageComponent } from './includes/soins-visage/micro-visage/micro-visage.component';
import { DervabrasionVisageComponent } from './includes/soins-visage/dervabrasion-visage/dervabrasion-visage.component';
import { TwinslimVisageComponent } from './includes/soins-visage/twinslim-visage/twinslim-visage.component';

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
    TwinslimComponent,
    DervabrasionComponent,
    MicroComponent,
    MesoliftComponent,
    InjectionsComponent,
    PeelingComponent,
    MiltatherapieComponent,
    InjectionsVisageComponent,
    MesoliftVisageComponent,
    MicroVisageComponent,
    DervabrasionVisageComponent,
    TwinslimVisageComponent
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
