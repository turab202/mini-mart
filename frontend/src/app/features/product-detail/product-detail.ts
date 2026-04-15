import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { CartService } from '../../core/cart.service';
import { Product, CartItem } from '../../models/product';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './product-detail.html'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  quantity = 1;
  selectedImage = '';
  showSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getProduct(id).subscribe({
        next: (product: any) => {
          this.product = product;
          this.selectedImage = product.images?.[0] || '/assets/placeholder.jpg';
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Failed to load product:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product) return;
    
    const cartItem: CartItem = {
      productId: this.product._id,
      name: this.product.name,
      price: this.product.price,
      quantity: this.quantity,
      image: this.product.images[0]
    };
    
    this.cartService.addToCart(cartItem);
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 2000);
  }

  buyNow(): void {
    this.addToCart();
    setTimeout(() => {
      this.router.navigate(['/cart']);
    }, 300);
  }
}