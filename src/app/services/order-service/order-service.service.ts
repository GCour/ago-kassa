import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category, Order, OrderProduct, Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  public orders: Array<Product> = [];
  public offersSubject = new BehaviorSubject<Product[]>(this.orders);
  private url: string = 'https://ago-admin-api.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.url}/products`);
  }

  public getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>('../../assets/category-list.json');
  }

  public getOrders(): Observable<Array<Product>> {
    return this.offersSubject.asObservable();
  }

  public addOrder(product: any): void {
    this.orders = [...this.orders, product];
    this.offersSubject.next(this.orders);
  }

  public emptyOrders(): void {
    this.orders = [];
    this.offersSubject.next(this.orders);
  }

  public removeOrder(product: Product): void {
    const i = this.orders.findIndex(x => x.id === product.id);
    this.orders.splice(i, 1);
    this.offersSubject.next(this.orders);
  }

  // disable total if coupon is enabled
  public confirmOrder(orders: Array<Order>): Observable<Array<Order>> {
    const orderProducts: Array<OrderProduct> = orders.map(order => {
      return {
        productId: order.product.id,
        price: order.product.price,
        retailPrice: order.product.retailPrice,
        total: order.count * order.product.price,
        amount: order.count,
        stock: order.product.stock
      };
    });
    return this.http.post<Array<Order>>(`${this.url}/orders/add`, orderProducts);
  }
}
