const container = document.querySelector(".container");

let notes = JSON.parse(localStorage.getItem("@ChrisCoy:notes"));
notes = notes ? notes : [];

function clearScreen() {
  document.querySelectorAll(".note").forEach((div) => {
    div.remove();
  });
  notes = [];
  localStorage.clear();
}

function deleteNote(id) {
  notes = notes.filter((note) => {
    console.log(note.id, id);
    return note.id !== id;
  });

  document.getElementById(String(id)).remove();
  localStorage.setItem("@ChrisCoy:notes", JSON.stringify(notes));
}

function renderNote({ offsetX, offsetY, rotate, _id, content }) {
  const divToAdd = document.createElement("div");
  var positionX = offsetX;
  var positionY = offsetY;
  var rotation = rotate;
  var id = _id;
  var contentDiv = content ? content : "";

  if (!id) {
    rotation =
      Math.floor(Math.random() * 12) % 2
        ? Math.floor(Math.random() * 12)
        : Math.floor(Math.random() * 12) * -1;

    positionX = Math.floor((offsetX / document.body.clientWidth) * 100);
    positionY = Math.floor((offsetY / document.body.clientHeight) * 100);
    id = notes.length !== 0 ? notes.length + 1 : 1;

    notes.push({ id, positionX, positionY, rotation, content: content });
    localStorage.setItem("@ChrisCoy:notes", JSON.stringify(notes));
  }

  // prettier-ignore
  divToAdd.innerHTML = `<div class='note' style='left: ${positionX}%; top: ${positionY}%;
  transform: rotate(${rotation}deg);' id='${id}'>
    <span onclick='deleteNote(${id})'></span>
    <img src='./sources/images/note.png' />
    <textarea name='note-content' id='text${id}' class='note-content'>${contentDiv}</textarea>
  </div>`;

  // divToAdd.firstChild.childNodes[5].addEventListener("focusin", (evt) => {
  //   console.log("entrooou");
  //   evt.path[1].style.zIndex = "1";
  // });
  // divToAdd.firstChild.childNodes[5].addEventListener("focusout", (evt) => {
  //   notes = notes.map((item) => {
  //     return item.id == id ? { ...item, content: evt.path[0].value } : item;
  //   });
  //   localStorage.setItem("@ChrisCoy:notes", JSON.stringify(notes));

  //   setInterval(() => {
  //     evt.path[1].style.zIndex = "0";
  //   }, 1);
  // });

  // divToAdd.firstChild.childNodes[5].addEventListener("keydown", (evt) => {
  //   if (evt.key === "Escape") {
  //     evt.path[0].blur();
  //   }
  // });

  document.querySelectorAll(".note").forEach((item) => {
    item.addEventListener("focusin", (evt) => {
      console.log("entrou");
      console.log(evt.path);
      evt.path[1].style.zIndex = "2";
    });
    item.addEventListener("focusout", (evt) => {
      console.log("saiu");
      console.log(evt.path);
      evt.path[1].style.zIndex = "0";
    });
    item.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        evt.path[0].blur();
      }
    });
  });

  console.log(divToAdd.firstChild);
  container.appendChild(divToAdd.firstChild);
}

document.addEventListener("DOMContentLoaded", () => {
  notes.forEach((note) => {
    renderNote({
      offsetX: note.positionX,
      offsetY: note.positionY,
      _id: note.id,
      rotate: note.rotation,
      content: note.content,
    });
  });

  container.addEventListener("mousedown", (evt) => {
    if (evt.path[0] == container) {
      renderNote({ offsetX: evt.offsetX, offsetY: evt.offsetY });
    }
  });
});
