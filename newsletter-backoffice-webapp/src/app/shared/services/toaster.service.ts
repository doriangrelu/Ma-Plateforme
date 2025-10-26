import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private readonly baseConfig: MatSnackBarConfig = {
    duration: 3500,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['toast'], // base commune
  };

  constructor(private readonly snack: MatSnackBar) {
  }

  /** API générique si tu veux passer un niveau dynamiquement */
  show(
    message: string,
    level = 'info',
    action: string = 'OK',
    config?: Partial<MatSnackBarConfig>
  ): MatSnackBarRef<TextOnlySnackBar> {
    const panelClass = this.panelClassFor(level, config?.panelClass);
    const finalConfig: MatSnackBarConfig = {...this.baseConfig, ...config, panelClass};
    return this.snack.open(message, action, finalConfig);
  }

  info(
    message: string,
    action: string = 'OK',
    config?: Partial<MatSnackBarConfig>
  ) {
    return this.show(message, 'info', action, config);
  }

  success(
    message: string,
    action: string = 'OK',
    config?: Partial<MatSnackBarConfig>
  ) {
    // succès un poil plus court
    const defaults: Partial<MatSnackBarConfig> = {duration: 2500};
    return this.show(message, 'success', action, {...defaults, ...config});
  }

  warning(
    message: string,
    action: string = 'Voir',
    config?: Partial<MatSnackBarConfig>
  ) {
    const defaults: Partial<MatSnackBarConfig> = {duration: 5000};
    return this.show(message, 'warning', action, {...defaults, ...config});
  }

  error(
    message: string,
    action: string = 'Fermer',
    config?: Partial<MatSnackBarConfig>
  ) {
    // erreurs plus visibles et persistantes
    const defaults: Partial<MatSnackBarConfig> = {duration: 8000};
    return this.show(message, 'error', action, {...defaults, ...config});
  }

  private panelClassFor(level: string, extra?: string | string[]): string[] {
    const levelClass = `toast--${level}`;
    return Array.isArray(extra)
      ? ['toast', levelClass, ...extra]
      : extra
        ? ['toast', levelClass, extra]
        : ['toast', levelClass];
  }

}
