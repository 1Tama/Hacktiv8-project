document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesList = document.getElementById('notesList');

    // Load notes from localStorage
    let notes = JSON.parse(localStorage.getItem('NotepadNotes')) || [];

    // Function to render all notes
    function renderNotes() {
        notesList.innerHTML = ''; // Clear existing notes
        notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');


            noteItem.innerHTML = `
                <div contenteditable="true">
                <div class="note-content">${note.content}</div>
                <div class="note-meta">${note.timestamp}</div>
                <button class="delete-note-btn" data-index="${index}">X</button>
                </div>
            `;
            notesList.appendChild(noteItem);
        });
    }

    // Function to add a new note
    addNoteBtn.addEventListener('click', () => {
        const content = noteInput.value.trim();
        if (content) {
            const timestamp = new Date().toLocaleString(); // Get current date and time
            const newNote = {
                content: content,
                timestamp: timestamp
            };
            notes.push(newNote);
            localStorage.setItem('NotepadNotes', JSON.stringify(notes));
            noteInput.value = ''; // Clear the input field
            renderNotes(); // Re-render notes to show the new one
        } else {
            alert('Please write something before adding a note!');
        }
    });

    // Event listener for deleting a note (using event delegation)
    notesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-note-btn')) {
            const indexToDelete = parseInt(event.target.dataset.index);
            if (!isNaN(indexToDelete)) {
                notes.splice(indexToDelete, 1); // Remove note from array
                localStorage.setItem('NotepadNotes', JSON.stringify(notes)); // Update localStorage
                renderNotes(); // Re-render notes
            }
        }
    });

    // Initial render of notes when the page loads
    renderNotes();
});

// Function to toggle edit mode
function toggleEditMode(event) {
    const noteItem = event.target;
    if (noteItem.classList.contains('note-content')) {
        // Switch between editable and non-editable state
        const isEditable = !noteItem.contentEditable;
        
        if (isEditable) {
            noteItem.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // Lighten the background color for better visibility during editing
        } else {
            noteItem.style.backgroundColor = ''; // Remove background color when not editing
        }

        noteItem.contentEditable = isEditable;
    }
}

// Event listeners for edit mode toggle and input blur
notesList.addEventListener('dblclick', toggleEditMode); // or 'click' if you prefer single click to start editing
notesList.addEventListener('blur', (event) => {
    if (event.target.classList.contains('note-content')) {
        const index = parseInt(event.target.parentElement.dataset.index);
        notes[index].content = event.target.textContent; // Update note content with edited text
    }
});