import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './order-success.html'
})
export class OrderSuccessComponent implements OnInit {
  order: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.order = navigation?.extras?.state?.['order'];
  }

  ngOnInit() {
    if (!this.order) {
      this.router.navigate(['/']);
    }
  }
}