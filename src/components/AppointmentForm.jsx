import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addAppointment } from '../firebase/appointments';
import { CalendarCheck, User, Phone, Hash, UserRound, Calendar, Clock, FileText, Loader2 } from 'lucide-react';

import { doctorsData } from '../data/doctors';

const doctors = doctorsData.map(doc => `${doc.name} — ${doc.specialty}`);
const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM',
];

const initialForm = {
  patientName: '',
  phoneNumber: '',
  age: '',
  doctorName: '',
  appointmentDate: '',
  appointmentTime: '',
  problem: '',
};

export default function AppointmentForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.patientName.trim()) errs.patientName = 'Patient name is required';
    if (!/^[6-9]\d{9}$/.test(form.phoneNumber)) errs.phoneNumber = 'Enter valid 10-digit phone number';
    if (!form.age || form.age < 1 || form.age > 120) errs.age = 'Enter valid age (1-120)';
    if (!form.doctorName) errs.doctorName = 'Please select a doctor';
    if (!form.appointmentDate) errs.appointmentDate = 'Select appointment date';
    else {
      const selected = new Date(form.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) errs.appointmentDate = 'Date cannot be in the past';
    }
    if (!form.appointmentTime) errs.appointmentTime = 'Select appointment time';
    if (!form.problem.trim() || form.problem.trim().length < 10)
      errs.problem = 'Describe your problem (minimum 10 characters)';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fix the errors below');
      return;
    }

    setLoading(true);
    const result = await addAppointment(form);
    setLoading(false);

    if (result.success) {
      toast.success('🎉 Appointment booked successfully! We will confirm shortly.');
      setForm(initialForm);
      setTimeout(() => navigate('/'), 2000);
    } else {
      toast.error('Failed: ' + (result.error || 'Unknown error'));
      console.error('Booking failed:', result.error);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const fields = [
    {
      name: 'patientName', label: 'Patient Full Name', type: 'text',
      placeholder: 'e.g. Rahul Sharma', icon: User, colSpan: 'col-span-2',
    },
    {
      name: 'phoneNumber', label: 'Phone Number', type: 'tel',
      placeholder: 'e.g. 9876543210', icon: Phone, colSpan: '',
    },
    {
      name: 'age', label: 'Age', type: 'number',
      placeholder: 'e.g. 28', icon: Hash, colSpan: '',
    },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Personal Details */}
      <div>
        <h3 className="font-headline font-bold text-textPrimary text-lg mb-4 flex items-center gap-2">
          <User size={18} className="text-primary" />
          Personal Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className={field.colSpan}>
              <label className="block text-sm font-medium text-textPrimary mb-1.5">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <field.icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  min={field.name === 'age' ? 1 : undefined}
                  max={field.name === 'age' ? 120 : undefined}
                  className={`input-field pl-10 ${errors[field.name] ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                />
              </div>
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Details */}
      <div>
        <h3 className="font-headline font-bold text-textPrimary text-lg mb-4 flex items-center gap-2">
          <CalendarCheck size={18} className="text-primary" />
          Appointment Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Doctor */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-textPrimary mb-1.5">
              Select Doctor <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="doctorName"
                value={form.doctorName}
                onChange={handleChange}
                className={`input-field pl-10 appearance-none ${errors.doctorName ? 'border-red-400 ring-2 ring-red-100' : ''}`}
              >
                <option value="">-- Select Doctor --</option>
                {doctors.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            {errors.doctorName && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.doctorName}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1.5">
              Appointment Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="appointmentDate"
                value={form.appointmentDate}
                onChange={handleChange}
                min={today}
                className={`input-field pl-10 ${errors.appointmentDate ? 'border-red-400 ring-2 ring-red-100' : ''}`}
              />
            </div>
            {errors.appointmentDate && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.appointmentDate}</p>}
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1.5">
              Preferred Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="appointmentTime"
                value={form.appointmentTime}
                onChange={handleChange}
                className={`input-field pl-10 appearance-none ${errors.appointmentTime ? 'border-red-400 ring-2 ring-red-100' : ''}`}
              >
                <option value="">-- Select Time --</option>
                {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {errors.appointmentTime && <p className="text-red-500 text-xs mt-1.5">⚠ {errors.appointmentTime}</p>}
          </div>
        </div>
      </div>

      {/* Problem */}
      <div>
        <label className="block text-sm font-medium text-textPrimary mb-1.5 flex items-center gap-2">
          <FileText size={16} className="text-primary" />
          Describe Your Problem <span className="text-red-500">*</span>
        </label>
        <textarea
          name="problem"
          value={form.problem}
          onChange={handleChange}
          rows={4}
          placeholder="Please describe your symptoms, medical history, or reason for the visit (minimum 10 characters)..."
          className={`input-field resize-none ${errors.problem ? 'border-red-400 ring-2 ring-red-100' : ''}`}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.problem
            ? <p className="text-red-500 text-xs">⚠ {errors.problem}</p>
            : <span />}
          <span className={`text-xs ${form.problem.length < 10 ? 'text-gray-400' : 'text-secondary'}`}>
            {form.problem.length}/500
          </span>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full btn-secondary py-4 text-base flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Booking your appointment...
          </>
        ) : (
          <>
            <CalendarCheck size={20} />
            Book Appointment Now
          </>
        )}
      </motion.button>

      <p className="text-center text-textSecondary text-xs">
        🔒 Your information is secure and will only be used for appointment purposes.
        We'll confirm your appointment within 24 hours.
      </p>
    </form>
  );
}
