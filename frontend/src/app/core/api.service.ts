import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Products
  getProducts(params?: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`, { params });
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  createProduct(product: any): Observable<any> {
    console.log('API call to create product:', product);
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  // Orders
  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, order);
  }

  getOrders(params?: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`, { params });
  }

  updateOrderStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/orders/${id}/status`, { status });
  }
}