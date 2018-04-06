class Trie {
  constructor() {
    this.characters = {};
    this.isWord = false;
  }
  addWord(word, index = 0) {
    if (index === word.length) {
      this.isWord = true;
    } else if (index < word.length) {
      var char = word[index];
      var subTrie = this.characters[char] || new Trie();
      subTrie.addWord(word, index + 1);
      this.characters[char] = subTrie;
    }
    return this;
  }

  findWord(word, index = 0) {
    // This function will return the node in the trie
    // which corresponds to the end of the passed in word.

    // Be sure to consider what happens if the word is not in this Trie.

    var char = word[index];
    if (index < word.length - 1 && this.characters[char]) {
      index += 1;
      return this.characters[char].findWord(word, index);
    } else {
      return this.characters[char];
    }
  }
  getWords(words = [], currentWord = "") {
    // This function will return all the words which are
    // contained in this Trie.
    // it will use currentWord as a prefix,
    // since a Trie doesn't know about its parents.

    if (this.isWord) {
      words.push(currentWord);
    }
    for (var char in this.characters) {
      var nextWord = currentWord + char;
      this.characters[char].getWords(words, nextWord);
    }
    return words;
  }
  autoComplete(prefix) {
    // This function will return all completions
    // for a given prefix.
    // It should use find and getWords.
    var subTrie = this.find(prefix);
    if (subTrie) {
      return subTrie.getWords([], prefix);
    } else {
      return [];
    }
  }
  removeWord(word) {
    let foundWord = this.findWord(word);
    if (foundWord === undefined) {
      return;
    }

    // if the word has additional characters, just remove the isWord property
    if (Object.keys(foundWord.characters).length > 0) {
      foundWord.isWord = false;
      return;
    }

    // otherwise we have to make our way to that word and delete anytime there is only 1 characters property
    let currentTrie = this;
    let index = 0;
    var char = word[index];
    while (index < word.length - 1 && currentTrie) {
      var char = word[index];
      currentTrie = currentTrie.characters[char];
      var skip = currentTrie.characters[word[index + 1]].characters;
      if (Object.keys(skip).length === 1) {
        delete currentTrie.characters[word[index + 1]];
        break;
      }
      index++;
    }
  }
}
