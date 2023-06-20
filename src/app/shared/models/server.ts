export type ServerList = Server[]

export interface Server {
  Name: string
  Map: string
  MapSize: string
  Gamemode: string
  Region: string
  Players: number
  QueuePlayers: number
  MaxPlayers: number
  Hz: number
  DayNight: string
  IsOfficial: boolean
  HasPassword: boolean
  AntiCheat: string
  Build: string
}

export class ServerRegion {
  public ServerCount: number = 0;
  public PlayerCount: number = 0;
  public Capacity: number = 0;
}

