import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Ticket {
  id: number;
  title: string;
  status: string;
  created: Date;
}

export interface TicketDetails {
  id: number;
  title: string;
  status: string;
  created: Date;
  messages: { from: string; message: string; time: Date }[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class HelpdeskService {

  constructor() {}

  // -----------------------------
  // TICKETS LIST (MOCK)
  // -----------------------------
  getTickets(): Observable<Ticket[]> {
    return of([
      { id: 1, title: 'Payment issue', status: 'Open', created: new Date() },
      { id: 2, title: 'Delivery delay', status: 'Closed', created: new Date() },
      { id: 3, title: 'Order not received', status: 'Pending', created: new Date() }
    ]);
  }

  // -----------------------------
  // TICKET DETAILS (MOCK)
  // -----------------------------
  getTicketDetails(id: number): Observable<TicketDetails> {
    return of({
      id,
      title: 'Payment issue',
      status: 'Open',
      created: new Date(),
      messages: [
        { from: 'User', message: 'I made payment but not updated', time: new Date() },
        { from: 'Support', message: 'We are checking', time: new Date() }
      ]
    });
  }

  // -----------------------------
  // FAQ LIST (MOCK)
  // -----------------------------
  getFaq(): Observable<FaqItem[]> {
    return of([
      { question: 'How to place an order?', answer: 'Go to the fruits catalog, select your desired items and quantities, and add them to your cart. Proceed to checkout to finalize your order.' },
      { question: 'How to track delivery?', answer: 'You can track the live status of your delivery directly from the Orders page. A detailed route will be available once the driver is en-route.' },
      { question: 'How to contact support?', answer: 'You can submit a detailed ticket in the Helpdesk section. Our support team typically responds within 1-2 business hours.' },
      { question: 'What is the refund policy?', answer: 'We offer refunds for damaged or incorrect items reported within 24 hours of delivery. Please attach photos to your support ticket.' },
      { question: 'Can I modify my order?', answer: 'Orders can be modified up to 4 hours before dispatch. Contact support for urgent changes.' },
      { question: 'Are there minimum orders?', answer: 'Yes, minimum order quantities vary by product type. Please check the individual product details.' },
      { question: 'Accepted payment methods?', answer: 'We accept all major credit cards, bank transfers, and standard corporate payment terms for approved accounts.' }
    ]);
  }

  // -----------------------------
  // CREATE TICKET (MOCK)
  // -----------------------------
  createTicket(payload: any): Observable<any> {
    console.log('New Ticket Created:', payload);
    return of({
      success: true,
      ticketId: Math.floor(Math.random() * 9000) + 1000
    });
  }
}
