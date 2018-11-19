import { Component, OnInit } from '@angular/core';
import { navItems } from './nav';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  sidebarMinimized = false;
  navItems = navItems;

  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor() {
    this.changes = new MutationObserver(mutations => {
      this.sidebarMinimized = document.body.classList.contains(
        'sidebar-minimized'
      );
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit() {}
}
