/**
 * Comprehensive Emergency Detection for SmartCare AI
 * Covers all major life-threatening medical conditions
 */

export function getMockChatbotResponse(message: string): string {
    const messageLower = message.toLowerCase();

    // ========== CRITICAL EMERGENCY DETECTION (HIGHEST PRIORITY) ==========

    // 🚨 STROKE SYMPTOMS (FAST - Face, Arms, Speech, Time)
    if (messageLower.includes('one side') ||
        messageLower.includes('face droop') ||
        messageLower.includes('slurred speech') ||
        messageLower.includes('difficulty speaking') ||
        messageLower.includes('cannot speak') ||
        messageLower.includes('arm weakness') ||
        messageLower.includes('leg weakness') ||
        messageLower.includes('numbness on one side') ||
        (messageLower.includes('weak') && messageLower.includes('side')) ||
        (messageLower.includes('numb') && messageLower.includes('side'))) {
        return "I'm really concerned about what you've shared.\n\nSudden weakness on one side of the body can be a medical emergency.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 HEART ATTACK SYMPTOMS
    if ((messageLower.includes('chest') && (messageLower.includes('pain') || messageLower.includes('pressure') || messageLower.includes('tight') || messageLower.includes('squeezing'))) ||
        (messageLower.includes('chest') && messageLower.includes('heavy')) ||
        (messageLower.includes('pain') && (messageLower.includes('arm') || messageLower.includes('jaw') || messageLower.includes('shoulder')) && (messageLower.includes('chest') || messageLower.includes('heart')))) {
        return "I'm really concerned about what you've shared.\n\nChest pain can be a medical emergency.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 SEVERE BREATHING DIFFICULTY / RESPIRATORY EMERGENCY
    if (messageLower.includes('cannot breathe') ||
        messageLower.includes('can\'t breathe') ||
        messageLower.includes('trouble breathing') ||
        messageLower.includes('gasping for air') ||
        messageLower.includes('choking') ||
        messageLower.includes('turning blue') ||
        (messageLower.includes('severe') && messageLower.includes('breath')) ||
        (messageLower.includes('hard') && messageLower.includes('breathe'))) {
        return "I'm really concerned about what you've shared.\n\nSevere breathing difficulty can be a medical emergency.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 SEVERE ALLERGIC REACTION (Anaphylaxis)
    if ((messageLower.includes('swelling') && (messageLower.includes('throat') || messageLower.includes('tongue') || messageLower.includes('face'))) ||
        (messageLower.includes('allergic') && (messageLower.includes('severe') || messageLower.includes('reaction'))) ||
        messageLower.includes('anaphylaxis') ||
        (messageLower.includes('hives') && messageLower.includes('breathing'))) {
        return "I'm really concerned about what you've shared.\n\nSevere allergic reactions can be a medical emergency.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 LOSS OF CONSCIOUSNESS
    if (messageLower.includes('fainted') ||
        messageLower.includes('passed out') ||
        messageLower.includes('unconscious') ||
        messageLower.includes('blacked out') ||
        messageLower.includes('collapsed')) {
        return "I'm really concerned about what you've shared.\n\nLoss of consciousness can be a medical emergency.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 SEIZURE
    if (messageLower.includes('seizure') ||
        messageLower.includes('convulsion') ||
        messageLower.includes('fitting') ||
        (messageLower.includes('shaking') && messageLower.includes('uncontrol'))) {
        return "I'm really concerned about what you've shared.\n\nSeizures can be a medical emergency.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 SUDDEN SEVERE HEADACHE (Possible stroke/aneurysm)
    if ((messageLower.includes('sudden') && messageLower.includes('headache')) ||
        (messageLower.includes('worst') && messageLower.includes('headache')) ||
        (messageLower.includes('thunderclap') && messageLower.includes('headache')) ||
        (messageLower.includes('severe') && messageLower.includes('headache') && messageLower.includes('sudden'))) {
        return "I'm really concerned about what you've shared.\n\nA sudden severe headache can be a medical emergency.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 SEVERE BLEEDING
    if ((messageLower.includes('severe') && messageLower.includes('bleed')) ||
        (messageLower.includes('heavy') && messageLower.includes('bleed')) ||
        (messageLower.includes('lot of') && messageLower.includes('blood')) ||
        (messageLower.includes('bleeding') && (messageLower.includes('stop') || messageLower.includes('won\'t stop'))) ||
        messageLower.includes('hemorrhag')) {
        return "I'm really concerned about what you've shared.\n\nSevere bleeding can be a medical emergency.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 SEVERE INJURY / TRAUMA
    if ((messageLower.includes('accident') && messageLower.includes('serious')) ||
        messageLower.includes('broken bone') ||
        messageLower.includes('head injury') ||
        messageLower.includes('hit my head') ||
        (messageLower.includes('fell') && (messageLower.includes('hard') || messageLower.includes('height'))) ||
        messageLower.includes('car accident')) {
        return "I'm really concerned about what you've shared.\n\nSerious injuries can be medical emergencies.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 SEVERE ABDOMINAL PAIN (Possible appendicitis, internal bleeding)
    if ((messageLower.includes('severe') && messageLower.includes('stomach')) ||
        (messageLower.includes('severe') && messageLower.includes('abdominal')) ||
        (messageLower.includes('stomach') && messageLower.includes('unbearable')) ||
        (messageLower.includes('appendix') && messageLower.includes('pain'))) {
        return "I'm really concerned about what you've shared.\n\nSevere abdominal pain can be a medical emergency.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 POISONING / OVERDOSE
    if (messageLower.includes('poisoned') ||
        messageLower.includes('overdose') ||
        (messageLower.includes('took') && messageLower.includes('pills')) ||
        (messageLower.includes('swallowed') && (messageLower.includes('poison') || messageLower.includes('chemical')))) {
        return "I'm really concerned about what you've shared.\n\nPoisoning or overdose is a medical emergency.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nYou can also call the Poison Control Center.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 SEVERE BURNS
    if ((messageLower.includes('burn') && (messageLower.includes('severe') || messageLower.includes('large') || messageLower.includes('deep'))) ||
        (messageLower.includes('burn') && (messageLower.includes('face') || messageLower.includes('hand') || messageLower.includes('genitals')))) {
        return "I'm really concerned about what you've shared.\n\nSevere burns can be medical emergencies.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 DIABETIC EMERGENCY
    if ((messageLower.includes('diabetic') && (messageLower.includes('emergency') || messageLower.includes('unconscious'))) ||
        (messageLower.includes('blood sugar') && (messageLower.includes('very high') || messageLower.includes('very low'))) ||
        messageLower.includes('diabetic coma')) {
        return "I'm really concerned about what you've shared.\n\nDiabetic emergencies need immediate attention.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // 🚨 MENTAL HEALTH CRISIS / SUICIDE RISK
    if (messageLower.includes('suicid') ||
        messageLower.includes('kill myself') ||
        messageLower.includes('end my life') ||
        messageLower.includes('want to die') ||
        (messageLower.includes('hurt') && messageLower.includes('myself'))) {
        return "I'm really concerned about what you've shared.\n\nYour safety is the most important thing right now.\n\nPlease reach out for help immediately:\n\n• Call the National Suicide Prevention Lifeline: 988\n• Or call your local emergency number\n• Or go to the nearest emergency room\n\nYou don't have to face this alone. Help is available 24/7.\n\nThis is not a medical diagnosis, but getting urgent support is very important.";
    }

    // 🚨 PREGNANCY COMPLICATIONS
    if ((messageLower.includes('pregnant') && (messageLower.includes('bleeding') || messageLower.includes('pain'))) ||
        messageLower.includes('miscarriage') ||
        (messageLower.includes('pregnancy') && messageLower.includes('emergency'))) {
        return "I'm really concerned about what you've shared.\n\nPregnancy complications can be medical emergencies.\n\nPlease seek emergency medical care immediately or call your local emergency number right now.\n\nDo not wait or try to manage this at home.\n\nThis is not a medical diagnosis, but getting urgent help is very important.";
    }

    // ========== NORMAL SYMPTOM FLOW (After emergency check) ==========

    // Greetings - Natural, calm style
    if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey')) {
        return "Hello! I'm SmartCare AI. 🙂\n\nI'm here to help you.\n\nTake a moment and tell me—\n\nWhat brings you here today?";
    }

    // First mention of pain - empathy and ONE question
    if (messageLower.includes('pain') && !messageLower.includes('where') && !messageLower.includes('when')) {
        return "I'm sorry you're in pain.\n\nLet me help you.\n\nWhere exactly do you feel the pain?";
    }

    // After location - ask about duration
    if ((messageLower.includes('pain') || messageLower.includes('ache')) && (messageLower.includes('head') || messageLower.includes('stomach') || messageLower.includes('back') || messageLower.includes('chest'))) {
        return "Thank you for telling me.\n\nWhen did this pain start?";
    }

    // Fever - empathetic, ONE question
    if (messageLower.includes('fever') || messageLower.includes('temperature')) {
        return "I understand you have a fever.\n\nLet me ask you—\n\nSince when have you had the fever?";
    }

    // Headache - calm, empathetic
    if (messageLower.includes('headache') || messageLower.includes('head') && messageLower.includes('pain')) {
        return "I'm sorry about your headache.\n\nTake your time.\n\nSince when do you have this headache?";
    }

    // Cough/Cold - natural response
    if (messageLower.includes('cough') || messageLower.includes('cold')) {
        return "I see you have a cough or cold.\n\nLet me understand better.\n\nWhen did it start?";
    }

    // Stomach issues - empathetic
    if (messageLower.includes('stomach') || messageLower.includes('vomit') || messageLower.includes('nausea')) {
        return "I'm sorry you're feeling this way.\n\nStomach problems can be uncomfortable.\n\nSince when are you experiencing this?";
    }

    // General emergency keywords (lower priority than specific symptoms)
    if (messageLower.includes('emergency') || messageLower.includes('urgent')) {
        return "⚠️ I understand this feels urgent.\n\nFor immediate medical emergencies:\n\n• Call 911\n• Or click the Emergency button on this page\n\nPlease don't delay if you feel this is serious.";
    }

    // Anxiety/Stress - supportive and calm
    if (messageLower.includes('anxiety') || messageLower.includes('stress') || messageLower.includes('worried')) {
        return "I hear you.\n\nMany people feel anxious sometimes.\n\nYou're not alone.\n\nHave you been feeling this way for a while?";
    }

    // Duration responses (when user mentions time)
    if (messageLower.match(/\d+\s*(day|days|hour|hours|week|weeks)/)) {
        return "I understand.\n\nOkay…\n\nHow would you describe the severity?\n\nIs it mild, moderate, or quite severe?";
    }

    // Severity responses
    if (messageLower.includes('mild') || messageLower.includes('moderate') || messageLower.includes('severe')) {
        return "Thank you for sharing that.\n\nJust to be safe—\n\nAre you experiencing any other symptoms?\n\nLike fever, dizziness, or weakness?";
    }

    // General symptoms - empathetic, ONE question
    if (messageLower.includes('sick') || messageLower.includes('unwell') || messageLower.includes('not feeling')) {
        return "I'm sorry you're not feeling well.\n\nI'm here to help.\n\nCan you tell me what symptoms you're experiencing?";
    }

    // Default response - proper SmartCare AI empathetic flow
    return "I'm sorry you're not feeling well.\n\nI'm here to help you.\n\nLet me understand your situation first.\n\nCan you tell me what you're feeling right now?";
}
