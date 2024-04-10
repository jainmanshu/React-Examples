type CheckBoxProps = {
  title: string;
  checked: boolean;
  onChange: Function;
};
function Checkbox({ title, checked, onChange }: CheckBoxProps) {
  return (
    <div style={{ paddingTop: 10 }}>
      <label>
        <span
          className="checkbox"
          style={{ backgroundColor: checked ? "grey" : "" }}
        >
          {title}
        </span>
        <input
          type="checkbox"
          hidden
          onChange={(e) => onChange(e.target.checked)}
        ></input>
      </label>
    </div>
  );
}

export default Checkbox;
