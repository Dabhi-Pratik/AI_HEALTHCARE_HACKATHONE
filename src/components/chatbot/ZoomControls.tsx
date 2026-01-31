import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useChatbot } from '../../contexts/ChatbotContext';

export const ZoomControls: React.FC = () => {
    const { preferences, setZoomLevel } = useChatbot();
    const { zoomLevel } = preferences;

    const handleZoomIn = () => {
        setZoomLevel(zoomLevel + 10);
    };

    const handleZoomOut = () => {
        setZoomLevel(zoomLevel - 10);
    };

    const handleReset = () => {
        setZoomLevel(100);
    };

    const canZoomIn = zoomLevel < 150;
    const canZoomOut = zoomLevel > 80;

    return (
        <div className="zoom-controls" role="group" aria-label="Zoom controls">
            <button
                className="zoom-button"
                onClick={handleZoomOut}
                disabled={!canZoomOut}
                aria-label={`Zoom out (current: ${zoomLevel}%)`}
                title="Zoom Out (Ctrl + -)"
            >
                <ZoomOut className="w-4 h-4" />
            </button>

            <div className="zoom-level-display" aria-live="polite">
                {zoomLevel}%
            </div>

            <button
                className="zoom-button"
                onClick={handleReset}
                aria-label="Reset zoom to 100%"
                title="Reset Zoom"
            >
                <RotateCcw className="w-4 h-4" />
            </button>

            <button
                className="zoom-button"
                onClick={handleZoomIn}
                disabled={!canZoomIn}
                aria-label={`Zoom in (current: ${zoomLevel}%)`}
                title="Zoom In (Ctrl + +)"
            >
                <ZoomIn className="w-4 h-4" />
            </button>
        </div>
    );
};
