import { useState } from "react";
import AccordionItem from "./AccordionItem";

function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {Items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}

const Items = [
  {
    title: "Accordion 1",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora ullam eligendi vel architecto nobis tenetur voluptatem error, assumenda accusantium, obcaecati earum esse fuga, ad totam? Aliquam dignissimos hic distinctio vero!",
  },
  {
    title: "Accordion 2",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora ullam eligendi vel architecto nobis tenetur voluptatem error, assumenda accusantium, obcaecati earum esse fuga, ad totam? Aliquam dignissimos hic distinctio vero!",
  },
  {
    title: "Accordion 3",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora ullam eligendi vel architecto nobis tenetur voluptatem error, assumenda accusantium, obcaecati earum esse fuga, ad totam? Aliquam dignissimos hic distinctio vero!",
  },
  {
    title: "Accordion 4",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora ullam eligendi vel architecto nobis tenetur voluptatem error, assumenda accusantium, obcaecati earum esse fuga, ad totam? Aliquam dignissimos hic distinctio vero!",
  },
];

export default Accordion;
