import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuditLog {
  id: string;
  userName: string;
  userRole: string;
  activity: string;
  module: string;
  screenName: string;
  recordId: string | null;
  date: Date;
  ipAddress: string;
  browser: string;
  status: 'Success' | 'Failed' | 'Pending';
}

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {

  private mockLogs: AuditLog[] = [
    {
      id: 'AL-1001',
      userName: 'Admin User',
      userRole: 'Super Admin',
      activity: 'User Login',
      module: 'Authentication',
      screenName: 'Login Screen',
      recordId: null,
      date: new Date(new Date().setHours(new Date().getHours() - 1)),
      ipAddress: '192.168.1.105',
      browser: 'Chrome 114.0.0.0',
      status: 'Success'
    },
    {
      id: 'AL-1002',
      userName: 'Mario',
      userRole: 'Branch Manager',
      activity: 'Order Created',
      module: 'Orders',
      screenName: 'Create Order',
      recordId: 'ORD-5001',
      date: new Date(new Date().setHours(new Date().getHours() - 2)),
      ipAddress: '10.0.0.52',
      browser: 'Safari 16.4',
      status: 'Success'
    },
    {
      id: 'AL-1003',
      userName: 'Luigi',
      userRole: 'Sales Rep',
      activity: 'Product Updated',
      module: 'Products',
      screenName: 'Edit Product',
      recordId: 'PRD-882',
      date: new Date(new Date().setHours(new Date().getHours() - 3)),
      ipAddress: '10.0.0.21',
      browser: 'Firefox 113.0',
      status: 'Success'
    },
    {
      id: 'AL-1004',
      userName: 'Toad',
      userRole: 'Delivery Agent',
      activity: 'Order Delivered',
      module: 'Delivery',
      screenName: 'Delivery Dashboard',
      recordId: 'ORD-4998',
      date: new Date(new Date().setHours(new Date().getHours() - 5)),
      ipAddress: '192.168.1.200',
      browser: 'Chrome Mobile',
      status: 'Success'
    },
    {
      id: 'AL-1005',
      userName: 'Bowser',
      userRole: 'Shop Manager',
      activity: 'Billing Generated',
      module: 'Payments',
      screenName: 'Invoice Generator',
      recordId: 'INV-1020',
      date: new Date(new Date().setHours(new Date().getHours() - 6)),
      ipAddress: '172.16.0.4',
      browser: 'Edge 113',
      status: 'Failed'
    },
    {
      id: 'AL-1006',
      userName: 'Admin User',
      userRole: 'Super Admin',
      activity: 'Settings Modified',
      module: 'System Settings',
      screenName: 'General Settings',
      recordId: null,
      date: new Date(new Date().setHours(new Date().getHours() - 24)),
      ipAddress: '192.168.1.105',
      browser: 'Chrome 114.0.0.0',
      status: 'Success'
    },
    {
      id: 'AL-1007',
      userName: 'Peach',
      userRole: 'Support Agent',
      activity: 'Reports Viewed',
      module: 'Analytics',
      screenName: 'Sales Report',
      recordId: null,
      date: new Date(new Date().setHours(new Date().getHours() - 48)),
      ipAddress: '10.0.0.99',
      browser: 'Chrome 114.0.0.0',
      status: 'Success'
    }
  ];

  private logsSubject = new BehaviorSubject<AuditLog[]>(this.mockLogs);
  public logs$ = this.logsSubject.asObservable();

  constructor() { }

  getLogs(): Observable<AuditLog[]> {
    return this.logs$;
  }

  getLogById(id: string): AuditLog | undefined {
    return this.mockLogs.find(log => log.id === id);
  }

  // Optional: Function to add new logs programmatically (if needed in real implementation)
  addLog(log: Omit<AuditLog, 'id' | 'date'>) {
    const newLog: AuditLog = {
      ...log,
      id: `AL-${1000 + this.mockLogs.length + 1}`,
      date: new Date()
    };
    this.mockLogs = [newLog, ...this.mockLogs];
    this.logsSubject.next(this.mockLogs);
  }
}
