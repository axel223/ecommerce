import { useState } from "react";
import { Header } from "~/components/header";
import { FormHeader } from "~/components/formHeader";
import { BannerStrip } from "~/components/bannerStrip";
import { Checkbox } from "~/components/checkbox";
import { PageLayout } from "~/components/layout";
import { api } from "~/utils/api";

const dataLimit = 6;
export const UserInterests = ({}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = api().category.getAll.useQuery();

  if (isLoading) return <p> Loading.... </p>;
  console.log(window.sessionStorage);

  if (!data || data.length === 0) return <div>User has not posted</div>;

  const handleCheckboxChange = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const pages = Array.from(Array(Math.ceil(data.length / dataLimit)).keys());
  console.log(page);
  return (
    <div>
      <FormHeader
        heading={"Please mark your interests!"}
        description={"We will keep you notified."}
      />
      <h2 className="mb-7 text-left text-xl font-medium text-black">
        {"My saved interests!"}
      </h2>
      {data
        .slice(page * dataLimit, (page + 1) * dataLimit)
        .map((ele, index) => {
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
      <button className={"mr-1"} key={"first"} onClick={() => setPage(0)}>
        {"<<"}
      </button>
      <button
        className={"m-1"}
        key={"prev"}
        onClick={() => setPage(page - 1 > 0 ? page - 1 : page)}
      >
        {"<"}
      </button>
      {pages.map((number, index) => (
        <button className={"m-1"} key={index} onClick={() => setPage(number)}>
          {number + 1}
        </button>
      ))}
      <button
        className={"ml-1"}
        key={"next"}
        onClick={() => setPage(page + 1 != pages.length ? page + 1 : page)}
      >
        {">"}
      </button>
      <button
        className={"ml-1"}
        key={"last"}
        onClick={() => setPage(pages.length - 1)}
      >
        {">>"}
      </button>
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
