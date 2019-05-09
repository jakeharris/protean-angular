import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  TypeInputComponent,
  SelectedTypesComponent,
  DefensiveEffectivenessRemarksComponent
} from './components';
import { TypesService } from './services/types.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TypeInputComponent,
    SelectedTypesComponent,
    DefensiveEffectivenessRemarksComponent
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [
    {
      provide: TypesService,
      useClass: TypesService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
