import { ArrowLeft } from "@phosphor-icons/react";
import Search, { SearchProps } from "antd/es/input/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useAppDispatch } from "../../redux/hook";
import { setLoadingFalse, setLoadingTrue } from "../../redux/reducers/appReducer";
import InstructionalBlog from "./InstructionalBlog";
import InstructionalVideo from "./InstructionalVideo";

import "./Exercise.scss";

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
    />
  ),
};

const Exercise = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const titleParam = queryParams.get("title");

  const [categoriesExercise, setCategoriesExercise] = useState<any[]>([]);
  const [listPost, setListPost] = useState<any[]>([]);
  const [listVideo, setListVideo] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  const onSearch: SearchProps["onSearch"] = (value) => {
    if (value) {
      navigate(`/exercise?title=${value}`);
    }
  };

  const onClickCategory = (name: string) => {
    navigate(`/exercise?category=${name}`);
  };

  // Call API to get List Categories && get All Post and Video
  useEffect(() => {
    dispatch(setLoadingTrue());

    axios
      .get(`${import.meta.env.VITE_API_DOMAIN}/list_category`)
      .then((res) => {
        setCategoriesExercise(res.data["categories"]);
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  //Re - Get All Post and Video
  useEffect(() => {
    if (categoryParam === null && titleParam === null) {
      dispatch(setLoadingTrue());
      axios.get(`${import.meta.env.VITE_API_DOMAIN}/list_post_video`).then((res) => {
        setListPost(res.data["posts"]);
        setListVideo(res.data["videos"]);
        dispatch(setLoadingFalse());
      });
    }
  }, [categoryParam, titleParam, dispatch]);

  // Get Video and Blog by Category
  useEffect(() => {
    let timer: any;
    if (categoryParam) {
      timer = setTimeout(() => {
        dispatch(setLoadingTrue());
        axios
          .get(`${import.meta.env.VITE_API_DOMAIN}/search_by_category?name=${categoryParam}`)
          .then((res) => {
            setListPost(res.data["posts"]);
            setListVideo(res.data["videos"]);
            dispatch(setLoadingFalse());
          })
          .catch((err) => {
            console.log(err);
          });
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [categoryParam, dispatch]);

  // Get Video and Blog by Title
  useEffect(() => {
    let timer: any;

    const searchByTitle = async () => {
      try {
        dispatch(setLoadingTrue());
        const response = await axios.get(
          `${import.meta.env.VITE_API_DOMAIN}/search_by_title?title=${titleParam}`
        );
        setListPost(response.data["posts"]);
        setListVideo(response.data["videos"]);
        dispatch(setLoadingFalse());
      } catch (error) {
        console.log(error);
      }
    };

    if (titleParam) {
      timer = setTimeout(searchByTitle, 100);
    }

    return () => clearTimeout(timer);
  }, [titleParam, dispatch]);

  return (
    <div className="pt-8 min-h-screen ml-40 mr-12">
      <div className="relative flex flex-row gap-4 items-center">
        <h1 className="text-4xl font-bold">Bài tập</h1>

        <Search
          placeholder="Tìm kiếm bằng tên"
          onSearch={onSearch}
          style={{ width: 397, height: 52 }}
          className="flex items-center justify-center"
        />
      </div>

      <div className="my-6">
        {titleParam ? (
          <div className="bg-stone-200 rounded-2xl border-4 border-stone-300 p-8 flex flex-col gap-1">
            <Link
              to="/exercise"
              className="text-stone-400 text-md font-medium flex flex-row gap-1 items-center"
            >
              <ArrowLeft weight="bold" />
              <span>Trở lại</span>
            </Link>

            <h1 className="font-semibold text-2xl">Tìm kiếm: "{titleParam}"</h1>
          </div>
        ) : (
          <Slider {...settings}>
            {categoriesExercise.map((category: any, index: any) => (
              <div
                className={
                  categoryParam === category.name
                    ? "bg-[#EF4444] rounded-lg cursor-pointer text-white"
                    : "bg-[#E7E5E4] rounded-lg cursor-pointer hover:scale-[1.05]"
                }
                key={index}
                onClick={() => onClickCategory(category.name)}
              >
                <h3 className="text-center py-4 font-semibold">{category.name}</h3>
              </div>
            ))}
          </Slider>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <InstructionalBlog items={listPost} />
        <InstructionalVideo items={listVideo} />
      </div>
    </div>
  );
};

export default Exercise;
