import React, { useState } from "react";
import { TeamContext } from "../../context/teamcontext";
import { useContext } from "react";

const MemberForm = () => {
  const [memberName, setMemberName] = useState("");
  const { addMemberNode } = useContext(TeamContext) || {
    addMemberNode: () => {},
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (memberName.trim() && addMemberNode) {
      addMemberNode(memberName.trim());
      setMemberName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 w-80"
    >
      <h2 className="text-lg font-semibold">Üye Ekle</h2>
      <input
        type="text"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
        placeholder="Üye adı girin"
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        disabled={!memberName}
        className={`px-4 py-2 rounded-md text-white ${
          memberName
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Üye Ekle
      </button>
    </form>
  );
};

export default MemberForm;
