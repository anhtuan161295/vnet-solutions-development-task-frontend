import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleResultsComponent } from './sale-results/sale-results.component';

const routes: Routes = [
  { path: '', component: SaleResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
