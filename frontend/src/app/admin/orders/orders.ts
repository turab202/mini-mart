import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html'
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  searchTerm = '';
  statusFilter = '';
  selectedOrder: any = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.loadOrders(); }

  loadOrders() {
    this.api.getOrders().subscribe({
      next: (res) => {
        this.orders = res.orders ?? [];
        this.filterOrders();
        this.cdr.markForCheck();
      },
      error: () => this.cdr.markForCheck()
    });
  }

  filterOrders() {
    let filtered = [...this.orders];
    if (this.searchTerm) {
      filtered = filtered.filter(o =>
        o.orderId?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.customerName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.customerPhone?.includes(this.searchTerm)
      );
    }
    if (this.statusFilter) filtered = filtered.filter(o => o.orderStatus === this.statusFilter);
    this.filteredOrders = filtered;
    this.cdr.markForCheck();
  }

  getStatusCount(status: string): number {
    return this.orders.filter(o => o.orderStatus === status).length;
  }

  updateStatus(order: any) {
    this.api.updateOrderStatus(order._id, order.orderStatus).subscribe({
      next: () => this.loadOrders()
    });
  }

  viewOrderDetails(order: any) { this.selectedOrder = order; this.cdr.markForCheck(); }
  closeDetails() { this.selectedOrder = null; this.cdr.markForCheck(); }
}
