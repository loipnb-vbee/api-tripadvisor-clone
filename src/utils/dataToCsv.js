const fs = require("fs");
const { Parser } = require("json2csv");

// Example JSON data
// const data = [
//   { name: "John Doe", age: 28, email: "john@example.com" },
//   { name: "Jane Smith", age: 34, email: "jane@example.com" },
//   { name: "Sam Green", age: 22, email: "sam@example.com" },
// ];

// Fields to include in the CSV
// const fields = ["hotelResultKey","locationId","location","resultDetail","hotelHighlightLink"];

const convertDataToCsv = ({ fields, data }) => {
  try {
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    // Write CSV to a file
    fs.writeFile("data.csv", csv, (err) => {
      if (err) {
        console.error("Error writing CSV to file", err);
      } else {
        console.log("CSV file saved successfully.");
      }
    });
  } catch (err) {
    console.error("Error parsing JSON to CSV", err);
  }
};

module.exports = { convertDataToCsv };
