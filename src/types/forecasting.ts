
// Type definitions for forecasting components

export interface ChartDataPoint {
	month: string;
	value: number | null;
	forecast?: boolean;
	label?: string;
}

export interface Scenario {
	id: string;
	name: string;
	description?: string;
	active: boolean;
	createdAt: Date;
	chartData: ChartDataPoint[];
}

export interface Metric {
	label: string;
	value: string | number;
	type: 'user' | 'system';
	category?: string;
}

export interface ForecastConfig {
	title: string;
	kpi: string;
	timeRange: {
		start: Date;
		end: Date;
	};
	scenarios: Scenario[];
	metrics: Metric[];
}

export type TimeGranularity = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export interface ForecastSettings {
	granularity: TimeGranularity;
	confidenceInterval: number;
	showActuals: boolean;
	showForecasts: boolean;
	showConfidenceBands: boolean;
}

