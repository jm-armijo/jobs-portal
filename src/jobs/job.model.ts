export class Job {
	private id: string;
	private title: string;
	private description: string;
	private expiredAt: string;

	constructor(
		id: string,
		title: string,
		description: string,
		expiredAt: string
	) {
		this.id          = id;
		this.title       = title;
		this.description = description;
		this.expiredAt   = expiredAt;
	};
}
