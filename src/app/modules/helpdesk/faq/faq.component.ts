import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HelpdeskService } from '../helpdesk.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {

  private helpdeskService = inject(HelpdeskService);
  faqs: any[] = [];
  filteredFaqs: any[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.loadFaq();
  }

  loadFaq() {
    this.helpdeskService.getFaq().subscribe((res: any[]) => {
      this.faqs = res;
      this.filteredFaqs = res;
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredFaqs = this.faqs;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredFaqs = this.faqs.filter(f => 
        f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term)
      );
    }
  }
}
