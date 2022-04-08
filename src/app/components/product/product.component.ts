import { Component, Input, OnInit } from '@angular/core';
import { OrderServiceService } from 'src/app/services/order-service/order-service.service';
import { Product } from 'src/app/services/order-service/product.interface';
import { PricePipe } from './../../pipes/price.pipe';

@Component({
    selector: 'ago-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    @Input() product: Product;
    public orderAmount: number = 0;

    constructor(private orderService: OrderServiceService) {}

    public ngOnInit(): void {
        this.getOrders();
    }

    public addProduct(product: Product): void {
        if (product.stock > 0) {
            this.getOrders();
            this.product.stock -= 1;
            this.orderService.addOrder(product);
        }
    }

    private getOrders(): void {
        this.orderService.getOrders().subscribe(orders => {
            if (this.product) {
                this.orderAmount = orders.filter(x => x.id === this.product.id).length
            }
        });
    }

    public renderStatus(product: Product): string {
        return (product.stock == 0) ? 'status--alert' : (product.stock > 0 && product.stock <= 12) ? 'status--warning' : 'status--success';
    }

    public isActive(): string {
        return this.orderAmount > 0 && this.product.stock > 0 ? 'active' :
            (this.product.stock) === 0 ? 'disabled' : null;
    }

}
