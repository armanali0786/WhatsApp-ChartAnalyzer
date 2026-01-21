import { useState } from "react";
import { analyzeChat } from "./api/analyzeChat";
import ChartOverview from "./components/ChartOverview";
import ChatUpload from "./components/ChatUpload";
import ActiveUsers from "./components/ActiveUsers";

export default function App() {
  const [graph, setGraph] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("dashboard"); // Set Default Value Dashboard

  const handleAnalyze = async (file) => {
    try {
      setLoading(true);
      const res = await analyzeChat(file);
      setGraph(res.graph);
      setUsers(res.active4DaysUsers);
      setView("chat-view"); // switch screen after API success
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setView("dashboard");
    setGraph([]);
    setUsers([]);
  };

  return (
    <>
    <div style={{ background: "#0b1220", height:"100vh" }}>
      {view === "dashboard" && (
        <ChatUpload onAnalyze={handleAnalyze} loading={loading} />
      )}
      {view === "chat-view" && (
        <>
            <ChartOverview graph={graph} onBack={handleBack} />
            <ActiveUsers users={users} />
        </>
      )}
    </div>
    </>
  );
}
