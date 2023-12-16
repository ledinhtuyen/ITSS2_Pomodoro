import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../Exercise.scss";

const items = [1, 2, 3, 4, 5];

function Items({ currentItems }: any) {
  return (
    <>
      {currentItems &&
        currentItems.map((item: any) => (
          <a href={`/exercise/video/${item}`} className="pb-2" key={item}>
            <li>
              <div className="flex gap-5">
                <img
                  src={
                    "https://i.ytimg.com/vi/dsTuF2tTxPw/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhrIDgocjAP&rs=AOn4CLAgNS7RON4hUlI7UXlLuU8Qk_A5Xg"
                  }
                />
                <div>
                  <h1 className="font-semibold text-[#1C1917]">
                    Tặng bạn phòng khám đa khoa
                  </h1>
                  <span className="text-[#78716C]">
                    Lorem ipsum dolor sit amet consectetur.
                  </span>
                </div>
              </div>
            </li>
          </a>
        ))}
    </>
  );
}

const InstructionalVideo = () => {
  const itemsPerPage = 2;
  // index đầu của 1 trang
  const [itemOffset, setItemOffset] = useState(0);
  // index cuối của 1 trang
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  // Tổng số trang
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageClick = (event: any) => {
    // Trang số 1 tức là event.selected==0
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <div>
      <div className="bg-white rounded-lg border-[1px] border-[#e7e5e4] p-5">
        <h1 className="font-bold text-[rgb(28,25,23)] mb-5 text-2xl">Video</h1>
        <ul className="flex flex-col gap-2">
          <Items currentItems={currentItems} />
        </ul>
      </div>
      <div className="mt-3">
        <ReactPaginate
          className="flex justify-center gap-5 pagination-component"
          pageCount={pageCount}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          nextLabel={<RightOutlined />}
          previousLabel={<LeftOutlined />}
          onPageChange={handlePageClick}
          initialPage={1}
          pageClassName="border-[2px] w-6 h-6 text-center leading-[20px] border-[#f5f5f4] page-className"
          activeClassName="!border-red-500 text-red-500 font-semibold"
        />
      </div>
    </div>
  );
};

export default InstructionalVideo;
