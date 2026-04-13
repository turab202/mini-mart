import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html'
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  searchTerm = '';
  statusFilter = '';
  selectedOrder: any = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.api.getOrders().subscribe(res => {
      this.orders = res.orders ?? [];
      this.filterOrders();
    });
  }

  filterOrders() {
    let filtered = [...this.orders];
    if (this.searchTerm) {
      filtered = filtered.filter(o => 
        o.orderId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.customerPhone.includes(this.searchTerm)
      );
    }
    if (this.statusFilter) {
      filtered = filtered.filter(o => o.orderStatus === this.statusFilter);
    }
    this.filteredOrders = filtered;
  }

  getStatusCount(status: string): number {
    return this.orders.filter(o => o.orderStatus === status).length;
  }

  updateStatus(order: any) {
    this.api.updateOrderStatus(order._id, order.orderStatus).subscribe();
  }

  viewOrderDetails(order: any) {
    this.selectedOrder = order;
  }

  closeDetails() {
    this.selectedOrder = null;
  }
}