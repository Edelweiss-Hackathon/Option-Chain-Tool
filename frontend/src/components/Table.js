import React from "react";

const Table = () => {
  return (
    <div>
      <section class="container mx-auto p-6 font-mono">
        <div className=" grid grid-cols-2 gap-4 place-content-center mx-auto h-9 rounded-lg  bg-gray-100 border-b border-gray-300">
          <span className="justify-self-center ... ">CALL</span>
          <span className="justify-self-center ...">PUTS</span>
        </div>
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">
            <table class="w-full table-fixed">
              <thead>
                <tr>
                  {/* <th class="py-2">Symbol</th> */}
                  <th class="py-2">LTP</th>
                  <th class="py-2">LTQ</th>
                  <th class="py-2">Vol</th>
                  <th class="py-2">BID</th>
                  <th class="py-2">ASK</th>
                  <th class="py-2">B_QTY</th>
                  <th class="py-2">A_QTY</th>
                  <th class="py-2">OI</th>
                  <th class="py-2">TIME</th>
                  <th class="py-2">SEQ</th>
                  <th class="py-2">PCP</th>
                  <th class="py-2">POI</th>
                  <th class="py-2">IV</th>
                  <th class="py-2 pr-2">STRIKE</th>
                  {/* <th class="py-2 px-2.5">Symbol</th> */}
                  <th class="py-2 px-5">LTP</th>
                  <th class="py-2">LTQ</th>
                  <th class="py-2">Vol</th>
                  <th class="py-2">BID</th>
                  <th class="py-2">ASK</th>
                  <th class="py-2">B_QTY</th>
                  <th class="py-2 px-2">A_QTY</th>
                  <th class="py-2">OI</th>
                  <th class="py-2">TIME</th>
                  <th class="py-2">SEQ</th>
                  <th class="py-2">PCP</th>
                  <th class="py-2">POI</th>
                  <th class="py-2">IV</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Table;
