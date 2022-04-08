import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../components/product/product.interface';
import { OrderServiceService } from '../services/order-service/order-service.service';

@Component({
    selector: 'app-pos-overzicht',
    templateUrl: './pos-overzicht.component.html',
    styleUrls: ['./pos-overzicht.component.scss'],
})
export class PosOverzichtComponent implements OnInit {
    public productList: Array<Product> = [];
    public products: Array<Product> = [];
    public title: string;
    private categoryId: number;

    constructor(private orderService: OrderServiceService, private router: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.getProducts();
    }
    
    private getProducts(): void {
        this.products = JSON.parse(localStorage.getItem('AGO_PRODUCTS'));
        if (this.products === null) {
            setTimeout(() => {
                this.getProducts();
            }, 1)
        }

        this.router.data.subscribe(data => {
            this.categoryId = data.category;
            this.productList = this.products.filter(product => product.category === this.categoryId);

            this.getTitle(this.categoryId);
        });
    }

    private getTitle(categoryId: number): void {
        this.orderService.getCategories().subscribe(categories => {
            categories.forEach(category => {
                if (category.id === categoryId) this.title = category.title;
            });
        });
    }

}
