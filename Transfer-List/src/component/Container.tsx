import Checkbox from "./Checkbox";

type Data = {
  title: string;
  id: number;
  checked: boolean;
};

type ContainerProps = {
  items: Data[];
  onChange: Function;
};

function Container({ items, onChange }: ContainerProps) {
  return (
    <div id="container">
      {items.map((item: Data, index: number) => (
        <Checkbox
          {...item}
          key={index}
          onChange={(checked: boolean) => onChange(item.id, checked)}
        />
      ))}
    </div>
  );
}

export default Container;
