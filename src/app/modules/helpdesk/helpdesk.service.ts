import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Ticket {
  id: number;
  ticketNumber: string;
  title: string;
  shop: string;
  category: string;
  priority: string;
  description: string;
  assignedTo: string;
  status: string;
  created: Date;
  updatedDate: Date;
}

export interface TicketDetails extends Ticket {
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

  constructor() { }



  // -----------------------------
  // TICKETS LIST (MOCK)
  // -----------------------------
  getTickets(): Observable<Ticket[]> {
    return of([
      { id: 1, ticketNumber: 'TKT-1001', title: 'Payment issue', shop: 'Main Street Branch', category: 'Payment', priority: 'High', description: 'I made payment but not updated.', assignedTo: 'John Doe', status: 'Open', created: new Date(), updatedDate: new Date() },
      { id: 2, ticketNumber: 'TKT-1002', title: 'Delivery delay', shop: 'Downtown Store', category: 'Delivery', priority: 'Medium', description: 'Order delayed by 2 hours.', assignedTo: 'Jane Smith', status: 'Closed', created: new Date(Date.now() - 86400000), updatedDate: new Date() },
      { id: 3, ticketNumber: 'TKT-1003', title: 'Order not received', shop: 'Uptown Market', category: 'Order Issue', priority: 'Urgent', description: 'Customer claims order was not received.', assignedTo: 'Mike Johnson', status: 'Pending', created: new Date(Date.now() - 172800000), updatedDate: new Date(Date.now() - 86400000) }
    ]);
  }

  // -----------------------------
  // TICKET DETAILS (MOCK)
  // -----------------------------
  getTicketDetails(id: number): Observable<TicketDetails> {
    return of({
      id,
      ticketNumber: 'TKT-1001',
      title: 'Payment issue',
      shop: 'Main Street Branch',
      category: 'Payment',
      priority: 'High',
      description: 'I made payment but not updated.',
      assignedTo: 'John Doe',
      status: 'Open',
      created: new Date(),
      updatedDate: new Date(),
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
