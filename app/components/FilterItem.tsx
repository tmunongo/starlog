type Props = {
  children: string;
};

const FilterItem = ({ children }: Props) => {
  return (
    <span className="cursor-grab mx-1 p-2 rounded-xl border border-black text-base">
      {children}
    </span>
  );
};

export default FilterItem;
