/**
 * Avatar Animation States
 * Defines all possible avatar gestures and their animations
 */

export type AvatarState = 
  | 'idle'
  | 'wave'
  | 'pointLeft'
  | 'leanForward'
  | 'thumbsUp'
  | 'thinking'
  | 'slideIn';

export interface AvatarMessage {
  text: string;
  duration?: number; // milliseconds
}

export interface SectionConfig {
  id: string;
  state: AvatarState;
  message: string;
  messageDuration?: number;
}

// Animation configurations for each state
export const avatarAnimations = {
  idle: {
    y: [0, -5, 0],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  
  wave: {
    rotate: [0, 15, -10, 15, -10, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut'
    }
  },
  
  pointLeft: {
    x: [-5, -15, -10],
    rotate: [-5, -10, -8],
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  },
  
  leanForward: {
    scale: [1, 1.05, 1.02],
    y: [0, -10, -5],
    transition: {
      duration: 0.6,
      ease: 'easeInOut'
    }
  },
  
  thumbsUp: {
    scale: [1, 1.15, 1.1],
    rotate: [0, 5, 0],
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
  
  thinking: {
    rotate: [0, 3, -3, 0],
    y: [0, -3, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  
  slideIn: {
    x: [300, 0],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeOut'
    }
  }
};

// Section configurations for scroll-based triggers
export const sectionConfigs: SectionConfig[] = [
  {
    id: 'hero',
    state: 'wave',
    message: "Welcome! I'll guide you through everything — just scroll 😊",
    messageDuration: 5000
  },
  {
    id: 'overview',
    state: 'pointLeft',
    message: "This platform helps patients book appointments, consult doctors, and manage healthcare easily.",
    messageDuration: 6000
  },
  {
    id: 'pages',
    state: 'pointLeft',
    message: "These are our key pages — quick, simple, and senior-friendly.",
    messageDuration: 5000
  },
  {
    id: 'features',
    state: 'leanForward',
    message: "These features are designed to save time and reduce confusion.",
    messageDuration: 6000
  },
  {
    id: 'how-it-works',
    state: 'pointLeft',
    message: "Let me show you how simple it is to book an appointment.",
    messageDuration: 6000
  },
  {
    id: 'trust',
    state: 'thumbsUp',
    message: "Your privacy and security are our top priorities.",
    messageDuration: 5000
  },
  {
    id: 'cta',
    state: 'wave',
    message: "Ready to get started? Book your appointment now!",
    messageDuration: 5000
  }
];
