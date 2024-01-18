export interface Article {
	id: string;
	title: string;
	url: string;
	image_url: string;
	news_site: string;
	summary: string;
	published_at: string;
	featured: boolean;
	events: Event[];
	launches: Launch[];
}

export interface Event {
	id: string;
	provider: string;
}

export interface Launch {
	id: string;
	provider: string;
}
