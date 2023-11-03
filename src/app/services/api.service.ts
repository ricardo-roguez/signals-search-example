import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiData = ['jar', 'jaw', 'hip', 'hop'];
  private items$ = signal<string[]>([]);
  items = this.items$.asReadonly();
  
  private mockHttpCall = <T>(result: T) => {
    return new Observable<T>(s => {
      s.next(result);
      s.complete();
    });
  }
  
  getAll() {
    this.mockHttpCall<string[]>(this.apiData)
        .subscribe((response: string[]) => this.items$.set(response))
  }
  
  add(item: string) {
    this.apiData = [...this.apiData, item];
    this.mockHttpCall<string>(item)
        .subscribe(item => this.items$.update(items => [...items, item]));
  }
  
}
