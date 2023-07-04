import React from 'react';

const CustomForm = ({ showTextbox1, showTextbox2, showTextbox3, showTextbox4, showTextbox5 }) => {
  return (
    <div>
      {showTextbox1 && <input type="text" placeholder="Textbox 1" />}
      {showTextbox2 && <input type="text" placeholder="Textbox 2" />}
      {showTextbox3 && <input type="text" placeholder="Textbox 3" />}
      {showTextbox4 && <input type="text" placeholder="Textbox 4" />}
      {showTextbox5 && <input type="text" placeholder="Textbox 5" />}
    </div>
  );
};

export default CustomForm;