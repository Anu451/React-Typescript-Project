export function handelTodayDate() {
	const todayDate = new Date();
	const epochTimestamp = todayDate.getTime();
	console.log(epochTimestamp);
	return epochTimestamp;
}
export {};
