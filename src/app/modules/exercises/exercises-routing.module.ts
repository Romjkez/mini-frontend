import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { ExerciseViewComponent } from './components/exercise-view/exercise-view.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: ExercisesListComponent,
},
  {
    path: ':id',
    pathMatch: 'full',
    component: ExerciseViewComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule {
}
