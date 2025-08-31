// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))



// ===== Data: array of objects =====
    // Each item: { id: number, name: string, color: string, done: boolean }
    let items = [
      { id: 1, name: "Apples",  color: "#e57373", done: false },
      { id: 2, name: "Bananas", color: "#fff176", done: false },
    ];
    let nextId = 3;

    // ===== DOM refs =====
    const titleEl   = document.getElementById("title");
    const listEl    = document.getElementById("list");
    const addForm   = document.getElementById("addForm");
    const nameInput = document.getElementById("nameInput");
    const btnDeleteLast = document.getElementById("deleteLast");

    // ===== Functions =====
    function randomColor() {
        const n = Math.floor(Math.random() * 0xFFFFFF);
        return "#" + n.toString(16).padStart(6, "0");
    }

    function updateTitle() {
      const count = items.length;
      titleEl.textContent = "My Items (${count})";
    }

    function render() {
      listEl.innerHTML = "";

      items.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item.name;
          li.dataset.id = item.id;
          if (item.done) li.classList.add("done");
          li.style.background = item.color;
          listEl.append(li);
      });

      updateTitle();
    }

    // ===== Events =====
    // 1) Add item on form submit
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      if (!name) return;
      
      items.push({
        id: nextId++,
        name,
        color: randomColor(),
        done: false,
      });

      nameInput.value = "";

      render();
    });

    // 2) Delete last item on button click
    btnDeleteLast.addEventListener("click", () => {
      if (items.length > 0) {
        items.pop();
      }

      render();
    });

    // 3) Toggle "done" by clicking an item (event delegation on the <ul>)
    listEl.addEventListener("click", (e) => {
      e.target.closest("li");

      if (!li) return;

      const id = Number(li.dataset.id);
      const item = item.find(i => i.id == id);
      if (!item) return;

      item.done = !item.done;
      render();
    });

    // Initial paint
    render();