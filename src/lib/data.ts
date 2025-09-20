import { Patient, Practitioner, Admin, Appointment, Notification, TherapyProgress } from './types';

export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'patient',
    avatar: 'https://picsum.photos/seed/avatar1/200/200',
    lastLogin: '2024-05-20T10:00:00Z',
    medicalHistory: 'Hypertension, Type 2 Diabetes',
    symptoms: 'Chronic back pain',
    currentTherapies: 'Metformin, Lisinopril',
    dob: '1978-05-14',
    gender: 'Female',
  },
  {
    id: 'p2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    role: 'patient',
    avatar: 'https://picsum.photos/seed/avatar2/200/200',
    lastLogin: '2024-05-19T14:30:00Z',
    medicalHistory: 'Asthma',
    symptoms: 'Anxiety and stress',
    currentTherapies: 'Albuterol inhaler',
    dob: '1990-11-22',
    gender: 'Male',
  },
  {
    id: 'p3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'patient',
    avatar: 'https://picsum.photos/seed/avatar3/200/200',
    lastLogin: '2024-05-21T09:00:00Z',
    medicalHistory: 'None',
    symptoms: 'Insomnia',
    currentTherapies: 'None',
    dob: '1985-02-10',
    gender: 'Male',
  },
];

export const practitioners: Practitioner[] = [
  {
    id: 'pr1',
    name: 'Dr. Evelyn Reed',
    email: 'e.reed@ayursutra.com',
    role: 'practitioner',
    avatar: 'https://picsum.photos/seed/avatar4/200/200',
    lastLogin: '2024-05-21T11:00:00Z',
    specialty: 'Ayurvedic Medicine',
  },
  {
    id: 'pr2',
    name: 'Dr. Samuel Green',
    email: 's.green@ayursutra.com',
    role: 'practitioner',
    avatar: 'https://picsum.photos/seed/avatar5/200/200',
    lastLogin: '2024-05-20T17:00:00Z',
    specialty: 'Panchakarma Therapy',
  },
];

export const admins: Admin[] = [
  {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@ayursutra.com',
    role: 'admin',
    avatar: 'https://picsum.photos/seed/avatar6/200/200',
    lastLogin: '2024-05-21T12:00:00Z',
  },
];

export const appointments: Appointment[] = [
  {
    id: 'apt1',
    patientId: 'p1',
    practitionerId: 'pr1',
    date: '2024-06-15',
    time: '10:00 AM',
    therapyType: 'Abhyanga',
    status: 'Scheduled',
  },
  {
    id: 'apt2',
    patientId: 'p2',
    practitionerId: 'pr2',
    date: '2024-06-16',
    time: '02:00 PM',
    therapyType: 'Shirodhara',
    status: 'Scheduled',
  },
  {
    id: 'apt3',
    patientId: 'p1',
    practitionerId: 'pr1',
    date: '2024-05-18',
    time: '10:00 AM',
    therapyType: 'Abhyanga',
    status: 'Completed',
  },
  // Adding today's appointments for practitioner dashboard
  {
    id: 'apt4',
    patientId: 'p2',
    practitionerId: 'pr1',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    therapyType: 'Shirodhara',
    status: 'Scheduled',
  },
  {
    id: 'apt5',
    patientId: 'p3',
    practitionerId: 'pr1',
    date: new Date().toISOString().split('T')[0],
    time: '03:00 PM',
    therapyType: 'Panchakarma',
    status: 'Scheduled',
  },
];


export const notifications: Notification[] = [
  {
    id: 'n1',
    title: 'Pre-procedure: Abhyanga Session',
    description: 'Please avoid heavy meals at least 2 hours before your session. Stay hydrated.',
    date: '2024-06-12T10:00:00Z',
    read: false,
  },
  {
    id: 'n2',
    title: 'Post-procedure: Abhyanga Session',
    description: 'Rest for at least 30 minutes after your therapy. A warm shower is recommended.',
    date: '2024-05-18T11:00:00Z',
    read: true,
  },
  {
    id: 'n3',
    title: 'Appointment Reminder',
    description: 'Your Shirodhara session with Dr. Samuel Green is scheduled for tomorrow at 2:00 PM.',
    date: '2024-06-15T14:00:00Z',
    read: false,
  },
];

export const therapyProgressData: TherapyProgress[] = [
    { month: 'Jan', painLevel: 8, mobilityScore: 4, wellbeing: 3 },
    { month: 'Feb', painLevel: 7, mobilityScore: 5, wellbeing: 4 },
    { month: 'Mar', painLevel: 6, mobilityScore: 6, wellbeing: 6 },
    { month: 'Apr', painLevel: 4, mobilityScore: 7, wellbeing: 7 },
    { month: 'May', painLevel: 3, mobilityScore: 8, wellbeing: 8 },
    { month: 'Jun', painLevel: 2, mobilityScore: 9, wellbeing: 9 },
];

export const visitorData = [
  { date: 'Mon', total: 86, waiting: 10 },
  { date: 'Tue', total: 92, waiting: 15 },
  { date: 'Wed', total: 110, waiting: 8 },
  { date: 'Thu', total: 98, waiting: 12 },
  { date: 'Fri', total: 120, waiting: 5 },
  { date: 'Sat', total: 75, waiting: 3 },
];
