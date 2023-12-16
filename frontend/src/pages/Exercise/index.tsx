import { SearchOutlined } from "@ant-design/icons";
import Search, { SearchProps } from "antd/es/input/Search";
import "./Exercise.scss";
import Slider from "react-slick";
import Logo from "../../assets/images/Icon.png";
import InstructionalBlog from "./components/InstructionalBlog";
import InstructionalVideo from "./components/InstructionalVideo";

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

  const categoriesExercise = [
    "Heart",
    "Eyes",
    "Musculoskeletal",
    "Nerve",
    "Sleep",
    "Muscle",
  ];

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
        <div className="mt-8 mb-5">
          <Slider {...settings}>
            {categoriesExercise.map((category, index) => (
              <div className="bg-[#E7E5E4] rounded-lg" key={index}>
                <h3 className="text-center py-4 font-semibold">{category}</h3>
              </div>
            ))}
          </Slider>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <InstructionalVideo />
          <InstructionalBlog />
        </div>
      </div>
    </div>
  );
};

export default Exercise;
