import { Component, OnInit } from '@angular/core';
import { navItems } from './nav';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  logout = () => {
    this.authService.logout();
    this.router.navigate(['/login']);
  };

  constructor(private authService: AuthService, private router: Router) {
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
