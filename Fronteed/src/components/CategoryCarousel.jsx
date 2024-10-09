import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Fronted Developer",
  "Backed Developer",
  "Data Scientist",
  "Product Manager",
  " UX/UI Designer",
  "QA Engineer",
  "Full Stack Developer",
];

const CategoryCarousel = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const searchJobHandler=(query)=>{
    dispatch(setSearchedQuery(query)); // dispatch action to set search query in redux store
   navigate('/browse');
    // navigate to search page with query
  }
  return (
    <div>
     <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem  className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={()=>searchJobHandler(cat)} variant='outline' className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
    </div>
  );
};

export default CategoryCarousel;
