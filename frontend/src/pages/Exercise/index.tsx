import Search, { SearchProps } from "antd/es/input/Search";
import "./Exercise.scss";
import Slider from "react-slick";
import InstructionalBlog from "./components/InstructionalBlog";
import InstructionalVideo from "./components/InstructionalVideo";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

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

const Exercise = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const titleParam = queryParams.get('title')
  const navigate = useNavigate()
  const [categoriesExercise, setCategoriesExercise] = useState<any>([]);
  const [listPost, setListPost] = useState<any>([]);
  const [listVideo, setListVideo] = useState<any>([]);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    if (value) { navigate(`/exercise?title=${value}`) }
  };

  const onClickCategory = (name: string) => {
    navigate(`/exercise?category=${name}`)
  };

  // Call API to get List Categories && get All Post and Video
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
      });
  }, []);

  useEffect(() => {
    if (categoryParam === null && titleParam === null) {
      axios
        .get(`${import.meta.env.VITE_API_DOMAIN}/list_post_video`)
        .then((res) => {
          setListPost(res.data["posts"]);
          setListVideo(res.data["videos"]);
        });
    }
  }, [categoryParam, titleParam])

  // Get Video and Blog by Category 
  useEffect(() => {
    let timer: any
    if (categoryParam) {
      timer = setTimeout(() => {
        axios
          .get(`${import.meta.env.VITE_API_DOMAIN}/search_by_category?name=${categoryParam}`)
          .then((res) => {
            setListPost(res.data["posts"]);
            setListVideo(res.data["videos"]);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 100)
    }

    return () => clearTimeout(timer)
  }, [categoryParam])

  // Get Video and Blog by Title 
  useEffect(() => {
    let timer: any
    if (titleParam) {
      timer = setTimeout(() => {
        axios
          .get(
            `${import.meta.env.VITE_API_DOMAIN}/search_by_title?title=${titleParam}`
          )
          .then((res) => {
            setListPost(res.data["posts"]);
            setListVideo(res.data["videos"]);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 100)
    }

    return () => clearTimeout(timer)
  }, [titleParam])

  console.log({ titleParam, categoryParam });


  return (
    <div className="bg-[#F5F5F4] excersice-component">
      <div className="container mx-auto max-w-[1200px] pt-10 pb-20 min-h-screen">
        <div className="relative">
          <h1 className="text-4xl font-bold">Exercise</h1>
          <Search
            placeholder="Enter name"
            onSearch={onSearch}
            style={{ width: 397, height: 52 }}
            className="absolute top-[6px] left-1/2 -translate-x-1/2 "
            defaultValue={titleParam}
          />
        </div>
        <div className="mt-8 mb-5">
          {titleParam ? <div className="bg-[#E7E5E4] min-h-[146px] rounded-3xl border-[1px] border-[#78716C]">
            <div className="pl-10 pt-8">
              <Link className="text-[#A8A29E] text-lg font-semibold" to="/exercise">
                <ArrowLeftOutlined />
                <span className="ml-3">Back</span>
              </Link>
              <h1 className="font-semibold text-3xl">Search:"{titleParam}"</h1>
            </div>
          </div> : <Slider {...settings}>
            {categoriesExercise.map((category: any, index: any) => (
              <div
                className={
                  categoryParam === category.name
                    ? "bg-[#EF4444] rounded-lg cursor-pointer text-white"
                    : "bg-[#E7E5E4] rounded-lg cursor-pointer hover:scale-[1.05]"
                }
                key={index}
                onClick={() => {
                  onClickCategory(category.name);
                }}
              >
                <h3 className="text-center py-4 font-semibold">
                  {category.name}
                </h3>
              </div>
            ))}
          </Slider>}
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
