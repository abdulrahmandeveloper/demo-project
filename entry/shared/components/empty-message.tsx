type EmptyMessageProps = {
  containerClassname?: string;
};
export const EmptyMessage = ({ containerClassname }: EmptyMessageProps) => {
  return (
    <div className={`${containerClassname} flex items-center justify-center`}>
      <p className="">Sorry, there is no results for your search</p>
    </div>
  );
};
