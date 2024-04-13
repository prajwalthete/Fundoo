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


  addNoteCall(data: any) {
    return this.httpService.addNote('note', data);
  }

  archiveNoteCall(data: any) {
    return this.httpService.archiveNote('note/IsArchived', data);
  }


}
