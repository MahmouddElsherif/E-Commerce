import axios from "axios";
import React from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {

  function getGattegories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  const {data , isLoading} = useQuery('categorySlider' , getGattegories)

  if(isLoading){
    return <div className='d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center' > 
    <CirclesWithBar
    height="150"
    width="150"
    color="#fff"
    outerCircleColor="#fff"
    innerCircleColor="#fff"
    barColor="#fff"
    ariaLabel="circles-with-bar-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    />
    </div>
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
    {data.data.data.map(( category , idx)=> <div key={idx} >
        <img style={{height:'200px'}} className="w-100" src={category.image} alt={category.name} />
        <h4>{category.name}</h4>
      </div>
    )}
    </Slider>
  );
}



