#!/usr/bin/env ts-node

import { VERBS } from './verbs';
import { NOUNS } from './nouns';
import { promises as fs } from 'fs';
import { sampleSize } from 'lodash';
import os from 'os';
import path from 'path';

const homedir = os.homedir();
const WORDS_FILE = path.join(homedir, '.lhwords.txt');

const args = process.argv.slice(2);

if (args.includes('-n')) {
  dispayRandomVerbsAndNouns();
} else {
  displayRandomVerbsAndMyWords();
}

async function displayRandomVerbsAndMyWords() {
  const wordsArray = await readWordsFile();
  const verbs = sampleSize(VERBS, 10);
  const randomWords = sampleSize(wordsArray, 10);
  const wordTable = generateWordTable(verbs, randomWords);

  console.table(wordTable);
}

function dispayRandomVerbsAndNouns() {
  const verbs = sampleSize(VERBS, 10);
  const nouns = sampleSize(NOUNS, 10);
  const wordTable = generateWordTable(verbs, nouns);

  console.table(wordTable);
}

async function readWordsFile() {
  try {
    const rawWordsFile = await fs.readFile(WORDS_FILE);
    const words = rawWordsFile.toString().split('\n');
    return words;
  } catch (e) {
    console.error(e);
  }
}

function generateWordTable(setOne: string[], setTwo: string[]) {
  const words = [];
  for (let i = 0; i < 10; i++) {
    words.push([setOne[i], setTwo[i]]);
  }

  return words;
}
