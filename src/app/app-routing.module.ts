import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPersonsComponent } from './components/form-persons/form-persons.component';

const routes: Routes = [
  {path:'',component:FormPersonsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
