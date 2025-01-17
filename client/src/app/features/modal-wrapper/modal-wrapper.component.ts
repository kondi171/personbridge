import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalComponent {
  @Input() visible: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  closeBtnIcon = faCircleXmark;
  isClosing = false;

  constructor(private audioService: AudioService) { }

  closeModal() {
    this.isClosing = true;
    this.audioService.playChangeStateSound();
    setTimeout(() => {
      this.visible = false;
      this.isClosing = false;
      this.close.emit();
    }, 300); // Czas trwania animacji zamykania
  }
}