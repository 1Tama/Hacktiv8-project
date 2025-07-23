# Hacktiv8 project
A web app I made as my submission for le Hacktiv8 coding class

Requirements were (or at least, what i remembered lul) : 
1. A solution to a relevant problem
2. Uses the granite ai model (the one by IBM) in some way in the making of the project

# About the Website
It is a note taking web based app with plain, minimalistic interface, hence the name : Boring Notepad
Features : Add, delete, and edit notes. Note data SHOULD be saved locally therefore doesnt go boof when you close the browser tab and open the website in another.

# the code.....
I wrote some of the code, took some pieces from codepen (shoutout the people with like 5 views), and also uses the granite ai model to implement editable notes

uh although you can edit the notes, the edits wont be saved so they go bye bye the next time you open it. i can fix it but i am currently hungry and wanna eat and wanna be done with this, go fork and fix it :DDD

this part is here i guess as proof i used the granite ai?

heres what i asked the ai and what it came up with, you can see the part it came up with in the code although it needed some correction to work visually but hey it works, scroll down more to see what i had to fix
<img width="1475" height="667" alt="image" src="https://github.com/user-attachments/assets/b2829524-1bc8-4220-b8b6-62390cb19c29" />


To implement an editable feature for existing notes in your current Boring Notepad application, you'll need to add event listeners for 'dblclick' or 'click' on each note item. When a note is clicked, it should become editable, and changes should be saved back to the original note object when the user finishes editing (by blurring the input or pressing a specific key).

Here's how you can implement this:

Modify the HTML: Add an attribute contenteditable to your note-content div in the template section where notes are rendered. This allows text within the div to be editable.
<div class="note-item" contenteditable="true">
    <div class="note-content">${note.content}</div>
    <div class="note-meta">${note.timestamp}</div>
    <button class="delete-note-btn" data-index="${index}">X</button>
</div>
Modify the JavaScript: Add an event listener for 'dblclick' or 'click' on each note item to toggle editing mode (making text editable or not). You'll also need to save changes when the input loses focus.
// ... (previous code)

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

// ... (rest of the code)
This implementation will allow users to double-click on a note to edit its content, and changes will be saved when they click or blur out of the input field. Remember that this solution uses 'dblclick' for entering edit mode - you can replace it with 'click' if you prefer single-click editing.

heres the preview of it straight from what the ai generated, as you can see : a lil scuffed
<img width="1230" height="509" alt="Screenshot 2025-07-23 185238" src="https://github.com/user-attachments/assets/895e1154-dd4d-44f0-a35d-bd052a49a232" />

and this is what i had to change, literally like nothing to make it work
<img width="1262" height="434" alt="Screenshot 2025-07-23 185224" src="https://github.com/user-attachments/assets/99cf6df5-7425-43d1-812d-a511fb747340" />

overall i guess the ai works fine (and as intended?) if you give it proper context, and given proper prompts. cant ask too much from a free model that i ran on my hardware
