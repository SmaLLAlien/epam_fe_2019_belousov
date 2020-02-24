import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorComponent} from "./components/error/error.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses'
  },
  {
    path: 'courses',
    loadChildren: () => import('../courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
