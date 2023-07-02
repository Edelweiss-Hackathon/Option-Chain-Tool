import React from "react";

const Selects = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 sm:mt-20">
        <div className="sm:ml-10">
          <label
            for="countries"
            class="block mb-2 text-sm font-xl text-gray-900 dark:text-black"
          >
            Select Symbol
          </label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-460 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/2 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a Symbol</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
        <div className="sm:ml-10">
          <label
            for="countries"
            class="block mb-2 text-sm font-xl text-gray-900 dark:text-black"
          >
            Expiry Date
          </label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-460 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/2 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select Expiry Date</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
        <div className="sm:ml-10">
          <label
            for="countries"
            class="block mb-2 text-sm font-xl text-gray-900 dark:text-black"
          >
            Strike Price
          </label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-460 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/2 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select Strike Price</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Selects;
