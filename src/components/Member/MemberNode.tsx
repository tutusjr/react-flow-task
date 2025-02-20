import { memo, useState, useContext } from "react";
import { Handle, Position } from "@xyflow/react";
import { TeamContext } from "../../context/teamcontext";

const MemberNode = memo(
  ({ data, id }: { data: { label: string; color: string }; id: string }) => {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const context = useContext(TeamContext);

    if (!context) {
      throw new Error("MemberNode must be used within a TeamProvider");
    }

    const { deleteMember } = context;

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setShowContextMenu(true);
    };

    return (
      <div
        onContextMenu={handleContextMenu}
        style={{ backgroundColor: data.color, borderColor: data.color }}
        className="relative px-4 py-2 shadow-md rounded-lg border-2"
      >
        <Handle
          type="source"
          position={Position.Top}
          className="w-2 h-2 bg-green-500 border-2 border-white"
          isConnectable={true}
        />
        <div className="text-sm font-semibold">{data.label}</div>

        {showContextMenu && (
          <>
            <div
              className="fixed inset-0"
              onClick={() => setShowContextMenu(false)}
            />
            <div className="absolute z-50 bg-white shadow-lg rounded-lg py-2 mt-2 right-0">
              <button
                onClick={() => {
                  deleteMember(id);
                  setShowContextMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
              >
                Sil
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default MemberNode;
