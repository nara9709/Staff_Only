import React from 'react';

function ViewWorkingHour() {
  return (
    <div className="flex flex-col justify-center items-center p-3">
      <div className=" w-11/12 p-4 text-lg font-thin rounded-xl bg-white flex itmes-center justify-between py-6 px-6 ">
        <h1>📌 이번달 총 근무시간</h1>
        <p>
          <span className=" text-[#176B87] font-bold">34.5 </span>시간
        </p>
      </div>
      <div className="w-11/12 p-4 text-lg font-thin rounded-xl bg-white flex itmes-center justify-between py-6 px-6 mt-5 ">
        <h1>📌 이번달 예상 월급</h1>
        <p>
          <span className=" text-[#176B87] font-bold">432,000</span> 원
        </p>
      </div>
    </div>
  );
}

export default ViewWorkingHour;
