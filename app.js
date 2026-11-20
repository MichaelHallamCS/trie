import {Trie} from './trie.js';
import {renderTree} from './vis.js';

const trie = new Trie();
const input = document.getElementById('textBox');
const suggestions = document.getElementById('suggestions');
const suggestionsList = document.getElementById("suggestions-list");
const treeVis = document.getElementById('trie-visualization');
const startTypingText = document.getElementById('startTypingText');

const wordsPath = 'data/words.txt';

async function init(){
    await loadWords(wordsPath);
    input.addEventListener("input", handleInput);
}

//takes words from text file and adds them to trie
async function loadWords(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    const words = text.split(/\r?\n/);

    for (const word of words){
        trie.insert(word);
    }
}

//function to take input as it updates, call autocomplete, and call renderSuggestions with the autocomplete list
function handleInput(){
    const prefix = input.value.trim().toLowerCase();
    
    if (!prefix) {
        startTypingText.style.display = "block";
    } else {
        startTypingText.style.display = "none";
    }

    //gets the autcomplete list and ending prefix node
    const results = trie.autocomplete(prefix);
    let node = trie.findPrefixNode(prefix);

    //calls methods to display list and tree visual
    renderSuggestions(results);
    renderTree(treeVis, prefix, node, (newPrefix) => {
        //updates the prefix if a leaf node is clicked and recalls handleInput
        input.value = newPrefix;
        handleInput();
    });
}

//displays the autocomplete list on the web page
function renderSuggestions(suggestions){

    //clears default text
    suggestionsList.innerHTML = "";

    //iterates through each words and adds it to html as a list item
    suggestions.forEach((word) => {
        const li = document.createElement("li");
        li.textContent = word;
        li.addEventListener('click', () => selectSuggestion(word));
        suggestionsList.appendChild(li);
    });
}

//replaces the prefix with the selected autocomplete word
function selectSuggestion(word){
    input.value = word;
    handleInput();
}

init();