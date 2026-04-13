import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/product';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private sessionId = localStorage.getItem('sessionId') || this.generateSessionId();

  constructor() {
    localStorage.setItem('sessionId', this.sessionId);
    this.loadCart();
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private loadCart(): void {
    const saved = localStorage.getItem(`cart_${this.sessionId}`);
    if (saved) {
      try {
        this.cartItems.next(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart', e);
        this.cartItems.next([]);
      }
    }
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem(`cart_${this.sessionId}`, JSON.stringify(items));
    this.cartItems.next(items);
  }

  getCart(): CartItem[] {
    return this.cartItems.value;
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  addToCart(item: CartItem): void {
    const items = [...this.cartItems.value];
    const existingIndex = items.findIndex(i => i.productId === item.productId);
    
    if (existingIndex !== -1) {
      items[existingIndex].quantity += item.quantity;
    } else {
      items.push({ ...item });
    }
    
    this.saveCart(items);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    
    const items = this.cartItems.value.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    this.saveCart(items);
  }

  removeItem(productId: string): void {
    this.saveCart(this.cartItems.value.filter(item => item.productId !== productId));
  }

  clearCart(): void {
    this.saveCart([]);
  }

  getSessionId(): string {
    return this.sessionId;
  }
}