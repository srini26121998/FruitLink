// src/app/shared/charts/chart.utils.ts

import {
  ApexChart,
  ApexXAxis,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
  ChartType
} from 'ng-apexcharts';

/* =========================================================
   Base Chart Builder
   ========================================================= */
export function buildChart(
  type: ChartType,
  height: number
): ApexChart {
  return {
    type,
    height,
    toolbar: { show: false },
    zoom: { enabled: false }
  };
}

/* =========================================================
   Common Options (Enterprise Defaults)
   ========================================================= */
export const defaultDataLabels: ApexDataLabels = {
  enabled: false
};

export const defaultStroke: ApexStroke = {
  curve: 'smooth',
  width: 2
};

export const defaultGrid: ApexGrid = {
  strokeDashArray: 4,
  padding: { left: 10, right: 10 }
};

export const defaultTooltip: ApexTooltip = {
  theme: 'light'
};

/* =========================================================
   Line / Bar Chart Config
   ========================================================= */
export interface ChartConfig {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  grid: ApexGrid;
  tooltip: ApexTooltip;
}

export function createChartConfig(
  type: 'line' | 'bar',
  height: number,
  categories: string[],
  seriesName: string,
  seriesData: number[]
): ChartConfig {
  return {
    chart: buildChart(type, height),
    xaxis: { categories },
    dataLabels: defaultDataLabels,
    stroke: defaultStroke,
    grid: defaultGrid,
    tooltip: defaultTooltip,
    series: [
      {
        name: seriesName,
        data: seriesData
      }
    ]
  };
}

/* =========================================================
   Pie / Donut Chart Config
   ========================================================= */
export function createPieChartConfig(
  type: 'pie' | 'donut',
  height: number,
  labels: string[],
  values: number[]
): {
  chart: ApexChart;
  labels: string[];
  series: number[];
} {
  return {
    chart: buildChart(type, height),
    labels,
    series: values
  };
}
