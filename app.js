const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const bgcolors = ["brown", 'seagreen', "orange", "LightGray", 'Gray'];
const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")

function changebg() {
    console.log("Hello")
    document.getElementById("main").style = `background-color:${bgcolors[Math.floor(Math.random() * bgcolors.length)]}`;
}

addBtn.addEventListener(
    "click",
    function () {
        addNote()
    }
)

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach((note) => {
        data.push(note.value);
    });
    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
};

const addNote = (text = "") => {
    const note = document.createElement("div");

    note.classList.add("note");
    note.innerHTML = `
    <div class="tool" style="display:flex;justify-content:space-between;align-items:center">
        <p>${new Date(Date.now()).getDate()} ${months[new Date(Date.now()).getMonth()]} ${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()} ${new Date(Date.now()).getHours() >= 12 ? "PM" : "AM"}</p>
        <div>
            <i class="fa fa-share-alt" title="Share Note"></i>
            <i class="save fas fa-save" title="Save Note"></i>
            <i class="trash fas fa-trash" title="Delete Note"></i> 
        </div>
    </div>
    <textarea>${text}</textarea>
    `;

    note.querySelector(".fa-share-alt").addEventListener("click", function () {
        const noteIndex = Array.from(document.querySelectorAll(".note")).indexOf(note);
        window.alert("Share Note ?");
        shareNote(noteIndex);
    });

    note.querySelector(".trash").addEventListener(
        "click",
        function () {
            const noteIndex = Array.from(document.querySelectorAll(".note")).indexOf(note);
            removeNote(noteIndex);
        }
    );

    note.querySelector(".save").addEventListener(
        "click",
        function () {
            const notes = document.querySelectorAll(".note textarea");
            const data = [];
            notes.forEach((note) => {
                data.push(note.value);
            });
            if (data.length === 0) {
                localStorage.removeItem("notes");
            } else {
                localStorage.setItem("notes", JSON.stringify(data));
            }
        }
    );

    note.querySelector("textarea").addEventListener(
        "focusout",
        function () {
            const notes = document.querySelectorAll(".note textarea");
            const data = [];
            notes.forEach((note) => {
                data.push(note.value);
            });
            if (data.length === 0) {
                localStorage.removeItem("notes");
            } else {
                localStorage.setItem("notes", JSON.stringify(data));
            }
        }
    );

    main.appendChild(note);
    saveNotes();
}

const shareNote = (noteIndex) => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
        if (noteIndex >= 0 && noteIndex < savedNotes.length) {
            const noteContent = savedNotes[noteIndex];
            const noteDate = `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getHours() >= 12 ? "PM" : "AM"}`;
            const message = `${noteDate}:\n${noteContent}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
            window.open(whatsappLink, "_blank");

        } else {
            console.log(`Note at noteIndex ${noteIndex} not found`);
        }
    } else {
        console.log("No saved notes found");
    }
};

const removeNote = (noteIndex) => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
        if (noteIndex >= 0 && noteIndex < savedNotes.length) {
            savedNotes.splice(noteIndex, 1);
            localStorage.setItem("notes", JSON.stringify(savedNotes));
            window.location.reload();
        } else {
            console.log(`Note at noteIndex ${noteIndex} not found`);
        }
    } else {
        console.log("No saved notes found");
    }
};

(function () {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));
    if (lsNotes === null) {
        addNote();
    } else {
        lsNotes.forEach((note) => {
            addNote(note);
        });
    }
})();
