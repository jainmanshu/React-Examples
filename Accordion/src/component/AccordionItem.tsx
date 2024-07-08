interface Props {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: Function;
}
function AccordionItem({ title, content, onClick, isOpen }: Props) {
  return (
    <div>
      <div
        style={{
          width: 300,
          height: 50,
          border: "1px solid white",
          display: "flex",
          justifyItems: "center",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <div>{title}</div>
        <div onClick={() => onClick()}>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && (
        <div
          style={{
            width: 300,
            border: "1px solid white",
            borderTop: undefined,
            padding: 10,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default AccordionItem;
