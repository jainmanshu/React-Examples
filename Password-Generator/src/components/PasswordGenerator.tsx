import { useState } from "react";
import usePasswordGenerator from "../hooks/use-password-generator";
import PasswordStrength from "./PasswordStrength";

function PasswordGenerator() {
  const [pwdLen, setPwdLen] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { label: "Include Uppercase Letters", checked: false, name: "uppercase" },
    { label: "Include Lowercase Letters", checked: false, name: "lowercase" },
    { label: "Include Numbers", checked: false, name: "numbers" },
    { label: "Include Symbols", checked: false, name: "symbols" },
  ]);

  const [copied, setCopied] = useState(false);

  const handleChecked = (index: number) => {
    const updated = [...checkboxData];
    updated[index].checked = !updated[index].checked;
    setCheckboxData([...updated]);
  };

  const handlCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { password, error, generatePassword } = usePasswordGenerator();

  return (
    <div className="password-container">
      {password && (
        <div className="header">
          <span className="pwd-text">{password}</span>
          <button className="btn" onClick={() => handlCopy()}>
            {copied ? "copied!" : "copy"}
          </button>
        </div>
      )}
      <div className="pwd-strength">
        <div className="char-label">
          <label>Character Length</label>
          <label>{pwdLen}</label>
        </div>
        <input
          type="range"
          min={4}
          max={20}
          onChange={(e) => setPwdLen(+e?.target.value)}
          value={pwdLen}
          className="slider"
        />
      </div>
      <div className="checkbox">
        {checkboxData.map((checkbox, i) => {
          return (
            <div key={i}>
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={() => handleChecked(i)}
              />
              <label>{checkbox.label}</label>
            </div>
          );
        })}
      </div>
      {error && <div className="error">{error}</div>}
      <PasswordStrength password={password} />
      {/* Add strength */}
      <div>
        <button
          className="btn gen-btn"
          onClick={() => generatePassword(checkboxData, pwdLen)}
        >
          GENERATE PASSWORD
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
