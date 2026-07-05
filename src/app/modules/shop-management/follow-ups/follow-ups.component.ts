import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface FollowUp {
  id: string;
  shop: string;
  pendingIssues: string;
  followUpDate: string;
  nextFollowUp: string;
  assignedEmployee: string;
  salesman: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Approved';
  remarks: string;
  approvalMessage?: string;
}

@Component({
  selector: 'app-follow-ups',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './follow-ups.component.html',
  styleUrls: ['./follow-ups.component.css']
})
export class FollowUpsComponent {

  followUps = signal<FollowUp[]>([
    {
      id: 'FUP-1001',
      shop: 'Green Apple Mart',
      pendingIssues: 'Payment delayed for 2 weeks',
      followUpDate: '2026-07-01',
      nextFollowUp: '2026-07-04',
      assignedEmployee: 'John Doe',
      salesman: 'Michael Scott',
      status: 'Open',
      remarks: 'Shop owner promised to clear by weekend.'
    },
    {
      id: 'FUP-1002',
      shop: 'City Fresh Fruits',
      pendingIssues: 'Frequent returns due to quality',
      followUpDate: '2026-06-28',
      nextFollowUp: '2026-07-05',
      assignedEmployee: 'Sarah Smith',
      salesman: 'Dwight Schrute',
      status: 'In Progress',
      remarks: 'Inspected recent delivery. Replaced damaged items.'
    },
    {
      id: 'FUP-1003',
      shop: 'Daily Needs Store',
      pendingIssues: 'Requesting higher credit limit',
      followUpDate: '2026-07-02',
      nextFollowUp: '2026-07-09',
      assignedEmployee: 'Mike Johnson',
      salesman: 'Jim Halpert',
      status: 'Resolved',
      remarks: 'Credit limit increased to ₹50,000 after approval.'
    }
  ]);

  searchTerm = '';
  statusFilter = 'All';
  showModal = false;
  isEditing = false;
  currentFollowUp: Partial<FollowUp> = {};

  showApproveModal = false;
  approveMessage = '';
  followUpToApprove: FollowUp | null = null;

  get filteredFollowUps() {
    return this.followUps().filter(fup => {
      const matchSearch = fup.shop.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          fup.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          fup.assignedEmployee.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.statusFilter === 'All' || fup.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  getStatusClass(status: string) {
    switch(status) {
      case 'Open': return 'bg-red-50 text-red-700 border-red-200';
      case 'In Progress': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Closed': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'Approved': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }

  openCreateModal() {
    this.isEditing = false;
    this.currentFollowUp = {
      id: 'FUP-' + Math.floor(1000 + Math.random() * 9000),
      shop: '',
      pendingIssues: '',
      followUpDate: new Date().toISOString().split('T')[0],
      nextFollowUp: '',
      assignedEmployee: '',
      salesman: '',
      status: 'Open',
      remarks: ''
    };
    this.showModal = true;
  }

  openEditModal(fup: FollowUp) {
    this.isEditing = true;
    this.currentFollowUp = { ...fup };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveFollowUp() {
    if (this.isEditing) {
      this.followUps.update(fups => fups.map(f => f.id === this.currentFollowUp.id ? this.currentFollowUp as FollowUp : f));
    } else {
      this.followUps.update(fups => [this.currentFollowUp as FollowUp, ...fups]);
    }
    this.closeModal();
  }

  openApproveModal(fup: FollowUp) {
    this.followUpToApprove = fup;
    this.approveMessage = '';
    this.showApproveModal = true;
  }

  closeApproveModal() {
    this.showApproveModal = false;
    this.followUpToApprove = null;
    this.approveMessage = '';
  }

  confirmApprove() {
    if (this.followUpToApprove) {
      this.followUps.update(fups => fups.map(f => f.id === this.followUpToApprove!.id ? { 
        ...f, 
        status: 'Approved', 
        approvalMessage: this.approveMessage,
        remarks: this.approveMessage ? `Approved: ${this.approveMessage}` : f.remarks 
      } : f));
      this.closeApproveModal();
    }
  }
}
