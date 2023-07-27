import React, { useState } from "react";

const Counter = ({ initialPageSize, onChangeCounter }) => {
  const [selectedOption, setSelectedOption] = useState(initialPageSize);

  const onChangeSelectOption = (e) => {
    const selOption = e.target.value;
    setSelectedOption(selOption);
    onChangeCounter && onChangeCounter(selOption);
  };

  return (
    <div className="">
      <label className="text-sm">
        Mostrando{"  "}
        <select
          value={selectedOption}
          onChange={(e) => onChangeSelectOption(e)}
          className="select select-bordered   max-w-xs"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        {"  "}
        Registros por página
      </label>
    </div>
  );
};

export default Counter;
