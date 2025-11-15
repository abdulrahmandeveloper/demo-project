import React, { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type PaginationContainerProps = {
  pages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const PaginationContainer = ({
  pages,
  currentPage,
  setCurrentPage,
}: PaginationContainerProps) => {
  const handleNextPageClick = (e) => {
    e.preventDefault();

    const newPage = currentPage + 1;

    setCurrentPage(newPage);
  };

  const handlePreviousPageClick = (e: any) => {
    e.preventDefault();

    const newPage = currentPage - 1;

    setCurrentPage(newPage);
  };

  const handleClick = (e, page: number) => {
    e.preventDefault();
    console.log(page);

    setCurrentPage(page);
  };

  const visiblePages = () => {
    const prevTwoPage = currentPage !== 1 && currentPage - 2;
    const prevOnePage = currentPage !== 1 && currentPage - 1;
    const nextOnePage = currentPage !== pages && currentPage + 1;
    const nextTwoPage =
      currentPage !== pages && currentPage !== pages - 1 && currentPage + 2;

    const list: number[] = [currentPage];

    if (prevOnePage) list.unshift(prevOnePage);
    if (prevTwoPage) list.unshift(prevTwoPage);
    if (nextOnePage) list.push(nextOnePage);
    if (nextTwoPage) list.push(nextTwoPage);

    return list;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent className="cursor-pointer">
          <PaginationItem>
            <PaginationPrevious onClick={(e) => handlePreviousPageClick(e)} />
          </PaginationItem>
          {currentPage > 3 && (
            <div className="flex">
              <PaginationItem>
                <PaginationLink onClick={(e) => handleClick(e, 1)}>
                  {1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </div>
          )}
          {visiblePages().map((page, index: number) => {
            if (true) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={(e) => handleClick(e, page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}

          {currentPage < pages - 2 && (
            <div className="flex">
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={(e) => handleClick(e, pages)}>
                  {pages}
                </PaginationLink>
              </PaginationItem>
            </div>
          )}

          <PaginationItem>
            <PaginationNext onClick={(e) => handleNextPageClick(e)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationContainer;
