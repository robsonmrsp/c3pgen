import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  //    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isActive: boolean = false;
  showMenu: string = '';
  noPhotoImage: String = "./images/no_photo.jpg";
  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    console.log('expand: ' + element);
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
}
