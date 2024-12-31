import SnippetList from "@/components/snippet-list";

interface Params {
  categoryId?: string;
}

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams?: { search?: string }; // Mark `search` as optional
}) {
  const { categoryId } = await params;
  const search = searchParams?.search || ""; // Safely access `search` with a fallback to an empty string

  return (
    <div>
      <SnippetList categoryId={categoryId} search={search} />
    </div>
  );
}
