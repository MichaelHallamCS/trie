//build logic

class TrieNode {
    constructor() {
        //child nodes are stored in a hashmap
        //character key, TrieNode value
        this.children = new Map(); 

        //tells if the path is a complete word
        this.isEndOfWord = false; 
    }
}

export class Trie {
    constructor(){
        this.root = new TrieNode();
    }

    insert(word){

        //set node as root
        let node = this.root;

        //iterate through characters in word
        //if charater isn't in trie, add it
        //if a node for the character is found, move to that node
        for (c in word){
            if (!node.children[c]) node.children[c] = new TrieNode();
            node = node.children[c];
        }

        //mark final characer as end of word
        this.endOfWord = true;
    }

    //method to search for a word in the trie (idk if we actually need this one - mark)
    //O(L) L = length of word
    boolean containsWord(word) {
        //base case: word is null
        if(!word) return false;

        //set node as root
        let node = this.root;
        
        //iterate through word
        //if the node doesn't contain the current character return false
        //if the node does contain the character as a child move to that child
        for(c in word){
            if(!node.children[c]) return false;
            node = node.children[c];
        }

        //return weather the word is a full word
        return node.isEndOfWord;
    }

    //searches for prefix in tree
    //O(L) L = length of prefix
    TrieNode containsPrefix(prefix) {
        //prefix is null
        is(!prefix) return false;

        for(c in prefix){
            if(!node.children[c]) return false;
            node = node.children[c];
        }

        return true;
    }

    //returns the node of the end of the prefix
    TrieNode findPrefixNode(prefix) {
        is(!prefix) return null;

        for(c in prefix){
            if(!node.children[c]) return null;
            node = node.children[c];
        }

        return node;
    }

    autocomplete(prefix){
       let node = this.root;
       let curr = "";
       for (let i = 0; i < prefix.length; i++){
        if (!node.children)
       }

    }