// formmatted data function
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const jumpMonth = 30;
// const jumpYear = 360;

export function formatingDate(dateString: string | null | Date): string {
  if (!dateString) {
    return "N/A";
  }

  const trxDate = new Date(dateString);

  if (!(trxDate instanceof Date) || isNaN(trxDate.getTime())) {
    return "N/A";
  }

  const day = trxDate.getDate().toString().padStart(2, "0");
  const month = (trxDate.getMonth() + 1).toString().padStart(2, "0");
  const year = trxDate.getFullYear();

  const dayname = daysOfWeek[trxDate.getDay()];
  return `${dayname}, ${day}-${month}-${year}`;
}

export function calculateExpiredDate(date: string | undefined): string {
  if (!date) {
    return "";
  }

  const transactionDate = new Date(date);
  const expiredDate = new Date(transactionDate);
  expiredDate.setDate(expiredDate.getDate() + jumpMonth);
  return formatingDate(expiredDate); // Corrected the function name here
}
