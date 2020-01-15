import {Component, EventEmitter, Output} from '@angular/core';

import {finalize} from 'rxjs/operators';

import {PasswordService} from '../../services/password.service';
import {UsernameService} from '../../services/username.service';

@Component({
  selector:    'ionic4-binary-search-login',
  templateUrl: 'ionic4-binary-search-login.component.html',
  styleUrls: [
    'ionic4-binary-search-login.component.scss'
  ]
})
export class Ionic4BinarySearchLoginComponent {
  public candidatePassword:string = '';
  public candidateUsername:string = '';

  public isLoadingPasswords:boolean = true;
  public isLoadingUsernames:boolean = true;
  public isLoggedIn:boolean = false;
  public isLoggingOut:boolean = false;
  public isLoggingIn:boolean = false;
  public isSearching:boolean = false;

  public lastI:number = 0;
  public showPassword:boolean = false;
  public shownI:number = 0;
  public minI:number = 0;
  public maxI:number = 0;

  public user:any = {
    username: '',
    password: ''
  };

  private passwords:string[] = [];
  public passwordsLength:number = 0;
  private usernames:string[] = [];
  public usernamesLength:number = 0;

  @Output() onLogin:EventEmitter<boolean>;

  constructor(
      private passwordService:PasswordService,
      private usernameService:UsernameService
  ) {
    this.onLogin = new EventEmitter<boolean>();

    this.loadPasswords();
  }

  findPassword(isHigher:boolean):void {
    this.updateNumbers(isHigher);

    this.candidatePassword = this.search(this.passwords);

    this.toggleShowPassword();
  }

  findUsername(isHigher:boolean):void {
    this.updateNumbers(isHigher);

    this.candidateUsername = this.search(this.usernames);
  }

  search(hay:string[]):string {
    this.isSearching = true;

    if (this.shownI !== this.lastI) {
      const difference = this.lastI - this.shownI;
      const skip = 300;

      if (difference > skip) {
        this.shownI += skip;
      } else if (difference < -1 * skip) {
        this.shownI -= skip;
      }

      if (this.shownI > this.lastI) {
        this.shownI--;
      } else {
        this.shownI++;
      }

      setTimeout(
        () => {
          return this.search(hay);
        },
        1
      );
    } else {
      this.isSearching = false;

      return hay[this.lastI];
    }
  }

  formIsFilled():boolean {
    return this.user.username.length !== 0 && this.user.password.length !== 0;
  }

  loadPasswords():void {
    this.isLoadingPasswords = true;

    this.passwordService.load().pipe(
      finalize(
        () => {
          this.isLoadingPasswords = false;
        }
      )
    ).subscribe(
      (passwords) => {
        this.passwords = passwords;
        this.passwordsLength = this.passwords.length;

        this.loadUsernames();
      }
    );
  }

  loadUsernames():void {
    this.isLoadingUsernames = true;

    this.usernameService.load().pipe(
      finalize(
        () => {
          this.isLoadingUsernames = false;
        }
      )
    ).subscribe(
      (usernames) => {
        this.usernames = usernames;
        this.usernamesLength = usernames.length;

        this.maxI = this.usernamesLength;

        this.findUsername(false);
      }
    );
  }

  login():void {
    this.isLoggingIn = true;

    setTimeout(
      () => {
        this.isLoggedIn = true;
        this.isLoggingIn = false;
      },
      1500
    );
  }

  logout():void {
    this.isLoggingIn = true;

    setTimeout(
      () => {
        this.isLoggedIn = false;
        this.isLoggingIn = false;
      },
      1500
    );
  }

  resetSearch():void {
    this.lastI = 0;
    this.minI = 0;
    this.shownI = 0;
  }

  setPassword():void {
    this.user.password = this.candidatePassword;
  }

  setUsername():void {
    this.user.username = this.candidateUsername;

    this.resetSearch();

    this.maxI = this.usernamesLength;
  }

  toggleShowPassword():void {
    this.showPassword = !this.showPassword;
  }

  updateNumbers(isHigher:boolean):void {
    if (this.lastI === 0) {
      this.lastI = this.maxI;
    }

    if (isHigher) {
      if (this.lastI === this.maxI) {
        this.maxI = (this.maxI + this.usernamesLength) / 2;
      }

      this.minI = this.lastI;
      this.lastI = (this.lastI + this.maxI) / 2;
    } else {
      if (this.lastI === this.minI) {
        this.minI = this.minI / 2;
      }

      this.maxI = this.lastI;
      this.lastI = (this.lastI + this.minI) / 2;
    }

    this.lastI = Math.round(this.lastI);
  }
}

