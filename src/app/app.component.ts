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
  private socket: any;

  constructor() { }

  ngOnInit() {
    this.socket = io('http://192.168.18.235:3000');
    this.socket.on('maps', (maps: Map[]) => {
      this.listMaps = maps;
    });
  }

  disableMap(map: Map) {
    this.socket.emit('disable-map', map.id);
  }
}