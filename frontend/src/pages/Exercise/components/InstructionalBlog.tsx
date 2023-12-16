import React, { useState } from "react";
import Logo from "../../../assets/images/Icon.png";
import ReactPaginate from "react-paginate";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../Exercise.scss";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }: any) {
  return (
    <>
      {currentItems &&
        currentItems.map((item: any) => (
          <a
            href={`/exercise/blog/${item}`}
            className="border-b-[1px] border-[#E7E5E4] pb-2"
            key={item}
          >
            <li>
              <div className="flex gap-5">
                <img src={Logo} className="w-[58px]" />
                <div>
                  <h1 className="font-semibold text-[#1C1917]">
                    Exercises to treat back pain
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

const InstructionalBlog = () => {
  const itemsPerPage = 5;
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
        <h1 className="font-bold text-[#1C1917] mb-5 text-2xl">Instructional Blog</h1>
        <ul className="flex flex-col gap-4">
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

export default InstructionalBlog;
