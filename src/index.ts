import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

export * from './components/ionic4-binary-search-login/ionic4-binary-search-login.component';
export * from './components/ionic4-binary-search-login-controls/ionic4-binary-search-login-controls.component';

import {Ionic4BinarySearchLoginComponent} from './components/ionic4-binary-search-login/ionic4-binary-search-login.component';
import {Ionic4BinarySearchLoginControlsComponent} from './components/ionic4-binary-search-login-controls/ionic4-binary-search-login-controls.component';

@NgModule({
  declarations: [
    Ionic4BinarySearchLoginComponent,
    Ionic4BinarySearchLoginControlsComponent
  ],
  entryComponents: [
    Ionic4BinarySearchLoginComponent,
    Ionic4BinarySearchLoginControlsComponent
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
