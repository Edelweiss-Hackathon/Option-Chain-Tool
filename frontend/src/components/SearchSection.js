import React, { useState } from "react";
import Select from "react-select";

const selectStyles = (open) => ({
  singleValue: (provided) => ({ ...provided, color: "#666" }),
  menu: (provided) => ({
    ...provided,
    marginTop: 0,
    borderwidth: 10,
    fontSize: 17,
    fontWeight: "bold",
    padding: 5,
    color: "#ee9763",
    opacity: open ? 1 : 0,
    transition: "all 0.2s ease-in-out",
    visibility: open ? "visible" : "hidden",
  }),
});

const indexes = [
  { value: "MAINIDX", label: "MAINIDX" },
  { value: "ALLBANKS", label: "ALLBANKS" },
  { value: "MIDCAPS", label: "MIDCAPS" },
  { value: "FINANCIALS", label: "FINANCIALS" },
];

const SearchSection = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <section className='search-section'>
      <div className='dropdowns'>
        <div className='dropdown'>
          <p>Select Symbol</p>
          <div onClick={() => setOpen(!open)}>
            <Select
              options={indexes}
              isSearchable={true}
              // value={value}
              onBlur={() => setOpen(false)}
              onChange={(e) => onChange(e.value)}
              menuIsOpen
              styles={selectStyles(open)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
