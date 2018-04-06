class Trie {
  constructor() {
    this.characters = {};
    this.isWord = false;
  }
  addWord(word, index = 0) {
    if (index === word.length) {
      this.isWord = true;
    } else if (index < word.length) {
      let char = word[index];
      let subTrie = this.characters[char] || new Trie();
      subTrie.addWord(word, index + 1);
      this.characters[char] = subTrie;
    }
    return this;
  }

  findWord(word, index = 0) {
    let char = word[index];
    if (index < word.length - 1 && this.characters[char]) {
      index += 1;
      return this.characters[char].findWord(word, index);
    } else {
      return this.characters[char];
    }
  }
  getWords(words = [], currentWord = "") {
    if (this.isWord) {
      words.push(currentWord);
    }
    for (let char in this.characters) {
      let nextWord = currentWord + char;
      this.characters[char].getWords(words, nextWord);
    }
    return words;
  }
  autoComplete(prefix) {
    let subTrie = this.find(prefix);
    if (subTrie) {
      return subTrie.getWords([], prefix);
    } else {
      return [];
    }
  }
}
