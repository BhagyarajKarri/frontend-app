import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service'; // Import your API service
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];

  constructor(private apiService: ItemService,private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchItems();
  }
  addItem() {
    this.router.navigate(['/add']); // Navigate to the 'item-add' route
  }
  fetchItems() {
    this.apiService.getAllItems().subscribe({
      next: (items: any[]) => {
        this.items = items;
      },
      error: (error: any) => {
        console.error('Error fetching items:', error);
      }
    });
  }
  editItem(item: any) {
    // Implement your edit logic here
    this.router.navigate(['/edit',  item['s.no']]);
    console.log(`Edit item:`, item);
  }
  
  deleteItem(item: any) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.apiService.deleteItem(item['s.no']).subscribe(
        {
          next: () => {
            console.log('Item deleted successfully');
            this.fetchItems(); // Refresh the item list after deletion
          },
          error: (error) => {
            console.error('Error deleting item:', error);
          }
        }
      );
    }
  }
  
  
}
