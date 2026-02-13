const XLSX = require('xlsx');
const fs = require('fs');

const wb = XLSX.readFile('public/assets/Product_Catalog (2).xlsx');
console.log('Sheets:', wb.SheetNames);

const output = {};
for (const name of wb.SheetNames) {
    const data = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 });
    output[name] = data;
}

fs.writeFileSync('scripts/excel-data.json', JSON.stringify(output, null, 2));
console.log('Written to scripts/excel-data.json');
