import NewsIdPage from "@/routes/news/newsId";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  return (
    <div>
      <NewsIdPage slug={slug} />
    </div>
  );
};

export default page;
