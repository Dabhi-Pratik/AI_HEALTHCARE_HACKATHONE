import React, { useState } from 'react';
import { AlertCircle, Phone, MapPin } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface EmergencyButtonProps {
    onEmergencyRequest?: () => void;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onEmergencyRequest }) => {
    const [showModal, setShowModal] = useState(false);
    const [symptoms, setSymptoms] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmergencyClick = () => {
        setShowModal(true);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (onEmergencyRequest) {
            onEmergencyRequest();
        }

        setIsSubmitting(false);
        setShowModal(false);
        setSymptoms('');

        // Show success message
        alert('Emergency request submitted! A doctor will contact you shortly.');
    };

    return (
        <>
            {/* Fixed Emergency Button */}
            <button
                onClick={handleEmergencyClick}
                className="fixed bottom-6 right-6 z-40 bg-red-500 text-white rounded-full p-4 shadow-lg hover:bg-red-600 transition-all duration-200 emergency-pulse focus:outline-none focus:ring-4 focus:ring-red-300 min-w-[60px] min-h-[60px] flex items-center justify-center no-print"
                aria-label="Emergency - Click for immediate assistance"
                title="Emergency"
            >
                <AlertCircle className="w-7 h-7" />
            </button>

            {/* Emergency Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="🚨 Emergency Request"
                size="md"
            >
                <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800 font-medium flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            For life-threatening emergencies, call 911 immediately
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Describe your emergency <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="E.g., Severe chest pain, difficulty breathing..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px] text-base"
                            required
                        />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                        <h4 className="font-medium text-blue-900 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Emergency Contacts
                        </h4>
                        <p className="text-sm text-blue-800">
                            Hospital Emergency: <a href="tel:1-800-HOSPITAL" className="font-semibold underline">1-800-HOSPITAL</a>
                        </p>
                        <p className="text-sm text-blue-800 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Emergency entrance located at Ground Floor
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            fullWidth
                            onClick={() => setShowModal(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            fullWidth
                            onClick={handleSubmit}
                            disabled={!symptoms.trim() || isSubmitting}
                            loading={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Request Emergency Care'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
