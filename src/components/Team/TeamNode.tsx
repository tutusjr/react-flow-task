import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const TeamNode = memo(
  ({ data }: { data: { label: string; color: string } }) => {
    return (
      <div
        style={{ backgroundColor: data.color, borderColor: data.color }}
        className="px-12 py-2 shadow-md rounded-lg border-2"
      >
        <Handle
          type="target"
          position={Position.Bottom}
          className="w-2 h-2 bg-blue-500 border-2 border-white"
          isConnectable={true}
        />
        <div className="text-lg font-bold">{data.label}</div>
      </div>
    );
  }
);

export default TeamNode;
