import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  IMG_ICON,
  TICK_ICON,
  BRUSH_ICON,
  REMINDER_ICON,
  COLLABRATOR_ICON,
  COLOR_PALATTE_ICON,
  ARCHIVE_ICON,
  MORE_ICON,
  EDIT_ICON,
  UNDO_ICON,
  RESTORE_ICON
} from 'src/assets/svg-icons';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.scss']
})
export class CreatenoteComponent implements OnInit {
  @Output() updateList = new EventEmitter<{
    action: string,
    data: {
      title: string,
      description: string,
      noteID: number,
      color: string,
      archive: boolean
    }
  }>();

  hiddenCreateNote: boolean = true;
  title: string = "";
  description: string = "";
  archive: boolean = false;
  color: string = "";
  showColorPicker: boolean = false;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // Register SVG icons
    iconRegistry.addSvgIconLiteral('Tick-icon', sanitizer.bypassSecurityTrustHtml(TICK_ICON));
    iconRegistry.addSvgIconLiteral('Brush-icon', sanitizer.bypassSecurityTrustHtml(BRUSH_ICON));
    iconRegistry.addSvgIconLiteral('Img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('edit-icon', sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('coll-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('Color-Palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
    iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
    iconRegistry.addSvgIconLiteral('undo-icon', sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
    iconRegistry.addSvgIconLiteral('redo-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
  }

  ngOnInit(): void {
  }

  handleCreateNote(action: string) {
    this.hiddenCreateNote = !this.hiddenCreateNote;
    if (action == "close" && (this.title != "" || this.description != "")) {
      const noteObj = {
        "title": this.title,
        "description": this.description,
        "color": this.color,
        "archive": this.archive,
        "noteID": 0 // You may need to assign a unique ID here
      };
      // Emit event to update note list
      this.updateList.emit({ action: "create", data: noteObj });
    }
    else if(this.showColorPicker==true) {
      this.toggleColorPicker();
    }
  }

  handleArchive() {
    this.archive = !this.archive;
    console.log(this.archive);
  }

  selectColor(color: string) {
    this.color = color;
    this.showColorPicker = false;
  }

  toggleColorPicker() {
    this.showColorPicker = !this.showColorPicker;
  }
}