import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Map } from './models/map';
import { OrderByPipe } from './utils/ordering.pipe';
import { NgForOf, NgClass } from '@angular/common';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderByPipe, NgForOf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'map-banner';
  listMaps: Map[] = [];
  errorMessage = '';
  private socket: any;
  private urlParams = new URLSearchParams(window.location.search);
  private matchParam = this.urlParams.get('match');

  constructor() { }

  ngOnInit() {
    if (!this.matchParam) {
      this.errorMessage = 'Invalid URL or the match code is not present 🤦';
      return;
    }

    this.socket = io('http://192.168.18.235:3000');
    this.socket.on('request-guid', () => {
      this.socket.emit('provide-guid', this.matchParam);
    });
    this.socket.on('maps', (maps: Map[]) => {
      this.listMaps = maps;
      if (!this.listMaps || this.listMaps.length === 0) {
        this.errorMessage = 'No maps found for this match 😺';
      }
    });
  }

  disableMap(map: Map) {
    if (map.disabled || map.winner)
      return;
    this.socket.emit('disable-map', {mapId: map.id, matchId: this.matchParam});
  }
}