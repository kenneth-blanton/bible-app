import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VerseDocument } from '../home/home.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() verseDocument!: string;
  @Input() title!: string;

  constructor() {}
}
