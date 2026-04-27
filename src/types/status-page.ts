export type StatusPageVisibility = 'public' | 'private';

export type StatusPageAccessStatus =
	| 'allowed'
	| 'not_found'
	| 'auth_required'
	| 'access_denied';

export type StatusPageAggregateStatus =
	| 'operational'
	| 'degraded'
	| 'major_outage'
	| 'unknown';

export type BadgeStatus = 'operational' | 'unavailable' | 'investigation';

export type IncidentSeverity = 'minor' | 'major' | 'critical';

export type IncidentStatus =
	| 'investigating'
	| 'identified'
	| 'monitoring'
	| 'resolved';

export type MaintenanceStatus =
	| 'scheduled'
	| 'in_progress'
	| 'completed'
	| 'cancelled';

export type ComponentCurrentStatus = 'Operational' | 'Downtime' | 'Degraded';

export interface PaginationOptions {
	page?: number;
	limit?: number;
}

export interface GetStatusPageUpdatesOptions {
	page?: number;
	limit?: number;
}

export interface GetStatusPageIncidentsOptions extends PaginationOptions {
	status?: IncidentStatus;
}

export interface GetStatusPageMaintenanceOptions extends PaginationOptions {
	startDate?: string;
	endDate?: string;
	status?: MaintenanceStatus;
}

export interface GetStatusPageOptions {
	slug?: string;
	domain?: string;
}

export interface GetStatusPageComponentsTreeOptions {
	days?: number;
}

export interface GetStatusPageMonitorAggregationsOptions {
	date: string;
}

export interface PaginatedResponse<T> {
	items: T[];
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}

export interface StatusPageResolved {
	id: string;
	name: string;
	domain: string;
	visibility: StatusPageVisibility;
	organizationId: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	accessStatus: StatusPageAccessStatus;
	customDomain: string | null;
	customDomainVerified: boolean;
	description: string | null;
	logoUrl: string | null;
}

export interface StatusPageActiveIncident {
	id: string;
	title: string;
	status: string;
	severity: string;
	updatedAt: string;
}

export interface StatusPageAggregate {
	status: StatusPageAggregateStatus;
	message: string;
	activeIncident: StatusPageActiveIncident | null;
}

export interface StatusPageCustomization {
	id: string;
	statusPageId: string;
	useDarkTheme: boolean;
	shadowStyle: string;
	borderRadiusStyle: string;
	showSubscriptionButton: boolean;
	showRecentUpdatesSection: boolean;
	hideHeaderName: boolean;
	createdAt: string;
	updatedAt: string;
	primaryColor: string | null;
	accentColor: string | null;
	backgroundColor: string | null;
	foregroundColor: string | null;
	primaryForegroundColor: string | null;
	cardColor: string | null;
	cardForegroundColor: string | null;
	mutedColor: string | null;
	mutedForegroundColor: string | null;
	borderColor: string | null;
	textColor: string | null;
	defaultLanguage: string | null;
	headerDisplayName: string | null;
	customCss: string | null;
	customHeaderHtml: string | null;
	customFooterHtml: string | null;
}

export interface StatusPageMonitor {
	id: string;
	name: string;
	status: string;
}

export interface StatusPageComponentHistoryPoint {
	status: ComponentCurrentStatus;
	timestamp: string;
	tooltip: string;
	uptimePercentage: number;
	upCount: number;
	downCount: number;
}

export interface StatusPageComponent {
	type: 'monitor';
	id: string;
	name: string;
	sortOrder: number;
	uptimePercentage: string;
	currentStatus: ComponentCurrentStatus;
	statusHistory: StatusPageComponentHistoryPoint[];
	lastChecked: string;
	updateInterval: number;
	defaultOpen: boolean;
	groupId: string | null;
	supportsDayDetails: boolean;
}

export interface StatusPageMonitorAggregationRegion {
	region: string;
	upCount: number;
	downCount: number;
	avgResponseTime: number;
}

export interface StatusPageMonitorAggregation {
	hour: number;
	regions: StatusPageMonitorAggregationRegion[];
}

export interface AffectedMonitorRef {
	id: string;
}

export interface IncidentUpdate {
	id: string;
	incidentId: string;
	content: string;
	status: IncidentStatus;
	createdAt: string;
	updatedAt: string;
}

export interface StatusPageIncident {
	id: string;
	statusPageId: string;
	organizationId: string;
	title: string;
	severity: IncidentSeverity;
	status: IncidentStatus;
	startedAt: string;
	createdAt: string;
	updatedAt: string;
	updates: IncidentUpdate[];
	affectedMonitors: AffectedMonitorRef[];
	description: string;
	monitorId: string;
	resolvedAt: string | null;
}

export interface MaintenanceUpdate {
	id: string;
	maintenanceId: string;
	content: string;
	status: MaintenanceStatus;
	createdAt: string;
	updatedAt: string;
}

export interface StatusPageMaintenance {
	id: string;
	statusPageId: string;
	organizationId: string;
	title: string;
	status: MaintenanceStatus;
	scheduledStartAt: string;
	scheduledEndAt: string;
	createdAt: string;
	updatedAt: string;
	updates: MaintenanceUpdate[];
	description: string;
	actualStartAt: string | null;
	actualEndAt: string | null;
}

export interface StatusFeedUpdate {
	id: string;
	content: string;
	status: string;
	createdAt: string;
}

export interface StatusFeedIncidentItem {
	type: 'incident';
	id: string;
	title: string;
	severity: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	affectedMonitors: AffectedMonitorRef[];
	updates: StatusFeedUpdate[];
	description: string;
	resolvedAt: string | null;
}

export interface StatusFeedMaintenanceItem {
	type: 'maintenance';
	id: string;
	title: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	updates: StatusFeedUpdate[];
	description: string;
	scheduledStartAt?: string;
	scheduledEndAt?: string;
	actualStartAt?: string | null;
	actualEndAt?: string | null;
}

export type StatusPageFeedItem =
	| StatusFeedIncidentItem
	| StatusFeedMaintenanceItem;

export interface StatusPageBadge {
	statusPageId: string;
	statusPageName: string;
	visibility: StatusPageVisibility;
	status: BadgeStatus;
	uptimePercentage: number;
	text: string;
}

export interface SubscriptionUsage {
	activeMonitorsCount: number;
	totalMonitorsCount: number;
	statusPagesCount: number;
	totalNotificationsSent: number;
	totalHeartbeats: number;
	plan: string | null;
	status: string | null;
}
