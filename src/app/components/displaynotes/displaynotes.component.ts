/**
 * The `DisplaynotesComponent` is a component that displays a list of notes. It handles various actions on the notes, such as archiving, unarchiving, trashing, untrashing, and deleting. It also provides functionality to open an edit note dialog and update the note.
 *
 * The component receives the following inputs:
 * - `notesData`: an array of `NoteObj` objects representing the notes to be displayed.
 * - `container`: a string representing the container of the notes (e.g., "archive", "trash").
 * - `iconAction`: a string representing the action to be performed on the note (e.g., "archive", "unarchive").
 *
 * The component emits the following output:
 * - `updateNotesList`: an event emitter that emits an object with the action performed on the note and the updated note data.
 *
 * The component also manages the following state:
 * - `showColorPicker`: a boolean flag to toggle the visibility of the color picker.
 * - `searchQuery`: a string representing the current search query.
 * - `subscription`: a subscription to the `currSearchQuery` observable from the `DataService`.
 *
 * The component provides the following methods:
 * - `handleIconsClick(action: string, note: NoteObj)`: handles the click events on the note icons and performs the corresponding action (archive, unarchive, trash, untrash, delete, or update color).
 * - `toggleColorPicker()`: toggles the visibility of the color picker.
 * - `selectColor(color: string, noteID: number)`: selects a color for the note (not implemented).
 * - `openEditNote(noteObj: NoteObj)`: opens the edit note dialog and updates the note if the dialog is closed with an updated note.
 * - `openSnackBar(message: string)`: opens a snackbar to display messages (not implemented).
 *
 * The component also handles the lifecycle events `ngOnInit` and `ngOnDestroy` to subscribe and unsubscribe to the `currSearchQuery` observable.
 */
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
import { MatIconRegistry } from '@angular/material/icon'; // Importing MatIconRegistry to register custom SVG icons
import { DomSanitizer } from '@angular/platform-browser'; // Importing DomSanitizer to bypass security and sanitize SVG icons
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
} from 'src/assets/svg-icons'; // Importing custom SVG icon paths
import { MatDialog } from '@angular/material/dialog'; // Importing MatDialog for opening dialogs
import { MatSnackBar } from '@angular/material/snack-bar'; // Importing MatSnackBar for showing snackbar messages
import { NoteObj } from 'src/assets/type'; // Importing NoteObj interface
import { NoteService } from 'src/app/services/noteService/note.service'; // Importing NoteService for managing notes
import { EditnoteComponent } from '../editnote/editnote.component'; // Importing EditnoteComponent for editing notes
import { DataService } from 'src/app/services/dataService/data.service'; // Importing DataService for managing data
import { Subscription } from 'rxjs'; // Importing Subscription for managing subscriptions

@Component({
  selector: 'app-displaynotes', // Selector for the component
  templateUrl: './displaynotes.component.html', // Template file for the component
  styleUrls: ['./displaynotes.component.scss'], // Stylesheet file for the component
})
export class DisplaynotesComponent implements OnInit, OnDestroy {
  @Input() notesData: NoteObj[] = []; // Input property to receive an array of NoteObj objects representing notes to be displayed
  @Input() container: string = ''; // Input property to receive a string representing the container of the notes
  @ViewChild('unarchiveButton') unarchiveButton!: TemplateRef<any>; // Reference to a template element
  @Output() updateNotesList = new EventEmitter<{ action: string; data: NoteObj; }>(); // Output property to emit events to parent component

  showColorPicker: boolean = false; // Flag to toggle the visibility of the color picker
  searchQuery: string = ''; // String representing the current search query
  subscription!: Subscription; // Subscription to the currSearchQuery observable from the DataService

