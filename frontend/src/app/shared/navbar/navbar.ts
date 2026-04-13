import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html'
})
export class NavbarComponent implements OnInit {
  cartCount = 0;
  isMenuOpen = false;
  isAdminMenuOpen = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  goToCart() {
    this.router.navigate(['/cart']);
    this.closeMenu();
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
    this.closeMenu();
  }

  scrollToMenu() {
    this.router.navigate(['/products']);
    this.closeMenu();
  }
}