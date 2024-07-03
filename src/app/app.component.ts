import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Map } from './models/map';
import { OrderByPipe } from './utils/ordering.pipe';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderByPipe, NgForOf],
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
}
