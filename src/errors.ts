export class HTTPError extends Error {
	public constructor(
		public route: string,
		public method: string,
		public status: number,
		public message: string,
	) {
		super(message);

		this.name = `HTTPError(${status}): ${message} in ${route}`;
	}
}
