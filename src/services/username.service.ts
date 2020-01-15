import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsernameService {
  public expectedUsername:string = 'jrquick';

  public minUsernameLength:number = 8;

  constructor(
    private http:HttpClient
  ) {

  }

  private _createUsernameWithNumbers(word:string) {
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

  private _createUsernameMixed(word:string) {
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

          usernames.push(this._createUsernameWithNumbers(newUsername));
        }
      }
    }

    return usernames;
  }

  load():Observable<string[]> {
    return this.http.get(
      'assets/words.txt',
      {
        responseType: 'text'
      }
    ).pipe(
      map(
        (data) => {
          let usernames = data.toString().split('\n');

          usernames.push(this.expectedUsername);

          usernames = usernames.concat(this._createUsernameWithNumbers(this.expectedUsername));
          usernames = usernames.concat(this._createUsernameMixed(this.expectedUsername));

          // TODO: Make  variants of username with random numbers and mispellings

          usernames.sort();

          return usernames;
        }
      )
    );
  }
}
