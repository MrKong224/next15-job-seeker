interface iJobDuration {
	days: number;
	price: number;
	description: string;
}
export const jobDurationPricing: iJobDuration[] = [
	{
		days: 30,
		price: 99,
		description: 'Standard listing',
	},
	{
		days: 60,
		price: 179,
		description: 'Extended visibility',
	},
	{
		days: 90,
		price: 249,
		description: 'Maximum exposure',
	},
];
