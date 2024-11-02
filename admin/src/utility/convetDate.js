export function formatMongoDate(date) {
  const updatedDate = new Date(date);
  const day = String(updatedDate.getDate()).padStart(2, "0");
  const month = String(updatedDate.getMonth() + 1).padStart(2, "0");
  const year = updatedDate.getFullYear();

  return `${day}-${month}-${year}`;
}
