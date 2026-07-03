import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditLogService, AuditLog } from '../services/audit-log.service';

@Component({
  selector: 'app-audit-log-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  log: AuditLog | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.log = this.auditLogService.getLogById(id);
    }
  }

  goBack() {
    this.router.navigate(['/audit-logs/list']);
  }
}
