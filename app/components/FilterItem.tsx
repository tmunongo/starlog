type Props = {
  children: string;
};

const FilterItem = ({ children }: Props) => {
  return (
    <span className="cursor-grab mx-1 p-2 rounded-full bg-oranj border border-oranj  text-base">
      {children}
    </span>
  );
};

export default FilterItem;
