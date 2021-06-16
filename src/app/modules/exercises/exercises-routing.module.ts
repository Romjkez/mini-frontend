import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { ExerciseViewComponent } from './components/exercise-view/exercise-view.component';
import { ByIdResolver } from '../shared/resolvers/by-id.resolver';
import { CreateExerciseComponent } from './components/create-exercise/create-exercise.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ExercisesListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: CreateExerciseComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: ExerciseViewComponent,
    resolve: {
      exercise: ByIdResolver,
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule {
}
