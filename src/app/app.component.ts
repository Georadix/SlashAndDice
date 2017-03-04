import { Component } from '@angular/core';
import { GameStateService } from './game-state.service';
import { FogOfWarService } from './fog-of-war.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  providers: [GameStateService, FogOfWarService],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [`
    :host {
      height: 100%;
    }

  `]
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {
    this.oauthService.loginUrl = "https://login.live.com/oauth20_authorize.srf";
    this.oauthService.logoutUrl = "https://login.live.com/oidc_logout.srf";
    this.oauthService.redirectUri = window.location.origin;
    this.oauthService.clientId = "bba1f2e3-6aaa-42c3-8f23-782561a3fa1e";
    this.oauthService.scope = "onedrive.appfolder";
    this.oauthService.oidc = false;
    this.oauthService.options = { responseType: "token" };
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.userinfoEndpoint = "https://apis.live.net/v5.0/me";
    this.oauthService.tokenEndpoint = "https://login.live.com/oauth20_token.srf";
    this.oauthService.issuer = "https://login.live.com";

    console.log('Try login: ' + this.oauthService.tryLogin({
      onTokenReceived: context => {
        //
        // Output just for purpose of demonstration
        // Don't try this at home ... ;-)
        //
        console.log("logged in");
        console.log(context);
        this.oauthService.loadUserProfile().then((user) => {
          console.log(user)
        });
      }
    }));
  }
}
