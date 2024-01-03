import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "./Exercise.scss";

function Items({ currentItems }: any) {
  return currentItems?.map((item: any, index) => (
    <>
      <Link to={`/exercise/blog/${item.id}`} key={item.id}>
        <li className="flex flex-row gap-4">
          <div className="aspect-video rounded-md overflow-hidden flex-[1] border border-stone-100">
            <img src={item.thumbnail} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="flex-[2]">
            <h1 className="font-semibold text-[#1C1917]">{item.title}</h1>
            <span className="text-[#78716C] multiline-ellipsis">{item.description}</span>
          </div>
        </li>
      </Link>

      {index !== currentItems.length - 1 && <hr className="bg-stone-50/[0.5]" />}
    </>
  ));
}

const InstructionalBlog = ({ items }: any) => {
  const itemsPerPage = 5;

  // index đầu của 1 trang
  const [itemOffset, setItemOffset] = useState<number>(0);

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
    <div className="bg-white rounded-lg border border-stone-200 p-6 flex flex-col gap-6">
      <h1 className="font-bold text-[#1C1917] text-2xl">Blog ngắn</h1>

      <ul className="flex flex-col gap-4">
        <Items currentItems={currentItems} />
      </ul>

      <div className="mt-auto">
        {items.length > 5 && (
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

export default InstructionalBlog;
