declare namespace NodeJS {
	export interface Global {
		BaseURL: string;
		MainURL: string;
		Testing: boolean;
		NotificationObject: {
			BucketID: number;
			Name: string;
			Status: number;
			BrandID: number;
		};
	}
}
