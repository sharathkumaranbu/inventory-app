import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() showModal: boolean;
  @Input() title: string;
  @Output() Close: EventEmitter<any> = new EventEmitter<any>();
  @Output() Save: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  // Emit close modal event
  close() {
    this.Close.emit();
  }

  // Emit save event from modal
  save() {
    this.Save.emit();
  }
}
