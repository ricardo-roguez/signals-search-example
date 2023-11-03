import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApiService } from './services/api.service';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NgFor]
})
export class AppComponent implements  OnInit {
    private apiService = inject(ApiService);
    searchQuery = signal<string>('');
    items = computed(() => {
        const sq = this.searchQuery();
        return this.apiService.items().filter(x => x.includes(sq));
    });
    ngOnInit() {
        this.apiService.getAll();
    }

    onSearchUpdated(value: string) {
        this.searchQuery.set(value);
    }

  onItemAdded(value: string) {
    this.apiService.add(value);
  }
}
