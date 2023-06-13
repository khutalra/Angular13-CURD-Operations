import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000/productList';

  constructor(private http: HttpClient) {}

  postProduct(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }
  getProduct() {
    return this.http.get<any>(this.baseUrl);
  }

  putProduct(id:number, data: any) {
    return this.http.put<any>("http://localhost:3000/productList/"+id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>("http://localhost:3000/productList/"+id);
  }



}


