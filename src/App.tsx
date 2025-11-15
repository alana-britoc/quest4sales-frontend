import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1F1F2B",
            color: "#FFFFFF",
            border: "1px solid #FFFFFF20",
          },
        }}
      />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;