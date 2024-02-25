import React from 'react';
import { Fragment } from 'react';
import { nanoid } from 'nanoid';

function Table({ data, config }) {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRow = data.map((rowData, i) => {
    const renderedCells = config.map((column, index) => {
      if (index === 0) {
        return (
          <td className="p-3" key={nanoid()}>
            {i + 1}
            {column.render(rowData)}
          </td>
        );
      }
      return (
        <td className="p-3" key={nanoid()}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr key={nanoid()} className="border-b">
        {renderedCells}
      </tr>
    );
  });

  return (
    <div className='overflow-y-auto border-2 rounded-lg'>
      <table className="table-auto border-spacing-2">
        <thead>
          <tr className="border-b-2">{renderedHeaders}</tr>
        </thead>
        <tbody >{renderedRow}</tbody>
      </table>
    </div>
  );
}

export default Table;
