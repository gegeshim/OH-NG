export function formattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${date}`;

  return formattedDate;
}
