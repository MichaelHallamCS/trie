# trie: Trie Autocomplete

An interactive web app that shows how a trie (prefix tree) finds words as you type. Enter a prefix, get autocomplete suggestions, and watch the tree traversal animate alongside them.

Built by Michael Hallam, Ethan Onesti, and Mark Herrell (Smooth Operators) for CS 351: Data Structures at UW-Green Bay.

**Demo video:** <!-- TODO: add link -->

**Live Site:**https://trie-me.vercel.app/

## Features

- **Live autocomplete:** suggestions update on every keystroke, sorted by length, then alphabetically
- **Trie visualization:** the path for your current prefix is drawn as an animated SVG tree, with the next possible letters branching below
- **Click to explore:** click a suggestion to fill the input, click a child node to extend the prefix, or click an earlier node on the path to step back
- **Large branches handled:** only 6 children show at a time; the `+N` node pages through the rest and `↻` wraps back to the start
- **Long prefixes collapsed:** paths longer than 5 letters show the most recent letters with a `…` node
- **Word-end markers:** a ring around a node means the path so far is a complete word
- Respects `prefers-reduced-motion`

## Project Structure

```
trie/
├── index.html   # Page layout
├── style.css    # Styling and tree animations
├── app.js       # Loads the word list, handles input, renders suggestions
├── trie.js      # Trie data structure
├── vis.js       # SVG tree visualization
├── test.js      # Console tests for the trie
└── data/
    └── words.txt  # Word list (one word per line, ~10,000 common English words)
```

## Getting Started

No dependencies or build step, but the app uses ES modules and `fetch`, so it must be served over HTTP (opening `index.html` directly will not work).

```bash
git clone https://github.com/MichaelHallamCS/trie.git
cd trie
python -m http.server 8000
```

Then open `http://localhost:8000`.

## How It Works

Each trie node stores its children in a `Map` (character → node) and an `isEndOfWord` flag. Words that share a prefix share the same path from the root.

To autocomplete, the app walks down the tree one character at a time to find the node where the prefix ends, then runs a depth-first search from that node to collect every complete word beneath it.

| Method                  | Purpose                                         | Time                       |
| ----------------------- | ----------------------------------------------- | -------------------------- |
| `insert(word)`          | Add a word                                      | O(L)                       |
| `containsWord(word)`    | Check for a complete word                       | O(L)                       |
| `containsPrefix(prefix)`| Check that any word starts with the prefix      | O(L)                       |
| `findPrefixNode(prefix)`| Return the node where the prefix ends           | O(L)                       |
| `autocomplete(prefix)`  | Return all words starting with the prefix       | O(L + N) plus sorting      |

L is the length of the word or prefix, and N is the number of nodes under the prefix node.

## Word List

`data/words.txt` is loaded on page load and inserted into the trie one word per line. It comes from the [google-10000-english](https://github.com/first20hours/google-10000-english) list of the most common English words (`google-10000-english.txt`). See that repo for the data's origin and license.

## Tests

`test.js` inserts a few words and logs the results of `containsWord`, `containsPrefix`, and `autocomplete` to the console. Since it uses ES module imports, run it with Node in module mode:

```bash
node --input-type=module < test.js
```

## Tech Stack

HTML, CSS, JavaScript (ES modules, SVG)
