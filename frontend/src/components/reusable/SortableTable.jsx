import { GoChevronUp, GoChevronDown } from "react-icons/go";
import Table from "./table";
import useSort from "../../hooks/useSort";

const SortableTable = (props) => {
  const {data, config} = props
  const { sortBy, sortOrder, sortedData, handleClick } = useSort(data,config);

  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }
    return {
      ...column,
      header: () => (
        <th
          className="cursor-pointer p-2 hover:bg-gray-100"
          onClick={() => handleClick(column.label)}
        >
          <div className="flex items-center">
            {setIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });

  return <Table {...props} config={updatedConfig} data={sortedData} />;
}

function setIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <GoChevronUp />
        <GoChevronDown />
      </div>
    );
  }

  if (sortOrder === "asc") {
    return (
      <div>
        <GoChevronUp />
      </div>
    );
  } else if (sortOrder === "desc") {
    return (
      <div>
        <GoChevronDown />
      </div>
    );
  } else if (sortOrder === null) {
    return (
      <div >
        <GoChevronUp />
        <GoChevronDown />
      </div>
    );
  }
}

export default SortableTable