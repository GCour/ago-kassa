import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PosOverzichtComponent } from './pos-overzicht/pos-overzicht.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OrderServiceService } from './services/order-service/order-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, PosOverzichtComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        ComponentsModule, HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        OrderServiceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
