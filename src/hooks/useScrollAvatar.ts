import { useState, useEffect, useRef } from 'react';
import type { AvatarState, SectionConfig } from '../components/Avatar/AvatarStates';

interface UseScrollAvatarOptions {
    sections: SectionConfig[];
    defaultState?: AvatarState;
}

interface ScrollAvatarState {
    state: AvatarState;
    message: string;
    activeSection: string | null;
}

export const useScrollAvatar = ({
    sections,
    defaultState = 'idle'
}: UseScrollAvatarOptions): ScrollAvatarState => {
    const [avatarState, setAvatarState] = useState<ScrollAvatarState>({
        state: 'slideIn',
        message: '',
        activeSection: null
    });

    const observerRef = useRef<IntersectionObserver | null>(null);
    const messageTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const slideInTimer = setTimeout(() => {
            setAvatarState(prev => ({
                ...prev,
                state: defaultState
            }));
        }, 1000);

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        const config = sections.find(s => s.id === sectionId);

                        if (config) {
                            if (messageTimeoutRef.current) {
                                clearTimeout(messageTimeoutRef.current);
                            }

                            setAvatarState({
                                state: config.state,
                                message: config.message,
                                activeSection: sectionId
                            });

                            messageTimeoutRef.current = window.setTimeout(() => {
                                setAvatarState(prev => ({
                                    ...prev,
                                    state: defaultState,
                                    message: ''
                                }));
                            }, config.messageDuration || 5000);
                        }
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: '-100px 0px'
            }
        );

        sections.forEach(config => {
            const element = document.getElementById(config.id);
            if (element && observerRef.current) {
                observerRef.current.observe(element);
            }
        });

        return () => {
            clearTimeout(slideInTimer);
            if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current);
            }
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [sections, defaultState]);

    return avatarState;
};
