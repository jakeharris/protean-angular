import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  TypeInputComponent,
  SelectedTypesComponent,
  DefensiveEffectivenessRemarksComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    TypeInputComponent,
    SelectedTypesComponent,
    DefensiveEffectivenessRemarksComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
