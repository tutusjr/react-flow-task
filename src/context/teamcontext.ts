import { createContext } from "react";
import { Node, Edge, Connection, NodeChange } from "@xyflow/react";

export type CustomNode = Node & {
  data: {
    label: string;
    color: string;
    hidden?: boolean;
  };
};

interface TeamContextType {
  addMemberNode: (name: string) => void;
  deleteMember: (id: string) => void;
  edges: Edge[];
  nodes: Node[];
  addTeamNode: (name: string) => void;
  onConnect: (connection: Connection) => void;
  onNodesChange: (changes: NodeChange[]) => void;
}

export const TeamContext = createContext<TeamContextType | undefined>(
  undefined
);
