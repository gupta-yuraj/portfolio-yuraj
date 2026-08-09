import { AdminAuthProvider, useAdminAuth } from "./AuthContext";
import Login from "./Login";
import Dashboard from "./Dashboard";

function AdminGate() {
  const { session, loading, configured } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center text-white/40 text-sm">
        Loading…
      </div>
    );
  }
  if (!configured || !session) return <Login />;
  return <Dashboard />;
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminGate />
    </AdminAuthProvider>
  );
}
