import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ClockCircleOutlined } from "@ant-design/icons";
import likeButton from "../../assets/images/LikeButton.png"
import axios from 'axios';

const DetailVideo = () => {
    const { id } = useParams();

    const [data, setData] = useState<any>();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_DOMAIN}/detail?type=video&id=${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (data && (
        <div className="container mx-auto max-w-[1200px]">
            <div className="pt-16">
                <div className="container mx-auto max-w-[800px] mb-10">
                    <div className="mb-3 font-semibold">
                        <Link to="/exercise">Exercise</Link>
                        <span className="mx-2">/</span>
                        <Link className="cursor-pointer" to={`/exercise?category=${data.category}`}>{data.category}</Link>
                    </div>
                    <div className="text-4xl font-semibold">{data.title}</div>
                    <div className="mt-8 text-[#A8A29E]">
                        <ClockCircleOutlined />
                        <span className="ml-2 tracking-tighter">{data.readtime} minutes to read</span>
                    </div>

                </div>
                <div className="ml-32">
                    <iframe width="560" height="315" src={data.link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    <div dangerouslySetInnerHTML={{__html: data.content}} />
                </div>
                <div className="font-semibold text-center mt-5">
                    <span>Do you think this video was helpful?</span>
                    <div className="flex gap-3 justify-center mt-3">
                        <img src={likeButton} />
                        <div className="w-[49px] h-[49px] rounded-full text-center border-[2px] border-black text-2xl leading-[42px]">6</div>
                    </div>
                </div>
            </div>
        </div>
    ))
}

export default DetailVideo
