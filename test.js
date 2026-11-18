
import { Trie } from "./trie.js";

const trie = new Trie();

// Insert words
trie.insert("cat");
trie.insert("car");
trie.insert("dog");

// Test complete words
console.log("Contains cat:", trie.containsWord("cat"));
console.log("Contains car:", trie.containsWord("car"));
console.log("Contains dog:", trie.containsWord("dog"));
console.log("Contains cow:", trie.containsWord("cow"));

// Test prefixes
console.log("Prefix ca:", trie.containsPrefix("ca"));
console.log("Prefix do:", trie.containsPrefix("do"));
console.log("Prefix xy:", trie.containsPrefix("xy"));

// Test autocomplete2
console.log("\nAutocomplete Tests:");

console.log("Autocomplete ca:", trie.autocomplete("ca"));
console.log("Autocomplete c:", trie.autocomplete("c"));
console.log("Autocomplete do:", trie.autocomplete("do"));
console.log("Autocomplete xy:", trie.autocomplete("xy"));