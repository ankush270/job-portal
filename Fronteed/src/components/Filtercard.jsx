import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filtertype: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filtertype: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filtertype: "Salary",
    array: ["0-40k", "40K-1Lac", "1Lac to 5Lac"],
  },
];

const Filtercard = () => {
  const [selectedValue,setSelectedValue]=useState('');
  const changeHandler=(value)=>{
    setSelectedValue(value);
  }
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue));
  },[selectedValue])
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg ">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filtertype}</h1>
            {data.array.map((item, inx) => {
              const itemId=`id${index}-${idx}`
              return (
                <div className="flex items-center space-x-2 my-2 ">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}> {item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filtercard;
