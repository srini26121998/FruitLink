import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HelpdeskService } from '../helpdesk.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {

  private helpdeskService = inject(HelpdeskService);
  faqs: any[] = [];

  ngOnInit(): void {
    this.loadFaq();
  }

  loadFaq() {
    this.helpdeskService.getFaq().subscribe((res: any[]) => {
      this.faqs = res;
    });
  }
}
