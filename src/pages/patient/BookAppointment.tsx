import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar as CalendarIcon, Search, Star, Clock, IndianRupee } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { mockDoctors, mockDepartments } from '../../utils/mockData';
import { addAppointment } from '../../utils/localStorage';
import { useAuth } from '../../contexts/AuthContext';

export const BookAppointment: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(
        (location.state as any)?.doctorId || null
    );
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const filteredDoctors = mockDoctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment === 'all' || doctor.department === selectedDepartment;
        return matchesSearch && matchesDepartment;
    });

    const handleBookAppointment = () => {
        if (!selectedDoctor || !selectedDate || !selectedTime) {
            alert('Please select a doctor, date, and time');
            return;
        }

        const doctor = mockDoctors.find(d => d.id === selectedDoctor);
        if (!doctor || !user) return;

        const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}`);

        const newAppointment = {
            id: `apt-${Date.now()}`,
            patientId: user.id,
            patientName: user.name,
            doctorId: doctor.id,
            doctorName: doctor.name,
            doctorSpecialization: doctor.specialization,
            department: doctor.department,
            dateTime: appointmentDateTime,
            duration: 30,
            status: 'scheduled' as const,
            priority: 'normal' as const,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        addAppointment(newAppointment);
        alert('Appointment booked successfully!');
        navigate('/patient/appointments');
    };

    // Generate time slots
    const timeSlots = [];
    for (let hour = 9; hour <= 17; hour++) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
        if (hour < 17) timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
                    <p className="text-gray-600">Find and schedule with our expert doctors</p>
                </div>

                {/* Filters */}
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="text"
                            placeholder="Search doctors or specializations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={<Search className="w-5 h-5" />}
                        />
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="all">All Departments</option>
                            {mockDepartments.map(dept => (
                                <option key={dept.id} value={dept.name}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                </Card>

                {/* Doctor List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredDoctors.map(doctor => (
                        <Card
                            key={doctor.id}
                            hover
                            className={`cursor-pointer ${selectedDoctor === doctor.id ? 'ring-2 ring-primary-500' : ''}`}
                            onClick={() => setSelectedDoctor(doctor.id)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xl">
                                    {doctor.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{doctor.specialization}</p>
                                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span>{doctor.rating.toFixed(1)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{doctor.experience} years</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <IndianRupee className="w-4 h-4" />
                                            <span>₹{doctor.consultationFee}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Appointment Details */}
                {selectedDoctor && (
                    <Card className="bg-primary-50 border-primary-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Appointment Date & Time</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                type="date"
                                label="Date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Time Slot</label>
                                <select
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="w-full px-4 py-2.5 min-h-[44px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    required
                                >
                                    <option value="">Select time</option>
                                    {timeSlots.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <Button fullWidth onClick={handleBookAppointment}>
                                <CalendarIcon className="w-5 h-5 mr-2" />
                                Confirm Booking
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </Layout>
    );
};
