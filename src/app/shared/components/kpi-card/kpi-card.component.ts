import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedChartsModule } from '../../charts/shared-charts.module'; // ✅ ADD THIS
import {
  ApexChart,
  ApexStroke,
  ApexAxisChartSeries
} from 'ng-apexcharts';

@Component({
  selector: 'kpi-card',
  standalone: true,
  imports: [CommonModule,SharedChartsModule],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.css']
})
export class KpiCardComponent {

  /* ------------------------------------
     Inputs
  ------------------------------------- */

  /** KPI Label */
  @Input() title!: string;

  /** Display value */
  private _value = signal<number | string>(0);

  @Input() set value(v: number | string) {
    this.animateValue(v);
  }
  get value() {
    return this._value();
  }

  /** Previous value (for growth %) */
  @Input() previous?: number;

  /** Optional icon */
  @Input() icon?: string;

  /** Colors */
  @Input() iconColor = 'text-blue-600';
  @Input() textColor = 'text-gray-900';
  @Input() trendColor = '#3b82f6';

  /** Sparkline data */
  @Input() trendData: number[] = [];

  /** Animation speed */
  private readonly animationDuration = 800;

  /* ------------------------------------
     Growth Computations
  ------------------------------------- */

  readonly growth = computed(() => {
    if (
      typeof this.value !== 'number' ||
      typeof this.previous !== 'number' ||
      this.previous === 0
    ) {
      return null;
    }
    return ((this.value - this.previous) / this.previous) * 100;
  });

  readonly growthText = computed(() => {
    if (this.growth() == null) return '';
    const g = this.growth()!;
    return `${g > 0 ? '+' : ''}${g.toFixed(1)}%`;
  });

  readonly growthColor = computed(() =>
    this.growth() == null
      ? ''
      : this.growth()! >= 0
        ? 'text-green-600'
        : 'text-red-600'
  );

  readonly arrow = computed(() =>
    this.growth() == null ? '' : this.growth()! >= 0 ? '▲' : '▼'
  );

  /* ------------------------------------
     Sparkline Chart Config
  ------------------------------------- */

  readonly sparklineChart = computed(() => ({
    chart: <ApexChart>{
      type: 'line',
      sparkline: { enabled: true },
      animations: { enabled: true }
    },
    stroke: <ApexStroke>{
      curve: 'smooth',
      width: 2
    },
    series: <ApexAxisChartSeries>[
      {
        name: 'Trend',
        data: this.trendData
      }
    ],
    colors: [this.trendColor]
  }));

  /* ------------------------------------
     Animated Counter
  ------------------------------------- */

  private animateValue(target: number | string) {
    if (typeof target === 'string') {
      this._value.set(target);
      return;
    }

    const start = 0;
    const end = target;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min(
        (time - startTime) / this.animationDuration,
        1
      );
      this._value.set(Math.floor(start + (end - start) * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}
