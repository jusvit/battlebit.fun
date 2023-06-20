import { Injectable } from '@angular/core';
import {ServerList, ServerRegion} from '../models/server';
import {BehaviorSubject, Subject, Subscription, timer} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerListDataProviderService {

  public serverList: ServerList = [];

  // Player stats
  public totalPlayers: number = 0;
  public playerCount: number = 0;
  public playerQueueCount: number = 0;

  // Server stats
  public officialServerCount = 0;
  public passwordServerCount = 0;

  public regionServers = new Map<string, ServerRegion>();
  public mapSizes = new Map<string, number>();
  public mapCount = new Map<string, number>();
  public gameModeCount = new Map<string, number>();

  public changeSubject = new Subject<null>();

  public hasData = false;

  private timerSub: Subscription;

  constructor(private readonly http: HttpClient) {
    this.timerSub = timer(0, 1000).subscribe(() => this.updateServerList());
  }

  private updateServerList(): void {
    let url = `https://publicapi.battlebit.cloud/Servers/GetServerList`;

    this.http.get<ServerList>(url).subscribe(serverList => {
      this.serverList = serverList;
      this.updateAggregations(serverList);
    });
  }

  private updateAggregations(serverList: ServerList){
    let sumPlayers = 0;
    let sumQueuePlayers = 0;
    let regionServers = new Map<string, ServerRegion>();
    let mapSizes = new Map<string, number>();
    let mapCount = new Map<string, number>();
    let gameModeCount = new Map<string, number>();
    let officialServerCount = 0;
    let passwordServerCount = 0;

    serverList.forEach(server => {
      sumPlayers += server.Players
      sumQueuePlayers += server.QueuePlayers

      // Server stats
      if(mapSizes.has(server.MapSize)){
        let count = mapSizes.get(server.MapSize)!;
        count++;
        mapSizes.set(server.MapSize, count);
      } else{
        mapSizes.set(server.MapSize, 1);
      }

      if(mapCount.has(server.Map)){
        let count = mapCount.get(server.Map)!;
        count++;
        mapCount.set(server.Map, count);
      } else{
        mapCount.set(server.Map, 1);
      }

      if(gameModeCount.has(server.Gamemode)){
        let count = gameModeCount.get(server.Gamemode)!;
        count++;
        gameModeCount.set(server.Gamemode, count);
      } else{
        gameModeCount.set(server.Gamemode, 1);
      }


      if(server.IsOfficial){
        officialServerCount++;
      }

      if(server.HasPassword){
        passwordServerCount++;
      }

      // Region aggregation
      if(regionServers.has(server.Region)){
        let region = regionServers.get(server.Region)!;
        region.ServerCount++;
        region.PlayerCount += server.Players;
        region.Capacity += server.MaxPlayers
        regionServers.set(server.Region, region);
      } else{
        let region = new ServerRegion();
        region.ServerCount = 1;
        region.PlayerCount = server.Players
        region.Capacity = server.MaxPlayers
        regionServers.set(server.Region, region);
      }

    });

    this.totalPlayers = sumPlayers + sumQueuePlayers;
    this.playerCount = sumPlayers;
    this.playerQueueCount = sumQueuePlayers;
    this.mapSizes = mapSizes;
    this.mapCount = mapCount;
    this.gameModeCount = gameModeCount;
    this.regionServers = regionServers;
    this.officialServerCount = officialServerCount;
    this.passwordServerCount = passwordServerCount;


    this.changeSubject.next(null);

    this.hasData = true;
  }
}
