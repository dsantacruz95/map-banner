import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadermatchComponent } from './components/headermatch/headermatch.component';
import { JoinmatchComponent } from './components/joinmatch/joinmatch.component';
import { ParamsDataService } from './shared/ParamsDataService.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadermatchComponent, JoinmatchComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  matchParam = '';
  showListView!: boolean;
  inputElement!: HTMLInputElement;

  constructor(private dataService: ParamsDataService, private elementRef: ElementRef) {
    this.dataService.showView$.subscribe(value => {
      this.showListView = value;
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit() {
    this.inputElement = this.elementRef.nativeElement.querySelector('.match-param');
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }

  JoinMatchView() {
    this.showListView = true;    
    this.dataService.updateMatchParam(this.matchParam);
    this.dataService.updateShowView(this.showListView);
  }
}