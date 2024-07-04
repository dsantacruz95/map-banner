import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Map } from './models/map';
import { OrderByPipe } from './utils/ordering.pipe';
import { NgForOf, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderByPipe, NgForOf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'map-banner';
  listMaps = [
    new Map('crossfire'),
    new Map('stalkx'),
    new Map('stalkyard'),
    new Map('boot_camp'),
    new Map('snark_pit'),
    new Map('olvidada_muerte'),
    new Map('vengeance'),
    new Map('dm_dust2'),
    new Map('moss'),
    new Map('bounce'),
  ];

  disableMap(map: Map) {
    if (map.disabled || this.listMaps.filter(m => !m.disabled).length === 1) {      
      return;
    }
    map.disabled = !map.disabled;
    if (this.listMaps.filter(m => !m.disabled).length === 1) {
      const winnerMap = this.listMaps.find(m => !m.disabled);
      if (winnerMap) {
        winnerMap.winner = true;
      }      
    }
  }
}