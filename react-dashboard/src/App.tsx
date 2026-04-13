import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import FormPage from "./pages/FormPage";
import { LayoutDashboard, FileText } from "lucide-react";
import { cn } from "./lib/utils";

function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "form">("dashboard");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">AutoCenter</span>
          </div>
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                activeTab === "dashboard"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Inventory</span>
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                activeTab === "form"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <FileText size={18} />
              <span className="hidden sm:inline">Registration</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full flex">
        {activeTab === "dashboard" ? <Dashboard /> : <FormPage />}
      </main>
    </div>
  );
}

export default App;