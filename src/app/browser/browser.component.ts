import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {ServerListDataProviderService} from '../shared/services/server-list-data-provider.service';
import {Server, ServerRegion} from '../shared/models/server';
import {Router} from '@angular/router';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit{
  @ViewChild('table') table!: DatatableComponent;

  protected readonly ColumnMode = ColumnMode;


  servers: Server[] = [];
  regions: string[] = []
  filteredServers: Server[] = []
  selectedRegionFilter: string | undefined = undefined;

  searchNameFilter: string = "";

  canUpdate = true;
  isLoading = true;

  constructor(public serverListDataProviderService: ServerListDataProviderService, private router: Router) {
  }

  ngOnInit(): void {
    this.serverListDataProviderService.changeSubject.subscribe(() =>{
      if(this.canUpdate){
        this.servers = this.serverListDataProviderService.serverList;
        this.regions = Array.from(this.serverListDataProviderService.regionServers.keys());
        this.updateFilter();
        this.isLoading = false;
      }
    });
  }

  updateFilter() {
    this.filteredServers = this.servers;

    // Filter region
    if (this.selectedRegionFilter != undefined) {
      this.filteredServers = this.filteredServers.filter(server => {
        return server.Region == this.selectedRegionFilter;
      });
    }

    // Filter Search
    if (this.searchNameFilter != "") {
      this.filteredServers = this.filteredServers.filter(server => {
        return server.Name.toLowerCase().includes(this.searchNameFilter.toLowerCase())
      })
    }
  }

  navigateBack() {
    // @ts-ignore
    this.router.navigateByUrl('/')

  }

  public summaryForHzWorkAround(cells: string[]) {
    return "";
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.table?.recalculate();
  }

}
