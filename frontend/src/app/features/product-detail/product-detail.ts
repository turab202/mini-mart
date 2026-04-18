import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { CartService } from '../../core/cart.service';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './product-detail.html'
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  isLoading = true;
  quantity = 1;
  selectedImage = '';
  showSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getProduct(id).subscribe({
        next: (product: any) => {
          this.product = product;
          this.selectedImage = product.images?.[0] || '';
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
    } else {
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  }

  selectImage(image: string) {
    this.selectedImage = image;
    this.cdr.markForCheck();
  }

  increaseQuantity() {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
      this.cdr.markForCheck();
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cdr.markForCheck();
    }
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart({
      productId: this.product._id,
      name: this.product.name,
      price: this.product.price,
      quantity: this.quantity,
      image: this.product.images?.[0] || ''
    });
    this.showSuccess = true;
    this.cdr.markForCheck();
    setTimeout(() => { this.showSuccess = false; this.cdr.markForCheck(); }, 2500);
  }

  buyNow() {
    this.addToCart();
    setTimeout(() => this.router.navigate(['/cart']), 300);
  }
}
