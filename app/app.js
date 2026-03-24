import { AuthProvider, useAuth } from "./context/AuthContext";
import AppNavigation from "./navigation/navigation";

function AppContent() {
  const { user } = useAuth();
  return <AppNavigation user={user} />;
}

export default function PageStart() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}