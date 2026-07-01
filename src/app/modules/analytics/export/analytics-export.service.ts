import { Injectable, inject } from '@angular/core';
import { ExcelExportUtil } from './excel-export.util';
import { PdfExportUtil } from './pdf-export.util';

@Injectable({ providedIn: 'root' })
export class AnalyticsExportService {

  private readonly excel = inject(ExcelExportUtil);
  private readonly pdf = inject(PdfExportUtil);

  exportExcel(data: any[], filename = 'analytics-report') {
    this.excel.export(data, filename);
  }

  exportPDF(elementId: string, filename = 'analytics-report') {
    this.pdf.generatePDF(elementId, filename);
  }
}
