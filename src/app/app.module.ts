import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ClickOutsideModule } from 'ng-click-outside';

import { InventoryService } from './common/services/inventory.service';
import { BaseHttpService } from './common/services/base-http.service';

import { NumbersPipe } from './common/pipes/numbers.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AddInventoryComponent } from './pages/add-inventory/add-inventory.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConsumeComponent } from './pages/consume/consume.component';
import { ModalComponent } from './pages/home/components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddInventoryComponent,
    SidebarComponent,
    ConsumeComponent,
    NumbersPipe,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ClickOutsideModule
  ],
  providers: [InventoryService, BaseHttpService],
  bootstrap: [AppComponent],
  exports: [NumbersPipe]
})
export class AppModule {}
