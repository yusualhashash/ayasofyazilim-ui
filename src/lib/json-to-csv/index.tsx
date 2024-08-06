/* eslint no-param-reassign: ["error", { "props": false }] */
export default function jsonToCsv(json: any, fileName: string) {
  const { items } = json;
  items.forEach((item: any) => {
    delete item.extraProperties;
  });
  const replacer = (key: any, value: any) => (value === null ? '' : value);
  const header = Object.keys(items[0]);
  const csv = [
    header.join(','), // header row first
    ...items.map((row: any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    ),
  ].join('\r\n');

  downloadCSV(csv, `${fileName}.csv`);
}
const downloadCSV = (csvContent: string, fileName: string) => {
  // Create a Blob with the CSV data
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create a link element
  const link = document.createElement('a');

  // Create a URL for the Blob and set it as the href attribute of the link
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);

  // Append the link to the body and trigger a click event to start the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
