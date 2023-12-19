import React from "react"
import { Link, useParams } from "react-router-dom";
import { ClockCircleOutlined } from "@ant-design/icons";
import likeButton from "../../assets/images/LikeButton.png"

const DetailBlog = () => {
    const { id } = useParams()

    return (
        <div className="container mx-auto max-w-[1200px]">
            <div className="pt-16">
                <div className="container mx-auto max-w-[800px] mb-10">
                    <div className="mb-3 font-semibold">
                        <Link to="/exercise">Exercise</Link>
                        <span className="mx-2">/</span>
                        <Link className="cursor-pointer" to={`/exercise?category=Neck`}>Neck</Link>
                    </div>
                    <div className="text-4xl font-semibold">Excercise for Neck Massage</div>
                    <div className="mt-8 text-[#A8A29E]">
                        <ClockCircleOutlined />
                        <span className="ml-2 tracking-tighter">5 minutes to read</span>
                    </div>

                </div>
                <div className="ml-32">Here is Content</div>
                <div className="font-semibold text-center mt-5">
                    <span>Do you think this video was helpful?</span>
                    <div className="flex gap-3 justify-center mt-3">
                        <img src={likeButton} />
                        <div className="w-[49px] h-[49px] rounded-full text-center border-[2px] border-black text-2xl leading-[42px]">6</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailBlog