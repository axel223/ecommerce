import { useState } from "react";
import { Header } from "~/components/header";
import { FormHeader } from "~/components/formHeader";
import { BannerStrip } from "~/components/bannerStrip";
import { Checkbox } from "~/components/checkbox";
import { PageLayout } from "~/components/layout";

interface DataItem {
  id: number;
  name: string;
}

const data: DataItem[] = [
  {
    id: 1,
    name: "Item1",
  },
  {
    id: 2,
    name: "Item2",
  },
  {
    id: 3,
    name: "Item3",
  },
  {
    id: 4,
    name: "Item4",
  },
  {
    id: 5,
    name: "Item5",
  },
  {
    id: 6,
    name: "Item6",
  },
  {
    id: 7,
    name: "Item7",
  },
  {
    id: 8,
    name: "Item8",
  },
  {
    id: 9,
    name: "Item9",
  },
  {
    id: 10,
    name: "Item10",
  },
  {
    id: 11,
    name: "Item11",
  },
  {
    id: 12,
    name: "Item12",
  },
  {
    id: 13,
    name: "Item13",
  },
];

const dataLimit = 6;
export const UserInterests = ({}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);

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
      <h2 className="mb-7 text-xl font-medium text-left text-black">{"My saved interests!"}</h2>
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
      <button className={"m-1"} key={"prev"} onClick={() => setPage(page - 1 > 0 ? page - 1 : page)}>
        {"<"}
      </button>
      {pages.map((number, index) => (
        <button className={"m-1"} key={index} onClick={() => setPage(number)}>
          {number + 1}
        </button>
      ))}
      <button className={"ml-1"} key={"next"} onClick={() => setPage(page + 1 != pages.length ? page + 1 : page)}>
        {">"}
      </button>
      <button className={"ml-1"} key={"last"} onClick={() => setPage(pages.length - 1)}>
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
