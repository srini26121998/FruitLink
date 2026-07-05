import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salesman-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './salesman-create.component.html'
})
export class SalesmanCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  salesmanForm: FormGroup;
  isSubmitting = false;
  isEditMode = false;
  salesmanId: number | null = null;

  mockSalesmen = [
    { id: 1, name: 'Amit Kumar', email: 'amit.kumar@example.com', phone: '9876543210', location: 'Bangalore South', status: 'Active' },
    { id: 2, name: 'Rajesh Singh', email: 'rajesh.singh@example.com', phone: '9123456780', location: 'Whitefield', status: 'Active' },
    { id: 3, name: 'Suresh Menon', email: 'suresh.m@example.com', phone: '9988776655', location: 'Indiranagar', status: 'Inactive' },
    { id: 4, name: 'Vikram Gupta', email: 'vikram.g@example.com', phone: '9876543211', location: 'Koramangala', status: 'Active' },
    { id: 5, name: 'Neha Sharma', email: 'neha.s@example.com', phone: '9876543212', location: 'HSR Layout', status: 'On Leave' },
    { id: 6, name: 'Rahul Verma', email: 'rahul.v@example.com', phone: '9876543213', location: 'Jayanagar', status: 'Active' },
    { id: 7, name: 'Priya Patel', email: 'priya.p@example.com', phone: '9876543214', location: 'Malleswaram', status: 'Inactive' },
    { id: 8, name: 'Karan Singh', email: 'karan.s@example.com', phone: '9876543215', location: 'Hebbal', status: 'Active' },
    { id: 9, name: 'Anjali Desai', email: 'anjali.d@example.com', phone: '9876543216', location: 'BTM Layout', status: 'Active' },
    { id: 10, name: 'Rohan Mehta', email: 'rohan.m@example.com', phone: '9876543217', location: 'Marathahalli', status: 'Active' },
    { id: 11, name: 'Kavita Reddy', email: 'kavita.r@example.com', phone: '9876543218', location: 'Yelahanka', status: 'On Leave' },
    { id: 12, name: 'Arjun Das', email: 'arjun.d@example.com', phone: '9876543219', location: 'Bellandur', status: 'Active' }
  ];

  constructor() {
    this.salesmanForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      status: ['Active', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.salesmanId = +id;
        this.loadSalesmanData(this.salesmanId);
      }
    });
  }

  loadSalesmanData(id: number) {
    const salesman = this.mockSalesmen.find(s => s.id === id);
    if (salesman) {
      this.salesmanForm.patchValue({
        name: salesman.name,
        email: salesman.email,
        phone: salesman.phone,
        location: salesman.location,
        status: salesman.status
      });
    }
  }

  onSubmit() {
    if (this.salesmanForm.invalid) {
      this.salesmanForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/master-data/salesmen']);
    }, 1000);
  }

  cancel() {
    this.router.navigate(['/master-data/salesmen']);
  }
}
