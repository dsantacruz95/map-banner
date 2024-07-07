import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgForOf, NgClass } from '@angular/common';
import { io } from 'socket.io-client';
import { OrderByPipe } from '../../utils/ordering.pipe';
import { Map } from '../../models/map';
import { ParamsDataService } from '../../shared/ParamsDataService.service';
declare var swal: any;

@Component({
  selector: 'app-joinmatch',
  standalone: true,
  imports: [RouterOutlet, OrderByPipe, NgForOf, NgClass],
  templateUrl: './joinmatch.component.html',
  styleUrl: './joinmatch.component.css'
})
export class JoinmatchComponent {
  listMaps: Map[] = [];
  errorMessage = '';
  showView!: boolean;
  matchParam!: string;
  continueButton = false;

  private socket: any;
  private isPlayer = false;
  private SOCKET_SERVER = 'http://192.168.18.235:3000';

  constructor(private dataService: ParamsDataService) {
    this.dataService.matchParam$.subscribe(param => this.matchParam = param);
    this.dataService.showView$.subscribe(showView => {
      this.showView = showView;
      if (this.showView) {
        this.errorMessage = '';
        this.continueButton = false;
        this.isPlayer = true;
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    if (!this.matchParam || !this.matchParam.trim()) {
      this.errorMessage = 'Invalid URL or the match code is not present 🤦';
      return;
    }

    this.socket = io(this.SOCKET_SERVER);
    this.socket.on('request-guid', () => {
      this.socket.emit('provide-guid', { guid: this.matchParam, isPlayer: this.isPlayer });
    });
    this.socket.on('error-alreadytwoplayersregistered', (message: string) => {
      this.errorMessage = message;
      this.continueButton = true;
    });
    this.socket.on('maps', (maps: Map[]) => {
      this.listMaps = maps;
      if (!this.listMaps || this.listMaps.length === 0) {
        this.errorMessage = 'No maps found for this match 😺';
      }
    });
    this.socket.on('error-isnotyourturn', (message: string) => {
      swal({
        title: '😠',
        text: message,
        confirmButtonColor: '#76b743',
        confirmButtonText: '😞',
      })
    });
  }

  ContinueAsViewer() {
    this.isPlayer = false;
    this.continueButton = false;
    this.errorMessage = '';
    this.socket.emit('provide-guid', { guid: this.matchParam, isPlayer: this.isPlayer });
  }

  disableMap(map: Map) {
    if (!this.isPlayer || map.disabled || map.winner)
      return;
    this.socket.emit('disable-map', { mapId: map.id, matchId: this.matchParam });
  }

  CancelMatchView() {
    this.showView = false;
    if (this.socket) {
      this.socket.emit('disconnect-user', { guid: this.matchParam });
      this.socket.disconnect();
    }
    this.dataService.updateShowView(this.showView)
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.emit('disconnect-user', { guid: this.matchParam });
      this.socket.disconnect();
    }
  }
}