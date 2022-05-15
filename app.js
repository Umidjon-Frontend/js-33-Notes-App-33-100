const notesInput = document.querySelector(".notes__input");
const notesTextarea = document.querySelector(".notes__textarea");
const notesAddBtn = document.querySelector(".notes__add-btn");

const notesDeleteAll = document.querySelector(".notes__delete-all");

const notesItems = document.querySelector(".notes__items");

const notes = JSON.parse(localStorage.getItem("notes")) || [];

notesAddBtn.addEventListener("click", addNotes);

// ADD NOTES
function addNotes() {
    if (notesInput.value === "" || notesTextarea.value === "") {
        alert("please add note title and details");
    } else {
        let notesTitle = notesInput.value;
        let notesDetail = notesTextarea.value;

        let note = {
            title: notesTitle,
            detail: notesDetail,
        };
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();

        notesInput.value = "";
        notesTextarea.value = "";
    }
}

// DISPLAY NOTES LISTS
function displayNotes() {
    notesItems.innerHTML = "";

    let noteItem = notes
        .map((item, index) => {
            return `
            <div class="notes__item">
                <div class="notes__item-header">
                    <div class="notes__item-title">Note ${index + 1}</div>
                    <div class="notes__item-btns">
                        <button
                            class="notes__btn-delete"
                            onclick="deleteNotes(${index})"
                        >
                            Delete
                        </button>
                        <button
                            class="notes__btn-edit"
                            onclick="editNotes(${index})"
                        >
                            Edit
                        </button>
                    </div>
                </div>
                <hr />
                <div class="notes__item-body">
                    <h3>Title: ${item.title}</h3>
                    <p>${item.detail}</p>
                </div>
            </div>
        `;
        })
        .join("");
    if (noteItem.length === 0) {
        document.querySelector(".no-notes").style.display = "block";
    } else {
        notesItems.innerHTML = noteItem;
        document.querySelector(".no-notes").style.display = "none";
    }
}
displayNotes();

// DELETE NOTES
function deleteNotes(id) {
    notes.splice(id, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}

// EDIT NOTES
function editNotes(id) {
    notesInput.value = notes[id].title;
    notesTextarea.value = notes[id].detail;

    notes.splice(id, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}

// DELETE ALL NOTES
notesDeleteAll.addEventListener("click", () => {
    notes.splice(0, notes.length);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
});
