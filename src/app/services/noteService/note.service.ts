import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService: HttpService) { }

  getAllNotesCall() {
    return this.httpService.getAllNotes("note");
  }

  addNoteCall(data: Object) {
    return this.httpService.addNote("note", data);
  }

  archiveNoteCall(noteId: number) {
    return this.httpService.archiveNote(`note/archive/${noteId}`);
  }
  
  trashNoteCall(noteId: number) {
    return this.httpService.archiveNote(`note/trash/${noteId}`);
  }
  deleteNoteCall(noteId: number) {
    return this.httpService.deleteNote(`note/${noteId}`)}

  updateNoteCall(noteId: number, data: Object) {
    return this.httpService.updateNote(`note/${noteId}`, data);
  }
 
}
