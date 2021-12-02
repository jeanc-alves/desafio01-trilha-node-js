interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(data: Date): string;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
