import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

export * from './ionic4-binary-search-login/ionic4-binary-search-login.component';

import {Ionic4BinarySearchLoginComponent} from './ionic4-binary-search-login/ionic4-binary-search-login.component';

@NgModule({
  declarations: [
    Ionic4BinarySearchLoginComponent
  ],
  entryComponents: [
    Ionic4BinarySearchLoginComponent
  ],
  exports: [
    Ionic4BinarySearchLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class Ionic4BinarySearchLoginModule {
  static forRoot():ModuleWithProviders {
    return {
      ngModule: Ionic4BinarySearchLoginModule,
      providers: []
    };
  }
}
