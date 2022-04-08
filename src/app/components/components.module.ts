import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from './product/product.component';
import { PricePipe } from './../pipes/price.pipe';

@NgModule({
  declarations: [ProductComponent, PricePipe],
  exports: [ProductComponent],
  entryComponents: [],
  imports: [BrowserModule],
})
export class ComponentsModule {}
