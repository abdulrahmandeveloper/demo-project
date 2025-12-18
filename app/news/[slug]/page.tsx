import NewsIdPage from "@/routes/news/newsId";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  console.log("params.slug: ", slug);

  return (
    <div>
      <NewsIdPage slug={slug} />
    </div>
  );
};

export default page;
