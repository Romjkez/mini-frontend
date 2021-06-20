import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './components/main-page/main-page.component';
import { CardModule } from 'primeng/card';
import { StatsService } from './services/stats.service';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CardModule,
    CommonModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule,
    SkeletonModule,
    TooltipModule,
  ],
  providers: [
    StatsService,
  ]
})
export class MainPageModule {
}
