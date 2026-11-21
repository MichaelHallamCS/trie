const NS = 'http://www.w3.org/2000/svg';
const R = 20;
const GAP_Y = 68;
const GAP_X = 54;
const PAD = 16;
const MAX_CHILDREN = 6;
const MAX_PATH = 5;

let prevPrefix = ''; 
let childOffset = 0;

export function renderTree(container, prefix, node, onNodeClick) {
  const before = prevPrefix;
  
  if(prefix !== before) {
    childOffset = 0;
  }
  
  prevPrefix = prefix || '';
  container.innerHTML = '';

  if (!prefix) {
    container.appendChild(message('Watch the traversal as you type a prefix.'));
    return;
  }
  if (!node) {
    container.appendChild(message(`No words start with "${prefix}"`));
    return;
  }

  const grew = prefix.length > before.length && prefix.startsWith(before);
  const shrank = prefix.length < before.length && before.startsWith(prefix);
  const newCount = grew ? prefix.length - before.length
                 : (shrank || prefix === before) ? 0
                 : prefix.length;
  const animateChildren = prefix !== before;

  let letters = [...prefix];
  const collapsed = letters.length > MAX_PATH;
  if (collapsed) letters = letters.slice(-MAX_PATH);

  const pathNodes = [{ label: '', cls: 'root', nodePrefix: '' }];

  if (collapsed) pathNodes.push({ label: '…', cls: 'more' });

  const offset = prefix.length - letters.length;

  letters.forEach((ch, i) => {
    const last = i === letters.length - 1;
    const freshIdx = i - (letters.length - newCount);

    pathNodes.push({
      label: ch,
      cls: last ? 'current' : '',
      nodePrefix: prefix.slice(0, offset + i + 1),
      end: last && node.isEndOfWord,
      enter: freshIdx >= 0,
      delay: Math.max(freshIdx, 0) * 0.08,
    });
  });

  const entries = [...node.children.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  //move children 6 over
  const shown = entries.slice(
    childOffset,
    childOffset + MAX_CHILDREN
  );
  const extra = Math.max(
    0, entries.length - childOffset - shown.length
  );

  const base = newCount * 0.08 + 0.05;
  const childNodes = shown.map(([ch, child], i) => ({
    label: ch,
    end: child.isEndOfWord,
    enter: animateChildren,
    delay: base + i * 0.05,
  }));
 
  //shows number of nodes extra when there are more than able to show, or a back to beginning button when at the end of the list
  if(entries.length > MAX_CHILDREN) {
    childNodes.push({
      label: extra > 0 ? `+${extra}` : `↻`,
      cls: 'more',
      enter: animateChildren,
      delay: base + shown.length * 0.05
    })
  }

  const width = Math.max(childNodes.length * GAP_X, 2 * R + 2 * PAD) + 2 * PAD;
  const levels = pathNodes.length + (childNodes.length ? 1 : 0);
  const height = PAD * 2 + R * 2 + (levels - 1) * GAP_Y;
  const cx = width / 2;

 const svg = make('svg', { viewBox: `0 0 ${width} ${height}`, width, height, class: 'tree-svg' });
  svg.style.maxWidth = '100%';
  svg.style.height = 'auto';

  pathNodes.forEach((n, i) => { n.x = cx; n.y = PAD + R + i * GAP_Y; });
  const childY = PAD + R + pathNodes.length * GAP_Y;
  const startX = cx - ((childNodes.length - 1) * GAP_X) / 2;
  childNodes.forEach((n, i) => { n.x = startX + i * GAP_X; n.y = childY; });

  for (let i = 1; i < pathNodes.length; i++) edge(svg, pathNodes[i - 1], pathNodes[i]);
  const parent = pathNodes[pathNodes.length - 1];
  childNodes.forEach(n => edge(svg, parent, n));

  //makes it so past nodes are clickable to return to shorter prefixes
  pathNodes.forEach(n => {
    if(n.nodePrefix !== undefined && n.nodePrefix !== prefix) {
      circle(svg, n, () => onNodeClick(n.nodePrefix));
    } else {
      circle(svg, n);
    }
  })

  //makes it so when a leaf node is clicked it gets added to the prefix
  childNodes.forEach(n => {
    //makes 'more' nodes clickable to shift over
    if(n.cls === 'more'){ 
      circle(svg, n, () => {
        childOffset += MAX_CHILDREN;
        if(childOffset >= entries.length) {
          childOffset = 0;
        }

        renderTree(container, prefix, node, onNodeClick);

      });
      //makes letter nodes clickable to add to prefix
    } else circle(svg, n, () => onNodeClick(prefix + n.label));
  });

  container.appendChild(svg);
}

function make(name, attrs = {}) {
  const el = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function edge(svg, a, b) {
  const line = make('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'tree-edge' });
  if (b.enter) {
    line.classList.add('enter');
    line.style.setProperty('--len', Math.hypot(b.x - a.x, b.y - a.y));
    line.style.setProperty('--delay', `${b.delay}s`);
  }
  svg.appendChild(line);
}

function circle(svg, n, onClick = null) {
  const g = make('g', { class: `tree-node ${n.cls || ''}`.trim() });
  if (n.enter) {
    g.classList.add('enter');
    g.style.setProperty('--delay', `${n.delay + 0.12}s`);
  }
  g.appendChild(make('circle', { cx: n.x, cy: n.y, r: R }));
  if (n.end) g.appendChild(make('circle', { cx: n.x, cy: n.y, r: R - 5, class: 'word-end-ring' }));
  const text = make('text', { x: n.x, y: n.y });
  text.textContent = n.label;
  g.appendChild(text);
  svg.appendChild(g);

  //make the node clickable
  if(onClick) {
    g.classList.add('clickable');
    g.style.cursor = 'pointer';
    g.addEventListener('click', onClick);
  }
}

function message(text) {
  const el = document.createElement('p');
  el.className = 'empty-state';
  el.textContent = text;
  return el;
}