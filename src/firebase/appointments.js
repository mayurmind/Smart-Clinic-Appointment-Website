import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config";

const COLLECTION = "appointments";

/**
 * Add a new appointment to Firestore
 * @param {Object} data - Appointment data
 */
export const addAppointment = async (data) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      patientName: data.patientName,
      phoneNumber: data.phoneNumber,
      age: data.age,
      gender: data.gender,
      doctorName: data.doctorName,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      problem: data.problem,
      status: "Pending",
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding appointment:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all appointments ordered by creation date (newest first)
 */
export const getAllAppointments = async () => {
  try {
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((docSnap) => {
      appointments.push({ id: docSnap.id, ...docSnap.data() });
    });
    return { success: true, data: appointments };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Update appointment status
 * @param {string} id - Document ID
 * @param {string} status - New status: "Pending" | "Confirmed" | "Completed"
 */
export const updateAppointmentStatus = async (id, status) => {
  try {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, { status });
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete appointment
 * @param {string} id - Document ID
 */
export const deleteAppointment = async (id) => {
  try {
    const docRef = doc(db, COLLECTION, id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return { success: false, error: error.message };
  }
};
