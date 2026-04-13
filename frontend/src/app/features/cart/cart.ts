import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './cart.html'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  subtotal = 0;
  deliveryFee = 150;
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.subtotal = this.cartService.getSubtotal();
      this.total = this.subtotal + this.deliveryFee;
    });
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: string) {
    this.cartService.removeItem(productId);
  }
}