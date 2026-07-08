import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getAllAppointments, updateAppointmentStatus } from '../firebase/appointments';
import { logoutAdmin } from '../firebase/auth';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  Stethoscope, LogOut, RefreshCw, Search,
  Users, Clock, CheckCircle, Calendar, Filter, Loader2
} from 'lucide-react';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Completed'];

const STATUS_STYLES = {
  Pending: 'status-pending',
  Confirmed: 'status-confirmed',
  Completed: 'status-completed',
};

const STATUS_ICONS = {
  Pending: '⏳',
  Confirmed: '✅',
  Completed: '🏁',
};

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchAppointments();
  }, [user]);

  useEffect(() => {
    let result = appointments;
    if (filterStatus !== 'All') {
      result = result.filter((a) => a.status === filterStatus);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.patientName?.toLowerCase().includes(q) ||
          a.phoneNumber?.includes(q) ||
          a.problem?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [appointments, filterStatus, searchQuery]);

  const fetchAppointments = async () => {
    setLoading(true);
    const result = await getAllAppointments();
    setLoading(false);
    if (result.success) {
      setAppointments(result.data);
    } else {
      toast.error('Failed to load appointments');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    const result = await updateAppointmentStatus(id, newStatus);
    setUpdatingId(null);
    if (result.success) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      toast.success(`Status updated to ${newStatus}`);
    } else {
      toast.error('Failed to update status');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'Pending').length,
    confirmed: appointments.filter((a) => a.status === 'Confirmed').length,
    completed: appointments.filter((a) => a.status === 'Completed').length,
  };

  const formatDate = (ts) => {
    if (!ts) return '—';
    if (typeof ts === 'string') return ts;
    if (ts.seconds) return new Date(ts.seconds * 1000).toLocaleDateString('en-IN');
    return '—';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-primary-900 text-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <Stethoscope size={18} className="text-primary" />
            </div>
            <div>
              <span className="font-headline font-bold text-base">SmartCare Admin</span>
              <p className="text-blue-300 text-xs">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAppointments}
              className="flex items-center gap-1.5 text-sm text-blue-200 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-headline font-bold text-2xl text-textPrimary">Appointment Management</h1>
          <p className="text-textSecondary text-sm mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Appointments', value: stats.total, icon: Calendar, color: 'bg-primary text-white', iconBg: 'bg-white/20' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-yellow-500 text-white', iconBg: 'bg-white/20' },
            { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'bg-blue-600 text-white', iconBg: 'bg-white/20' },
            { label: 'Completed', value: stats.completed, icon: Users, color: 'bg-secondary text-white', iconBg: 'bg-white/20' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${stat.color} rounded-xl p-5 flex items-center gap-4`}
            >
              <div className={`${stat.iconBg} w-11 h-11 rounded-xl flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">{stat.value}</p>
                <p className="text-xs opacity-80 mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table Card */}
        <div className="card overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 text-sm"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field pl-10 pr-8 text-sm appearance-none min-w-[150px]"
              >
                <option value="All">All Status</option>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={32} className="animate-spin text-primary" />
                <p className="text-textSecondary text-sm">Loading appointments...</p>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="font-headline font-bold text-textPrimary mb-1">No Appointments Found</h3>
              <p className="text-textSecondary text-sm">
                {appointments.length === 0
                  ? 'No appointments have been booked yet.'
                  : 'No appointments match your current filters.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-textSecondary font-medium">
                    {['Patient', 'Phone', 'Age', 'Doctor', 'Date', 'Time', 'Problem', 'Status', 'Update'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((appt, i) => (
                    <motion.tr
                      key={appt.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-primary-50/30 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 font-medium text-textPrimary whitespace-nowrap">{appt.patientName}</td>
                      <td className="px-4 py-3 text-textSecondary">{appt.phoneNumber}</td>
                      <td className="px-4 py-3 text-textSecondary">{appt.age}</td>
                      <td className="px-4 py-3 text-textSecondary max-w-[120px] truncate">{appt.doctorName?.split('—')[0]?.trim()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-textSecondary">{appt.appointmentDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-textSecondary">{appt.appointmentTime}</td>
                      <td className="px-4 py-3 max-w-[150px] truncate text-textSecondary" title={appt.problem}>{appt.problem}</td>
                      <td className="px-4 py-3">
                        <span className={STATUS_STYLES[appt.status] || 'status-pending'}>
                          {STATUS_ICONS[appt.status]} {appt.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {updatingId === appt.id ? (
                          <Loader2 size={16} className="animate-spin text-primary" />
                        ) : (
                          <select
                            value={appt.status}
                            onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white cursor-pointer"
                          >
                            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          {!loading && filtered.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-textSecondary">
              Showing {filtered.length} of {appointments.length} appointments
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
