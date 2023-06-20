import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { PlayerCountComponent } from './components/player-count/player-count.component';
import { PlayerChartComponent } from './components/player-chart/player-chart.component';
import {NgChartsModule} from 'ng2-charts';
import { BreakdownComponent } from './components/breakdown/breakdown.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapChartComponent } from './components/map-chart/map-chart.component';


@NgModule({
  declarations: [
    LandingComponent,
    PlayerCountComponent,
    PlayerChartComponent,
    BreakdownComponent,
    FooterComponent,
    MapChartComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgChartsModule,
    NgOptimizedImage
  ]
})
export class LandingModule { }
