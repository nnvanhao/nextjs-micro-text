/* eslint-disable @typescript-eslint/no-explicit-any */
import SnippetList from "@/components/snippet-list";

export default async function Home({ params, searchParams }: any) {
  const { categoryId } = params;
  const search = searchParams?.search || "";

  return (
    <div>
      <SnippetList categoryId={categoryId} search={search} />
    </div>
  );
}
