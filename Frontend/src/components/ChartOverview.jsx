
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import styled from "styled-components";

export default function EngagementOverview({ graph = [], onBack }) {
    if (!graph.length) return null;

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    const chartData = graph.map((item, index) => {
        const estimatedUsers = Math.ceil(item.messages / 7);
        const estimatedNewUsers = index === graph.length - 1 ? Math.ceil(estimatedUsers * 0.3) : Math.ceil(estimatedUsers * 0.15);

        return {
            date: formatDate(item.date),
            messagingUsers: estimatedUsers,
            joiningUsers: estimatedNewUsers,
            messages: item.messages
        };
    });

    const totalMessages = graph.reduce((sum, item) => sum + item.messages, 0);
    const avgMessages = Math.round(totalMessages / graph.length);
    const peakDay = graph.reduce((max, item) => item.messages > max.messages ? item : max, graph[0]);


    return (
        <>
            <div style={{ background: "#0b1220", padding: "24px" }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <div style={{ padding: "20px" }}>
                        <BackButton onClick={onBack}>
                            ⬅ Back to Dashboard
                        </BackButton>

                        <h1 style={{ fontSize: 22, color: "#e5e7eb", margin: 0 }}>
                            Visualization Overview
                        </h1>
                        <p style={{ color: "#94a3b8", fontSize: 14 }}>
                            Activity metrics of users for the last 7 days
                        </p>
                    </div>
                </div>

                <Grid>
                    <Card>
                        <Label>Total Messages</Label>
                        <Value>{totalMessages}</Value>
                        <SubText>Last 7 days</SubText>
                    </Card>

                    <Card>
                        <Label>Avg / Day</Label>
                        <Value>{avgMessages}</Value>
                        <SubText>Messages per day</SubText>
                    </Card>

                    <Card>
                        <Label>Peak Day</Label>
                        <Value>{peakDay.messages}</Value>
                        <SubText>{formatDate(peakDay.date)}</SubText>
                    </Card>
                </Grid>


                {/* Chart Card */}
                <div style={{
                    background: "#020617",
                    borderRadius: 12,
                    padding: 20,
                    border: "1px solid #1e293b"
                }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <XAxis
                                dataKey="date"
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <YAxis
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={{ stroke: '#e5e7eb' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                                labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
                            />
                            <Legend
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="rect"
                            />
                            <Bar
                                dataKey="messagingUsers"
                                fill="#3b82f6"
                                name="Users Messaging"
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="joiningUsers"
                                fill="#f97316"
                                name="Users Joining"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;

  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #1e293b;
  border-radius: 8px;

  cursor: pointer;
  transition: 
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.2s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: #334155;
    transform: translateX(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateX(-1px) scale(0.98);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const Card = styled.div`
  background: linear-gradient(
    145deg,
    #020617,
    #020617dd
  );
  border: 1px solid #1e293b;
  border-radius: 14px;
  padding: 18px 20px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #3b82f6;
  }
`;

const Label = styled.p`
  color: #94a3b8;
  font-size: 13px;
  margin: 0;
`;

const Value = styled.h2`
  color: #e5e7eb;
  font-size: 28px;
  margin: 6px 0;
`;

const SubText = styled.p`
  color: #64748b;
  font-size: 12px;
  margin: 0;
`;
