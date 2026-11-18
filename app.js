import {Trie} from './trie.js';
import {renderTree} from './vis.js';

const trie = new Trie();
const input = document.getElementById('textBox');
const suggestions = document.getElementById('suggestions');
const suggestionsList = document.getElementById("suggestions-list");
const treeVis = document.getElementById('trie-visualization');

const wordsPath = 'data/words.txt';

async function init(){
    await loadWords(wordsPath);
    input.addEventListener("input", handleInput);
    //renderSuggestions();
    // trie.insert("cat");
    // trie.insert("car");
    // trie.insert("dog");
}

async function loadWords(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    const words = text.split(/\r?\n/);

    for (const word of words){
        trie.insert(word);
    }
}

function handleInput(){
    const prefix = input.value.trim().toLowerCase();
    if (!prefix){
        suggestionsList.innerHTML = "";
        //clear tree
    }
    const results = trie.autocomplete(prefix);
    let node = trie.findPrefixNode(prefix);

    renderSuggestions(results);
    renderTree(treeVis, prefix, node);
}

function renderSuggestions(suggestions){

    suggestionsList.innerHTML = "";
    document.getElementById('startTypingText').innerHTML = "";
    
    //const testArray = ["pig", "cow", "dog", "cat"];
    
    //document.getElementById("startTypingText").style.display = 'none';

    suggestions.forEach((word) => {
        const li = document.createElement("li");
        li.textContent = word;
        li.addEventListener('click', () => selectSuggestion(word));
        suggestionsList.appendChild(li);
    });
}

function selectSuggestion(word){
    input.value = word;
    handleInput();
}

init();