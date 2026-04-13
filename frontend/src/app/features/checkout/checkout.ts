import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { ApiService } from '../../core/api.service';
import { CartItem, Product } from '../../models/product';
import { Order } from '../../models/order';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './checkout.html'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  subtotal = 0;
  deliveryFee = 150;
  total = 0;
  cartCount = 0;
  isProcessing = false;
  minDate = new Date().toISOString().split('T')[0];

  paymentMethods = [
    { value: 'telegram', name: 'Telegram Payment', icon: '💬', description: 'Pay via Telegram' },
    { value: 'chapa', name: 'Chapa', icon: '🔵', description: 'Ethiopian Payment Gateway' },
    { value: 'cbe', name: 'CBE Birr', icon: '🏦', description: 'Commercial Bank of Ethiopia' }
  ];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private api: ApiService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      deliveryDate: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartCount = this.cartService.getCartCount();
      this.subtotal = this.cartService.getSubtotal();
      this.total = this.subtotal + this.deliveryFee;
    });
  }

  placeOrder() {
    if (this.checkoutForm.invalid) {
      Object.keys(this.checkoutForm.controls).forEach(key => {
        this.checkoutForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isProcessing = true;

    const orderData: Partial<Order> = {
      customerName: this.checkoutForm.value.fullName,
      customerPhone: this.checkoutForm.value.phone,
      customerEmail: this.checkoutForm.value.email,
      deliveryAddress: this.checkoutForm.value.address,
      deliveryDate: this.checkoutForm.value.deliveryDate,
      paymentMethod: this.checkoutForm.value.paymentMethod,
      items: this.cartItems,
      subtotal: this.subtotal,
      deliveryFee: this.deliveryFee,
      total: this.total,
      sessionId: this.cartService.getSessionId(),
      orderStatus: 'pending',
      paymentStatus: 'pending'
    };

    this.api.createOrder(orderData).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.router.navigate(['/order-success'], { state: { order } });
      },
      error: (error) => {
        console.error('Order failed:', error);
        this.isProcessing = false;
        alert('Order failed. Please check your connection and try again.');
      }
    });
  }
}