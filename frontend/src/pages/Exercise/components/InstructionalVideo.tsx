import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../Exercise.scss";

function Items({ currentItems }: any) {
  return (
    <>
      {currentItems &&
        currentItems.map((item: any) => (
          <Link to={`/exercise/video/${item.id}`} className="pb-2" key={item.id}>
            <li>
              <div className="flex gap-5">
                <img src={item.thumbnail} width={300} />
                <div>
                  <h1 className="font-semibold text-[#1C1917]">{item.title}</h1>
                  <span className="text-[#78716C] multiline-ellipsis">{item.description}</span>
                </div>
              </div>
            </li>
          </Link>
        ))}
    </>
  );
}

const InstructionalVideo = ({ items }: any) => {
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
      <div className="bg-white rounded-lg border-[1px] border-[#e7e5e4] p-5 min-h-[560px]">
        <h1 className="font-bold text-[rgb(28,25,23)] mb-5 text-2xl">Video</h1>
        <ul className="flex flex-col gap-2">
          <Items currentItems={currentItems} />
        </ul>
      </div>
      <div className="mt-5">
        {items.length > 2 && (
          <ReactPaginate
            className="flex justify-center gap-5 pagination-component"
            pageCount={pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            nextLabel={<RightOutlined />}
            previousLabel={<LeftOutlined />}
            onPageChange={handlePageClick}
            pageClassName="border-[2px] w-6 h-6 text-center leading-[20px] border-[#f5f5f4] page-className"
            activeClassName="!border-red-500 text-red-500 font-semibold"
          />
        )}
      </div>
    </div>
  );
};

export default InstructionalVideo;