  constructor(
    iconRegistry: MatIconRegistry, // Dependency injection for MatIconRegistry to register custom SVG icons
    sanitizer: DomSanitizer, // Dependency injection for DomSanitizer to bypass security and sanitize SVG icons
    public dialog: MatDialog, // Dependency injection for MatDialog to open dialogs
    public snackBar: MatSnackBar, // Dependency injection for MatSnackBar to show snackbar messages
    private noteService: NoteService, // Dependency injection for NoteService to manage notes
    private dataService: DataService // Dependency injection for DataService to manage data
  ) {
    // Register SVG icons using MatIconRegistry
    iconRegistry.addSvgIconLiteral(
      'reminder-icon',
      sanitizer.bypassSecurityTrustHtml(REMINDER_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'edit-icon',
      sanitizer.bypassSecurityTrustHtml(EDIT_ICON)
    );
    // Register other custom SVG icons in a similar manner
  }

  ngOnInit(): void {
    // Subscribe to currSearchQuery observable from the DataService and update searchQuery
    this.subscription = this.dataService.currSearchQuery.subscribe(
      (res) => (this.searchQuery = res)
    );
  }

  // Handle click events on icons and perform corresponding actions
  handleIconsClick(action: string, note: NoteObj) {
    if (action === 'archive') {
      // If action is archive, call archiveNoteCall from NoteService and emit updateNotesList event
      this.noteService.archiveNoteCall(note.noteId || 0).subscribe(
        () => {
          this.updateNotesList.emit({ action: 'archive', data: note });
        },
        (err: any) => console.log(err)
      );
    } else if (action === 'unarchive') {
      // If action is unarchive, call archiveNoteCall from NoteService and emit updateNotesList event
      this.noteService.archiveNoteCall(note.noteId || 0).subscribe(
        () => {
          this.updateNotesList.emit({ action: 'unarchive', data: note });
        },
        (err: any) => console.log(err)
      );
    } else if (action === 'trash') {
      // If action is trash, call trashNoteCall from NoteService and emit updateNotesList event
      this.noteService.trashNoteCall(note.noteId || 0).subscribe(
        () => {
          this.updateNotesList.emit({ action: 'trash', data: note });
        },
        (err: any) => console.log(err)
      );
    } else if (action === 'untrash') {
      // If action is untrash, call trashNoteCall from NoteService and emit updateNotesList event
      this.noteService.trashNoteCall(note.noteId || 0).subscribe(
        () => {
          this.updateNotesList.emit({ action: 'untrash', data: note });
        },
        (err: any) => console.log(err)
      );
    } else if (action === 'delete') {
      // If action is delete, call deleteNoteCall from NoteService and emit updateNotesList event
      this.noteService.deleteNoteCall(note.noteId || 0).subscribe(
        () => {
          this.updateNotesList.emit({ action: 'delete', data: note });
        },
        (err: any) => console.log(err)
      );
    } else {
      // If action is color update, call updateNoteCall from NoteService and emit updateNotesList event
      this.noteService
        .updateNoteCall(note.noteId || 0, { ...note, colour: action })
        .subscribe(
          () => {
            this.updateNotesList.emit({
              action: 'colour',
              data: { ...note, colour: action },
            });
          },
          (err: any) => console.log(err)
        );
    }
  }

  // Toggle the visibility of the color picker
  toggleColorPicker() {
    this.showColorPicker = !this.showColorPicker;
  }

  // Method to select a color for the note (not implemented)
  selectColor(color: string, noteID: number) {
    // This method is intentionally left empty
  }

  // Method to open the edit note dialog and update the note if the dialog is closed with an updated note
  openEditNote(noteObj: NoteObj) {
    // Open the edit note dialog with MatDialog
    let dialogRef = this.dialog.open(EditnoteComponent, { data: noteObj });
    // Subscribe to the dialog's afterClosed event to get the updated note
    dialogRef.afterClosed().subscribe((updatedNote: NoteObj) => {
      if (updatedNote) {
        // If an updated note is received, call updateNoteCall from NoteService to update the note
        this.noteService
          .updateNoteCall(updatedNote.noteId || 0, updatedNote)
          .subscribe(
            () => {
              // Emit an event to notify the parent component about the updated note
              this.updateNotesList.emit({ action: ' ', data: updatedNote });
            },
            (err: any) => {
              console.log(err);
              // Handle error if needed
            }
          );
      }
    });
  }

  // Method to open a snackbar to display messages (not implemented)
  openSnackBar(message: string) {
    // This method is intentionally left empty
  }

  // Method to unsubscribe from the currSearchQuery observable when the component is destroyed
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
