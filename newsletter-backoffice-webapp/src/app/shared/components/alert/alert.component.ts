import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-alert',
  imports: [
    NgClass,
    NgIf,
    MatIconModule,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  @Input()
  public type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input()
  public title = '';
  @Input()
  public message = '';

  get classes() {
    const base = 'flex items-center gap-3 rounded-xl shadow-md px-4 py-3 border';
    const variants: Record<string, string> = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };
    return `${base} ${variants[this.type]}`;
  }

  get icon() {
    switch (this.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }

  get iconColor() {
    return {
      success: 'icon-success',
      error: 'icon-error',
      warning: 'icon-warning',
      info: 'icon-info',
    }[this.type];
  }

}
