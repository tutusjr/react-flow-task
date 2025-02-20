import { useContext, useMemo } from "react";
import { TeamContext } from "../../context/teamcontext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Charts = () => {
  const { nodes, edges } = useContext(TeamContext) || { nodes: [], edges: [] };
  const teamData = useMemo(() => {
    const teamNodes = nodes.filter((node) => node.type === "teamNode");
    return teamNodes.map((team) => {
      const teamConnections = edges.filter((edge) => edge.target === team.id);
      return {
        name: team.data.label,
        value: teamConnections.length,
        fill: (team.data.color || "#8884d8") as string
      };
    });
  }, [nodes, edges]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Ekip Analizleri</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Ekip Üye Dağılımı (Pasta Grafik)
          </h2>
          {teamData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={teamData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, value }) => `${name}: ${value} üye`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {teamData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill= {entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} üye`, "Üye Sayısı"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              Henüz ekip bulunmamaktadır. Lütfen önce ekip ekleyin.
            </p>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Ekip Üye Dağılımı (Çubuk Grafik)
          </h2>
          {teamData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Üye Sayısı",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Ekip Sayısı">
                    {teamData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              Henüz ekip bulunmamaktadır. Lütfen önce ekip ekleyin.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
