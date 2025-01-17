import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faCog, faComments, faEnvelope, faFaceLaugh, faFingerprint, faKey, faMicrophone, faRightFromBracket, faTrashCan, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from '../../features/footer/footer.component';
import { StoreService } from '../../services/store.service';
import { SocketService } from '../../services/socket.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../features/modal-wrapper/modal-wrapper.component';
import { Modal } from '../../typescript/enums';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../../typescript/interfaces';

import { EditNameComponent } from './edit-zone/edit-name/edit-name.component';
import { EditLastnameComponent } from './edit-zone/edit-lastname/edit-lastname.component';
import { EditMailComponent } from './edit-zone/edit-mail/edit-mail.component';
import { EditPasswordComponent } from './edit-zone/edit-password/edit-password.component';
import { FingerprintComponent } from './biometric-zone/fingerprint/fingerprint.component';
import { FaceComponent } from './biometric-zone/face/face.component';
import { VoiceComponent } from './biometric-zone/voice/voice.component';
import { DeleteMessagesComponent } from './danger-zone/delete-messages/delete-messages.component';
import { DeleteAccountComponent } from './danger-zone/delete-account/delete-account.component';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FooterComponent,
    ChangeAvatarComponent,
    ModalComponent,
    EditNameComponent,
    EditLastnameComponent,
    EditMailComponent,
    EditPasswordComponent,
    FingerprintComponent,
    FaceComponent,
    VoiceComponent,
    DeleteMessagesComponent,
    DeleteAccountComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100vh)' }),
        animate('600ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeHeadingIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SettingsComponent implements OnDestroy {

  subscription: Subscription;
  loggedUser: User | null = null;

  icons = {
    section: faCog,
    back: faChevronLeft,
    logout: faRightFromBracket,
    messages: faComments,
    remove: faTrashCan,
    edit: {
      name: faUser,
      lastname: faUserGroup,
      mail: faEnvelope,
      password: faKey
    },
    biometric: {
      fingerprint: faFingerprint,
      face: faFaceLaugh,
      voice: faMicrophone
    }
  }

  isModalVisible = false;
  modalContent = Modal.CHANGE_AVATAR;
  ModalContent = Modal;

  constructor(
    private storeService: StoreService,
    private socketService: SocketService,
    private router: Router,
    private toastr: ToastrService,
    private audioService: AudioService
  ) {
    this.subscription = this.storeService.loggedUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  editName() {
    this.isModalVisible = true;
    this.modalContent = Modal.EDIT_NAME;
    this.audioService.playChangeStateSound();
  }

  editLastname() {
    this.isModalVisible = true;
    this.modalContent = Modal.EDIT_LASTNAME;
    this.audioService.playChangeStateSound();
  }

  editMail() {
    this.isModalVisible = true;
    this.modalContent = Modal.EDIT_MAIL;
    this.audioService.playChangeStateSound();
  }

  editPassword() {
    this.isModalVisible = true;
    this.modalContent = Modal.EDIT_PASSWORD;
    this.audioService.playChangeStateSound();
  }

  setFingerprint() {
    this.isModalVisible = true;
    this.modalContent = Modal.SET_FINGERPRINT;
    this.audioService.playChangeStateSound();
  }

  setFace() {
    this.isModalVisible = true;
    this.modalContent = Modal.SET_FACE;
    this.audioService.playChangeStateSound();
  }

  setVoice() {
    this.isModalVisible = true;
    this.modalContent = Modal.SET_VOICE;
    this.audioService.playChangeStateSound();
  }

  logout() {
    this.storeService.removeLoggedUser();
    this.socketService.disconnect();
    this.router.navigate(['/login']);
    this.toastr.success('You have successfully logged out!', 'Logout Successful');
    this.audioService.playSuccessSound();
  }

  deleteMessages() {
    this.isModalVisible = true;
    this.modalContent = Modal.DELETE_MESSAGES;
    this.audioService.playChangeStateSound();
  }

  deleteAccount() {
    this.isModalVisible = true;
    this.modalContent = Modal.DELETE_ACCOUNT;
    this.audioService.playChangeStateSound();
  }

  openModal() {
    // this.audioService.playChangeStateSound();
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
