import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteService/note.service';

interface NoteObj {
  noteId?: number,
  title?: string,
  description?: string,
  isArchived?: boolean,
  isDeleted?: boolean,
  color?: string
}
@Component({
  selector: 'app-notescontainer',
  templateUrl: './notescontainer.component.html',
  styleUrls: ['./notescontainer.component.scss']
})
export class NotescontainerComponent implements OnInit {
  
  notesList : NoteObj[] = []

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe((res)=>{this.notesList = res.data}, (err)=>{console.log(err)})
  }

  /*
  handleUpdateNotesList($event: {action: string, data: NoteObj}) {
    console.log($event);
    const {action, data} = $event

    if(action === "create") {
      this.notesList = [$event.data , ...this.notesList ]
    } else if(action === "archive" || action === "trash") {
      this.notesList = this.notesList.filter(note => note.noteId != data.noteId)
    }
  }
*/

handleUpdateNotesList($event: { action: string, data: NoteObj | NoteObj[] }) {
  console.log($event);
  const { action, data } = $event;

  if (action === "create") {
    if (Array.isArray(data)) {
      this.notesList = [...data, ...this.notesList];
    } else {
      this.notesList = [data, ...this.notesList];
    }
  } else if (action === "archive" || action === "trash") {
    if (Array.isArray(data)) {
      this.notesList = this.notesList.filter(note => !data.some(d => d.noteId === note.noteId));
    } else {
      this.notesList = this.notesList.filter(note => note.noteId !== data.noteId);
    }
  }
}
/* The `handleUpdateNotesList` method is a TypeScript function that is used to update a list of notes based on different actions. 
The method takes an event object as a parameter, which has two properties: `action` and `data`. The `action` property represents the type of action to be performed on the notes list, such as "create", "archive", or "trash". The `data` property contains the note object or an array of note objects that need to be updated.
First, the method logs the event object to the console for debugging purposes.
Then, it uses object destructuring to extract the `action` and `data` properties from the event object.
Next, it checks the value of the `action` property. If the value is "create", it further checks if the `data` property is an array or a single object. If it's an array, it adds all the elements of the `data` array to the beginning of the `notesList` array. If it's a single object, it adds the object to the beginning of the `notesList` array.
If the `action` value is "archive" or "trash", it again checks if the `data` property is an array or a single object. If it's an array, it filters the `notesList` array to remove any elements that have a `noteId` matching any of the `noteId` values in the `data` array. If it's a single object, it filters the `notesList` array to remove the element with a `noteId` matching the `noteId` of the `data` object.
In summary, the `handleUpdateNotesList` method handles different actions (create, archive, trash) and updates the `notesList` array based on the provided data. */
  
  
}