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
        this.isWord = false;
    }

    insert(word){
        
        word = word.toLowerCase().trim();
        //set node as root
        let node = this.root;

        //iterate through characters in word
        //if charater isn't in trie, add it
        //if a node for the character is found, move to that node
        for (const c of word){
            if (!node.children.has(c)) node.children.set(c, new TrieNode());
            node = node.children.get(c);
        }

        //mark final characer as end of word
        node.isEndOfWord = true;
    }

    //method to search for a word in the trie (idk if we actually need this one - mark)
    //O(L) L = length of word
    containsWord(word) {
        word = word.toLowerCase().trim();
        //base case: word is null
        if(!word) return false;

        //set node as root
        let node = this.root;
        
        //iterate through word
        //if the node doesn't contain the current character return false
        //if the node does contain the character as a child move to that child
        for(const c of word){
            if(!node.children.has(c)) return false;
            node = node.children.get(c);
        }

        //return weather the word is a full word
        return node.isEndOfWord;
    }

    //searches for prefix in tree
    //O(L) L = length of prefix
    containsPrefix(prefix) {
        prefix = prefix.toLowerCase().trim();
        let node = this.root;
        //prefix is null
        if(!prefix) return false;

        for(const c of prefix){
            if(!node.children.has(c)) return false;
            node = node.children.get(c);
        }

        return true;
    }

    //returns the node of the end of the prefix
    findPrefixNode(prefix) {
        prefix = prefix.toLowerCase().trim();
        let node = this.root;
        if(!prefix) return null;

        for(const c of prefix){
            if(!node.children.get(c)) return null;
            node = node.children.get(c);
        }

        return node;
    }
    
    // // finds where the prefix ends and records each letter as it goes to the next
    // autocomplete2(prefix){
    //    let node = this.root;
    //    let curr = "";
    //    for (let i = 0; i < prefix.length; i++){
    //         if (!node.children[prefix[i]]){
    //             return [];
    //         }
    //         node = node.children[prefix[i]];
    //         curr += prefix[i]
    //    }
    //    // collects the list of words once the prefix is found
    //    let list = []
    //    this.autocompleteHelper();
    //    return list;
    // }

    // //autocomplete helper checks if a node is a full word or still have children
    // autocompleteHelper(root, list, curr){
    //     if (root.isWord){
    //         list.push(curr);
    //     }
    //     if (!Object.keys(root.children).length){
    //         return;
    //     }
    //     // Handles subtree
    //     for (c in root.children){
    //         this.autocompleteHelper(root.children.get(child), list, curr + child)
    //     }
    // }


    
    //mark thoughs
    autocomplete(prefix){
        prefix = prefix.toLowerCase().trim();
        //uses helper method to find where prefix ends
        let node = this.findPrefixNode(prefix);
        const words = [];
        if(node == null) return words;
        //calls depth first search method which searches for words and adds them to words array
        this.dfs(node, prefix, words)
        return words;
    }

    dfs(node, prefix, words){
        //checks if a node marks the end of a word
        //if so, it gets added to the words array
        if(node.isEndOfWord) {
            words.push(prefix);
        }

        //if its not the end of a word
        //add the new character to the end of the prefix (bulid word)
        //recursively call bfs
        for(const [c, child] of node.children) {
            this.dfs(child, prefix + c, words);
        }
    }
}