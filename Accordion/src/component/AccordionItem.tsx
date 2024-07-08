interface Props {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: Function;
}
function AccordionItem({ title, content, onClick, isOpen }: Props) {
  return (
    <div className="accordion-item">
      <div onClick={() => onClick()} className="accordion-title">
        <div>{title}</div>
        <div>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
}

export default AccordionItem;
