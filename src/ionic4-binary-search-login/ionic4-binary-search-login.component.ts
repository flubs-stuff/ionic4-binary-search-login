import {Component, EventEmitter, Output} from '@angular/core';

import {finalize} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector:    'ionic4-binary-search-login',
  templateUrl: 'ionic4-binary-search-login.component.html',
  styleUrls: [
    'ionic4-binary-search-login.component.scss'
  ]
})
export class Ionic4BinarySearchLoginComponent {
  public candidateUsername:string = '';
  public expectedUsername:string = 'fafuller';
  public isInitializing:boolean = true;
  public isLoggedIn:boolean = false;
  public isLoggingOut:boolean = false;
  public isLoggingIn:boolean = false;
  public lastI:number = 0;
  public minUsernameLength:number = 8;
  public showPassword:boolean = false;
  public usernamesLength:number = 0;
  public minI:number = 0;
  public maxI:number = 0;

  public user:any = {
    username: '',
    password: ''
  };

  private usernames:string[] = [];

  @Output() onLogin:EventEmitter<boolean>;

  constructor(
      private http:HttpClient
  ) {
    this.onLogin = new EventEmitter<boolean>();

    this.loadUsernames();
  }

  createUsernames(word):string[] {
      let usernames = [];

      usernames = usernames.concat(this.createUsernameWithNumbers(word));
      usernames = usernames.concat(this.createUsernameMixed(word));

      return usernames;
  }

  createUsernameWithNumbers(word:string) {
      const usernames = [];

      const wordLength = word.length;

      const remainingCharacters = this.minUsernameLength - wordLength;

      if (remainingCharacters > 0) {
          for (let i = 0; i < 10; i++) {
              let newUsername = word;

              let length = Math.round(Math.random() * remainingCharacters);
              if (length === 0) {
                  length += 1;
              }

              for (let j = 0; j < length; j++) {
                  newUsername += Math.round(Math.random() * 9);
              }

              usernames.push(newUsername);
          }
      }

      return usernames;
  }

  createUsernameMixed(word:string) {
      const usernames = [];

      const wordLength = word.length;

      for (let i = 0; i < 10; i++) {
          for (let j = 0; j < wordLength; j++) {
              let letters = word.split('');

              let prefix = '';
              for (let k = 0; k < j; k++) {
                  prefix += letters[k];
              }

              letters.splice(0, j);

              const lettersLength = letters.length;

              for (let k = wordLength - 1; k >= 0; k--) {
                  let newUsername = prefix;

                  for (let l = lettersLength - 1; l >= 0; l--) {
                      const letter = letters[Math.round(Math.random() * l)];

                      newUsername += letter;
                  }

                  usernames.push(this.createUsernameWithNumbers(newUsername));
              }
          }
      }

      return usernames;
  }

  findUsername(isHigher:boolean):void {
    if (this.lastI === 0) {
      this.lastI = this.maxI;
    }

    if (isHigher) {
      this.minI = this.lastI;
      this.lastI = (this.lastI + this.maxI) / 2;
    } else {
      this.maxI = this.lastI;
      this.lastI = (this.lastI + this.minI) / 2;
    }

    this.lastI = Math.round(this.lastI);

    this.candidateUsername = this.usernames[this.lastI];
  }

  formIsFilled():boolean {
    return this.user.username.length !== 0 && this.user.password.length !== 0;
  }

  loadUsernames():void {
    this.isInitializing = true;

    this.http.get(
      'assets/words.txt',
      {
        responseType: 'text'
      }
    ).pipe(
      finalize(
        () => {
          this.isInitializing = false;
        }
      )
    ).subscribe(
      (data) => {
        this.usernames = data.toString().split('\n');

        this.usernames.push(this.expectedUsername);

        this.usernames.concat(this.createUsernames(this.expectedUsername));

        // TODO: Make  variants of username with random numbers and mispellings

        this.usernames.sort();

        this.usernamesLength = this.usernames.length;
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

  setUsername():void {
    this.user.username = this.candidateUsername;
  }

  toggleShowPassword():void {
    this.showPassword = !this.showPassword;
  }
}

