import { BaseManager } from './Base';
import { SubscriptionManager } from './Subscription';

export class OrganizationManager extends BaseManager {
	public subscriptions = new SubscriptionManager(this.rest);
}
