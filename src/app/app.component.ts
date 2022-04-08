import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OrderServiceService } from './services/order-service/order-service.service';
import { Category, Order, Product } from './services/order-service/product.interface';
import { FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
    public orders: Array<Order> = [];
    public price: number = 0;
    public categories: Array<Category> = [];
    public products: Array<Product> = [];
    public isCouponEnabled: boolean = false;
    public cashier: string = '0';
    public isLoading: boolean = true;
    public activeCategory: string = 'Bieren';
    public isCashierOpened: boolean = false;
    public cashierForm = this.fb.group({
        cashier: ['', [Validators.required]]
    })

    constructor(
        private orderService: OrderServiceService,
        private fb: FormBuilder
    ) {
        if(localStorage.getItem('AGO_CASHIER')) {
            this.cashier = this.renderPrice(+localStorage.getItem('AGO_CASHIER'));
            this.cashierForm.controls.cashier.setValue(this.cashier);
        } else {
            localStorage.setItem('AGO_CASHIER', '0');
            this.cashier = this.renderPrice(0);
        }
    }

    ngOnInit(): void {
        this.getOrders();
        forkJoin([this.orderService.getProducts(), this.orderService.getCategories()]).pipe(
            tap(([products, categories]) => {
                this.products = products;
                localStorage.setItem('AGO_PRODUCTS', JSON.stringify(products));
                this.categories = categories;
                this.isLoading = false;
            })
        ).subscribe();
    }

    public getPrice(): string {
        this.price = 0;
        this.orders.forEach(order => {
            this.price += (order.count * order.product.price);
        });
        return (Math.round(this.price * 100) / 100).toFixed(2);
    }

    public confirmOrder(): void {
        this.isLoading = true;
        if (this.orders.length > 0) {
            this.orderService.confirmOrder(this.orders).subscribe(() => {
                this.isLoading = false;
                const products = [];
                this.products.forEach(product => {
                   const order = this.orders.find(x => x.product.id === product.id);
                   if (order) product.stock = product.stock - order.count;
                   products.push(product);
                })
                
                if (!this.isCouponEnabled) this.cashier = this.renderPrice(+this.cashier + +this.getPrice());
                
                localStorage.setItem('AGO_PRODUCTS', JSON.stringify(products));
                localStorage.setItem('AGO_CASHIER', this.cashier);
                
                this.orderService.emptyOrders();
            });
        }
    }

    public removeOrder(order: Order): void {
        order.product.stock = order.product.stock + 1;
        this.orderService.removeOrder(order.product);
    }

    public renderPrice(price: number): string {
        return (Math.round(price * 100) / 100).toFixed(2);
    }

    public enableCoupon(): void {
        this.isCouponEnabled = !this.isCouponEnabled;
    }

    private getOrders(): void {
        this.orderService.getOrders().subscribe(products => {
            this.groupOrders(products);
        });
    }

    private groupOrders(products: Array<Product>) {
        let orders = [];
        const grouped = _.groupBy(products, 'id');
        Object.values(grouped).map((p: any) => {
            orders.push({
                product: p[0],
                count: p.length
            })
        })
        this.orders = orders;
    }

    public getItemsCount(id: number): number {
        return this.products.filter(x => x.category === id).length;
    }

    public setCategoryActive(category: string): void {
        this.activeCategory = category;
    }

    public openCashier(): void {
        this.isCashierOpened = true;
    }

    public closeCashier(): void {
        this.isCashierOpened = false;
        this.cashierForm.controls.cashier.setValue(this.cashier);
    }

    public updateCashier(): void {
        localStorage.setItem('AGO_CASHIER', this.renderPrice(+this.cashierForm.controls.cashier.value));
        this.cashier =this.renderPrice(+this.cashierForm.controls.cashier.value);
        this.isCashierOpened = false;
    }
}
