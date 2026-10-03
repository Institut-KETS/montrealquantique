(() => {
  const STORAGE_KEY = 'mq-language';
  const supported = new Set(['en', 'fr']);
  const translations = {
    'Skip to main content': 'Aller au contenu principal',
    'Home': 'Accueil',
    'Contribute': 'Contribuer',
    'Members': 'Membres',
    'Courses': 'Cours',
    'Speaker series': 'Série de conférences',
    'Speakers & visitors': 'Conférences et visites',
    'Speakers and visitors': 'Conférences et visites',
    'News': 'Actualités',
    'Menu': 'Menu',
    'Primary navigation': 'Navigation principale',
    'Language': 'Langue',
    'Montréal Quantique home': 'Accueil de Montréal Quantique',
    'Faculty-led research across Montréal': 'Recherche menée par le corps professoral à Montréal',
    'Quantum software connects Montréal to the world.': 'Le logiciel quantique relie Montréal au monde.',
    'Montréal Quantique connects researchers and graduate students working on quantum software across Montréal’s universities. This faculty-led initiative makes local expertise easier to discover, helps students find courses across institutional boundaries, and supports exchange through a shared programme of talks and research visits.': 'Montréal Quantique relie les chercheuses, chercheurs et membres de la communauté étudiante des cycles supérieurs qui travaillent sur le logiciel quantique dans les universités montréalaises. Cette initiative dirigée par le corps professoral facilite la découverte de l’expertise locale, aide les étudiantes et étudiants à trouver des cours au-delà des frontières institutionnelles et soutient les échanges grâce à un programme commun de conférences et de visites de recherche.',
    'Explore members': 'Explorer les membres',
    'How the initiative works': 'Fonctionnement de l’initiative',
    'A connected Montréal community': 'Une communauté montréalaise en réseau',
    '7 institutions · IBM Quantum': '7 établissements · IBM Quantum',
    'Illustrated map of Montréal showing seven participating institutions and IBM Quantum.': 'Carte illustrée de Montréal montrant sept établissements participants et IBM Quantum.',
    'Our network for quantum software research.': 'Notre réseau de recherche en logiciel quantique.',
    'Meet the community': 'Découvrir la communauté',
    'Research directory': 'Répertoire de recherche',
    'Find expertise across institutions': 'Trouver l’expertise dans plusieurs établissements',
    'Name, topic, or affiliation': 'Nom, sujet ou affiliation',
    'Search': 'Rechercher',
    'Faculty / PIs': 'Corps professoral / CP',
    'Graduate students': 'Étudiantes et étudiants aux cycles supérieurs',
    'Institutions': 'Établissements',
    'Shared research hub': 'Carrefour de recherche partagé',
    'INGO · eighth floor': 'INGO · 8e étage',
    'Shared facilities for Montréal Quantique activities, workshops, research visitors, and collaboration.': 'Des espaces partagés pour les activités de Montréal Quantique, les ateliers, les visites de recherche et la collaboration.',
    'Carrefour d’innovation INGO': 'Carrefour d’innovation INGO',
    '355 Peel Street': '355, rue Peel',
    'Montréal, Québec H3C 2G9': 'Montréal (Québec) H3C 2G9',
    'The first public roster is awaiting faculty approval.': 'La première liste publique attend l’approbation du corps professoral.',
    'Research themes': 'Thèmes de recherche',
    'Three connected layers of quantum software': 'Trois couches reliées du logiciel quantique',
    'Our initial programme map connects scientific methods, algorithms, and the systems that make quantum research usable.': 'Notre première carte du programme relie les méthodes scientifiques, les algorithmes et les systèmes qui rendent la recherche quantique utilisable.',
    'Discover the research community': 'Découvrir la communauté de recherche',
    'Research across the city': 'La recherche à travers la ville',
    'Quantum research across the island.': 'La recherche quantique à l’échelle de l’île.',
    'Browse the draft member roster by institution and research topic. Profiles and tags remain in member review.': 'Parcourez la liste provisoire des membres par établissement et sujet de recherche. Les profils et étiquettes restent en révision par les membres.',
    'The public roster is awaiting faculty approval. Directory discovery will become available with the first reviewed release.': 'La liste publique attend l’approbation du corps professoral. Le répertoire sera accessible dès la première version révisée.',
    'Public roster forthcoming': 'Liste publique à venir',
    'No member profiles have been approved for this production build.': 'Aucun profil de membre n’a encore été approuvé pour la version publique.',
    'Study across university boundaries': 'Étudier au-delà des frontières universitaires',
    'Course discovery and cross-registration guidance will help graduate students navigate existing inter-university frameworks.': 'Le repérage des cours et les renseignements sur l’inscription interuniversitaire aideront la communauté étudiante des cycles supérieurs à utiliser les mécanismes existants.',
    'See the course catalogue plan': 'Voir le projet de catalogue de cours',
    'Graduate students study across Montréal': 'Étudier à travers Montréal aux cycles supérieurs',
    'Existing inter-university frameworks support Montréal graduate students in taking specialized courses across the island and connecting with expertise beyond their home institution.': 'Les mécanismes interuniversitaires existants permettent aux étudiantes et étudiants des cycles supérieurs de Montréal de suivre des cours spécialisés à travers l’île et d’accéder à une expertise au-delà de leur établissement d’attache.',
    'Explore courses across Montréal': 'Explorer les cours à travers Montréal',
    'A programme that rotates across the island': 'Un programme qui circule à travers l’île',
    'The speakers and visitors programme pairs six annual talks with at least six research visits, rotating hosts across participating institutions.': 'Le programme de conférences et de visites combine six conférences annuelles et au moins six visites de recherche, avec une rotation des établissements d’accueil participants.',
    'Explore the speakers and visitors programme': 'Explorer le programme de conférences et de visites',
    'Six talks, six or more visitors': 'Six conférences et au moins six personnes invitées',
    'The speaker series and research-visit programme are being developed with INTRIQ. Partnership, hosting, and annual allocation arrangements remain to be confirmed.': 'La série de conférences et le programme de visites de recherche sont en cours d’élaboration avec l’INTRIQ. Le partenariat, l’accueil et la répartition annuelle restent à confirmer.',
    'See the proposed series': 'Voir la série proposée',
    'Updates from the program': 'Nouvelles du programme',
    'Approved programme announcements, research highlights, and calls will appear here as the real roster is curated.': 'Les annonces approuvées, les faits saillants de la recherche et les appels seront publiés ici à mesure que la liste réelle sera constituée.',
    'View news status': 'Voir l’état des actualités',
    'Show faculty / PIs only': 'Afficher seulement le corps professoral / les CP',
    'Counts show listed members, not research quality.': 'Les nombres indiquent les membres répertoriés, et non la qualité de la recherche.',
    'Research topics': 'Sujets de recherche',
    'Detailed topic tags are being prepared for faculty review.': 'Les sujets détaillés sont en préparation pour la révision du corps professoral.',
    'Quantum algorithms': 'Algorithmes quantiques',
    'Quantum complexity': 'Complexité quantique',
    'Tensor networks': 'Réseaux de tenseurs',
    'Quantum simulation': 'Simulation quantique',
    'Numerical methods': 'Méthodes numériques',
    'Quantum compilation': 'Compilation quantique',
    'Quantum programming': 'Programmation quantique',
    'Formal verification': 'Vérification formelle',
    'Quantum error correction': 'Correction d’erreurs quantiques',
    'Fault tolerance': 'Tolérance aux fautes',
    'Quantum machine learning': 'Apprentissage automatique quantique',
    'Quantum optimisation': 'Optimisation quantique',
    'Quantum cryptography': 'Cryptographie quantique',
    'Quantum communication': 'Communication quantique',
    'Photonics and materials': 'Photonique et matériaux',
    'Use compact list': 'Utiliser la liste compacte',
    'Use word cloud': 'Utiliser le nuage de mots',
    'Alphabetical list': 'Liste alphabétique',
    'About the initiative': 'À propos de l’initiative',
    'Governance and participation': 'Gouvernance et participation',
    'Origins and mandate': 'Origines et mandat',
    'Founded through the ÉTS quantum institute': 'Fondé dans le cadre de l’institut quantique de l’ÉTS',
    'Montréal Quantique originated within the ÉTS Institute for Quantum Science and Engineering project as part of the Institute’s mandate to serve as a hub for quantum software research and innovation in Montréal. The Institute provided the initiative’s initial funding and operational support.': 'Montréal Quantique est issu du projet de l’Institut en sciences et génie quantiques de l’ÉTS, dans le cadre du mandat de l’Institut d’agir comme carrefour de la recherche et de l’innovation en logiciel quantique à Montréal. L’Institut a fourni le financement initial et le soutien opérationnel de l’initiative.',
    'Founding support': 'Soutien fondateur',
    'That support covers the construction and hosting of this website, the resources needed to operate the speaker and visitor programmes, and associated programme administration, outreach, promotion, and advertising costs.': 'Ce soutien couvre la construction et l’hébergement de ce site Web, les ressources nécessaires au fonctionnement des programmes de conférences et de visites, ainsi que les coûts connexes d’administration, de rayonnement, de promotion et de publicité.',
    'The network’s inter-university governance and future partnerships are developed through the committee structure below.': 'La gouvernance interuniversitaire du réseau et ses futurs partenariats sont développés au moyen de la structure de comités présentée ci-dessous.',
    'Academic scope': 'Portée scientifique',
    'Montréal Quantique centres on quantum software and connects faculty-led research groups with graduate students across Montréal. The directory is a discovery service: inclusion indicates an approved program relationship, not institutional endorsement of every activity.': 'Montréal Quantique se consacre au logiciel quantique et relie les groupes de recherche dirigés par le corps professoral aux étudiantes et étudiants des cycles supérieurs de Montréal. Le répertoire facilite la découverte : l’inclusion indique un lien approuvé avec le programme, et non l’approbation institutionnelle de chaque activité.',
    'Faculty governance': 'Gouvernance professorale',
    'A faculty steering group will approve program scope, participating institutions, membership criteria, taxonomy, partnerships, and public releases. Each participating university should have a named faculty representative or delegate. The founding membership and release authority must be confirmed before launch.': 'Un comité directeur professoral approuvera la portée du programme, les établissements participants, les critères d’adhésion, la taxonomie, les partenariats et les publications. Chaque université participante devrait désigner une représentante ou un représentant du corps professoral. Les membres fondateurs et l’autorité de publication devront être confirmés avant le lancement.',
    'Graduate participation': 'Participation aux cycles supérieurs',
    'Graduate students receive individual profiles and can propose factual updates. Faculty retain responsibility for academic scope and public editorial decisions, with a clear correction and removal route for every member.': 'Les étudiantes et étudiants des cycles supérieurs disposent de profils individuels et peuvent proposer des mises à jour factuelles. Le corps professoral demeure responsable de la portée scientifique et des décisions éditoriales publiques; chaque membre dispose d’une procédure claire de correction ou de retrait.',
    'Faculty-led governance': 'Gouvernance dirigée par le corps professoral',
    'The Management and Speaker Series committees are governed by faculty delegates nominated by their own participating institutions. The structure is designed to give each institution an equal voice while keeping responsibility for decisions clear.': 'Les comités de gestion et de la série de conférences sont gouvernés par des personnes déléguées du corps professoral, nommées par leur propre établissement participant. La structure donne une voix égale à chaque établissement tout en attribuant clairement la responsabilité des décisions.',
    'One institution, one vote': 'Un établissement, une voix',
    'Each participating institution nominates one voting delegate to the Management Committee and one to the Speaker Series Committee. Each institution has one vote on each of those committees. Committee officers are selected from the delegates and do not create an additional vote. The Quantum Education Planning Committee has the coordination mandate and appointments listed below.': 'Chaque établissement participant nomme une personne déléguée avec droit de vote au Comité de gestion et une au Comité de la série de conférences. Chaque établissement dispose d’une voix au sein de chacun de ces comités. Les responsables sont choisis parmi les personnes déléguées et ne disposent pas d’une voix supplémentaire. Le Comité de planification de la formation quantique exerce le mandat de coordination et comprend les personnes nommées ci-dessous.',
    'Committee structure': 'Structure des comités',
    'Three committees with distinct mandates': 'Trois comités aux mandats distincts',
    'Management and Speaker Series delegates remain open until each institution nominates its representatives; education planning begins with the named members below.': 'Les personnes déléguées aux comités de gestion et de la série de conférences restent à déterminer jusqu’à ce que chaque établissement nomme ses représentantes et représentants; la planification de la formation débute avec les membres nommés ci-dessous.',
    'Programme direction': 'Direction du programme',
    'Management Committee': 'Comité de gestion',
    'Sets programme scope, membership criteria, research taxonomy, partnerships, public policy, and release authority.': 'Définit la portée du programme, les critères d’adhésion, la taxonomie de recherche, les partenariats, les politiques publiques et l’autorité de publication.',
    'Working roles': 'Fonctions',
    'Chair': 'Présidence',
    'Vice-chair': 'Vice-présidence',
    'Secretary and editorial coordinator': 'Secrétariat et coordination éditoriale',
    'To be nominated by the committee': 'À nommer par le comité',
    'Institutional delegates': 'Personnes déléguées des établissements',
    'Delegate to be nominated': 'Personne déléguée à nommer',
    'Talks and research visits': 'Conférences et visites de recherche',
    'Speaker Series Committee': 'Comité de la série de conférences',
    'Develops the six-talk annual programme, coordinates visitors and hosts, maintains fair institutional rotation, and confirms event readiness.': 'Élabore le programme annuel de six conférences, coordonne les personnes invitées et les établissements d’accueil, maintient une rotation institutionnelle équitable et confirme que les événements sont prêts.',
    'Programme coordinator': 'Coordination du programme',
    'Visitor and host liaison': 'Liaison avec les personnes invitées et les établissements d’accueil',
    'Course coordination': 'Coordination de la formation',
    'Quantum Education Planning Committee': 'Comité de planification de la formation quantique',
    'Coordinates Montréal-wide quantum-education planning, course visibility, cross-institutional access guidance, and the development of shared teaching priorities.': 'Coordonne la planification montréalaise de la formation quantique, la visibilité des cours, l’information sur l’accès interétablissements et le développement de priorités pédagogiques communes.',
    'Initial appointments': 'Nominations initiales',
    'Member': 'Membre',
    'Additional positions (2–3)': 'Postes supplémentaires (2 à 3)',
    'Terms of service, quorum, recusals, tie handling, appointment dates, and removal or replacement procedures remain to be adopted by the Management Committee.': 'La durée des mandats, le quorum, les récusations, le traitement des égalités, les dates de nomination et les procédures de retrait ou de remplacement restent à adopter par le Comité de gestion.',
    'Explore the research': 'Explorer la recherche',
    'Use the member directory to discover Montréal researchers, research groups, institutions, and topics across quantum software.': 'Utilisez le répertoire des membres pour découvrir les chercheurs, les groupes de recherche, les établissements et les sujets montréalais en logiciel quantique.',
    'Explore faculty profiles': 'Explorer les profils du corps professoral',
    'Media enquiries': 'Demandes des médias',
    'Initial point of contact': 'Premier point de contact',
    'During the initial phase, Jacob Biamonte serves as the media contact for Montréal Quantique. This is a communications role; permanent leadership roles will be established through the committee process.': 'Pendant la phase initiale, Jacob Biamonte agit comme contact média de Montréal Quantique. Il s’agit d’un rôle de communication; les fonctions permanentes de direction seront établies selon le processus des comités.',
    'View Jacob Biamonte’s profile': 'Voir le profil de Jacob Biamonte',
    'Governance details still required': 'Détails de gouvernance encore requis',
    'Institutional nominations for the Management and Speaker Series committees': 'Nominations institutionnelles aux comités de gestion et de la série de conférences',
    'Committee chairs and working officers': 'Présidences et responsables des comités',
    'Terms, quorum, recusals, and tie handling': 'Mandats, quorum, récusations et traitement des égalités',
    'Launch information still required': 'Renseignements requis avant le lancement',
    'Faculty steering group and release authority': 'Comité directeur professoral et autorité de publication',
    'Participating universities and delegates': 'Universités participantes et personnes déléguées',
    'Membership eligibility and editorial contact': 'Admissibilité des membres et contact éditorial',
    'Confirmed INTRIQ partnership language': 'Formulation confirmée du partenariat avec l’INTRIQ',
    'Confirmed shared-hub identity and role': 'Identité et rôle confirmés du carrefour commun',
    'Date of the first roster review': 'Date de la première révision de la liste',
    'Site information': 'Renseignements sur le site',
    'Accessibility and privacy': 'Accessibilité et confidentialité',
    'The prototype is designed for keyboard navigation, readable zoom, visible focus, and content that does not depend on colour or portraits.': 'Le prototype est conçu pour la navigation au clavier, un agrandissement lisible, un indicateur de focus visible et un contenu qui ne dépend ni de la couleur ni des portraits.',
    'Privacy': 'Confidentialité',
    'Only approved public profile information belongs in the site repository. Consent records, Forms exports, private correspondence, travel details, and editorial review notes remain outside it.': 'Seuls les renseignements de profil approuvés et publics doivent figurer dans le dépôt du site. Les preuves de consentement, les exports Forms, la correspondance privée, les détails de voyage et les notes de révision éditoriale restent à l’extérieur du dépôt.',
    'Report an issue': 'Signaler un problème',
    'A public accessibility and correction contact will be added after editorial responsibility is confirmed.': 'Un contact public pour l’accessibilité et les corrections sera ajouté une fois la responsabilité éditoriale confirmée.',
    'Maintain the directory': 'Maintenir le répertoire',
    'Contribute or update a profile': 'Contribuer ou mettre à jour un profil',
    'Content will be maintained through small, reviewable changes once the project repository and faculty review roles are configured.': 'Le contenu sera maintenu au moyen de petits changements faciles à réviser une fois le dépôt du projet et les rôles de révision professorale configurés.',
    'Contribution workflow': 'Processus de contribution',
    'Use the template for a profile, course, event, or news item.': 'Utiliser le gabarit de profil, de cours, d’événement ou d’actualité.',
    'Supply only facts that can be reviewed by the person or responsible faculty delegate.': 'Fournir uniquement des faits que la personne concernée ou la personne déléguée du corps professoral peut vérifier.',
    'Run local validation and inspect both builds.': 'Exécuter la validation locale et vérifier les deux versions.',
    'Request factual-owner and faculty editorial review before publication.': 'Demander la révision de la personne responsable des faits et du comité éditorial professoral avant publication.',
    'LLMs may help format supplied facts. They do not certify facts, decide membership, invent affiliations, or approve publication.': 'Les modèles de langage peuvent aider à mettre en forme les faits fournis. Ils ne certifient pas les faits, ne décident pas de l’adhésion, n’inventent pas d’affiliations et n’approuvent pas la publication.',
    'Repository status': 'État du dépôt',
    'Open the contribution repository': 'Ouvrir le dépôt de contribution',
    'No GitHub repository or contribution link is configured yet. A correction and removal contact will be published after the faculty editorial role is assigned.': 'Aucun dépôt GitHub ni lien de contribution n’est encore configuré. Un contact pour les corrections et les retraits sera publié après l’attribution du rôle éditorial professoral.',
    'Graduate study': 'Études aux cycles supérieurs',
    'Courses across Montréal': 'Cours offerts à Montréal',
    'Discover quantum software courses across participating institutions. Each course record is separate from its term-specific offering evidence.': 'Découvrez les cours de logiciel quantique dans les établissements participants. Chaque fiche de cours est distincte des preuves d’offre propres à un trimestre.',
    'How this list is assembled': 'Comment cette liste est constituée',
    'Courses listed here are taught by faculty in the Montréal Quantique directory or attended by graduate students in the network. This keeps the local catalogue connected to the people represented here.': 'Les cours présentés ici sont enseignés par des membres du corps professoral du répertoire de Montréal Quantique ou suivis par des membres de la communauté étudiante des cycles supérieurs du réseau. Le catalogue local demeure ainsi lié aux personnes qui y sont représentées.',
    'For a broader view, consult the': 'Pour une vue d’ensemble plus large, consultez la',
    'McGill Cryptography and Quantum Information Laboratory course list': 'liste de cours du Laboratoire de cryptographie et d’information quantique de McGill',
    ', which also includes courses at Université de Montréal. Confirm current course details and availability in the': ', qui comprend également des cours de l’Université de Montréal. Confirmez les renseignements et l’offre actuels dans le',
    'official McGill Course Catalogue': 'catalogue officiel des cours de McGill',
    'and the relevant university schedule.': 'et dans l’horaire de l’université concernée.',
    'Taught by': 'Enseigné par',
    'Instructor': 'Personne enseignante',
    'Official catalogue': 'Catalogue officiel',
    'Filter courses': 'Filtrer les cours',
    'Clear all': 'Tout effacer',
    'Code, title, or topic': 'Sigle, titre ou sujet',
    'Institution': 'Établissement',
    'Level': 'Cycle',
    'Language': 'Langue',
    'Topic': 'Sujet',
    'Term': 'Trimestre',
    'Offering evidence': 'Preuve d’offre',
    'No courses match': 'Aucun cours correspondant',
    'Clear one or more filters.': 'Effacez un ou plusieurs filtres.',
    'Cross-university study': 'Études interuniversitaires',
    'The Bureau de coopération interuniversitaire’s AEHE framework can support study outside a home institution for regular students at Québec universities. A request proceeds through the home programme, the home registrar, and the host registrar; institutional rules still apply, and the host institution may refuse registration. This catalogue supports discovery and does not guarantee eligibility, registration, or credit approval.': 'Le régime d’autorisation d’études hors établissement du Bureau de coopération interuniversitaire peut permettre aux étudiantes et étudiants réguliers des universités québécoises de suivre des cours dans un autre établissement. La demande passe par le programme d’attache, le registrariat de l’établissement d’attache et celui de l’établissement d’accueil; les règles institutionnelles demeurent applicables et l’établissement d’accueil peut refuser l’inscription. Ce catalogue facilite la découverte et ne garantit ni l’admissibilité, ni l’inscription, ni la reconnaissance des crédits.',
    'Read the current BCI overview and application steps': 'Consulter la présentation et les étapes actuelles du BCI',
    'official agreement': 'entente officielle',
    'No public course records yet': 'Aucune fiche de cours publique pour le moment',
    'The public catalogue will open after institutions verify course records, offering evidence, and official links.': 'Le catalogue public ouvrira après la vérification institutionnelle des fiches de cours, des preuves d’offre et des liens officiels.',
    'People and expertise': 'Personnes et expertise',
    'Review the initial draft member roster.': 'Consultez la liste provisoire initiale des membres.',
    'The public roster will appear here after faculty review and approval.': 'La liste publique paraîtra ici après révision et approbation professorales.',
    'Profiles are ordered alphabetically and carry no ranking.': 'Les profils sont classés par ordre alphabétique et n’établissent aucun classement.',
    'Filter members': 'Filtrer les membres',
    'Name, topic, institution': 'Nom, sujet, établissement',
    'Role': 'Rôle',
    'Faculty / PI': 'Corps professoral / CP',
    'Graduate student': 'Étudiante ou étudiant aux cycles supérieurs',
    'Academic title pending review': 'Titre universitaire en attente de révision',
    'Topics pending review': 'Sujets en attente de révision',
    'View full profile': 'Voir le profil complet',
    'Research topic': 'Sujet de recherche',
    'Supervisor': 'Direction de recherche',
    'Directory view': 'Affichage du répertoire',
    'Cards': 'Cartes',
    'List': 'Liste',
    'members': 'membres',
    'No members match these filters': 'Aucun membre ne correspond à ces filtres',
    'Try removing one or more filters or searching with a broader term.': 'Retirez un ou plusieurs filtres ou utilisez un terme de recherche plus général.',
    'Clear all filters': 'Effacer tous les filtres',
    'Current results': 'Résultats actuels',
    'Explore the visible research community': 'Explorer la communauté de recherche visible',
    'These counts update with the directory filters. A person is counted once for each listed topic or institution.': 'Ces décomptes suivent les filtres du répertoire. Une personne est comptée une fois pour chaque sujet ou établissement répertorié.',
    'Programme updates': 'Actualités du programme',
    'Approved announcements, research highlights, course updates, and confirmed programme activity.': 'Annonces approuvées, faits saillants de la recherche, mises à jour des cours et activités confirmées du programme.',
    'No public news yet': 'Aucune actualité publique pour le moment',
    'Updates will appear after editorial review and publication approval.': 'Les mises à jour paraîtront après la révision éditoriale et l’approbation de publication.',
    'Talks and research visits': 'Conférences et visites de recherche',
    'Montréal Quantique speakers and visitors programme': 'Programme de conférences et de visites de Montréal Quantique',
    'The programme rotates across participating institutions, pairing six annual talks with at least six distinct research visitors and transparent lead-host accounting.': 'Le programme circule entre les établissements participants et combine six conférences annuelles avec au moins six personnes invitées distinctes, selon une répartition transparente des établissements responsables.',
    'The annual programme aims for six talks and at least six distinct research visitors, with transparent lead-host accounting across participating universities.': 'Le programme annuel vise six conférences et au moins six personnes invitées distinctes, avec une répartition transparente des établissements responsables parmi les universités participantes.',
    'talk records': 'conférences répertoriées',
    'distinct visitors': 'personnes invitées distinctes',
    'annual talk target': 'objectif annuel de conférences',
    'Schedule': 'Calendrier',
    'Talks': 'Conférences',
    'Status labels distinguish confirmed activity from proposals, postponements, cancellations, and completed events.': 'Les états distinguent les activités confirmées des propositions, reports, annulations et activités terminées.',
    'Date pending': 'Date à confirmer',
    'Download confirmed events (ICS)': 'Télécharger les événements confirmés (ICS)',
    'Lead-host accounting': 'Répartition des établissements responsables',
    'Fixtures': 'Attributions',
    'Cycle 1': 'Cycle 1',
    'Cycle 2': 'Cycle 2',
    'Fair rotation': 'Rotation équitable',
    'The deterministic allocation divides six lead-host slots as evenly as possible. Remainders rotate between cycle years. Joint events retain one lead host for accounting.': 'L’attribution déterministe répartit aussi également que possible six places d’établissement responsable. Les places restantes alternent entre les cycles. Un événement conjoint conserve un établissement responsable aux fins du décompte.',
    'Fixture allocations illustrate the method; they are not partner commitments.': 'Les attributions illustrent la méthode; elles ne constituent pas des engagements des partenaires.',
    'Research exchange': 'Échanges de recherche',
    'Visitors': 'Personnes invitées',
    'A person is counted once even when linked to several activities.': 'Une personne est comptée une seule fois même si elle participe à plusieurs activités.',
    'No public events or visits yet': 'Aucun événement ni visite publique pour le moment',
    'Public records will appear only after dates, hosts, visitor details, and publication approval are verified.': 'Les fiches publiques paraîtront seulement après vérification des dates, des établissements d’accueil, des renseignements sur les personnes invitées et de l’autorisation de publication.',
    'Research': 'Recherche',
    'Topics': 'Sujets',
    'Research profile': 'Profil de recherche',
    'Research overview': 'Aperçu de la recherche',
    'Research description pending faculty review.': 'Description de recherche en attente de la révision du corps professoral.',
    'Research topics': 'Sujets de recherche',
    'Detailed research topics are being prepared for faculty review.': 'Les sujets de recherche détaillés sont en préparation pour la révision du corps professoral.',
    'Links and contact': 'Liens et coordonnées',
    'Official profile and contact links are pending faculty review.': 'Le profil officiel et les coordonnées sont en attente de la révision du corps professoral.',
    'Profile details': 'Détails du profil',
    'Academic title': 'Titre universitaire',
    'Department': 'Département',
    'Last reviewed': 'Dernière révision',
    'Membership': 'Adhésion',
    'Unit': 'Unité',
    'Supervision': 'Direction de recherche',
    'No linked students in this preview.': 'Aucun membre de la communauté étudiante lié dans cet aperçu.',
    'Related members': 'Membres associés',
    'Related profiles will appear after detailed research topics are reviewed.': 'Les profils associés paraîtront après la révision des sujets de recherche détaillés.',
    'Shared research topic': 'Sujet de recherche commun',
    'Course record': 'Fiche du cours',
    'Offerings': 'Offres',
    'Official timetable': 'Horaire officiel',
    'No offering record is available.': 'Aucune preuve d’offre n’est disponible.',
    'Credits': 'Crédits',
    'See official record': 'Voir la fiche officielle',
    'Last checked': 'Dernière vérification',
    'Official catalogue record': 'Fiche du catalogue officiel',
    'confirmed': 'confirmé',
    'completed': 'terminé',
    'historical': 'historique',
    'usual term unconfirmed': 'trimestre habituel non confirmé',
    'pending': 'en attente',
    'Term pending': 'Trimestre à confirmer',
    'Usually every two or three years': 'Habituellement tous les deux ou trois ans',
    'undergraduate': 'premier cycle',
    'undergraduate/graduate': 'premier cycle / cycles supérieurs',
    'graduate': 'cycles supérieurs',
    'doctoral': 'doctorat',
    'proposed': 'proposé',
    'Proposed': 'Proposé',
    'Approved': 'Approuvé',
    'postponed': 'reporté',
    'cancelled': 'annulé',
    'More information': 'Renseignements supplémentaires',
    'Program': 'Programme',
    'About': 'À propos',
    'Partnerships and resources': 'Partenariats et ressources',
    'A faculty-led quantum software initiative across Montréal.': 'Une initiative montréalaise en logiciel quantique dirigée par le corps professoral.',
    'INTRIQ partnership language remains pending confirmation.': 'La formulation du partenariat avec l’INTRIQ reste à confirmer.',
    'Back to top': 'Retour en haut',
    'Institutions, alphabetical': 'Établissements, par ordre alphabétique',
    'Breadcrumb': 'Fil d’Ariane'
  };

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const translatableAttributes = ['aria-label', 'placeholder', 'title'];
  const observedAttributes = ['placeholder', 'title'];
  const originalTitle = document.title;

  function savedLanguage() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return supported.has(value) ? value : 'en';
    } catch (_) {
      return 'en';
    }
  }

  function translateValue(value) {
    if (translations[value]) return translations[value];
    const draftProfileMatch = value.match(/^Draft faculty profile for (.+) at (.+)\. Research description and detailed topic tags are being prepared for review\.$/);
    if (draftProfileMatch) return `Profil professoral provisoire de ${draftProfileMatch[1]} à ${draftProfileMatch[2]}. La description de recherche et les sujets détaillés sont en préparation pour révision.`;
    if (value === 'This private preview record identifies a faculty member in the initial Montréal Quantique roster. Public biography text and research classifications will be added after faculty review.') return 'Cette fiche d’aperçu privé identifie un membre du corps professoral dans la liste initiale de Montréal Quantique. La biographie publique et les classifications de recherche seront ajoutées après la révision du corps professoral.';
    const countMatch = value.match(/^(\d+) (members|courses)$/);
    if (countMatch) return `${countMatch[1]} ${countMatch[2] === 'members' ? 'membres' : 'cours'}`;
    const searchMatch = value.match(/^Search: (.+)$/);
    if (searchMatch) return `Recherche : ${searchMatch[1]}`;
    const searchChipMatch = value.match(/^Search: (.+) ×$/);
    if (searchChipMatch) return `Recherche : ${searchChipMatch[1]} ×`;
    const removeMatch = value.match(/^Remove (.+) filter$/);
    if (removeMatch) return `Retirer le filtre ${removeMatch[1]}`;
    const listedMatch = value.match(/^(.+), (\d+) listed (member|members)$/);
    if (listedMatch) return `${listedMatch[1]}, ${listedMatch[2]} membre${listedMatch[2] === '1' ? '' : 's'} répertorié${listedMatch[2] === '1' ? '' : 's'}`;
    return value;
  }

  function translateTextNode(node, language) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const original = originalText.get(node);
    const trimmed = original.trim();
    if (!trimmed) return;
    const replacement = language === 'fr' ? translateValue(trimmed) : trimmed;
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];
    const next = `${leading}${replacement}${trailing}`;
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  function translateElement(element, language) {
    if (element.closest('[data-i18n-ignore]')) return;
    let attributes = originalAttributes.get(element);
    if (!attributes) {
      attributes = {};
      originalAttributes.set(element, attributes);
    }
    translatableAttributes.forEach((name) => {
      if (element.hasAttribute(name) && attributes[name] === undefined) attributes[name] = element.getAttribute(name);
    });
    Object.entries(attributes).forEach(([name, original]) => {
      const next = language === 'fr' ? translateValue(original) : original;
      if (element.getAttribute(name) !== next) element.setAttribute(name, next);
    });
  }

  function translateSubtree(root, language) {
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root, language);
      return;
    }
    if (!(root instanceof Element) && root !== document.body) return;
    if (root instanceof Element) translateElement(root, language);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, language);
      else translateElement(node, language);
      node = walker.nextNode();
    }
  }

  function applyLanguage(language, persist = true) {
    const next = supported.has(language) ? language : 'en';
    document.documentElement.lang = next;
    document.title = next === 'fr'
      ? originalTitle.split(' · ').map((part) => translateValue(part)).join(' · ')
      : originalTitle;
    translateSubtree(document.body, next);
    document.querySelectorAll('[data-theme-en]').forEach((element) => {
      const hasReviewedFrench = [...(element.parentElement?.children || [])]
        .some((sibling) => sibling !== element && sibling.hasAttribute('data-theme-fr'));
      element.hidden = next === 'fr' && hasReviewedFrench;
    });
    document.querySelectorAll('[data-theme-fr]').forEach((element) => { element.hidden = next !== 'fr'; });
    document.querySelectorAll('[data-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === next));
    });
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, next); } catch (_) { /* storage is optional */ }
    }
    document.dispatchEvent(new CustomEvent('mq:languagechange', { detail: { language: next } }));
  }

  const initial = savedLanguage();
  applyLanguage(initial, false);
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language));
  });

  const observer = new MutationObserver((mutations) => {
    const language = document.documentElement.lang;
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData') translateTextNode(mutation.target, language);
      mutation.addedNodes.forEach((node) => translateSubtree(node, language));
      if (mutation.type === 'attributes') translateElement(mutation.target, language);
    });
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: observedAttributes });
})();
