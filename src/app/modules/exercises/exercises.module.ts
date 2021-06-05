import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';
import { ExerciseService } from './exercise.service';
import { ExerciseViewComponent } from './components/exercise-view/exercise-view.component';


@NgModule({
  declarations: [
    ExercisesListComponent,
    ExerciseViewComponent
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    TableModule,
    ButtonModule,
    SharedModule
  ],
  providers: [ExerciseService]
})
export class ExercisesModule {
}
