import { useState } from "react";

const Input = (props) => {

  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setText('');
    props.onSendMessage(text);
  }

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Piši-Briši i klikni Šalji"
          maxLength={130}
        />
        <button disabled={text === "" ? true : false}>Šalji</button>
      </form>
    </div>
  );
}

export default Input;