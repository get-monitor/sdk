import { describe, expect, test } from 'bun:test';

import { createURL, GetMonitor } from '../src';

describe('createURL', () => {
	test('serializes primitive query params and skips nullish values', () => {
		const url = createURL(
			'/status-pages/page_123/incidents',
			{
				page: 2,
				limit: 20,
				status: 'resolved',
				includeHidden: false,
				ignoreMe: undefined,
				ignoreMeToo: null,
			},
			'https://api.getmonitor.io',
		);

		expect(url.toString()).toBe(
			'https://api.getmonitor.io/api/v1/status-pages/page_123/incidents?page=2&limit=20&status=resolved&includeHidden=false',
		);
	});
});

describe('GetMonitor', () => {
	test('initializes REST client and route managers', () => {
		const client = new GetMonitor('secret_test');

		expect(client.rest.headers.Authorization).toBe('Bearer secret_test');
		expect(client.statusPages).toBeDefined();
		expect(client.organizations.subscriptions).toBeDefined();
	});
});
