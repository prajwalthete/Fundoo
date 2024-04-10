import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MENU_ICON,
  SEARCH_ICON,
  REFRESH_ICON,
  SETTING_ICON,
  LIST_VIEW_ICON,
  OTHER_MENU_ICON
} from 'src/assets/svg-icons';

import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';




@Component({
  selector: 'app-fundooheader',
  templateUrl: './fundooheader.component.html',
  styleUrls: ['./fundooheader.component.scss']
})
export class FundooheaderComponent implements OnInit {
  searchState: string = '';
  subscription: any;
  data: any;
  drawerState: any;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public router: Router) {
    iconRegistry.addSvgIconLiteral("Menu-icon", sanitizer.bypassSecurityTrustHtml(MENU_ICON))
    iconRegistry.addSvgIconLiteral("Search-icon", sanitizer.bypassSecurityTrustHtml(SEARCH_ICON))
    iconRegistry.addSvgIconLiteral("Refresh-icon", sanitizer.bypassSecurityTrustHtml(REFRESH_ICON))
    iconRegistry.addSvgIconLiteral("Setting-icon", sanitizer.bypassSecurityTrustHtml(SETTING_ICON))
    iconRegistry.addSvgIconLiteral("List-view-icon", sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON))
    iconRegistry.addSvgIconLiteral("Other-menu-icon", sanitizer.bypassSecurityTrustHtml(OTHER_MENU_ICON))
  }

  ngOnInit(): void {
    this.subscription = this.data.currDrawerState.subscribe((state: any) => this.drawerState = state)
  }

  handleToggleDrawer() {
    this.data.toggleDrawerState(!this.drawerState)
  }

  handleAccClick() {
    localStorage.removeItem('authToken')
    this.router.navigate(["/login"])
  }

  handleSearchQuery() {
   // this.data.updateSearchQuery(this.searchState)
  }

  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }
}
