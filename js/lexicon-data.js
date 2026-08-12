/* ===========================================================
   Bɔ̀ Bà — Lexique mambila centralisé
   Chaque définition est reprise fidèlement du contexte où le
   terme apparaît dans les pages du site — rien n'est ajouté qui
   ne soit pas déjà écrit ailleurs sur le site. Le champ "page"
   pointe vers la page qui traite le terme le plus en détail.
   =========================================================== */
const MAMBILA_LEXICON = [
  {
    term: "sua",
    variants: ["suàgà"],
    def: "Serment-rituel, mascarade et force agissante à la fois — un concept unitaire, non trois choses distinctes.",
    page: "religion.html#sua"
  },
  {
    term: "Càŋ",
    variants: ["Chang"],
    def: "Le créateur, aussi le mot pour « Dieu » et pour l'esprit personnel de chacun.",
    page: "religion.html#chang"
  },
  {
    term: "mgbe",
    variants: [],
    def: "« Chef » en mambila — mot sans doute d'origine tikar, emprunté avec l'institution elle-même.",
    page: "chefferie.html#institution"
  },
  {
    term: "Bɔ̀ Kuku Bɔ̀",
    variants: [],
    def: "Littéralement « les grands » — les Notables du village, des anciens reconnus par consensus social plutôt que par simple ancienneté.",
    page: "chefferie.html#notables"
  },
  {
    term: "jolóri",
    variants: [],
    def: "Le bâtiment public du palais du chef, où il siège avec les Notables.",
    page: "chefferie.html#disputes"
  },
  {
    term: "lɔɔ́",
    variants: [],
    def: "« Enclos » ou « village », selon le contexte — signe d'une organisation résidentielle sans limites fixes.",
    page: "societe.html#residence"
  },
  {
    term: "nyu",
    variants: [],
    def: "Le fils de la sœur — une relation à part, plus amicale que la relation père-fils, sans les enjeux d'autorité et d'héritage.",
    page: "societe.html#nyu"
  },
  {
    term: "menim",
    variants: [],
    def: "Groupe d'origine, lié aux mariages d'échange, dans le système de parenté bilatérale documenté par Rehfisch au Nigéria.",
    page: "societe.html#parente"
  },
  {
    term: "man",
    variants: [],
    def: "Groupe de parenté bilatérale et co-résidentielle, dans le système documenté par Rehfisch au Nigéria.",
    page: "societe.html#parente"
  },
  {
    term: "lóp",
    variants: ["lɔp"],
    def: "Désigne à la fois la relation matrilatérale et la sorcellerie elle-même — car c'est par cette voie qu'elle se transmet.",
    page: "religion.html#sorcellerie"
  },
  {
    term: "ŋgam dù",
    variants: [],
    def: "La divination par araignées ou crabes — seule forme de divination jugée recevable pour accuser formellement un sorcier.",
    page: "personnages.html#notables"
  },
  {
    term: "kulu sua",
    variants: [],
    def: "Rite de réconciliation par le serment sua, utilisé pour clore un différend, par exemple entre un mari et un accusé d'adultère.",
    page: "chefferie.html#cas"
  },
  {
    term: "jere",
    variants: [],
    def: "L'enclos rituel construit pour l'initiation à la société sua des hommes, à partir de bois de plusieurs essences tenues secrètes.",
    page: "religion.html#initiation"
  },
  {
    term: "sér",
    variants: [],
    def: "Les sauces qui accompagnent la pâte de maïs quotidienne.",
    page: "economie.html#cultures"
  },
  {
    term: "ŋgóndóm",
    variants: [],
    def: "Le travail communautaire bisannuel auquel tout le village se mobilise, organisé par le chef.",
    page: "economie.html#travail"
  },
  {
    term: "Ŋgwun",
    variants: [],
    def: "Rite bisannuel dans lequel les fils des sœurs du chef (bɔ̀ nyu mgbe) remplissent des fonctions rituelles spécifiques, notamment autour du culte des crânes des chefs.",
    page: "societe.html#nyu"
  },
  {
    term: "bɔ̀ nyu mgbe",
    variants: [],
    def: "« Fils des sœurs du chef » — seuls autorisés à entrer dans la hutte où reposent les crânes des chefs défunts.",
    page: "societe.html#nyu"
  },
  {
    term: "Mgbe ti",
    variants: [],
    def: "« Chefs à la queue de buffle » — seulement trois sur la plaine des Tikar (Somié, Sonkolong, Taga Baŋ), avec droit exclusif sur le gibier mbe.",
    page: "chefferie.html#hierarchie"
  },
  {
    term: "Mgbe ndun",
    variants: [],
    def: "Les autres chefs, du chef d'Atta au simple chef de hameau (Mgbe-ŋguŋ).",
    page: "chefferie.html#hierarchie"
  },
  {
    term: "njulu lóŋ",
    variants: [],
    def: "Le don des « yeux ouverts », permettant de détecter d'autres sorciers — hérité passivement de la sorcellerie transmise par la mère.",
    page: "religion.html#sorcellerie"
  },
  {
    term: "ta nduan",
    variants: [],
    def: "Déclaration publique avertissant, sans nommer personne, que la sorcellerie détectée se retournera contre son auteur si elle ne cesse pas.",
    page: "religion.html#sorcellerie"
  },
  {
    term: "julu",
    variants: [],
    def: "Ce qui est interdit, notamment le contact rituel proscrit pendant les préparatifs du sua des hommes.",
    page: "religion.html#initiation"
  },
  {
    term: "seé lan",
    variants: ["Seé lan"],
    def: "Travail sur invitation, rétribué en bière avant, pendant et après le chantier.",
    page: "economie.html#travail"
  },
  {
    term: "seé cucɔŋ",
    variants: ["Seé cucɔŋ"],
    def: "Équipe de travail rotative : chaque membre reçoit à son tour l'aide du groupe sur son propre champ.",
    page: "economie.html#travail"
  },
  {
    term: "tetaga",
    variants: [],
    def: "Poisson (synodontis) cuit sur des pierres, utilisé dans plusieurs rites, dont celui marquant la fin de la réclusion post-natale.",
    page: "rites.html#naissance"
  },
  {
    term: "Wajiri",
    variants: [],
    def: "Titre honorifique fulfulde pris par le fils de sœur du chef qui assure la régence durant un interrègne.",
    page: "chefferie.html#succession"
  },
  {
    term: "Marenjo",
    variants: [],
    def: "Les cinq femmes titrées qui dirigent la cérémonie bisannuelle du sua féminin.",
    page: "religion.html#sua-femmes"
  }
];
