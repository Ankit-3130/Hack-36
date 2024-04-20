/* eslint-disable react/prop-types */
import React from "react";
// import jsonData from "./jsondata.json";

const TableFromJSON = (prop) => {
  const jsonData = prop.jsonvalue;
  console.log(jsonData);
  if (!jsonData || !jsonData.length) {
    return <div>No data available</div>;
  }

  const renderTableHeader = () => {
    const headers = Object.keys(jsonData[0]);
    return headers.map((header) => <th key={header}>{header}</th>);
  };

  const renderTableData = () => {
    return jsonData.map((row, index) => {
      const values = Object.values(row);
      return (
        <tr key={index}>
          {values.map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="  border-collapse border border-gray-400 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};

export default TableFromJSON;
