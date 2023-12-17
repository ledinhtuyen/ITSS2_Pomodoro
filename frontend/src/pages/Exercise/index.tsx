import Search, { SearchProps } from "antd/es/input/Search";
import "./Exercise.scss";
import Slider from "react-slick";
import InstructionalBlog from "./components/InstructionalBlog";
import InstructionalVideo from "./components/InstructionalVideo";
import { useState, useEffect } from "react";
import axios from "axios";

const Exercise = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 2,
    appendDots: () => (
      <div
        style={{
          display: "none",
        }}
      ></div>
    ),
  };

  const [categoriesExercise, setCategoriesExercise] = useState<any>([]);
  const [listPost, setListPost] = useState<any>([]);
  const [listVideo, setListVideo] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_DOMAIN}/list_category`)
      .then((res) => {
        setCategoriesExercise(res.data["categories"]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${import.meta.env.VITE_API_DOMAIN}/list_post_video`)
      .then((res) => {
        setListPost(res.data["posts"]);
        setListVideo(res.data["videos"]);
      })
  }, []);

  return (
    <div className="bg-[#F5F5F4] w-full excersice-component">
      <div className="container mx-auto max-w-[1200px] py-10">
        <div className="relative">
          <h1 className="text-4xl font-bold">Exercise</h1>
          <Search
            placeholder="Enter name"
            onSearch={onSearch}
            style={{ width: 397, height: 52 }}
            className="absolute top-[6px] left-1/2 -translate-x-1/2 "
          />
        </div>
        <div className="ml-5 mt-8 mb-5">
          <Slider {...settings}>
            {categoriesExercise.map((category : any, index) => (
              <div className="bg-[#E7E5E4] rounded-lg" key={index}>
                <h3 className="text-center py-4 font-semibold">{category.name}</h3>
              </div>
            ))}
          </Slider>
        </div>
        <div className="ml-8 grid grid-cols-2 gap-5">
          <InstructionalBlog items={listPost} />
          <InstructionalVideo items={listVideo} />
        </div>
      </div>
    </div>
  );
};

export default Exercise;
