import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartOptions} from 'chart.js';
import {ServerListDataProviderService} from '../../../shared/services/server-list-data-provider.service';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-player-chart',
  templateUrl: './player-chart.component.html',
  styleUrls: ['./player-chart.component.scss']
})
export class PlayerChartComponent implements OnInit{

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
    ],
    datasets: [
      {
        data: [],
        label: 'Players (Playing + Queued)',
        fill: false,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgb(255,255,255)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
    ],
  };
  public lineChartOptions: any = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 900,
      y: {
        duration: 0
      }
    },
    scales: {
      y: {
        ticks: {
          color: 'white', // Set the color of y-axis labels to white
        },
      },
      x: {
        display: false,
      },
    },
    plugins: {},
  };
  public lineChartLegend = false;


  constructor(public serverListDataProvider: ServerListDataProviderService) {
  }

  ngOnInit(): void {
    this.serverListDataProvider.changeSubject.subscribe(() =>{
      this.lineChartData.labels?.push("Players");
      this.lineChartData.datasets[0].data.push(this.serverListDataProvider.totalPlayers);

      this.chart?.update();

      // @ts-ignore
      if (this.lineChartData.labels?.length > 200) {
        this.lineChartData.labels?.shift();
      }

      if (this.lineChartData.datasets[0].data.length > 200) {
        this.lineChartData.datasets[0].data.shift();
      }

    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.chart?.render();
  }

}
