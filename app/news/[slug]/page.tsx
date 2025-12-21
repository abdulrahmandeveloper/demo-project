import NewsIdPage from "@/routes/news/newsId";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);
  console.log("decodedSlug: ", decodedSlug);

  return (
    <div>
      <NewsIdPage slug={decodedSlug} />
    </div>
  );
};

export default page;
