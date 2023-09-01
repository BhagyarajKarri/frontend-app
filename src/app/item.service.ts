import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) {}

  getAllItems() {
    return this.http.get<any[]>(this.baseUrl);
  }

  createItem(item: any) {
    return this.http.post<any>(this.baseUrl, item);
  }

  getItemBySno(sno: string) {
    return this.http.get<any>(`${this.baseUrl}/${sno}`);
  }

  updateItem(sno: string, item: any) {
    return this.http.put<any>(`${this.baseUrl}/${sno}`, item);
  }

  deleteItem(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
