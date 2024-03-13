import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Firestore,
  Timestamp,
  collection,
  collectionData,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-card.component.html',
  styleUrl: './main-card.component.css',
})
export class MainCardComponent {
  verses$: Observable<VerseDocument[]>;
  KJV$;

  constructor(public firestore: Firestore = inject(Firestore)) {
    const versesOfTheDayCollection = collection(
      this.firestore,
      'versesOfTheDay'
    );
    this.verses$ = collectionData(versesOfTheDayCollection) as Observable<
      VerseDocument[]
    >;

    const KJV = doc(this.firestore, 'versesOfTheDay/KJV');
    this.KJV$ = docData(KJV) as Observable<VerseDocument>;
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
  reference: string;
  verseCount: number;
}
