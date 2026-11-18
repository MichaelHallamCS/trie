//render tree


//draw path

//draw children

// CODE FROM DSA VIZUALIZER -- MICHAEL
// function generateTree(arr) {
//     canvas.innerHTML = '';

//     const n = arr.length;
//     const levels = Math.floor(Math.log2(n)) + 1;
//     const W = 600, R = 20, LEVEL_GAP = 70, PAD = 12;
//     const H = PAD * 2 + R * 2 + (levels - 1) * LEVEL_GAP + 14;

//     const pos = (i) => {
//         const level = Math.floor(Math.log2(i + 1));
//         const slot = i - (2 ** level - 1);
//         return {
//             x: ((slot + 0.5) / 2 ** level) * W,
//             y: PAD + R + level * LEVEL_GAP
//         };
//     };

//     const tree = document.createElement('div');
//     tree.classList.add('heap-tree');
//     tree.style.cssText = `position: relative; width: ${W}px; height: ${H}px; max-width: 100%;`;

//     for (let i = 1; i < n; i++) {
//         const p = pos(Math.floor((i - 1) / 2));
//         const c = pos(i);
//         const dx = c.x - p.x;
//         const dy = c.y - p.y;
//         const length = Math.hypot(dx, dy);
//         const angle = Math.atan2(dy, dx) * (180 / Math.PI);

//         const edge = document.createElement('div');
//         edge.classList.add('tree-edge');
//         edge.dataset.child = i;
//         edge.style.cssText = `
//             position: absolute;
//             left: ${p.x}px; top: ${p.y - 1}px;
//             width: ${length}px; height: 2px;
//             background-color: var(--text-dim);
//             transform-origin: 0 50%;
//             transform: rotate(${angle}deg);
//         `;
//         tree.appendChild(edge);
//     }

//     arr.forEach((value, i) => {
//         const { x, y } = pos(i);

//         const node = document.createElement('div');
//         node.classList.add('tree-node');
//         node.dataset.index = i;
//         node.style.cssText = `
//             position: absolute;
//             left: ${x - R}px; top: ${y - R}px;
//             width: ${R * 2}px; height: ${R * 2}px;
//             border-radius: 50%;
//             display: flex; align-items: center; justify-content: center;
//             background-color: var(--accent-color);
//             color: #fff; font-weight: bold;
//             transition: background-color 0.2s;
//         `;

//         const val = document.createElement('span');
//         val.classList.add('node-value');
//         val.textContent = value;

//         const idx = document.createElement('div');
//         idx.textContent = i;
//         idx.style.cssText = `
//             position: absolute; top: ${R * 2 + 2}px; left: 0; width: 100%;
//             text-align: center; font-size: 11px; font-weight: normal;
//             color: var(--text-dim);
//         `;

//         node.append(val, idx);
//         tree.appendChild(node);
//     });

//     const row = document.createElement('div');
//     row.classList.add('heap-array');
//     row.style.cssText = 'display: flex; gap: 6px; margin-top: 16px;';

//     arr.forEach((value, i) => {
//         const cell = document.createElement('div');
//         cell.classList.add('heap-cell');
//         cell.dataset.index = i;
//         cell.style.cssText = `
//             width: 40px; padding: 6px 0; text-align: center; border-radius: 6px;
//             background-color: var(--accent-color); color: #fff; font-weight: bold;
//             transition: background-color 0.2s;
//         `;

//         const val = document.createElement('span');
//         val.classList.add('cell-value');
//         val.textContent = value;

//         const idx = document.createElement('div');
//         idx.textContent = i;
//         idx.style.cssText = 'font-size: 10px; font-weight: normal; opacity: 0.7;';

//         cell.append(val, idx);
//         row.appendChild(cell);
//     });

//     const wrapper = document.createElement('div');
//     wrapper.classList.add('heap-view');
//     wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; width: 100%;';
//     wrapper.append(tree, row);
//     canvas.appendChild(wrapper);
// }