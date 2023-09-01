import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../item.service'; // Import your API service
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  existingItem: any;// Input to pass existing item data when editing
  itemForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.itemForm = this.fb.group({
      // Define your form controls here
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      city: ['', Validators.required],
      's.no': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const sno = params['sno'];
     // console.log(sno);
     if (typeof sno !== 'undefined' && sno !== '') {
      this.apiService.getItemBySno(sno).subscribe({
        next: (response) => {
          this.existingItem = response; // Assuming the API returns the existing item's data
          this.initForm();
          this.patchFormWithExistingData();
          console.log(this.existingItem);''
        },
        error: (error) => {
          console.error('Error fetching existing item:', error);
        },
      });
    }
    });
  }

  initForm() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      city: ['', Validators.required],
      's.no': ['', Validators.required],
    });
  }

  patchFormWithExistingData() {
    this.itemForm.patchValue(this.existingItem);
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value;
      if (this.existingItem) {
        // Handle updating an existing item
        this.apiService.updateItem(this.existingItem['s.no'], formData).subscribe({
          next: (response) => {
            console.log('Item updated successfully:', response);
            this.successMessage = 'Item updated successfully!';
            setTimeout(() => {
              this.router.navigate(['/']); 
            }, 5000); // Redirect after 5 seconds
          },
          error: (error) => {
            console.error('Error updating item:', error);
            this.errorMessage = 'Error updating item. Please try again.';
          },
        });
      } else {
        // Handle adding a new item
        this.apiService.createItem(formData).subscribe({
          next: (response) => {
            console.log('Item added successfully:', response);
            this.itemForm.reset(); 
            this.successMessage = 'Item added successfully!';
            setTimeout(() => {
              this.router.navigate(['/']); 
            }, 5000); // Redirect after 5 seconds
          },
          error: (error) => {
            console.error('Error adding item:', error);
            this.errorMessage = 'Error adding item. Please try again.';
          },
        });
      }
    }
  }
}
