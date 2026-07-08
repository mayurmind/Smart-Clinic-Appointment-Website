import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../firebase/auth';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Stethoscope, Mail, Lock, Loader2, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  if (user) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please enter email and password');
      return;
    }
    setLoading(true);
    const result = await loginAdmin(form.email, form.password);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome back, Admin!');
      navigate('/admin/dashboard');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4 py-20">
      {/* Background blobs */}
      <div className="hero-blob w-72 h-72 bg-blue-400" style={{ top: '5%', left: '5%' }} />
      <div className="hero-blob w-64 h-64 bg-cyan-400" style={{ bottom: '10%', right: '5%', animationDelay: '4s' }} />

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 sm:top-10 sm:left-10 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium text-sm sm:text-base">Back to Home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-button">
            <Stethoscope size={28} className="text-white" />
          </div>
          <h1 className="font-headline font-bold text-2xl text-textPrimary">Admin Login</h1>
          <p className="text-textSecondary text-sm mt-1">SmartCare Clinic Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@smartcare.clinic"
                className="input-field pl-10"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field pl-10 pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-textPrimary transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                Sign In to Dashboard
              </>
            )}
          </motion.button>
        </form>

        {/* Security note */}
        <div className="mt-6 p-3 bg-blue-50 rounded-xl">
          <p className="text-xs text-blue-700 text-center flex items-center justify-center gap-1">
            <ShieldCheck size={13} />
            This area is restricted to authorized clinic staff only.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
