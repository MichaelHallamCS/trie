import Trie from './trie.js';

const trie = new Trie();
const input = document.getElementById('textBox');
const suggestions = document.getElementById('suggestions');
const treeVis = document.getElementById('trie-visualization');

const wordsPath = 'data/words.txt';

async function init(){
    loadWords(wordsPath);
    input.addEventListener("input", handleInput());
}

async function loadWords(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    const words = text.split("/\r?\n/");

    for (const word of words){
        trie.insert(word);
    }
}

function handleInput(){
    
}

function renderSuggestions(words){

}

function selectSuggestion(word){

}

init();