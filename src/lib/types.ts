export type UserRole = 'patient' | 'practitioner' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  lastLogin: string;
};

export type Patient = User & {
  role: 'patient';
  medicalHistory: string;
  symptoms: string;
  currentTherapies: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
};

export type Practitioner = User & {
  role: 'practitioner';
  specialty: string;
};

export type Admin = User & {
  role: 'admin';
};

export type AppUser = {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: UserRole;
}

export type Appointment = {
  id: string;
  patientUid: string;
  practitionerId: string;
  date: string;
  time: string;
  therapyType: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
};

export type Notification = {
  id: string;
  patientUid: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
};

export type TherapyProgress = {
  month: string;
  painLevel: number;
  mobilityScore: number;
  wellbeing: number;
};
