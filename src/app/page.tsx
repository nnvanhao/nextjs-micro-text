import SnippetList from "@/components/snippet-list";

export default async function Home({
  searchParams,
}: {
  searchParams?: { search: string };
}) {
  const { search } = await searchParams;

  return (
    <div>
      <SnippetList search={search} />
    </div>
  );
}
