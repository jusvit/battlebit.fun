import { Component } from '@angular/core';
import {ServerListDataProviderService} from '../../../shared/services/server-list-data-provider.service';
import {map} from 'rxjs';

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html',
  styleUrls: ['./breakdown.component.scss']
})
export class BreakdownComponent {


  constructor(public serverListDataProvider: ServerListDataProviderService) {
  }

  protected readonly map = map;
}
