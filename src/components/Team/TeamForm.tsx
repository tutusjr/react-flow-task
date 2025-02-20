import { useState } from "react";
import { TeamContext } from "../../context/teamcontext";
import { useContext } from "react";

const TeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const { addTeamNode } = useContext(TeamContext) || { addTeamNode: () => {} };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim() && addTeamNode) {
      addTeamNode(teamName.trim());
      setTeamName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 w-80"
    >
      <h2 className="text-lg font-semibold">Takım Oluştur</h2>
      <input
        type="text"
        placeholder="Takım adı girin"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={!teamName}
        className={`px-4 py-2 rounded-md text-white ${
          teamName
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Takım Oluştur
      </button>
    </form>
  );
};

export default TeamForm;
