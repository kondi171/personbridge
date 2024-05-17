import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveState, Device } from '../typescript/enums';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MessageRowComponent } from './panel/message-row/message-row.component';
import { ChatComponent } from './chat/chat.component';
import { NavbarComponent } from '../features/navbar/navbar.component';
import { PeopleComponent } from './people/people.component';
import { ExploreComponent } from './explore/explore.component';
import { SettingsComponent } from './settings/settings.component';
import { PanelComponent } from './panel/panel.component';

import { ModalComponent } from '../features/modal-wrapper/modal-wrapper.component';
import { SomeonesAudioComponent } from './modals/someones-audio/someones-audio.component';
import { YourAudioComponent } from './modals/your-audio/your-audio.component';
import { SomeonesVideoComponent } from './modals/someones-video/someones-video.component';
import { YourVideoComponent } from './modals/your-video/your-video.component';
import { PINComponent } from './chat/pin/pin.component';
import { StoreService } from '../services/store.service';
import { LoaderComponent } from '../features/loader/loader.component';

@Component({
  selector: 'app-access-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MessageRowComponent,
    NavbarComponent,
    PanelComponent,
    ChatComponent,
    PeopleComponent,
    ExploreComponent,
    SettingsComponent,
    ModalComponent,
    SomeonesAudioComponent,
    YourAudioComponent,
    SomeonesVideoComponent,
    YourVideoComponent,
    PINComponent,
    LoaderComponent
  ],
  templateUrl: './access-page.component.html',
  styleUrls: ['./access-page.component.scss']
})
export class AccessPageComponent implements OnInit {
  isMobile = false;
  isModalVisible = true;
  device = Device.DESKTOP;
  isLoaderVisible = false;

  constructor(private router: Router, private storeService: StoreService) { }

  ngOnInit(): void {
    this.checkScreenWidth();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkScreenWidth();
    });

    setTimeout(() => {
      this.isLoaderVisible = false;
    }, 2000);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    const path = this.router.url;
    if (path === ActiveState.PANEL || window.innerWidth >= 1024) this.isMobile = true;
    else this.isMobile = false;
    if (window.innerWidth >= 1024) this.device = Device.DESKTOP;
    else this.device = Device.MOBILE;
  }

  isAccessVisible() {
    const segments = this.router.url.split('/');
    return segments.length === 2 && segments[1] === 'access';
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}