import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MainCardComponent } from '../main-card/main-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, MainCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
