import type {
	GetStatusPageComponentsTreeOptions,
	GetStatusPageIncidentsOptions,
	GetStatusPageMaintenanceOptions,
	GetStatusPageMonitorAggregationsOptions,
	GetStatusPageOptions,
	GetStatusPageUpdatesOptions,
	PaginatedResponse,
	StatusPageAggregate,
	StatusPageBadge,
	StatusPageComponent,
	StatusPageCustomization,
	StatusPageFeedItem,
	StatusPageIncident,
	StatusPageMaintenance,
	StatusPageMonitor,
	StatusPageMonitorAggregation,
	StatusPageResolved,
} from '../types';
import { BaseManager } from './Base';

export class StatusPageManager extends BaseManager {
	public async get(options?: GetStatusPageOptions) {
		return this.rest.get<StatusPageResolved>('/status-pages', {
			query: options,
		});
	}

	public async status(id: string) {
		return this.rest.get<StatusPageAggregate>(`/status-pages/${id}/status`);
	}

	public async components(
		id: string,
		options?: GetStatusPageComponentsTreeOptions,
	) {
		return this.rest.get<StatusPageComponent[]>(
			`/status-pages/${id}/components`,
			{
				query: options,
			},
		);
	}

	public async customization(id: string) {
		return this.rest.get<StatusPageCustomization | null>(
			`/status-pages/${id}/customization`,
		);
	}

	public async monitors(id: string) {
		return this.rest.get<StatusPageMonitor[]>(`/status-pages/${id}/monitors`);
	}

	public async monitorAggregations(
		id: string,
		monitorId: string,
		options: GetStatusPageMonitorAggregationsOptions,
	) {
		return this.rest.get<StatusPageMonitorAggregation[]>(
			`/status-pages/${id}/monitors/${monitorId}/aggregations`,
			{ query: options },
		);
	}

	public async incidents(id: string, options?: GetStatusPageIncidentsOptions) {
		return this.rest.get<PaginatedResponse<StatusPageIncident>>(
			`/status-pages/${id}/incidents`,
			{ query: options },
		);
	}

	public async incident(id: string, incidentId: string) {
		return this.rest.get<StatusPageIncident>(
			`/status-pages/${id}/incidents/${incidentId}`,
		);
	}

	public async maintenance(
		id: string,
		options?: GetStatusPageMaintenanceOptions,
	) {
		return this.rest.get<PaginatedResponse<StatusPageMaintenance>>(
			`/status-pages/${id}/maintenance`,
			{ query: options },
		);
	}

	public async maintenanceEvent(id: string, maintenanceId: string) {
		return this.rest.get<StatusPageMaintenance>(
			`/status-pages/${id}/maintenance/${maintenanceId}`,
		);
	}

	public async badge(id: string) {
		return this.rest.get<StatusPageBadge>(`/status-pages/${id}/badge`);
	}

	public async listUpdates(id: string, options?: GetStatusPageUpdatesOptions) {
		return this.rest.get<PaginatedResponse<StatusPageFeedItem>>(
			`/status-pages/${id}/updates`,
			{ query: options },
		);
	}
}
