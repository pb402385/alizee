import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../pages/private/login/login.component';
import { EditCategorieComponent } from '../pages/private/edit-categorie/edit-categorie.component';
import { EditProduitComponent } from '../pages/private/edit-produit/edit-produit.component';

import { HomeComponent } from '../pages/public/home/home.component';

import { CvComponent } from '../pages/public//cv/cv.component';
import { TarifsComponent } from '../pages/public/menu/tarifs/tarifs.component';
import { DietetiqueComponent } from '../pages/public/menu/dietetique/dietetique.component';
import { SoinsCorpsComponent } from '../pages/public/menu/soins-corps/soins-corps.component';
import { SoinsVisageComponent } from '../pages/public/menu/soins-visage/soins-visage.component';
import { OptionalMenu1Component } from '../pages/public/menu/optional-menu1/optional-menu1.component';
import { OptionalMenu2Component } from '../pages/public/menu/optional-menu2/optional-menu2.component';
import { OptionalMenu3Component } from '../pages/public/menu/optional-menu3/optional-menu3.component';
import { OptionalMenu4Component } from '../pages/public/menu/optional-menu4/optional-menu4.component';
import { OptionalMenu5Component } from '../pages/public/menu/optional-menu5/optional-menu5.component';

import { ContactComponent } from '../pages/public/footer/contact/contact.component';
import { FaqComponent } from '../pages/public/footer/faq/faq.component';

/**
 * Graphe de routage des chemions accessibles via angular.
 */
const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'tarifs', component: TarifsComponent },
  { path: 'dietetique', component: DietetiqueComponent },
  { path: 'soins-visage', component: SoinsVisageComponent },
  { path: 'soins-corps', component: SoinsCorpsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'editCategorie', component: EditCategorieComponent },
  { path: 'editProduits', component: EditProduitComponent },
  { path: 'optMenu1', component: OptionalMenu1Component },
  { path: 'optMenu2', component: OptionalMenu2Component },
  { path: 'optMenu3', component: OptionalMenu3Component },
  { path: 'optMenu4', component: OptionalMenu4Component },
  { path: 'optMenu5', component: OptionalMenu5Component },
  { path: 'cv', component: CvComponent },
  { path: '**', redirectTo: '' }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
