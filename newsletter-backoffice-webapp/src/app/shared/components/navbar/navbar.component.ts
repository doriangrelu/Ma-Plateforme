import {Component, effect, inject, signal} from '@angular/core';
import {KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs} from 'keycloak-angular';
import Keycloak from 'keycloak-js';

import {NavbarItem} from '../../model/navbar.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private authenticated = signal(false);
  protected user = "";
  protected items: NavbarItem[] = [
    {
      name: 'Accueil',
      link: '/'
    },
    {
      name: 'Editeur de templates',
      link: '/templates'
    },
    {
      name: 'Gestion des newsletters',
      link: '/newsletters'
    }
  ];


  constructor(private readonly keycloak: Keycloak) {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(() => {
      const keycloakEvent = keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated.set(typeEventArgs<ReadyArgs>(keycloakEvent.args));
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated.set(false);
      }
    });

    effect(() => {
      if (this.authenticated()) {
        this.keycloak.loadUserProfile().then(user => {
          this.user = user.firstName + ' ' + user.lastName;
        })
      }
    })

  }

}
