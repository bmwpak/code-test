import { useState, type FormEvent } from "react";
import { Mail, Phone, Lock, User, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface ErrorsState {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

const FormPage = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorsState>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): ErrorsState => {
    const err: ErrorsState = {};

    if (!form.name.trim()) err.name = "Full name is required";
    if (!form.email.trim()) {
      err.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = "Please enter a valid email address";
    }
    
    // Basic phone validation just checking if it exists and has some length
    if (!form.phone.trim()) {
      err.phone = "Phone number is required";
    } else if (form.phone.trim().length < 7) {
      err.phone = "Please enter a valid phone number";
    }
    
    if (!form.password) {
      err.password = "Password is required";
    } else if (form.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    return err;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
      }, 1000);
    }
  };

  if (success) {
    return (
      <div className="flex-1 w-full flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-xl shadow-indigo-500/5 border border-slate-100 text-center transform transition-all animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Registration Complete!</h2>
          <p className="text-slate-500 mb-8 max-w-[280px] mx-auto">
            Thank you, {form.name.split(' ')[0]}. Your account has been successfully created.
          </p>
          <button 
            onClick={() => {
              setSuccess(false);
              setForm({ name: "", email: "", phone: "", password: "" });
            }}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Register Another User
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex items-center justify-center p-4 py-12">
      <div className="bg-white max-w-md w-full rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="mb-8 text-center text-left">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h2>
          <p className="text-slate-500 text-sm mt-1">Please fill in your details to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Full Name</label>
            <div className="relative relative-group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className={cn("h-5 w-5 transition-colors", errors.name ? "text-red-400" : "text-slate-400")} />
              </div>
              <input
                type="text"
                placeholder="John Doe"
                className={cn(
                  "block w-full pl-11 pr-3 py-3 border rounded-xl sm:text-sm transition-all focus:outline-none focus:ring-2",
                  errors.name 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30" 
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-slate-50/50"
                )}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 ml-1 flex items-center text-sm text-red-500 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className={cn("h-5 w-5 transition-colors", errors.email ? "text-red-400" : "text-slate-400")} />
              </div>
              <input
                type="email"
                placeholder="john@example.com"
                className={cn(
                  "block w-full pl-11 pr-3 py-3 border rounded-xl sm:text-sm transition-all focus:outline-none focus:ring-2",
                  errors.email 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30" 
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-slate-50/50"
                )}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 ml-1 flex items-center text-sm text-red-500 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Phone className={cn("h-5 w-5 transition-colors", errors.phone ? "text-red-400" : "text-slate-400")} />
              </div>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className={cn(
                  "block w-full pl-11 pr-3 py-3 border rounded-xl sm:text-sm transition-all focus:outline-none focus:ring-2",
                  errors.phone 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30" 
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-slate-50/50"
                )}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            {errors.phone && (
              <p className="mt-1.5 ml-1 flex items-center text-sm text-red-500 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className={cn("h-5 w-5 transition-colors", errors.password ? "text-red-400" : "text-slate-400")} />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className={cn(
                  "block w-full pl-11 pr-3 py-3 border rounded-xl sm:text-sm transition-all focus:outline-none focus:ring-2",
                  errors.password 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/30" 
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 bg-slate-50/50"
                )}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            {errors.password && (
              <p className="mt-1.5 ml-1 flex items-center text-sm text-red-500 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl mt-6 transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;