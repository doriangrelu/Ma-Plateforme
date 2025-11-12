import {Injectable} from '@angular/core';
// @ts-ignore
import mjml2html from 'mjml';

@Injectable({
  providedIn: 'root'
})
export class MjmlCompilerService {

  compile(mjml: string): { html: string; errors: any[] } {
    const {html, errors} = mjml2html(mjml, {validationLevel: 'soft'});
    return {html, errors: errors ?? []};
  }
}
