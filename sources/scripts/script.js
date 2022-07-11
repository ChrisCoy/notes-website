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

  divToAdd.id = id;
  divToAdd.style = `left: ${positionX}%; top: ${positionY}%; transform: rotate(${rotation}deg);`;
  divToAdd.classList.add("note");
  const closeButton = document.createElement("span");
  closeButton.onclick = () => {
    deleteNote(id);
  };
  const imgNote = document.createElement("img");
  imgNote.src = "./sources/images/note.png";

  const noteContent = document.createElement("textarea");
  noteContent.id = "text:" + id;
  noteContent.classList.add("note-content");
  noteContent.value = contentDiv;

  divToAdd.onmouseenter = () => {
    divToAdd.style.zIndex = "2";
  };

  divToAdd.onmouseleave = () => {
    divToAdd.style.zIndex = "0";
  };

  noteContent.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      noteContent.blur();
    }
  });

  noteContent.onblur = () => {
    notes = notes.map((note) => {
      return note.id == id ? { ...note, content: noteContent.value } : note;
    });
    localStorage.setItem("@ChrisCoy:notes", JSON.stringify(notes));
  };

  divToAdd.appendChild(closeButton);
  divToAdd.appendChild(imgNote);
  divToAdd.appendChild(noteContent);

  container.appendChild(divToAdd);
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
    if (evt.target == container) {
      renderNote({ offsetX: evt.offsetX, offsetY: evt.offsetY });
    }
  });
});
