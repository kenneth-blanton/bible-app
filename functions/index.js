// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");

initializeApp();

// At 12AM every day, run ta scheduled function
// Take my API key from .env file
// Run the function to get the data from the API
// Save the data to Firestore

const key = process.env.BIBLE_API_KEY;
const bibles = { KJV: "de4e12af7f28f599-02", ASV: "06125adad2d5898a-01" };

const VERSES = [
  `1CO.4.4-1CO.4.8`,
  `1CO.10.13`,
  `1CO.10.31`,
  `1CO.13.4-1CO.13.8`,
  `1CO.16.13`,
  `2CO.5.17`,
  `2CO.5.21`,
  `2CO.12.9`,
  `HEB.11.1`,
  `HEB.11.6`,
  `HEB.12.2`,
  `HEB.13.5`,
  `1TI.1.12`,
  `2TI.1.7`,
  `2TI.2.15`,
  `2TI.3.16`,
  `1JN.1.9`,
  `1JN.3.22`,
  `1PE.3.15`,
  `1PE.5.7-1PE.5.8`,
  `JHN.3.16`,
  `JHN.5.24`,
  `JHN.10.10`,
  `JHN.11.25`,
  `JHN.14.6`,
  `JHN.16.33`,
  `ROM.6.23`,
  `ROM.8.28`,
  `ROM.10.9`,
  `ROM.15.13`,
  `JER.29.11`,
  `PHP.4.6-PHP.4.8`,
  `PHP.4.13`,
  `MAT.6.33`,
  `MAT.11.28-MAT.11.30`,
  `MAT.28.19-MAT.28.20`,
  `ISA.26.3`,
  `ISA.40.31`,
  `ISA.41.10`,
  `ISA.53.4-ISA.53.6`,
  `PSA.23`,
  `PSA.46.1`,
  `EPH.5.2`,
  `EPH.2.8-EPH.2.10`,
  `ZEP.3.17`,
  `ACT.1.8`,
  `GAL.5.22-GAL.5.23`,
  `GEN.1.26`,
  `PRO.3.5-PRO.3.6`,
  `PRO.22.6`,
  `JOS.1.9`,
  `DEU.31.6`,
  `JAS.5.16`,
];

var verseIndex;
var verseID;

async function fetchVerses(bibleName) {
  // handle errors of course
  let bibleID = bibles[bibleName];
  let response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/${bibleID}/passages/${verseID}?content-type=text&include-notes=true&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false&use-org-id=false`,
    {
      headers: {
        "api-key": key,
      },
    }
  );
  let { data } = await response.json();

  data.content = data.content.trim();
  data.currentDate = new Date();

  await getFirestore().collection("versesOfTheDay").doc(bibleName).set(data);
}

exports.verseOfTheDay = onSchedule("0 0 * * *", async () => {
  verseIndex = Math.floor(Math.random() * VERSES.length);
  verseID = VERSES[verseIndex];

  Object.keys(bibles).forEach((bibleName) => fetchVerses(bibleName));

  return "OK";
});
