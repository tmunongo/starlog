type Props = {
  children: string;
};

const FilterItem = ({ children }: Props) => {
  return (
    <span className="cursor-grab mx-1 p-2 rounded-full bg-highlights_light dark:bg-highlights_dark border border-highlights_light dark:border-highlights_dark text-base text-text_dark_primary dark:text-text_light_primary">
      {children}
    </span>
  );
};

export default FilterItem;
