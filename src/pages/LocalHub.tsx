import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, Zap, MapPin, ShieldCheck, ArrowRight, Bot, Code, Palette, HelpCircle, ChevronDown, BookOpen } from 'lucide-react';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import { AnimatedSection, AnimatedParagraph, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import SEO from '@/components/SEO';
import { Contact2 } from '@/components/Contact2';
import { trackDevisClick } from '@/utils/analytics';
import { cityArticles } from '@/data/cityArticles';

interface FAQItem {
  q: string;
  a: string;
}

interface CityConfig {
  localMarket: string;
  localChallenge: string;
  localPayment: string;
  keyIndustry: string;
  metaDescription: string;
  heroSubtitle: string;
  proximityDetails: string;
  additionalParagraph?: string;
  faq: FAQItem[];
}

const cityConfigs: Record<string, CityConfig> = {
  abidjan: {
    localMarket: "le pôle économique le plus dynamique d'Afrique de l'Ouest francophone, caractérisé par une forte concurrence commerciale",
    localChallenge: "la nécessité de se démarquer rapidement et de digitaliser la relation client sur des canaux mobiles saturés",
    localPayment: "l'intégration de services de paiement locaux comme Wave, Orange Money Côte d'Ivoire, Moov et MTN Money",
    keyIndustry: "les startups technologiques, le commerce de détail de grande envergure et les services financiers",
    metaDescription: "Boostez la croissance de votre entreprise à Abidjan. BinkoO Digital Lab conçoit des systèmes autonomes, des sites web sur mesure et des intégrations de paiement locaux (Wave, Orange Money).",
    heroSubtitle: "BinkoO Digital Lab accompagne les entreprises et startups d'Abidjan (Cocody, Marcory, Plateau, Zone 4) dans leur transition numérique. Nous créons des plateformes web connectées aux passerelles de paiement locales et intégrons des automatisations CRM pour accélérer vos ventes.",
    proximityDetails: "En éliminant les intermédiaires physiques à Abidjan, nous réinvestissons l'intégralité de votre budget dans le développement d'architectures logicielles haut de gamme et la formation technique avancée de vos équipes.",
    additionalParagraph: "Abidjan représentant la plaque tournante du business ouest-africain, nos architectures web intègrent des solutions de montée en charge rapides et un référencement local performant pour capter la clientèle ivoirienne.",
    faq: [
      {
        q: "Comment fonctionne le paiement par Wave ou Orange Money sur mon site web à Abidjan ?",
        a: "Nous intégrons des passerelles de paiement locales (comme CinetPay, FedPay ou des intégrations directes API) qui permettent à vos clients de payer en un clic depuis leur mobile. Le système valide automatiquement la commande dans votre base de données et notifie vos équipes."
      },
      {
        q: "Quel est le coût moyen de création d'un site web professionnel à Abidjan ?",
        a: "Un site vitrine de qualité professionnelle varie entre 150 000 et 600 000 FCFA. Pour une plateforme e-commerce complète connectée aux paiements mobiles, le budget s'établit généralement entre 1 000 000 et 4 000 000 FCFA selon la complexité."
      },
      {
        q: "Pourquoi devrais-je automatiser ma relation client WhatsApp en Côte d'Ivoire ?",
        a: "WhatsApp est le canal de vente préféré à Abidjan. En l'automatisant avec un bot intelligent connecté à vos stocks et à vos factures, vous pouvez traiter 10 fois plus de demandes sans embaucher, éliminer les erreurs de commande et vendre 24h/24."
      },
      {
        q: "Comment BinkoO Digital Lab collabore-t-il avec ses clients d'Abidjan ?",
        a: "Nous travaillons de manière asynchrone et collaborative via Notion, Slack et WhatsApp Business. Cela nous permet d'éliminer les frais de déplacement et de réunions physiques inutiles pour investir 100% de votre budget directement dans l'ingénierie logicielle."
      },
      {
        q: "Qu'est-ce que l'automatisation de processus apporte à une PME ivoirienne ?",
        a: "Elle libère vos collaborateurs des tâches répétitives (saisie de devis, vérification des paiements mobile money, relances manuelles) pour leur permettre de se concentrer sur la vente et le service client, réduisant vos coûts opérationnels de 30% à 50%."
      }
    ]
  },
  ouagadougou: {
    localMarket: "une capitale en pleine transition numérique où les PME cherchent activement à structurer et optimiser leurs opérations internes",
    localChallenge: "les contraintes de bande passante et le besoin de solutions d'automatisation légères fonctionnant directement sur WhatsApp",
    localPayment: "les passerelles de paiement mobile locales comme Orange Money Burkina et Moov Money",
    keyIndustry: "le commerce général, la distribution de biens de consommation et les services professionnels",
    metaDescription: "Agence IA et création de sites web à Ouagadougou. Automatisez vos processus d'entreprise avec BinkoO. Intégration WhatsApp Business et Orange/Moov Money.",
    heroSubtitle: "Partenaire privilégié des entreprises de Ouagadougou (Patte d'Oie, Ouaga 2000, Projet ZACA), nous développons des solutions d'automatisation no-code et des applications web résilientes. Optimisez vos processus de vente via WhatsApp et automatisez vos flux administratifs internes.",
    proximityDetails: "Notre ancrage fort au Burkina Faso nous permet de comprendre parfaitement vos contraintes locales en termes de réseau et de méthodes de travail, tout en vous proposant des technologies de standard mondial.",
    additionalParagraph: "Les PME ouagalaises ont besoin de pragmatisme : nous nous focalisons sur des automatisations qui font gagner du temps immédiatement, comme les devis automatiques ou la gestion de fichiers Excel via l'IA.",
    faq: [
      {
        q: "Comment intégrer Orange Money et Moov Money sur un site e-commerce au Burkina Faso ?",
        a: "Nous utilisons des agrégateurs de paiement régionaux (comme CinetPay ou d'autres passerelles conformes) ou des scripts API sur mesure qui permettent de valider automatiquement les encaissements Orange Money et Moov Money directement sur votre site web."
      },
      {
        q: "Quel est le coût moyen de création d'un site web professionnel à Ouagadougou ?",
        a: "Un site vitrine professionnel coûte généralement entre 150 000 et 500 000 FCFA. Pour une plateforme e-commerce ou une application métier sur mesure, le budget s'établit entre 800 000 et 3 500 000 FCFA selon les fonctionnalités demandées."
      },
      {
        q: "WhatsApp Business suffit-il pour gérer les ventes de mon commerce à Ouagadougou ?",
        a: "Pour démarrer, oui. Mais dès que vous dépassez 15 à 20 commandes par jour, la gestion manuelle devient source d'erreurs (commandes oubliées, stocks faux). Connecter WhatsApp à un système d'automatisation via son API officielle résout ce problème."
      },
      {
        q: "Comment fonctionne la collaboration avec BinkoO Digital Lab depuis Bobo ou Ouaga ?",
        a: "Notre équipe technique est basée au Burkina Faso. Nous combinons des ateliers de cadrage stratégique en ligne ou en présentiel avec un suivi de projet en temps réel sur Slack et Notion, vous garantissant une transparence totale et des coûts maîtrisés."
      },
      {
        q: "Quels processus administratifs une PME burkinabè peut-elle automatiser ?",
        a: "Vous pouvez automatiser la génération des factures et devis, l'envoi de rappels de paiement à vos clients par WhatsApp, la mise à jour de vos stocks à chaque vente et la réconciliation de vos relevés de monnaie électronique."
      }
    ]
  },
  'bobo-dioulasso': {
    localMarket: "le berceau industriel, culturel et agricole du Burkina Faso, propice aux innovations logistiques et de production",
    localChallenge: "l'optimisation des chaînes d'approvisionnement et le suivi des ventes en environnement déconnecté ou à faible débit réseau",
    localPayment: "Orange Money et Moov Money",
    keyIndustry: "l'agro-industrie, la transformation cotonnière, la logistique et l'artisanat d'art",
    metaDescription: "Développement web et IA à Bobo-Dioulasso. BinkoO Digital Lab aide les industries et commerces de la ville de Sya à digitaliser leurs opérations et leur logistique.",
    heroSubtitle: "Implantés au cœur de Bobo-Dioulasso, nous aidons les acteurs industriels, agricoles et commerciaux de la ville de Sya à structurer leur présence en ligne et à automatiser leur gestion de stocks et de clients.",
    proximityDetails: "Bobo-Dioulasso étant notre cœur opérationnel historique, vous bénéficiez sur place d'une synergie unique alliant ateliers stratégiques réguliers en présentiel et réactivité digitale asynchrone.",
    additionalParagraph: "Nous comprenons le tissu agro-industriel de Sya. C'est pourquoi nous créons des interfaces web simplifiées, rapides à charger, conçues pour être exploitées par des agents de terrain sur des réseaux mobiles standards.",
    faq: [
      {
        q: "Comment digitaliser mon activity agro-industrielle ou commerciale à Bobo-Dioulasso ?",
        a: "Nous commençons par cartographier vos processus clés (commandes, livraisons, paiements). Nous remplaçons ensuite les étapes manuelles par des automatisations simples, comme un bot WhatsApp pour vos clients ou un tableau de suivi des stocks connecté."
      },
      {
        q: "Quel est le coût de création d'un site internet professionnel à Bobo-Dioulasso ?",
        a: "Un site vitrine de qualité professionnelle s'établit entre 150 000 et 500 000 FCFA. Pour une plateforme industrielle, un catalogue connecté ou un outil métier spécifique, le budget s'adapte à vos besoins réels."
      },
      {
        q: "Comment BinkoO Digital Lab collabore-t-il avec les entreprises de Bobo-Dioulasso ?",
        a: "Bobo-Dioulasso est notre ancrage historique au Burkina Faso. Nous proposons une formule hybride unique : des ateliers de cadrage stratégique directement dans vos locaux à Bobo et un suivi technique réactif via nos plateformes en ligne."
      },
      {
        q: "Comment gérer mes commandes de matières premières ou de produits à Bobo-Dioulasso ?",
        a: "Nous créons des formulaires simples et des canaux WhatsApp automatisés qui permettent à vos fournisseurs et clients de soumettre leurs données, qui sont ensuite triées, archivées et envoyées à vos équipes logistiques."
      },
      {
        q: "Quels moyens de paiements mobiles ma PME bobolaise doit-elle accepter ?",
        a: "Pour toucher l'intégralité du marché burkinabè, votre entreprise doit accepter conjointement Orange Money et Moov Money. Nous configurons des solutions qui unifient ces deux modes de paiement sur vos factures et sites."
      }
    ]
  },
  dakar: {
    localMarket: "un écosystème d'innovation mature, résolument tourné vers le développement international et le Cloud",
    localChallenge: "l'externalisation des services, la gestion de plateformes collaboratives et l'adaptation à une population jeune et hyper-connectée",
    localPayment: "Wave Sénégal, Orange Money et Free Money",
    keyIndustry: "les agences de services, l'e-commerce en pleine explosion et les projets immobiliers",
    metaDescription: "Expert IA et développement d'applications SaaS à Dakar. Solutions web rapides et automatisations no-code connectées aux outils sénégalais (Wave, Free).",
    heroSubtitle: "De la Médina aux Almadies en passant par Mermoz, nous concevons pour les entreprises dakaroises des applications web robustes et des automatisations de processus CRM. Augmentez la productivité de vos équipes commerciales grâce à nos agents IA.",
    proximityDetails: "Nos équipes collaborent de manière fluide avec vos partenaires au Sénégal, en éliminant les réunions physiques improductives grâce à des outils modernes comme Slack, Notion et Loom.",
    additionalParagraph: "À Dakar, la vitesse d'exécution est essentielle. Nous déployons des applications construites avec des technologies modernes et optimisées au maximum pour réduire les temps de chargement sur mobile 3G/4G.",
    faq: [
      {
        q: "Wave est-il indispensable pour mon activité commerciale à Dakar ?",
        a: "Oui. Wave représente plus de 28% du volume et 38% de la valeur des transactions mobile money au Sénégal en 2024. Combiner Wave avec Orange Money vous permet d'adresser plus de 80% des clients mobiles à Dakar."
      },
      {
        q: "Combien coûte la mise en place d'un CRM ou d'une automatisation commerciale à Dakar ?",
        a: "Un CRM SaaS basique coûte entre 20 000 et 150 000 FCFA par mois. La mise en place de scripts d'automatisation sur mesure (devis, WhatsApp API, notifications) varie de 100 000 à 1 000 000 FCFA selon le périmètre."
      },
      {
        q: "Qu'est-ce que le projet e-PME de l'ADEPME au Sénégal ?",
        a: "Il s'agit d'un programme public soutenu par la Banque mondiale visant à accompagner la transition numérique de 5 000 PME sénégalaises via du renforcement de capacités, du scoring et de l'aide à l'équipement."
      },
      {
        q: "Comment BinkoO Digital Lab accompagne-t-il les startups et agences à Dakar ?",
        a: "Nous concevons des architectures logicielles haut de gamme (React, TypeScript, intégrations API, agents IA) en mode asynchrone, éliminant les intermédiaires physiques pour offrir un code performant et documenté aux standards mondiaux."
      },
      {
        q: "Pourquoi utiliser un agent IA pour mon service client à Dakar ?",
        a: "Un agent IA connecté à votre WhatsApp ou site web répond instantanément aux questions récurrentes de vos clients, qualifie les prospects et collecte les commandes 24h/24, libérant votre équipe commerciale pour les tâches à forte valeur."
      }
    ]
  },
  bamako: {
    localMarket: "un grand carrefour commercial continental d'Afrique de l'Ouest où le commerce de gros et de détail se digitalise rapidement",
    localChallenge: "la fiabilisation de la gestion de commandes clients et le besoin de systèmes simples de facturation multilingues",
    localPayment: "Orange Money Mali et Moov Money (Malitel)",
    keyIndustry: "le commerce de distribution, l'import-export, le transport de marchandises et la logistique",
    metaDescription: "Digitalisation et agence web à Bamako. Automatisation des commandes WhatsApp, création de catalogues connectés et suivi client automatisé pour PME au Mali.",
    heroSubtitle: "Nous accompagnons les importateurs, grossistes et distributeurs de Bamako (Quartier du Fleuve, Baco-Djicoroni, Badalabougou) dans la création de catalogues en ligne et l'automatisation des commandes via WhatsApp, pour un suivi sans friction.",
    proximityDetails: "Sans locaux de prestige coûteux à Bamako, nous affectons l'intégralité de vos ressources financières au recrutement des meilleurs développeurs et ingénieurs pour livrer votre projet.",
    additionalParagraph: "Notre expérience des flux commerciaux à Bamako nous permet de connecter votre interface web à des bots WhatsApp qui automatisent le processus de commande, réduisant ainsi les erreurs humaines de facturation.",
    faq: [
      {
        q: "Comment automatiser la gestion des commandes pour mon commerce de gros à Bamako ?",
        a: "Nous installons l'API WhatsApp Business connectée à un système centralisé (CRM ou base de données de stock). Vos détaillants peuvent ainsi passer commande par messages guidés, et votre équipe logistique reçoit un tableau de préparation clair sans saisie manuelle."
      },
      {
        q: "Quel budget prévoir pour un site internet ou un catalogue en ligne à Bamako ?",
        a: "Un catalogue en ligne connecté à WhatsApp coûte de 400 000 à 1 500 000 FCFA. Un site e-commerce complet avec panier et gestion des stocks automatisée varie de 1 000 000 à 4 000 000 FCFA selon la personnalisation."
      },
      {
        q: "Comment intégrer Orange Money Mali sur ma plateforme de vente ?",
        a: "Nous configurons des APIs sécurisées ou des passerelles de paiement régionales qui vérifient la validité de chaque transaction en temps réel, évitant ainsi les fraudes par fausses captures d'écran de confirmation SMS."
      },
      {
        q: "Quels sont les principaux défis de connectivité pour ma PME à Bamako ?",
        a: "Le débit mobile peut varier en zone commerciale dense. C'est pourquoi nous concevons des architectures web optimisées pour charger avec de faibles connexions (3G) et privilégions l'usage de WhatsApp Business comme interface d'entrée."
      },
      {
        q: "Comment BinkoO Digital Lab aide-t-il les importateurs maliens ?",
        a: "Nous créons des outils sur mesure d'archivage documentaire de transit (GED), des générateurs de factures en ligne et des relances de paiement automatisées par e-mail et WhatsApp pour réduire vos délais de traitement administratifs."
      }
    ]
  },
  lome: {
    localMarket: "une place portuaire stratégique majeure et un hub de services financiers en plein essor numérique régional",
    localChallenge: "la gestion documentaire logistique complexe et le suivi en temps réel des opérations de transit commercial",
    localPayment: "T-Money et Moov Flooz",
    keyIndustry: "le transit maritime, le négoce international, le commerce de gros et les plateformes de services bancaires",
    metaDescription: "Automatisation de processus et création de sites web à Lomé. Optimisez vos flux logistiques et votre relation client avec nos solutions d'intelligence artificielle au Togo.",
    heroSubtitle: "Partenaire technologique des entreprises de Lomé, nous créons des outils de suivi automatisé et des sites web sur mesure pour faciliter vos flux d'import-export et capter la clientèle togolaise et régionale.",
    proximityDetails: "Nous concevons vos applications logicielles à distance avec une rigueur absolue, en vous offrant un canal de suivi en direct et transparent via nos outils de gestion partagés.",
    additionalParagraph: "Les activités portuaires et commerciales de Lomé nécessitent des outils administratifs réactifs. Nous créons des générateurs de documents automatiques et des systèmes de relance de paiements configurés sur mesure.",
    faq: [
      {
        q: "Comment automatiser le suivi documentaire et les alertes pour mon activité de transit à Lomé ?",
        a: "Nous concevons des systèmes de Gestion Électronique des Documents (GED) légers qui classent automatiquement les dossiers et envoient des notifications de rappel (par WhatsApp ou e-mail) à vos clients et agents lorsque des pièces douanières manquent ou que des échéances approchent."
      },
      {
        q: "Quel est le coût moyen de création d'un site internet ou d'un catalogue à Lomé ?",
        a: "Pour un site vitrine professionnel, le budget oscille entre 150 000 et 600 000 FCFA. Pour une plateforme e-commerce ou un portail de suivi client connecté, les tarifs s'échelonnent de 1 000 000 à 4 000 000 FCFA selon le niveau d'automatisation désiré."
      },
      {
        q: "Comment intégrer T-Money et Flooz simultanément sur ma plateforme ?",
        a: "Nous connectons votre site ou outil de facturation à des passerelles d'agrégation régionales. Vos clients choisissent leur opérateur au moment de valider, et le système confirme le paiement en temps réel sans intervention manuelle."
      },
      {
        q: "Quels sont les objectifs de la stratégie Togo Digital 2025 pour les PME ?",
        a: "Le gouvernement vise à digitaliser l'économie pour simplifier la vie des entreprises (services douaniers en ligne, e-gouvernement, e-ID). Les PME doivent s'adapter en modernisant leurs propres outils internes pour s'interconnecter facilement."
      },
      {
        q: "Pourquoi BinkoO Digital Lab opère-t-il principalement de manière asynchrone avec Lomé ?",
        a: "Travailler de manière structurée via Notion et Loom nous évite de répercuter le coût de bureaux luxueux à Lomé dans nos devis. 100% de votre investissement finance ainsi l'ingénierie et le code de votre application."
      }
    ]
  },
  cotonou: {
    localMarket: "une ville portuaire dynamique avec un écosystème de startups et de PME de plus en plus structuré et compétitif",
    localChallenge: "la facturation normalisée et le besoin d'outils internes légers pour piloter les relations clients sans lourdeur",
    localPayment: "MTN Mobile Money Bénin et Moov Money",
    keyIndustry: "les plateformes de services logistiques, le négoce, l'e-commerce et le tourisme d'affaires",
    metaDescription: "Agence technologique et développement web à Cotonou. Création de logiciels métiers automatisés, interfaces de vente et intégration MTN/Moov Money au Bénin.",
    heroSubtitle: "BinkoO accompagne la digitalisation des entreprises de Cotonou (Fidjrossè, Cadjehoun, Ganhi). De la conception de sites e-commerce optimisés à l'automatisation de vos rappels de factures, nous construisons votre efficacité.",
    proximityDetails: "Nous offrons aux entreprises béninoises des délais de livraison réduits et un niveau de finition technique rigoureux, aligné sur les meilleures pratiques d'ingénierie modernes.",
    additionalParagraph: "À Cotonou, nous ciblons l'efficacité opérationnelle en intégrant la facturation et le suivi de leads directement dans vos plateformes de messagerie habituelles, pour un gain de temps immédiat.",
    faq: [
      {
        q: "Qu'est-ce que l'usage gap et comment mon entreprise à Cotonou peut-elle en tirer parti ?",
        a: "L'usage gap désigne la proportion de la population couverte par Internet qui ne l'utilise pas régulièrement. En proposant à vos clients des interfaces ultra-simples, comme des outils automatisés sur WhatsApp plutôt que des applications complexes, vous capturez ce marché inexploité."
      },
      {
        q: "Quel est le coût d'intégration des paiements MTN MoMo et Moov Money au Bénin ?",
        a: "La mise en place d'une passerelle de paiement sécurisée ou d'une intégration API directe sur votre site web ou CRM varie de 200 000 à 2 000 000 FCFA selon le niveau de sécurité et de rapprochement comptable souhaité."
      },
      {
        q: "Comment fonctionne l'automatisation du service client WhatsApp à Cotonou ?",
        a: "Nous configurons un bot intelligent relié à l'API WhatsApp Business officielle. Ce bot répond à vos clients, leur envoie vos catalogues de produits, gère les commandes et transmet les informations directement à vos équipes de livraison."
      },
      {
        q: "Comment BinkoO Digital Lab accompagne-t-il les PME de Cotonou ?",
        a: "Nous concevons vos solutions (sites web, outils de facturation, pipelines de vente, IA) de manière asynchrone et collaborative. Vous suivez l'avancement de notre code en direct sur GitHub et Notion, garantissant transparence et respect des délais."
      },
      {
        q: "Quel est le budget moyen à prévoir pour un site internet ou un CRM à Cotonou ?",
        a: "Un site vitrine de qualité professionnelle s'établit entre 150 000 et 600 000 FCFA. Pour un CRM de suivi client en mode SaaS, comptez un abonnement de 25 000 à 150 000 FCFA par mois selon la taille de votre équipe commerciale."
      }
    ]
  }
};

const defaultCityConfig: CityConfig = {
  localMarket: "le tissu économique de votre ville, caractérisé par des opportunités de digitalisation grandissantes",
  localChallenge: "la nécessité de moderniser vos outils internes et de proposer une expérience client fluide et performante",
  localPayment: "l'intégration de systèmes de paiement locaux mobiles adaptés à vos clients",
  keyIndustry: "le commerce local, les PME de services et les initiatives entrepreneuriales",
  metaDescription: "BinkoO Digital Lab est votre partenaire technologique local en intelligence artificielle, automatisation de processus et développement d'applications web.",
  heroSubtitle: "BinkoO Digital Lab accompagne les entreprises dans leur transformation numérique. De la création de plateformes web sur-mesure à l'intégration de systèmes automatisés, nous concevons des architectures digitales haute performance.",
  proximityDetails: "En traitant de manière asynchrone et collaborative, nous éliminons les intermédiaires physiques pour investir votre budget directement dans l'ingénierie logicielle.",
  additionalParagraph: "Nous concevons des outils adaptés à vos besoins opérationnels réels pour augmenter votre productivité à moindre coût.",
  faq: [
    {
      q: "Comment démarrer un projet de digitalisation avec BinkoO Digital Lab ?",
      a: "Nous commençons par un diagnostic gratuit de vos processus opérationnels. Nous identifions ensuite les automatisations les plus rentables à court terme et concevons un plan de déploiement progressif."
    },
    {
      q: "Quelles passerelles de paiement locales intégrez-vous ?",
      a: "Nous prenons en charge l'intégration de la majorité des solutions de monnaie électronique locales de l'UEMOA (Orange Money, MTN MoMo, Moov, Wave, T-Money) pour sécuriser vos règlements."
    }
  ]
};

export default function LocalHub() {
  const { city } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Format city name nicely (e.g. "abidjan" -> "Abidjan", "bobo-dioulasso" -> "Bobo-Dioulasso")
  const formattedCity = city
    ? city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')
    : "votre ville";

  const config = city && cityConfigs[city.toLowerCase()]
    ? cityConfigs[city.toLowerCase()]
    : defaultCityConfig;

  const article = city && cityArticles[city.toLowerCase()]
    ? cityArticles[city.toLowerCase()]
    : null;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <SEO
        title={`Agence IA & Automatisation à ${formattedCity} | BinkoO Digital Lab`}
        description={config.metaDescription}
        canonical={`https://binkoo.digital/agence-ia-automatisation/${city}`}
        keywords={`agence ia ${formattedCity}, agence automatisation ${formattedCity}, agence intelligence artificielle ${formattedCity}, BinkoO`}
        localCity={formattedCity}
        faq={config.faq} // Injection directe des FAQs pour générer le schéma JSON-LD
      />

      <div className="min-h-screen bg-background text-foreground">

        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center pt-28 pb-20 text-center">
          <div className="container-fluid relative z-10 mx-auto px-6 flex flex-col items-center max-w-4xl">

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-border bg-background shadow-sm mb-10"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold tracking-widest uppercase text-foreground">Partenaire d'Excellence à {formattedCity}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight font-slab"
            >
              L'innovation technologique{' '}
              <br className="hidden md:block" />
              au service de <span className="text-primary">{formattedCity}.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-base md:text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl"
            >
              {config.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-5"
            >
              <a
                href="https://api.whatsapp.com/send?phone=22644323841"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDevisClick('local_hub_hero')}
                className="inline-block"
              >
                <InteractiveHoverButton text="Nous contacter" />
              </a>
              <Link to="/realisations" className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-2 group">
                Explorer nos réalisations <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* SCROLLING TEXT */}
        <VelocityScroll
          text="Systèmes Autonomes • Création Web • Branding • Design Stratégique • Agents IA sur mesure • "
          default_velocity={1.5}
          className="font-display text-center text-3xl font-bold tracking-[-0.02em] text-foreground/10 md:text-5xl md:leading-[5rem]"
        />

        {/* SERVICES PHARES */}
        <AnimatedSection animation="fade-up">
          <section className="py-16 md:py-24 lg:py-32">
            <div className="container-fluid">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3 md:mb-4">
                  Nos Expertises
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-slab">Expertises d'ingénierie</h2>
                <AnimatedParagraph delay={0.2}>
                  <p className="text-base md:text-lg max-w-3xl mx-auto text-muted-foreground mt-4">
                    Nos solutions d'ingénierie logicielle configurées pour résoudre {config.localChallenge} à {formattedCity}.
                  </p>
                </AnimatedParagraph>
              </motion.div>

              <div className="space-y-8 md:space-y-10 max-w-5xl mx-auto">
                {/* Service 1 */}
                <AnimatedSection animation="fade-up" delay={0.1}>
                  <Link to="/services/ia-automatisation" className="group block">
                    <div className="bg-background rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-border hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Bot className="w-7 h-7 md:w-8 md:h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl md:text-2xl font-bold mb-3 font-slab">Systèmes & IA</h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            Éliminez les tâches répétitives. Déployez des systèmes autonomes, intégrez des agents IA sur mesure et automatisez l'entièreté de vos processus métier (CRM, facturation, leads) en accord avec les besoins en {config.keyIndustry}.
                          </p>
                        </div>
                        <div className="flex-shrink-0 hidden md:flex">
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>

                {/* Service 2 */}
                <AnimatedSection animation="fade-up" delay={0.2}>
                  <Link to="/services/sites-app-web" className="group block">
                    <div className="bg-background rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-border hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Code className="w-7 h-7 md:w-8 md:h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl md:text-2xl font-bold mb-3 font-slab">Création Web & App</h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            Plates-formes e-commerce, applications SaaS et sites vitrines ultra-rapides connectés aux API de paiements locaux. Une architecture technique solide pour dominer votre marché.
                          </p>
                        </div>
                        <div className="flex-shrink-0 hidden md:flex">
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>

                {/* Service 3 */}
                <AnimatedSection animation="fade-up" delay={0.3}>
                  <Link to="/services/branding" className="group block">
                    <div className="bg-background rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-border hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Palette className="w-7 h-7 md:w-8 md:h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl md:text-2xl font-bold mb-3 font-slab">Branding Stratégique</h3>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            Une identité visuelle saisissante, des logos intemporels et des interfaces (UI/UX) perfectionnées pour maximiser la conversion de vos prospects à {formattedCity}.
                          </p>
                        </div>
                        <div className="flex-shrink-0 hidden md:flex">
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* ANALYSE ET ETUDE DE CAS LOCALE (SEO ENRICHI - 1000 MOTS PAR VILLE) */}
        {article && (
          <AnimatedSection animation="fade-up">
            <section className="py-16 md:py-24 lg:py-32 bg-gray-50 border-t border-b border-border/40">
              <div className="container-fluid max-w-4xl mx-auto px-6">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary mb-6">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider uppercase">Focus & Analyse Locale</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-slab text-foreground">
                  {article.title}
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-10 font-normal whitespace-pre-line">
                  {article.intro}
                </p>

                <div className="space-y-8">
                  {article.sections.map((section, idx) => (
                    <div key={idx} className="bg-background rounded-2xl p-6 md:p-8 shadow-sm border border-border/60">
                      <h3 className="text-xl font-bold mb-3 font-slab text-foreground flex items-center gap-3">
                        <span className="text-primary font-mono text-sm border border-primary/20 rounded-md px-2 py-0.5">0{idx + 1}</span>
                        {section.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* POURQUOI NOUS CHOISIR */}
        <AnimatedSection animation="fade-up">
          <section className="py-16 md:py-24 lg:py-32">
            <div className="container-fluid">
              <motion.div
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3 md:mb-4">
                  Notre Approche
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-slab">La proximité digitale à {formattedCity}</h2>
                <AnimatedParagraph delay={0.2}>
                  <div className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mt-4 space-y-4">
                    <p>
                      Pourquoi faire appel à BinkoO Digital Lab ? Parce que l'innovation digitale ne s'encombre pas de frontières physiques. Notre méthodologie asynchrone et collaborative redéfinit l'efficacité technique.
                    </p>
                    {config.additionalParagraph && (
                      <p className="text-sm md:text-base border-l-2 border-primary/20 pl-4 py-1 italic">
                        {config.additionalParagraph}
                      </p>
                    )}
                  </div>
                </AnimatedParagraph>
              </motion.div>

              <div className="space-y-8 md:space-y-10 max-w-4xl mx-auto">
                <AnimatedParagraph delay={0.3}>
                  <div className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                        <Zap className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 font-slab">Réactivité Asynchrone</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        Loin des réunions interminables de cabinets, nous utilisons Slack, Notion et Trello. Vous suivez l'avancée de votre projet en temps réel, avec une réactivité et une traçabilité absolues. C'est l'approche idéale pour accompagner {config.localMarket}.
                      </p>
                    </div>
                  </div>
                </AnimatedParagraph>

                <AnimatedParagraph delay={0.4}>
                  <div className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 font-slab">Budget 100% Ingénierie</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {config.proximityDetails}
                      </p>
                    </div>
                  </div>
                </AnimatedParagraph>

                <AnimatedParagraph delay={0.5}>
                  <div className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-t from-black via-black to-neutral-700 flex items-center justify-center">
                        <Globe className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 font-slab">Ancrage Panafricain & Paiements</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        Notre laboratoire tech allie standards internationaux (React, IA générative) et parfaite maîtrise des réalités locales d'Afrique de l'Ouest. Nous prenons en charge {config.localPayment} pour assurer la viabilité commerciale de vos projets.
                      </p>
                    </div>
                  </div>
                </AnimatedParagraph>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FAQ LOCALE (SEO SCHEMA FAQPAGE & INTERACTIF) */}
        <AnimatedSection animation="fade-up">
          <section className="py-16 md:py-24 lg:py-32">
            <div className="container-fluid max-w-3xl mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-slab">Questions Fréquentes à {formattedCity}</h2>
                <p className="text-muted-foreground mt-3 text-sm md:text-base">
                  Trouvez des réponses rapides sur le développement web, l'IA et l'automatisation dans votre contexte local.
                </p>
              </div>

              <div className="space-y-4">
                {config.faq.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-border/80 rounded-xl overflow-hidden bg-background transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-slab font-semibold text-base md:text-lg hover:bg-gray-50 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                          openFaqIndex === idx ? 'transform rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: openFaqIndex === idx ? 'auto' : 0,
                        opacity: openFaqIndex === idx ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-border/40 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CONTACT */}
        <Contact2 />
      </div>
    </>
  );
}
