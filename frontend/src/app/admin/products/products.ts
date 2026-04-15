import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html'
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
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isUploading = false;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      oldPrice: [''],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      image: [''],
      isFeatured: [false]
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.api.getProducts({ admin: 'true' }).subscribe({
      next: (res) => {
        this.products = res.products || [];
        this.filterProducts();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.showError('Failed to load products. Check your connection.');
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

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => { this.imagePreview = reader.result as string; };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.imagePreview = null;
  }

  openProductModal(product: any = null) {
    this.editingProduct = product;
    this.selectedImage = null;
    this.imagePreview = null;
    this.errorMessage = '';
    if (product) {
      this.productForm.patchValue({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        category: product.category || '',
        stock: product.stock || '',
        image: product.images?.[0] || '',
        isFeatured: product.isFeatured || false
      });
      this.imagePreview = product.images?.[0] || null;
    } else {
      this.productForm.reset({ name: '', description: '', price: '', oldPrice: '', category: '', stock: '', image: '', isFeatured: false });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingProduct = null;
    this.selectedImage = null;
    this.imagePreview = null;
    this.errorMessage = '';
  }

  async saveProduct() {
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach(key => this.productForm.get(key)?.markAsTouched());
      return;
    }
    try {
      let imageUrl = this.productForm.value.image || '';
      if (this.selectedImage) {
        this.isUploading = true;
        const formData = new FormData();
        formData.append('image', this.selectedImage);
        const uploadRes = await this.api.uploadImage(formData).toPromise();
        imageUrl = uploadRes.imageUrl;
        this.isUploading = false;
      }
      const productData = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: parseFloat(this.productForm.value.price),
        oldPrice: this.productForm.value.oldPrice ? parseFloat(this.productForm.value.oldPrice) : undefined,
        category: this.productForm.value.category,
        stock: parseInt(this.productForm.value.stock),
        images: imageUrl ? [imageUrl] : [],
        isActive: true,
        isFeatured: this.productForm.value.isFeatured || false
      };

      if (this.editingProduct) {
        this.api.updateProduct(this.editingProduct._id, productData).subscribe({
          next: () => { this.loadProducts(); this.closeModal(); this.showToast('Product updated successfully!'); },
          error: () => { this.isUploading = false; this.errorMessage = 'Failed to update product. Please try again.'; }
        });
      } else {
        this.api.createProduct(productData).subscribe({
          next: () => { this.loadProducts(); this.closeModal(); this.showToast('Product added successfully!'); },
          error: () => { this.isUploading = false; this.errorMessage = 'Failed to create product. Please try again.'; }
        });
      }
    } catch {
      this.isUploading = false;
      this.errorMessage = 'Failed to upload image. Please try again.';
    }
  }

  toggleStatus(product: any) {
    this.api.updateProduct(product._id, { isActive: !product.isActive }).subscribe({
      next: () => this.loadProducts(),
      error: () => this.showError('Failed to update product status.')
    });
  }

  toggleFeatured(product: any) {
    this.api.updateProduct(product._id, { isFeatured: !product.isFeatured }).subscribe({
      next: () => this.loadProducts(),
      error: () => this.showError('Failed to update featured status.')
    });
  }

  deleteProduct(id: string) {
    this.showModal = false;
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      this.api.deleteProduct(id).subscribe({
        next: () => { this.loadProducts(); this.showToast('Product deleted.'); },
        error: () => this.showError('Failed to delete product.')
      });
    }
  }

  prevPage() { if (this.currentPage > 1) this.currentPage--; }
  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }

  showToast(message: string) {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 3000);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 4000);
  }
}
