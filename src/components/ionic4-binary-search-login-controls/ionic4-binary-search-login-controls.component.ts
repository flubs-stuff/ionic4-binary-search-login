import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector:    'ionic4-binary-search-login-controls',
  templateUrl: 'ionic4-binary-search-login-controls.component.html',
  styleUrls: [
    'ionic4-binary-search-login-controls.component.scss'
  ]
})
export class Ionic4BinarySearchLoginControlsComponent {
  @Input() disableConfirm:boolean = false;
  @Input() disableHigher:boolean = false;
  @Input() disableLower:boolean = false;

  @Output() onLower:EventEmitter<void>;
  @Output() onHigher:EventEmitter<void>;
  @Output() onConfirm:EventEmitter<void>;

  constructor() {
    this.onConfirm = new EventEmitter<void>();
    this.onHigher = new EventEmitter<void>();
    this.onLower = new EventEmitter<void>();
  }

  confirm():void {
    this.onConfirm.emit();
  }

  higher():void {
    this.onHigher.emit();
  }

  lower():void {
    this.onLower.emit();
  }
}

