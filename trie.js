//build logic
class TrieNode {
    constructor() {
        this.children = new Map(); //child nodes are stored in a hashmap
                                   //character key, TrieNode value
        this.endOfWord = false; //tells if the path is a complete word
    }
}

class Trie {
    constructor(){
        this.root = new TrieNode();
    }

    insert(word){
        let node = this.root;
        for (c in word){
            if (!node.children[c]) node.children[c] = new TrieNode();
            node = node.children[c];
        }
        this.endOfWord = true;
    }

    autocomplete(path){
        
    }

}