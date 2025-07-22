// components/comments/ReplyInput.jsx
import React, { useState } from "react";

const ReplyInput = ({ value, onChange, onSubmit, onCancel, actionLabel = "Reply" }) => {
  const [text, setText] = useState(value);

  return (
    <div className="mt-2">
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(e.target.value);
        }}
        className="w-full p-2 rounded border dark:bg-gray-900"
        rows="2"
        placeholder="Write your reply..."
      />
      <div className="flex gap-2 mt-1">
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          {actionLabel}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;
