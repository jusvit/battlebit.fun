import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import ('./landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'browser',
    loadChildren: () => import ('./browser/browser.module').then(m => m.BrowserModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
