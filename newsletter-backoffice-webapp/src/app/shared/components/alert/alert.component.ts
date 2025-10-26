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
  styleUrl: './alert.component.css'
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
      success: 'bg-green-50 text-green-900 border-green-200',
      error: 'bg-red-50 text-red-900 border-red-200',
      warning: 'bg-amber-50 text-amber-900 border-amber-200',
      info: 'bg-blue-50 text-blue-900 border-blue-200',
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
      success: 'text-green-700',
      error: 'text-red-700',
      warning: 'text-amber-700',
      info: 'text-blue-700',
    }[this.type];
  }

}
