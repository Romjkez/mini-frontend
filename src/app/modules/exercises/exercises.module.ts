import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';
import { ExerciseService } from './exercise.service';
import { ExerciseViewComponent } from './components/exercise-view/exercise-view.component';
import { CRUD_SERVICE } from '../shared/resolvers/by-id.resolver';
import { CreateExerciseComponent } from './components/create-exercise/create-exercise.component';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TestsModule } from '../tests/tests.module';
import { ArticlesModule } from '../articles/articles.module';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ListboxModule } from 'primeng/listbox';
import { ExerciseItemTypePipe } from './pipes/exercise-item-type.pipe';


@NgModule({
  declarations: [
    ExercisesListComponent,
    ExerciseViewComponent,
    CreateExerciseComponent,
    ExerciseFormComponent,
    ExerciseItemTypePipe
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    TableModule,
    ButtonModule,
    SharedModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    ChipsModule,
    CardModule,
    TooltipModule,
    InputSwitchModule,
    FormsModule,
    TestsModule,
    ArticlesModule,
    SplitButtonModule,
    ListboxModule,
  ],
  providers: [
    ExerciseService,
    {provide: CRUD_SERVICE, useExisting: ExerciseService},
  ]
})
export class ExercisesModule {
}
