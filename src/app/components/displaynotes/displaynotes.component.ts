
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  REMINDER_ICON,
  COLLABRATOR_ICON,
  COLOR_PALATTE_ICON,
  IMG_ICON,
  ARCHIVE_ICON,
  MORE_ICON,
  EDIT_ICON,
  UNARCHIVE_ICON,
  RESTORE_ICON,
  DELETE_FOREVER_ICON,
} from 'src/assets/svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteObj } from 'src/assets/type';
import { NoteService } from 'src/app/services/noteService/note.service';
import { EditnoteComponent } from '../editnote/editnote.component';
import { DataService } from 'src/app/services/dataService/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-displaynotes',
  templateUrl: './displaynotes.component.html',
  styleUrls: ['./displaynotes.component.scss'],
})
export class DisplaynotesComponent implements OnInit, OnDestroy {
  @Input() notesData: NoteObj[] = [];
  @Input() container: string = '';
  @ViewChild('unarchiveButton')
  unarchiveButton!: TemplateRef<any>;
  // Output to emit events to parent component
  @Output() updateNotesList = new EventEmitter<{
    action: string;
    data: NoteObj;
  }>();

  // Input to receive note data from parent component
  //@Input() note!: { title: string, description: string, noteID: number, color: string, archive: boolean };

  // Input to receive icon action from parent component
  @Input() iconAction!: string;

  // Flag to toggle color picker visibility
  showColorPicker: boolean = false;
  searchQuery: string = '';
  subscription!: Subscription;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private noteService: NoteService,
    private dataService: DataService
  ) {
    // Register SVG icons
    iconRegistry.addSvgIconLiteral(
      'reminder-icon',
      sanitizer.bypassSecurityTrustHtml(REMINDER_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'edit-icon',
      sanitizer.bypassSecurityTrustHtml(EDIT_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'archive-icon',
      sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'coll-icon',
      sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'Color-Palatte-icon',
      sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'img-icon',
      sanitizer.bypassSecurityTrustHtml(IMG_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'more-icon',
      sanitizer.bypassSecurityTrustHtml(MORE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'unarchive-icon',
      sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'delete-icon',
      sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'restore-icon',
      sanitizer.bypassSecurityTrustHtml(RESTORE_ICON)
    );
  }
  ngOnInit(): void { // ngOnInit lifecycle hook method
    // Subscribing to currSearchQuery observable to receive search query updates
    this.subscription = this.dataService.currSearchQuery.subscribe(
      (res) => (this.searchQuery = res) // Updating searchQuery when observable emits a new value
    );
  }

  handleIconsClick(action: string, note: NoteObj) { // Method to handle click events on icons
    // Handling different actions based on the provided action string
    if (action === 'archive') { // If action is archive
      // Calling archiveNoteCall method of NoteService to archive the note
      this.noteService.archiveNoteCall(note.noteId || 0).subscribe(
        () => {
          // Emitting event to notify parent component about the archived note
          this.updateNotesList.emit({ action: 'archive', data: note });
        },
        (err: any) => console.log(err) // Logging error if archive operation fails
      );
    } else if (action === 'unarchive') { // If action is unarchive
      // Calling archiveNoteCall method of NoteService to unarchive the note
      this.noteService.archiveNoteCall(note.noteId || 0).subscribe(
        () => {
          // Emitting event to notify parent component about the unarchived note
          this.updateNotesList.emit({ action: 'unarchive', data: note });
        },
        (err: any) => console.log(err) // Logging error if unarchive operation fails
      );
    } else if (action === 'trash') { // If action is trash
      // Calling trashNoteCall method of NoteService to move the note to trash
      this.noteService.trashNoteCall(note.noteId || 0).subscribe(
        () => {
          // Emitting event to notify parent component about the trashed note
          this.updateNotesList.emit({ action: 'trash', data: note });
        },
        (err: any) => console.log(err) // Logging error if trash operation fails
      );
    } else if (action === 'untrash') { // If action is untrash
      // Calling trashNoteCall method of NoteService to untrash the note
      this.noteService.trashNoteCall(note.noteId || 0).subscribe(
        () => {
          // Emitting event to notify parent component about the untrashed note
          this.updateNotesList.emit({ action: 'untrash', data: note });
        },
        (err: any) => console.log(err) // Logging error if untrash operation fails
      );
    } else if (action === 'delete') { // If action is delete
      // Calling deleteNoteCall method of NoteService to delete the note
      this.noteService.deleteNoteCall(note.noteId || 0).subscribe(
        () => {
          // Emitting event to notify parent component about the deleted note
          this.updateNotesList.emit({ action: 'delete', data: note });
        },
        (err: any) => console.log(err) // Logging error if delete operation fails
      );
    } else { // If action is not any of the predefined actions
      // Calling updateNoteCall method of NoteService to update the note with new color
      this.noteService
        .updateNoteCall(note.noteId || 0, { ...note, colour: action })
        .subscribe(
          () => {
            // Emitting event to notify parent component about the updated note's color
            this.updateNotesList.emit({
              action: 'colour',
              data: { ...note, colour: action },
            });
          },
          (err: any) => console.log(err) // Logging error if update operation fails
        );
    }
  }

  toggleColorPicker() { // Method to toggle color picker visibility
    this.showColorPicker = !this.showColorPicker; // Toggling the value of showColorPicker property
  }

  selectColor(color: string, noteID: number) { // Method to select a color for the note
    // This method is intentionally left empty as it's not implemented
  }

  openEditNote(noteObj: NoteObj) { // Method to open edit note dialog
    let dialogRef = this.dialog.open(EditnoteComponent, { data: noteObj }); // Opening the edit note dialog
    dialogRef.afterClosed().subscribe((updatedNote: NoteObj) => { // Subscribing to dialog close event
      if (updatedNote) { // If an updated note object is received
        // Making API call to update the note
        this.noteService
          .updateNoteCall(updatedNote.noteId || 0, updatedNote)
          .subscribe(
            () => {
              // Emitting event to notify parent component about the updated note
              this.updateNotesList.emit({ action: ' ', data: updatedNote });
            },
            (err: any) => {
              console.log(err); // Logging error if update operation fails
              // Handle error if needed
            }
          );
      }
    });
  }

  openSnackBar(message: string) { // Method to open snackbar to display messages
    // This method is intentionally left empty as it's not implemented
  }

  ngOnDestroy() { // ngOnDestroy lifecycle hook method
    this.subscription.unsubscribe(); // Unsubscribing from the subscription to prevent memory leaks
  }
}