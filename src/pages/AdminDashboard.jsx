import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getAllAppointments, updateAppointmentStatus, deleteAppointment, updateAppointment } from '../firebase/appointments';
import { logoutAdmin } from '../firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { doctorsData } from '../data/doctors';
import toast from 'react-hot-toast';
import {
  Stethoscope, LogOut, RefreshCw, Search,
  Users, Clock, CheckCircle, Calendar, Filter, Loader2, Trash2,
  Edit3, Printer, X, User, Phone, Hash, UserRound, FileText
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

const doctors = doctorsData.map(doc => `${doc.name} — ${doc.specialty}`);
const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM',
];

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);
  
  // Edit and Print state variables
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormErrors, setEditFormErrors] = useState({});
  const [printingAppointment, setPrintingAppointment] = useState(null);
  const [viewingAppointment, setViewingAppointment] = useState(null);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    
    // Initial fetch
    fetchAppointments();

    // Auto-refresh every 15 minutes
    const intervalId = setInterval(() => {
      fetchAppointments();
    }, 15 * 60 * 1000); // 15 minutes in milliseconds

    return () => clearInterval(intervalId);
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    
    setUpdatingId(id);
    const result = await deleteAppointment(id);
    setUpdatingId(null);
    if (result.success) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      toast.success('Appointment deleted successfully');
    } else {
      toast.error('Failed to delete appointment');
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleEditClick = (appt) => {
    setEditingAppointment({ ...appt });
    setEditFormErrors({});
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAppointment((prev) => ({ ...prev, [name]: value }));
    if (editFormErrors[name]) {
      setEditFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateEditForm = () => {
    const errs = {};
    if (!editingAppointment.patientName?.trim()) errs.patientName = 'Patient name is required';
    if (!/^[6-9]\d{9}$/.test(editingAppointment.phoneNumber)) errs.phoneNumber = 'Enter valid 10-digit phone number';
    if (!editingAppointment.age || editingAppointment.age < 1 || editingAppointment.age > 120) errs.age = 'Enter valid age (1-120)';
    if (!editingAppointment.gender) errs.gender = 'Select gender';
    if (!editingAppointment.doctorName) errs.doctorName = 'Please select a doctor';
    if (!editingAppointment.appointmentDate) errs.appointmentDate = 'Select appointment date';
    else {
      const selected = new Date(editingAppointment.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) errs.appointmentDate = 'Date cannot be in the past';
    }
    if (!editingAppointment.appointmentTime) errs.appointmentTime = 'Select appointment time';
    if (!editingAppointment.problem?.trim() || editingAppointment.problem.trim().length < 10)
      errs.problem = 'Describe your problem (minimum 10 characters)';
    return errs;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const errs = validateEditForm();
    if (Object.keys(errs).length > 0) {
      setEditFormErrors(errs);
      toast.error('Please fix the errors below');
      return;
    }

    setUpdatingId(editingAppointment.id);
    const { id, createdAt, ...updatedFields } = editingAppointment;
    const result = await updateAppointment(id, updatedFields);
    setUpdatingId(null);

    if (result.success) {
      toast.success('Appointment updated successfully');
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...editingAppointment } : a))
      );
      setIsEditModalOpen(false);
      setEditingAppointment(null);
    } else {
      toast.error('Failed to update: ' + (result.error || 'Unknown error'));
    }
  };

  const handlePrint = (appt) => {
    setPrintingAppointment(appt);
    setTimeout(() => {
      window.print();
    }, 150);
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
                    {['Patient', 'Phone', 'Age', 'Gender', 'Doctor', 'Date', 'Time', 'Problem', 'Status', 'Actions'].map((h) => (
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
                      <td 
                        className="px-4 py-3 font-semibold text-primary hover:text-primary-700 hover:underline cursor-pointer whitespace-nowrap"
                        onClick={() => setViewingAppointment(appt)}
                      >
                        {appt.patientName}
                      </td>
                      <td className="px-4 py-3 text-textSecondary">{appt.phoneNumber}</td>
                      <td className="px-4 py-3 text-textSecondary">{appt.age}</td>
                      <td className="px-4 py-3 text-textSecondary">{appt.gender}</td>
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
                        <div className="flex items-center gap-2">
                          {updatingId === appt.id ? (
                            <Loader2 size={16} className="animate-spin text-primary" />
                          ) : (
                            <>
                              <select
                                value={appt.status}
                                onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white cursor-pointer"
                              >
                                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                              </select>
                              <button
                                onClick={() => handleEditClick(appt)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit Appointment"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => handlePrint(appt)}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Print Slip / PDF"
                              >
                                <Printer size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(appt.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Appointment"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
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

      {/* Edit Appointment Modal */}
      {isEditModalOpen && editingAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl my-8 relative text-left"
          >
            {/* Modal Close Button */}
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingAppointment(null);
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-textPrimary hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary">
                <Edit3 size={20} />
              </div>
              <div>
                <h3 className="font-headline font-bold text-xl text-textPrimary">Edit Appointment</h3>
                <p className="text-textSecondary text-xs">Update details for appointment ID: {editingAppointment.id}</p>
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Patient Name */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5 uppercase tracking-wider">Patient Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="patientName"
                      value={editingAppointment.patientName || ''}
                      onChange={handleEditChange}
                      className={`input-field pl-10 text-sm ${editFormErrors.patientName ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                    />
                  </div>
                  {editFormErrors.patientName && <p className="text-red-500 text-xs mt-1">⚠ {editFormErrors.patientName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editingAppointment.phoneNumber || ''}
                      onChange={handleEditChange}
                      className={`input-field pl-10 text-sm ${editFormErrors.phoneNumber ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                    />
                  </div>
                  {editFormErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">⚠ {editFormErrors.phoneNumber}</p>}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5 uppercase tracking-wider">Age</label>
                  <div className="relative">
                    <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="age"
                      value={editingAppointment.age || ''}
                      onChange={handleEditChange}
                      className={`input-field pl-10 text-sm ${editFormErrors.age ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                    />
                  </div>
                  {editFormErrors.age && <p className="text-red-500 text-xs mt-1">⚠ {editFormErrors.age}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5 uppercase tracking-wider">Gender</label>
                  <div className="relative">
                    <UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="gender"
                      value={editingAppointment.gender || ''}
                      onChange={handleEditChange}
                      className={`input-field pl-10 text-sm appearance-none ${editFormErrors.gender ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {editFormErrors.gender && <p className="text-red-500 text-xs mt-1">⚠ {editFormErrors.gender}</p>}
                </div>

                {/* Doctor */}
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5 uppercase tracking-wider">Doctor</label>
                  <div className="relative">
                    <UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="doctorName"
                      value={editingAppointment.doctorName || ''}
                      onChange={handleEditChange}
                      className={`input-field pl-10 text-sm appearance-none ${editFormErrors.doctorName ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  {editFormErrors.doctorName && <p className="text-red-500 text-xs mt-1">⚠ {editFormErrors.doctorName}</p>}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5 uppercase tracking-wider">Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="appointmentDate"
                      value={editingAppointment.appointmentDate || ''}
                      onChange={handleEditChange}
                      className={`input-field pl-10 text-sm ${editFormErrors.appointmentDate ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                    />
                  </div>
                  {editFormErrors.appointmentDate && <p className="text-red-500 text-xs mt-1">⚠ {editFormErrors.appointmentDate}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5 uppercase tracking-wider">Time</label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="appointmentTime"
                      value={editingAppointment.appointmentTime || ''}
                      onChange={handleEditChange}
                      className={`input-field pl-10 text-sm appearance-none ${editFormErrors.appointmentTime ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map((ts) => <option key={ts} value={ts}>{ts}</option>)}
                    </select>
                  </div>
                  {editFormErrors.appointmentTime && <p className="text-red-500 text-xs mt-1">⚠ {editFormErrors.appointmentTime}</p>}
                </div>

                {/* Status */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5 uppercase tracking-wider">Status</label>
                  <div className="relative">
                    <CheckCircle size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      name="status"
                      value={editingAppointment.status || 'Pending'}
                      onChange={handleEditChange}
                      className="input-field pl-10 text-sm appearance-none cursor-pointer"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Problem */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs font-semibold text-textPrimary mb-1.5 uppercase tracking-wider">Symptoms / Problem</label>
                  <div className="relative">
                    <FileText size={16} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="problem"
                      rows={3}
                      value={editingAppointment.problem || ''}
                      onChange={handleEditChange}
                      className={`input-field pl-10 text-sm resize-none ${editFormErrors.problem ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                    />
                  </div>
                  {editFormErrors.problem && <p className="text-red-500 text-xs mt-1">⚠ {editFormErrors.problem}</p>}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingAppointment(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingId !== null}
                  className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2"
                >
                  {updatingId !== null ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Print Slip (Only visible during print) */}
      {printingAppointment && (
        <div id="print-receipt" className="hidden print:block font-sans">
          <div className="border-4 border-double border-gray-300 p-6 rounded-2xl max-w-2xl mx-auto bg-white text-left">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b-2 border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  🏥
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-primary-900">SMARTCARE CLINIC</h1>
                  <p className="text-xs text-textSecondary">Your Health, Our Priority</p>
                </div>
              </div>
              <div className="text-right text-xs text-textSecondary">
                <p className="font-semibold">SmartCare Center</p>
                <p>123 Health Street, City</p>
                <p>Tel: 108 | Support: info@smartcare.clinic</p>
              </div>
            </div>

            {/* Slip Title */}
            <div className="text-center py-4 bg-gray-50 rounded-xl my-6">
              <h2 className="text-lg font-bold uppercase tracking-wider text-textPrimary">Appointment Slip</h2>
              <p className="text-xs text-textSecondary mt-0.5">Appointment ID: <span className="font-mono text-textPrimary font-semibold">{printingAppointment.id}</span></p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm mb-6">
              <div>
                <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider">Patient Name</span>
                <span className="font-semibold text-textPrimary text-base">{printingAppointment.patientName}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider">Phone Number</span>
                <span className="font-semibold text-textPrimary text-base">{printingAppointment.phoneNumber}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider">Age / Gender</span>
                <span className="font-semibold text-textPrimary text-base">{printingAppointment.age} Yrs / {printingAppointment.gender}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider">Doctor Assigned</span>
                <span className="font-semibold text-textPrimary text-base">{printingAppointment.doctorName?.split('—')[0]?.trim()}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider">Appointment Date</span>
                <span className="font-semibold text-textPrimary text-base">{printingAppointment.appointmentDate}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider">Preferred Time</span>
                <span className="font-semibold text-textPrimary text-base">{printingAppointment.appointmentTime}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider">Current Status</span>
                <span className={`inline-block font-bold text-xs uppercase px-2.5 py-0.5 rounded-full mt-1 bg-blue-100 text-blue-800`}>
                  {printingAppointment.status}
                </span>
              </div>
            </div>

            <hr className="my-6 border-gray-200" />

            {/* Problem Description */}
            <div className="text-sm mb-8">
              <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider mb-2">Reported Symptoms / Problem</span>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl leading-relaxed text-textPrimary">
                {printingAppointment.problem}
              </div>
            </div>

            {/* Footnote */}
            <div className="text-[10px] text-textSecondary text-center border-t border-gray-100 pt-6 mt-6 flex justify-between items-center">
              <p>Printed on: {new Date().toLocaleString('en-IN')}</p>
              <div className="text-right">
                <div className="h-8 w-24 border-b border-gray-300 mx-auto"></div>
                <p className="mt-1 font-semibold">Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Appointment Details Modal */}
      {viewingAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl my-8 relative text-left"
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setViewingAppointment(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-textPrimary hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-headline font-bold text-xl text-textPrimary">Appointment Details</h3>
                <p className="text-textSecondary text-xs">Appointment ID: {viewingAppointment.id}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Status Banner */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-sm font-medium text-textSecondary">Current Status</span>
                <span className={STATUS_STYLES[viewingAppointment.status] || 'status-pending'}>
                  {STATUS_ICONS[viewingAppointment.status]} {viewingAppointment.status}
                </span>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-primary-50/30 rounded-xl border border-primary-50">
                  <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider mb-1">Patient Name</span>
                  <span className="font-bold text-textPrimary text-base">{viewingAppointment.patientName}</span>
                </div>
                <div className="p-4 bg-primary-50/30 rounded-xl border border-primary-50">
                  <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider mb-1">Phone Number</span>
                  <span className="font-bold text-textPrimary text-base">{viewingAppointment.phoneNumber}</span>
                </div>
                <div className="p-4 bg-primary-50/30 rounded-xl border border-primary-50">
                  <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider mb-1">Age / Gender</span>
                  <span className="font-bold text-textPrimary text-base">{viewingAppointment.age} Yrs / {viewingAppointment.gender}</span>
                </div>
                <div className="p-4 bg-primary-50/30 rounded-xl border border-primary-50">
                  <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider mb-1">Assigned Doctor</span>
                  <span className="font-bold text-textPrimary text-base">{viewingAppointment.doctorName}</span>
                </div>
                <div className="p-4 bg-primary-50/30 rounded-xl border border-primary-50">
                  <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider mb-1">Appointment Date</span>
                  <span className="font-bold text-textPrimary text-base">{viewingAppointment.appointmentDate}</span>
                </div>
                <div className="p-4 bg-primary-50/30 rounded-xl border border-primary-50">
                  <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider mb-1">Appointment Time</span>
                  <span className="font-bold text-textPrimary text-base">{viewingAppointment.appointmentTime}</span>
                </div>
              </div>

              {/* Symptoms / Description */}
              <div>
                <span className="block text-[10px] uppercase text-textSecondary font-bold tracking-wider mb-2">Reported Symptoms / Problem Description</span>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl leading-relaxed text-textPrimary text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {viewingAppointment.problem}
                </div>
              </div>

              {/* Footer / Meta info */}
              {viewingAppointment.createdAt && (
                <div className="text-xs text-textSecondary italic text-right">
                  Booked on: {formatDate(viewingAppointment.createdAt)}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setViewingAppointment(null);
                    handlePrint(viewingAppointment);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Printer size={16} />
                  Print Slip
                </button>
                <button
                  onClick={() => {
                    setViewingAppointment(null);
                    handleEditClick(viewingAppointment);
                  }}
                  className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2"
                >
                  <Edit3 size={16} />
                  Edit Appointment
                </button>
                <button
                  onClick={() => setViewingAppointment(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-textPrimary text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
