import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewappliComponent } from './newappli/newappli.component';
import { ViewappliComponent } from './viewappli/viewappli.component';

const routes: Routes = [
  {path: 'newappli', component: NewappliComponent},
  {path: 'viewappli', component: ViewappliComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
