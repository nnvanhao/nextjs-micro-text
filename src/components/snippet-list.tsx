import { getSnippets } from "@/service/snippets";
import Link from "next/link";
import { CopyButton } from "./copy-button";
import SearchBox from "./search-box";
import { getCategories } from "@/service/categories";
import EmptyData from "./empty-data";

type Snippet = {
  id: string;
  text: string;
  isHidden: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  category: {
    id: string;
    name: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  };
};

type Props = {
  categoryId?: string;
  search?: string;
};

const SnippetList = async ({ categoryId, search }: Props) => {
  const snippets = await getSnippets(search);
  const categories = await getCategories();

  const filteredSnippets = snippets.filter((snippet) => {
    if (categoryId) {
      return snippet.category.id === categoryId;
    }
    return true;
  });

  const finalSnippets = categoryId ? filteredSnippets : snippets;
  return (
    <div>
      <div className="relative py-10">
        <SearchBox />
      </div>

      {/* Dynamically Render Categories */}
      <div className="flex items-center gap-8">
        <Link
          href={"/"}
          className={`cursor-pointer text-[18px] font-bold text-gray-500 hover:underline hover:underline-offset-4 ${!categoryId ? "text-gray-600 underline underline-offset-4" : ""}`}
        >
          All
        </Link>
        {categories.map((category, index) => (
          <Link
            href={`/category/${category?.id}`}
            key={index}
            className={`cursor-pointer text-[18px] font-bold text-gray-500 ${categoryId === category?.id ? "text-gray-600 underline underline-offset-4" : ""}`}
          >
            {category?.name}
          </Link>
        ))}
      </div>

      {finalSnippets?.length ? (
        <div className="mt-4 grid grid-cols-12 gap-6">
          {finalSnippets.map((snippet: Snippet) => {
            return (
              <div
                key={snippet?.id}
                className="sx:col-span-12 flex flex-col gap-12 rounded-xl border bg-white p-4 shadow-none duration-300 hover:bg-gray-100 md:col-span-6 lg:col-span-4"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex w-fit rounded-md border bg-gray-100 px-2 py-1">
                    <span className="text-[12px] text-gray-500">
                      {snippet.category.name}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-600">
                    {snippet.text}
                  </span>
                </div>
                <div className="flex flex-row-reverse items-center justify-between">
                  <CopyButton text={snippet.text} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default SnippetList;
