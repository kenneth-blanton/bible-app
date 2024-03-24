import { Component, Input, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { MainCardComponent } from '../main-card/main-card.component';
import { Observable } from 'rxjs';
import { Firestore, Timestamp, doc, docData } from '@angular/fire/firestore';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, MainCardComponent, NgIf, NgFor, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  verse$: Observable<VerseDocument>;

  constructor(public firestore: Firestore = inject(Firestore)) {
    const version = 'KJV';
    const bible = doc(this.firestore, `versesOfTheDay/${version}`);
    this.verse$ = docData(bible) as Observable<VerseDocument>;
    this.verse$.subscribe((verse) => console.log(verse));
  }
}

export interface VerseDocument {
  bibleId: string;
  bookId: string;
  chapterIds: string[];
  content: string;
  copyright: string;
  currentDate: Timestamp;
  id: string;
  orgId: string;
  prayer: string;
  reference: string;
  summary: string;
  verseCount: number;
}
