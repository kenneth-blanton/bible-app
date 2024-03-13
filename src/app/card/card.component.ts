import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  homeCards = [
    // {},
    {
      title: 'Summarization',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'Prayer',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];
}
