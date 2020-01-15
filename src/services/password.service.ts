import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';

@Injectable()
export class PasswordService {
  public expectedPassword:string = 'pass1234';

  public minUsernameLength:number = 8;

  constructor(
    private http:HttpClient
  ) {

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
          let passwords = data.toString().split('\n');

          passwords.push(this.expectedPassword);

          // TODO: Make variants of expected password

          passwords.sort();

          return passwords;
        }
      )
    );
  }
}
