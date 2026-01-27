
const WHATSAPP_NUMBER = '22644323841';

const PREFILLED_MESSAGES = [
    "Bonjour BinkoO ! Je souhaiterais obtenir un devis pour un projet digital.",
    "Hello l'équipe BinkoO ! J'ai vu vos réalisations et j'aimerais discuter d'une collaboration.",
    "Salut ! Je suis intéressé par vos solutions d'IA et d'automatisation pour mon business.",
    "Bonjour ! Je voudrais en savoir plus sur vos services de création web et de branding.",
    "Bonjour BinkoO Digital Lab ! J'ai un projet en tête et j'aimerais avoir votre avis d'experts.",
    "Hello ! J'aimerais transformer mon business avec l'IA, pouvez-vous m'aider ?"
];

export const getRandomWhatsAppMessage = () => {
    return PREFILLED_MESSAGES[Math.floor(Math.random() * PREFILLED_MESSAGES.length)];
};

export const getWhatsAppUrl = () => {
    const message = getRandomWhatsAppMessage();
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = () => {
    window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
};
