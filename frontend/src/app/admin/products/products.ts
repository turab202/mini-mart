import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div>
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 class="font-montserrat text-2xl font-bold text-dark-navy">Product Management</h2>
          <p class="font-poppins text-sm text-gray-500">Manage your store products</p>
        </div>
        <button (click)="openProductModal()" class="flex items-center gap-2 bg-orange text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Add Product
        </button>
      </div>

      <!-- Search & Filter -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input type="text" [(ngModel)]="searchTerm" (ngModelChange)="filterProducts()" placeholder="Search products..." class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
        </div>
        <select [(ngModel)]="categoryFilter" (ngModelChange)="filterProducts()" class="px-4 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
          <option value="">All Categories</option>
          <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
        </select>
        <select [(ngModel)]="statusFilter" (ngModelChange)="filterProducts()" class="px-4 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-deep-blue text-white">
              <tr>
                <th class="text-left px-4 py-3 font-poppins text-sm">Image</th>
                <th class="text-left px-4 py-3 font-poppins text-sm">Name</th>
                <th class="text-left px-4 py-3 font-poppins text-sm">Category</th>
                <th class="text-left px-4 py-3 font-poppins text-sm">Price</th>
                <th class="text-left px-4 py-3 font-poppins text-sm">Stock</th>
                <th class="text-left px-4 py-3 font-poppins text-sm">Status</th>
                <th class="text-left px-4 py-3 font-poppins text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let product of paginatedProducts" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="px-4 py-3">
                  <img [src]="product.images?.[0] || '/assets/placeholder.jpg'" class="w-10 h-10 rounded-lg object-cover">
                </td>
                <td class="px-4 py-3 font-poppins text-sm text-dark-navy">{{ product.name }}</td>
                <td class="px-4 py-3 font-poppins text-sm text-gray-500">{{ product.category }}</td>
                <td class="px-4 py-3 font-poppins text-sm font-medium text-orange">{{ product.price }} ETB</td>
                <td class="px-4 py-3">
                  <span [class.text-red-500]="product.stock < 10" class="font-poppins text-sm">{{ product.stock }}</span>
                </td>
                <td class="px-4 py-3">
                  <button (click)="toggleStatus(product)" class="px-2 py-1 rounded-full text-xs font-medium" 
                    [class.bg-green-100]="product.isActive" 
                    [class.text-green-700]="product.isActive" 
                    [class.bg-red-100]="!product.isActive" 
                    [class.text-red-700]="!product.isActive">
                    {{ product.isActive ? 'Active' : 'Inactive' }}
                  </button>
                </td>
                <td class="px-4 py-3">
                  <div class="flex gap-2">
                    <button (click)="openProductModal(product)" class="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button (click)="deleteProduct(product._id)" class="p-1 text-red-600 hover:bg-red-50 rounded">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
               </tr>
              <tr *ngIf="paginatedProducts.length === 0">
                <td colspan="7" class="text-center py-8 text-gray-500">No products found</td>
               </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Product Modal -->
    <div *ngIf="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" (click)="closeModal()">
      <div class="bg-white rounded-xl max-w-md w-full" (click)="$event.stopPropagation()">
        <div class="p-6">
          <h2 class="font-montserrat text-xl font-bold text-dark-navy mb-4">{{ editingProduct ? 'Edit Product' : 'Add Product' }}</h2>
          
          <form [formGroup]="productForm" (ngSubmit)="saveProduct()" class="space-y-4">
            <div>
              <label class="font-poppins text-sm text-dark-navy block mb-1">Product Name *</label>
              <input type="text" formControlName="name" 
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
              <div *ngIf="productForm.get('name')?.invalid && productForm.get('name')?.touched" class="text-red-500 text-xs mt-1">
                Product name is required
              </div>
            </div>

            <div>
              <label class="font-poppins text-sm text-dark-navy block mb-1">Category *</label>
              <select formControlName="category" 
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
                <option value="">Select Category</option>
                <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
              </select>
              <div *ngIf="productForm.get('category')?.invalid && productForm.get('category')?.touched" class="text-red-500 text-xs mt-1">
                Category is required
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="font-poppins text-sm text-dark-navy block mb-1">Price (ETB) *</label>
                <input type="number" formControlName="price" 
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
              </div>
              <div>
                <label class="font-poppins text-sm text-dark-navy block mb-1">Stock *</label>
                <input type="number" formControlName="stock" 
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
              </div>
            </div>

            <div>
              <label class="font-poppins text-sm text-dark-navy block mb-1">Description *</label>
              <textarea formControlName="description" rows="3" 
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none"></textarea>
            </div>

            <div>
              <label class="font-poppins text-sm text-dark-navy block mb-1">Image URL</label>
              <input type="text" formControlName="image" 
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-orange focus:outline-none">
              <p class="text-xs text-gray-400 mt-1">Enter a valid image URL or use placeholder</p>
            </div>

            <div class="flex gap-3 pt-4">
              <button type="submit" 
                class="flex-1 bg-orange text-white py-2 rounded-lg hover:bg-opacity-90 transition"
                [disabled]="productForm.invalid">
                {{ editingProduct ? 'Update Product' : 'Save Product' }}
              </button>
              <button type="button" (click)="closeModal()" 
                class="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = ['Electronics', 'Clothing', 'Home & Living', 'Beauty', 'Groceries', 'Sports', 'Toys', 'Books'];
  searchTerm = '';
  categoryFilter = '';
  statusFilter = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  showModal = false;
  editingProduct: any = null;
  productForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      oldPrice: [''],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      image: ['/assets/placeholder.jpg']
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe({
      next: (res) => {
        this.products = res.products || [];
        this.filterProducts();
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.products = [];
        this.filteredProducts = [];
      }
    });
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  filterProducts() {
    let filtered = [...this.products];
    
    if (this.searchTerm) {
      filtered = filtered.filter(p => 
        p.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.categoryFilter) {
      filtered = filtered.filter(p => p.category === this.categoryFilter);
    }
    if (this.statusFilter === 'active') {
      filtered = filtered.filter(p => p.isActive);
    } else if (this.statusFilter === 'inactive') {
      filtered = filtered.filter(p => !p.isActive);
    }
    
    this.filteredProducts = filtered;
    this.totalPages = Math.max(1, Math.ceil(this.filteredProducts.length / this.itemsPerPage));
    this.currentPage = Math.min(this.currentPage, this.totalPages);
  }

  openProductModal(product: any = null) {
    this.editingProduct = product;
    if (product) {
      this.productForm.patchValue({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        category: product.category || '',
        stock: product.stock || '',
        image: product.images?.[0] || '/assets/placeholder.jpg'
      });
    } else {
      this.productForm.reset({
        name: '',
        description: '',
        price: '',
        oldPrice: '',
        category: '',
        stock: '',
        image: '/assets/placeholder.jpg'
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingProduct = null;
    this.productForm.reset({
      image: '/assets/placeholder.jpg'
    });
  }

  saveProduct() {
    console.log('Save button clicked');
    console.log('Form valid:', this.productForm.valid);
    console.log('Form values:', this.productForm.value);
    
    if (this.productForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
      console.log('Form is invalid');
      return;
    }
    
    const productData = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: parseFloat(this.productForm.value.price),
      oldPrice: this.productForm.value.oldPrice ? parseFloat(this.productForm.value.oldPrice) : undefined,
      category: this.productForm.value.category,
      stock: parseInt(this.productForm.value.stock),
      images: [this.productForm.value.image],
      isActive: true,
      isFeatured: false
    };
    
    console.log('Saving product:', productData);

    if (this.editingProduct) {
      this.api.updateProduct(this.editingProduct._id, productData).subscribe({
        next: () => {
          console.log('Product updated successfully');
          this.loadProducts();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error updating product:', err);
          alert('Failed to update product. Please check the console for details.');
        }
      });
    } else {
      this.api.createProduct(productData).subscribe({
        next: () => {
          console.log('Product created successfully');
          this.loadProducts();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating product:', err);
          alert('Failed to create product. Please check the console for details.');
        }
      });
    }
  }

  toggleStatus(product: any) {
    this.api.updateProduct(product._id, { isActive: !product.isActive }).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error updating status:', err);
      }
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.api.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product');
        }
      });
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}