import { Component } from '@angular/core';
import {ServerListDataProviderService} from '../../../shared/services/server-list-data-provider.service';

@Component({
  selector: 'app-player-count',
  templateUrl: './player-count.component.html',
  styleUrls: ['./player-count.component.scss']
})
export class PlayerCountComponent {


  constructor(public serverListDataProvider: ServerListDataProviderService) {
  }
}
