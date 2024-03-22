import { useState } from "react";
import { Header } from "~/components/header";
import { FormHeader } from "~/components/formHeader";
import { BannerStrip } from "~/components/bannerStrip";
import { Checkbox } from "~/components/checkbox";
import { PageLayout } from "~/components/layout";
import { api } from "~/utils/api";

export const UserInterests = ({}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: categoryData, isLoading: categoryLoading } =
    api().category.getAll.useQuery();
  const { data: userData, isLoading: userDataLoading } =
    api().user.getCategory.useQuery();

  const addCategoryMutation = api().user.addCategory.useMutation();
  const removeCategoryMutation = api().user.removeCategory.useMutation();

  selected.push(...(userData?.categories ?? []).map((obj) => obj.id));

  if (categoryLoading || userDataLoading) return <p> Loading.... </p>;

  if (!categoryData || categoryData.length === 0)
    return <div>{`Categories doesn't Exist`}</div>;

  const handleCheckboxChange = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
      removeCategoryMutation.mutate({ categoryId: index.toString()});
    } else {
      setSelected([...selected, index]);
      addCategoryMutation.mutate({ categoryId: index.toString()});
    }
  };

  const itemsPerPage = 6;
  const totalPages = Math.ceil(categoryData.length / itemsPerPage);
  const initialPage = 1;
  const lastPage = totalPages;

  const handlePageNumberEvent = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoryData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = () => {
    const numberOfVisiblePages = 7;
    const halfVisiblePages = Math.floor(numberOfVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    const endPage = Math.min(startPage + numberOfVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < numberOfVisiblePages) {
      startPage = Math.max(endPage - numberOfVisiblePages + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          key={i}
          onClick={() => handlePageNumberEvent(i)}
          className={`mr-2 cursor-pointer ${
            currentPage === i ? "font-semibold text-black" : "text-[#ACACAC]"
          }`}
        >
          {i}
        </span>,
      );
    }
    return pages;
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <FormHeader
        heading={"Please mark your interests!"}
        description={"We will keep you notified."}
      />
      <h2 className="mb-7 text-left text-xl font-medium text-black">
        {"My saved interests!"}
      </h2>
      {currentItems.map((ele) => {
        return (
          <Checkbox
            label={ele.name}
            isSelected={selected.includes(ele.id)}
            onCheckboxChange={() => handleCheckboxChange(ele.id)}
            id={ele.name}
            key={ele.name}
          />
        );
      })}
      <div className="mb-0 mt-10 flex justify-start text-center">
        <span
          className="cursor-pointer"
          onClick={() => handlePageNumberEvent(initialPage)}
        >
          &lt;&lt; &nbsp;
        </span>
        <span className="cursor-pointer" onClick={prevPage}>
          &lt; &nbsp;
        </span>
        {renderPageNumbers()}
        <span onClick={nextPage} className="cursor-pointer">
          &gt; &nbsp;
        </span>
        <span
          onClick={() => handlePageNumberEvent(lastPage)}
          className="cursor-pointer"
        >
          &gt;&gt;
        </span>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <BannerStrip />
      <PageLayout>
        <UserInterests />
      </PageLayout>
    </>
  );
}
