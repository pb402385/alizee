import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../pages/private/login/login.component';
import { EditCategorieComponent } from '../pages/private/edit-categorie/edit-categorie.component';

import { HomeComponent } from '../pages/public/home/home.component';

import { TarifsComponent } from '../pages/public/menu/tarifs/tarifs.component';
import { DietetiqueComponent } from '../pages/public/menu/dietetique/dietetique.component';
import { SoinsCorpsComponent } from '../pages/public/menu/soins-corps/soins-corps.component';
import { SoinsVisageComponent } from '../pages/public/menu/soins-visage/soins-visage.component';

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
  { path: '**', redirectTo: '' }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
