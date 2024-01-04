import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../redux/hook";
import { setLoadingFalse, setLoadingTrue } from "../../redux/reducers/appReducer";
import { Clock, Heart } from "@phosphor-icons/react";
import classNames from "classnames";

interface IExerciseDetailProps {
  exerciseType: "video" | "post";
}

const ExerciseDetail: React.FC<IExerciseDetailProps> = ({ exerciseType }) => {
  const { id } = useParams();

  const [data, setData] = useState<any>();
  const [likes, setLikes] = useState<any>(0);
  const [like, setLike] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoadingTrue());
    axios
      .get(`${import.meta.env.VITE_API_DOMAIN}/detail?type=${exerciseType}&id=${id}`)
      .then((res) => {
        setData(res.data);
        setLikes(res.data.likes);
        setLike(res.data.liked);
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, dispatch, exerciseType]);

  const toggleLike = () => {
    dispatch(setLoadingTrue());
    setLike((prev) => !prev);
    setLikes((prev: number) => prev + (like ? -1 : +1));
    axios
      .post(`${import.meta.env.VITE_API_DOMAIN}/like`, {
        type: exerciseType,
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    data && (
      <div className="pt-10 min-h-screen ml-40 mr-12 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 font-semibold">
            <Link to="/exercise">Bài tập</Link>
            <span className="mx-2">/</span>
            <Link className="cursor-pointer" to={`/exercise?category=${data.category}`}>
              {data.category}
            </Link>
          </div>
          <div className="text-4xl font-semibold">{data.title}</div>
          <div className="flex flex-row items-center text-stone-400 mt-4">
            <Clock size={20} />
            <span className="ml-2 tracking-tighter">{data.readtime} phút để đọc</span>
          </div>
        </div>

        <div className="mx-auto max-w-3xl my-10">
          {exerciseType === "post" && (
            <div className="my-5 mx-auto max-w-2xl">
              <img src={data.thumbnail} loading="lazy" className="rounded w-full" />
            </div>
          )}

          {exerciseType === "video" && (
            <iframe
              height={400}
              src={data.link}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              loading="lazy"
              className="mx-auto aspect-video my-8"
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>

        <div className="mx-auto max-w-[800px] text-center flex flex-col gap-3">
          <div className="font-semibold">Bài viết này có hữu ích không?</div>
          <div className="flex gap-3 items-center justify-center">
            <button onClick={toggleLike} className={classNames({ "text-red-500": like === true })}>
              <Heart size={40} weight={like === true ? "fill" : "regular"} />
            </button>
            <div className="w-10 h-10 rounded-full flex justify-center items-center text-lg border text-stone-600 border-stone-200 font-semibold">
              {likes}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ExerciseDetail;
