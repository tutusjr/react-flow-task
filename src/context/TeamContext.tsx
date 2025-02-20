import { useState, useCallback, ReactNode } from "react";
import { TeamContext, CustomNode } from "./teamcontext";

import {
  Node,
  Edge,
  MarkerType,
  applyNodeChanges,
  NodeChange,
  Connection,
} from "@xyflow/react";

type TeamProviderProps = {
  children: ReactNode;
};

const getRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F4C430", "#FF33A8"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const TeamProvider = ({ children }: TeamProviderProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const addTeamNode = useCallback((teamName: string) => {
    const teamColor = getRandomColor();
    const newNode: CustomNode = {
      id: `team-${Date.now()}`,
      type: "teamNode",
      position: { x: 100 + Math.random() * 300, y: 100 },
      data: { label: teamName, color: teamColor },
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const addMemberNode = useCallback((memberName: string) => {
    const newNode: CustomNode = {
      id: `member-${Date.now()}`,
      type: "memberNode",
      position: { x: 100 + Math.random() * 200, y: 300 },
      data: { label: memberName, color: "#ccc" },
      draggable: true,
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;

      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (
        sourceNode?.type === "memberNode" &&
        targetNode?.type === "teamNode"
      ) {
        const existingConnection = edges.find(
          (edge) => edge.source === connection.source
        );

        if (existingConnection) {
          alert("Üye zaten bu takımda!");
          return;
        }

        setNodes((nds) =>
          nds.map((node) =>
            node.id === sourceNode.id
              ? {
                  ...node,
                  data: { ...node.data, color: targetNode.data.color },
                }
              : node
          )
        );

        const newEdge: Edge = {
          id: `e-${connection.source}-${connection.target}`,
          source: connection.source,
          target: connection.target,
          type: "smoothstep",
          animated: true,
          style: { stroke: "#333", strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#333",
          },
        };
        setEdges((eds) => [...eds, newEdge]);
      }
    },
    [nodes, edges]
  );

  const deleteMember = (id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    setEdges((prev) => prev.filter((edge) => edge.source !== id));
  };

  return (
    <TeamContext.Provider
      value={{
        edges,
        nodes,
        addTeamNode,
        addMemberNode,
        onConnect,
        onNodesChange,
        deleteMember
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
