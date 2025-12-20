import { useState } from "react";

const MessagePage = () => {
  const [state, setState] = useState("Empty");

  const values = [
    {
      name: "Ram",
      value: "Ram",
    },
    {
      name: "Shyam",
      value: "Shyam",
    },
    {
      name: "Excel",
      value: "Excel",
    },
  ];

  return (
    <div>
      {state}
      <div className="w-fit flex flex-col gap-1 p-2 bg-gray-100">
        {values.map((item, i) => {
          return (
            <button
              type="button"
              key={i}
              onClick={() => setState(item.value)}
              className="p-2 bg-gray-50"
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MessagePage;
