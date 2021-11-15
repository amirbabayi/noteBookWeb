// variables
//access to noteList.
const noteList = document.querySelector('.note-list')

//event listener
eventListener();


function eventListener() {
    // access to the textarea tag and do somethings
    document.querySelector('.save').addEventListener('click', newNote)
    // access to the intended li and do somethings
    document.querySelector('.list').addEventListener('click', removeNote)
    // get and add items that is in local storage after loaded
    document.addEventListener('DOMContentLoaded', setItemFromLocalStorage)
    // add enter key for save note
    document.querySelector('.in-put').addEventListener('keydown', enterKey)
}

//function
//function for enter key
function enterKey(e) {
    if (e.keyCode === 13) {
        document.querySelector('.save').click()
    }
    document.querySelector('.in-put').reset()
}

// function to add the note to list.
function newNote(e) {
    e.preventDefault()
    //creat a button for delete note.
    const removeBtn = document.createElement('a')
    removeBtn.textContent = 'X'
    //add class for the X
    removeBtn.classList = 'remove-note'


    //access to the value.
    const note = document.querySelector('#note').value

    //creat element <li>
    const li = document.createElement('li')

    //adding value to the li element.
    li.appendChild(document.createTextNode(note))

    //adding X to the li element.
    li.appendChild(removeBtn)

    //adding li to note list.
    li.style.paddingBottom = "12px"
    li.style.listStyleType = "none"

    noteList.appendChild(li)

    // this.reset()
    document.querySelector('#note').value = ''

    addNoteToLocalStorage(note);
}

//remove the note
function removeNote(e) {
    if (e.target.classList.contains('remove-note')) {
        e.target.parentElement.remove()
    }
    removeNoteFromLocalStorage(e.target.parentElement.textContent)
}

// add note in local storage
function addNoteToLocalStorage(note) {
    const notes = getNoteToLocalStorage()

    notes.push(note)

    localStorage.setItem('note-list', JSON.stringify(notes))
    console.log(notes)
}

// do note has in local storage
function getNoteToLocalStorage() {
    let notes;
    // give the details in the note list
    let noteFromLS = localStorage.getItem('note-list');
    if (noteFromLS === null) {
        // if in note list is not any details
        notes = []
    } else {
        // if in note list is any details
        notes = JSON.parse(noteFromLS)
    }
    return notes
}

function setItemFromLocalStorage() {
    const notes = getNoteToLocalStorage()
    notes.forEach(function (note) {
        const removeBtn = document.createElement('a')
        removeBtn.textContent = 'X'
        //add class for the X
        removeBtn.classList = 'remove-note'

        //creat element <li>
        const li = document.createElement('li')

        //adding value to the li element.
        li.appendChild(document.createTextNode(note))

        //adding X to the li element.
        li.appendChild(removeBtn)

        //adding li to note list.
        li.style.paddingBottom = "12px"
        li.style.listStyleType = "none"

        noteList.appendChild(li)
    })
}

// remove note from local storage after reload
function removeNoteFromLocalStorage(textContent) {
    // remove X from note
    const removableNote = textContent.substring(0, textContent.length - 1)

    // get items from local storage
    const noteFromLS = getNoteToLocalStorage()

    noteFromLS.forEach(function (noteArray, index) {
        if (removableNote === noteArray) {
            noteFromLS.splice(index, 1)
        }
    })
    localStorage.setItem('note-list', JSON.stringify(noteFromLS))
    console.log(noteFromLS)
}