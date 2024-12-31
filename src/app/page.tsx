/* eslint-disable @typescript-eslint/no-explicit-any */
import SnippetList from "@/components/snippet-list";

export default async function Home({ searchParams }: any) {
  const { search } = await searchParams;

  return (
    <div>
      <SnippetList search={search} />
    </div>
  );
}
