type Props = {
  children: string;
};

const CategoryIcon = ({ children }: Props) => {
  const getIcon = (val: string) => {
    switch (val) {
      case "Museum":
        return (
          <div>
            <img src="" alt="Museum" />
          </div>
        );
        break;
      case "Historical Site" || "Park":
        return (
          <div>
            <img src="" alt="Historial Site" />
          </div>
        );
        break;
      default:
        break;
    }
  };
  return <>{getIcon(children)}</>;
};

export default CategoryIcon;
