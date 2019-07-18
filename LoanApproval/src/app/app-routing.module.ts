import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewappliComponent } from './newappli/newappli.component';


const routes: Routes = [
  {path: 'newappli', component: NewappliComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
