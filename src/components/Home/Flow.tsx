import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  Controls,
  Background,
  MarkerType,
  ConnectionMode,
  Edge,
  Node,
} from "@xyflow/react";
import TeamForm from "../Team/TeamForm";
import MemberForm from "../Member/MemberForm";
import TeamNode from "../Team/TeamNode";
import MemberNode from "../Member/MemberNode";
import { TeamContext } from "../../context/teamcontext";
import { useContext } from "react";

const nodeTypes = {
  teamNode: TeamNode,
  memberNode: MemberNode,
};

const Flow = () => {
  const { addTeamNode, addMemberNode, nodes, edges, onConnect, onNodesChange } =
    useContext(TeamContext) || {
      addTeamNode: () => {},
      addMemberNode: () => {},
      nodes: [] as Node[],
      edges: [] as Edge[],
      onConnect: () => {},
      onNodesChange: () => {},
    };
  if (
    !addTeamNode ||
    !addMemberNode ||
    !nodes ||
    !edges ||
    !onConnect ||
    !onNodesChange
  ) {
    throw new Error("TeamContext is not provided properly.");
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-4">
        <TeamForm />
        <MemberForm />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        connectionMode={ConnectionMode.Strict}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "#333", strokeWidth: 1 },
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#333",
          },
        }}
        className="react-flow-renderer"
        style={{ background: "#f8f8f8" }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
