import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://mini-mart-1-j6s3.onrender.com/api';

  constructor(private http: HttpClient) {}

  // Products
  getProducts(params: Record<string, string> = {}): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`, { params });
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  // Image Upload
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  // Orders
  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, order);
  }

  updateOrderStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/orders/${id}/status`, { status });
  }
}