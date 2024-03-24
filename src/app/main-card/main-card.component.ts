import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VerseDocument } from '../home/home.component';

@Component({
  selector: 'app-main-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-card.component.html',
  styleUrl: './main-card.component.css',
})
export class MainCardComponent {
  @Input() verseDocument!: VerseDocument;
}
