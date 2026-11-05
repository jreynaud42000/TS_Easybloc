/* ══════════════════════════════════════════════════════════════════════════
   EasyBloc micro:bit — données des fiches d'aide en français (étape 10, nov. 2026).

   Une entrée par fiche (même schéma que le modèle EasyBloc R4) :
     t        type du bloc (fichier aide/<t>.html)
     titre    ce qui est écrit sur le bloc (… à la place des cases)
     sert     « À quoi ça sert ? » (texte, ou tableau de paragraphes)
     valeur   pour un bloc rond : 'nombre', 'logique', 'texte' ou 'liste'
     util     « Comment l'utiliser ? » (replié à l'ouverture)
     savoir   « À savoir » : broches, plages, unités, temps, pièges (replié à l'ouverture)
     legende  ce que fait le programme d'exemple
     exemple  programme d'exemple COMPLET (blocs au format Blockly, liste des blocs de tête) ;
              sans « exemple », celui de l'aide d'avant (exempleDe, ou le type du bloc) est repris.
   Dans les textes, **mot** s'affiche en gras.
   Règles de rédaction (PROMPT.md) : mots simples ; dire ce que le bloc RENVOIE ; « le bloc « … » » pour citer un
   autre bloc ; plage et précision d'un capteur seulement si la documentation du module exact les donne.
   ══════════════════════════════════════════════════════════════════════════ */
/* Petits outils pour écrire les programmes d'exemple (format de sérialisation Blockly). */
function B(type, champs, entrees) { var b = { type: type }; if (champs) b.fields = champs; if (entrees) b.inputs = entrees; return b; }
function V(b) { return { block: b }; }
function N(n) { return V(B('math_number', { NUM: n })); }
function S() { var bs = Array.prototype.slice.call(arguments); for (var i = bs.length - 2; i >= 0; i--) bs[i].next = { block: bs[i + 1] }; return { block: bs[0] }; }
function ICONE(i) { return B('afficher_icone', { ICONE: i }); }
function ATT(s) { return B('attendre_temps', { UNITE: 's' }, { TEMPS: N(s) }); }

window.FICHES = [
  {
    t: 'afficher_icone',
    titre: 'afficher l\'icône …',
    sert: 'Allume sur la **matrice de LED** de la carte une petite image toute prête : un cœur, un visage heureux, un visage triste ou un fantôme.',
    util: [
      'Choisissez l\'icône dans la liste du bloc.',
      'Placez le bloc dans le bloc « au démarrage » pour l\'afficher une fois, ou dans le bloc « répéter indéfiniment » avec le bloc « attendre » pour faire une animation.',
    ],
    savoir: [
      'L\'icône **reste affichée** jusqu\'au prochain affichage, ou jusqu\'au bloc « effacer l\'écran ».',
      'Pour dessiner votre propre image, LED par LED, utilisez le bloc « afficher l\'image ».',
    ],
    legende: 'Le cœur s\'affiche une seconde, puis s\'efface une seconde, sans fin.',
  },
  {
    t: 'grove_led_etat',
    titre: '[LED] contrôler la LED à … sur la broche …',
    sert: 'Allume ou éteint le **module LED Grove** branché sur une broche de la carte.',
    util: [
      'Choisissez **HAUT (1)** pour allumer la LED, **BAS (0)** pour l\'éteindre.',
      'Choisissez la broche où le câble du module est branché (P0, P1, P2…).',
    ],
    savoir: [
      'C\'est **tout ou rien** : pour régler la luminosité, utilisez le bloc « [LED] régler la luminosité à … ».',
      'Sur la Grove Shield, le port **P0/P14** correspond à la broche P0, le port **P1/P15** à P1, le port **P2/P16** à P2.',
      'La LED reste dans son état jusqu\'au prochain bloc qui la commande.',
    ],
    legende: 'La LED branchée sur P0 s\'allume une seconde, puis s\'éteint une seconde, sans fin.',
  },
  {
    t: 'grove_potentiometre',
    titre: 'potentiomètre sur … en …',
    sert: 'Renvoie la position du bouton du **potentiomètre Grove** (bouton que l\'on tourne).',
    valeur: 'nombre',
    util: [
      'Choisissez la broche du module : **P0, P1 ou P2** (les entrées analogiques).',
      'Choisissez l\'unité : la **valeur brute** de 0 à 1023, l\'**angle** de 0 à 300° (la course du bouton) ou le **pourcentage** de 0 à 100 %.',
    ],
    savoir: [
      'Seules les broches **P0, P1 et P2** savent lire une valeur entre 0 et 1023.',
      'Dans le simulateur, tournez le bouton dessiné dans le montage, ou le curseur « Potentiomètre » du tableau « Périphériques ».',
    ],
    legende: 'L\'angle du potentiomètre branché sur P0 s\'affiche sur la matrice de LED, puis la mesure recommence.',
  },
  {
    t: 'grove_pir',
    titre: 'mouvement détecté sur …',
    sert: 'Renvoie **vrai** quand le **détecteur de mouvement Grove** (capteur PIR) voit bouger une personne ou un animal devant lui, **faux** sinon.',
    valeur: 'logique',
    util: [
      'Choisissez la broche où le détecteur est branché.',
      'Mettez ce bloc directement dans un bloc « si ».',
    ],
    savoir: [
      'Il sent la **chaleur d\'un corps qui bouge** : un objet froid qui bouge ne le déclenche pas.',
      'Après un mouvement, il reste à **vrai** quelques secondes.',
      'Dans le simulateur, cliquez sur la lentille blanche du détecteur dans le montage, ou cochez « mouvement détecté » dans le tableau « Périphériques ».',
    ],
    legende: 'Le buzzer branché sur P1 bipe quand le détecteur de mouvement branché sur P0 voit bouger.',
  },
  // ═══════════════ Boucles ═══════════════
  {
    t: 'au_demarrage',
    titre: 'au démarrage',
    sert: 'Exécute **une seule fois** les blocs placés à l\'intérieur, quand la carte démarre.',
    util: [
      'Placez dedans ce qui ne doit se faire qu\'une fois : un message d\'accueil, le réglage d\'un module, la valeur de départ d\'une variable.',
      'Accrochez le bloc « répéter indéfiniment » juste en dessous pour la suite du programme.',
    ],
    savoir: [
      'Il n\'y a **qu\'un seul** bloc « au démarrage » par programme.',
      'Rien ne s\'accroche au-dessus : c\'est toujours le premier bloc du programme.',
    ],
    legende: 'Le mot « Prêt » défile une fois au démarrage, puis un visage heureux reste affiché.',
  },
  {
    t: 'boucle_infinie',
    titre: 'répéter indéfiniment',
    sert: 'Répète **sans fin** les blocs placés à l\'intérieur. C\'est la boucle principale du programme.',
    util: [
      'Accrochez-le sous le bloc « au démarrage ».',
      'Placez dedans ce que la carte doit faire en permanence : lire un capteur, afficher une valeur, tester un bouton.',
    ],
    savoir: [
      'La carte ne sort jamais de cette boucle : les blocs accrochés **en dessous** ne s\'exécutent jamais.',
      'Ajoutez un bloc « attendre » pour ralentir la boucle, par exemple pour laisser le temps de lire une valeur.',
    ],
    legende: 'Le cœur s\'affiche une seconde, puis s\'efface une seconde, sans fin.',
  },
  {
    t: 'controls_repeat_ext',
    titre: 'répéter … fois',
    sert: 'Répète les blocs placés dans « faire » le **nombre de fois** choisi, puis passe à la suite du programme.',
    util: [
      'Écrivez le nombre de tours dans la case, ou mettez-y un bloc qui renvoie un nombre (une variable, par exemple).',
      'Placez dans « faire » les blocs à répéter.',
    ],
    savoir: [
      'Avec **0** dans la case, les blocs de « faire » ne s\'exécutent pas.',
      'Pour connaître le numéro du tour en cours, utilisez plutôt le bloc « compter avec … de … à … par … ».',
    ],
    legende: 'Au démarrage, le cœur clignote 3 fois, puis un visage heureux reste affiché.',
    exemple: [B('au_demarrage', null, { DO: S(
      B('controls_repeat_ext', null, { TIMES: N(3), DO: S(ICONE('HEART'), ATT(0.5), B('effacer_ecran'), ATT(0.5)) }),
      ICONE('HAPPY')) })],
  },
  {
    t: 'controls_whileUntil',
    titre: 'répéter tant que … / répéter jusqu\'à ce que …',
    sert: 'Répète les blocs placés dans « faire » **tant qu\'une condition est vraie** (« tant que »), ou **jusqu\'à ce qu\'elle devienne vraie** (« jusqu\'à ce que »).',
    util: [
      'Choisissez « tant que » ou « jusqu\'à ce que » dans la liste du bloc.',
      'Accrochez dans la case une condition : un bloc qui renvoie vrai ou faux (bouton appuyé, comparaison…).',
      'Placez dans « faire » les blocs à répéter.',
    ],
    savoir: [
      'La condition est testée **au début de chaque tour** : si elle est déjà fausse (« tant que ») ou déjà vraie (« jusqu\'à ce que ») au départ, les blocs de « faire » ne s\'exécutent pas.',
      'Si la condition ne change jamais, la boucle ne s\'arrête jamais et la suite du programme ne s\'exécute pas.',
      'Dans le simulateur, une condition qui dépend d\'un bouton ou d\'un capteur ne peut pas changer pendant que la boucle tourne : une telle boucle ne fonctionne que sur la vraie carte. Dans le simulateur, testez plutôt le bouton avec un bloc « si » placé dans le bloc « répéter indéfiniment ».',
    ],
    legende: 'Au démarrage, la carte tire un nombre au hasard entre 1 et 6 et l\'affiche, jusqu\'à obtenir un 6 ; ensuite un visage heureux reste affiché.',
    exemple: [B('au_demarrage', null, { DO: S(
      B('variables_set', { VAR: { name: 'dé' } }, { VALUE: N(0) }),
      B('controls_whileUntil', { MODE: 'UNTIL' }, {
        BOOL: V(B('logic_compare', { OP: 'EQ' }, { A: V(B('variables_get', { VAR: { name: 'dé' } })), B: N(6) })),
        DO: S(B('variables_set', { VAR: { name: 'dé' } }, { VALUE: V(B('math_random_int', null, { FROM: N(1), TO: N(6) })) }),
              B('afficher_valeur', null, { VALEUR: V(B('variables_get', { VAR: { name: 'dé' } })) }), ATT(1)) }),
      ICONE('HAPPY')) })],
  },
  {
    t: 'controls_for',
    titre: 'compter avec … de … à … par …',
    sert: 'Répète les blocs placés dans « faire » en faisant **compter une variable** : elle prend la valeur de départ, puis augmente du pas choisi à chaque tour, jusqu\'à la valeur d\'arrivée.',
    util: [
      'Choisissez la variable dans la liste du bloc (**i** au départ).',
      'Écrivez la valeur de départ, la valeur d\'arrivée et le pas (de combien la variable change à chaque tour).',
      'Dans « faire », utilisez le bloc de la variable (catégorie « Variables ») pour connaître le numéro du tour.',
    ],
    savoir: [
      'La valeur d\'arrivée **est comprise** : « de 1 à 5 par 1 » fait 5 tours (1, 2, 3, 4, 5).',
      'Si la valeur de départ est plus grande que la valeur d\'arrivée, la variable diminue : « de 5 à 1 par 1 » compte 5, 4, 3, 2, 1.',
    ],
    legende: 'Au démarrage, les nombres 1, 2, 3, 4 et 5 s\'affichent l\'un après l\'autre, puis un visage heureux reste affiché.',
    exemple: [B('au_demarrage', null, { DO: S(
      B('controls_for', { VAR: { name: 'i' } }, { FROM: N(1), TO: N(5), BY: N(1),
        DO: S(B('afficher_valeur', null, { VALEUR: V(B('variables_get', { VAR: { name: 'i' } })) }), ATT(1)) }),
      ICONE('HAPPY')) })],
  },

  // ═══════════════ Temps ═══════════════
  {
    t: 'attendre_temps',
    titre: 'attendre … seconde.s',
    sert: 'Met le programme **en pause** pendant la durée choisie, puis passe au bloc suivant.',
    util: [
      'Écrivez la durée dans la case, ou mettez-y un bloc qui renvoie un nombre.',
      'Choisissez l\'unité : **secondes** ou **millisecondes** (1 seconde = 1000 millisecondes).',
    ],
    savoir: [
      'Pendant la pause, **rien d\'autre** ne s\'exécute.',
      'En secondes, un nombre à virgule s\'écrit avec un point : **0.5** attend une demi-seconde.',
    ],
    legende: 'Le cœur s\'affiche une seconde, puis s\'efface une seconde, sans fin.',
  },
  {
    t: 'attendre_jusqua',
    titre: 'attendre jusqu\'à …',
    sert: 'Met le programme en pause **jusqu\'à ce qu\'une condition devienne vraie**, puis passe au bloc suivant.',
    util: [
      'Accrochez dans la case une condition : un bloc qui renvoie vrai ou faux (bouton appuyé, mouvement détecté, comparaison…).',
    ],
    savoir: [
      'La condition est vérifiée toutes les **10 millisecondes**.',
      'Dans le bloc « au démarrage », le programme attend vraiment, simulateur compris. Dans le bloc « répéter indéfiniment », le simulateur passe le tour tant que la condition est fausse et réessaie au tour suivant.',
    ],
    legende: 'Un visage triste reste affiché tant que l\'on n\'appuie pas sur le bouton A ; ensuite un cœur apparaît.',
  },
  {
    t: 'repeter_toutes_les',
    titre: 'répéter toutes les … h … min … s … ms',
    sert: 'Répète **sans fin** les blocs placés à l\'intérieur, avec une pause de la durée choisie après chaque passage.',
    util: [
      'Écrivez la durée en heures, minutes, secondes et millisecondes : les cases s\'additionnent (0 h 1 min 30 s 0 ms = une minute et demie).',
      'Placez dedans les blocs à répéter, par exemple une mesure à afficher.',
    ],
    savoir: [
      'La pause vient **après** les blocs : un tour dure le temps des blocs, plus la pause.',
      'C\'est une boucle sans fin : les blocs accrochés **en dessous** ne s\'exécutent jamais.',
    ],
    legende: 'La température de la carte s\'affiche, puis la mesure recommence 5 secondes plus tard.',
  },
  {
    t: 'reset_chrono',
    titre: 'remettre le chronomètre à 0',
    sert: 'Fait **repartir de 0** le chronomètre du programme.',
    util: [
      'Placez-le au moment où la mesure doit commencer : dans le bloc « au démarrage », ou quand un bouton est pressé.',
      'Lisez ensuite le temps écoulé avec le bloc « valeur du chronomètre en … ».',
    ],
    savoir: [
      'Il n\'y a **qu\'un seul** chronomètre dans le programme : chaque bloc « remettre le chronomètre à 0 » le fait repartir de 0.',
    ],
    legende: 'Le chronomètre part de 0 au démarrage, puis le temps écoulé, en secondes, s\'affiche chaque seconde.',
  },
  {
    t: 'valeur_chrono',
    titre: 'valeur du chronomètre en …',
    sert: 'Renvoie le **temps écoulé** depuis le dernier bloc « remettre le chronomètre à 0 ».',
    valeur: 'nombre',
    util: [
      'Choisissez l\'unité : **(s)** pour les secondes, **(ms)** pour les millisecondes.',
      'Mettez ce bloc dans un bloc qui attend un nombre : afficher, comparer, ranger dans une variable.',
    ],
    savoir: [
      'Sans bloc « remettre le chronomètre à 0 », le temps est compté depuis le démarrage de la carte.',
      'En secondes, le résultat peut être un nombre à virgule (par exemple 2.5).',
    ],
    legende: 'Le chronomètre part de 0 au démarrage, puis le temps écoulé, en secondes, s\'affiche chaque seconde.',
  },
  // ═══════════════ Matrice LED ═══════════════
  {
    t: 'afficher_valeur',
    titre: 'afficher …',
    sert: 'Montre un **nombre** ou un **texte** sur la **matrice de LED** de la carte.',
    util: [
      'Accrochez dans la case un nombre, un texte, ou un bloc qui renvoie une valeur (une mesure, une variable…).',
    ],
    savoir: [
      'Un texte de plusieurs caractères s\'affiche **un caractère après l\'autre**, sans défiler ; le dernier reste allumé.',
      'Pour faire glisser un texte de droite à gauche, utilisez le bloc « faire défiler ».',
      'La valeur reste affichée jusqu\'au prochain affichage, ou jusqu\'au bloc « effacer l\'écran ».',
    ],
    legende: 'Un nombre au hasard entre 1 et 6 s\'affiche, puis un autre 2 secondes plus tard, sans fin.',
  },
  {
    t: 'faire_defiler',
    titre: 'faire défiler …',
    sert: 'Fait **glisser** un texte ou un nombre de droite à gauche sur la **matrice de LED**.',
    util: [
      'Accrochez dans la case un texte, un nombre, ou un bloc qui renvoie une valeur.',
    ],
    savoir: [
      'Le programme **attend la fin du défilement** avant de passer au bloc suivant : un long texte prend plusieurs secondes.',
      'À la fin du défilement, la matrice est éteinte.',
    ],
    legende: 'Le texte « Bonjour ! » défile une fois au démarrage.',
  },
  {
    t: 'afficher_image_matrice',
    titre: 'afficher l\'image …',
    sert: 'Allume sur la **matrice de LED** une image que vous dessinez vous-même, LED par LED.',
    util: [
      'Chaque case du bloc correspond à une LED de la matrice : cochez les cases des LED à allumer.',
    ],
    savoir: [
      'La grille du bloc a la même disposition que la matrice : **5 lignes de 5 LED**.',
      'Les LED cochées s\'allument à **pleine luminosité**.',
      'L\'image reste affichée jusqu\'au prochain affichage, ou jusqu\'au bloc « effacer l\'écran ».',
    ],
    legende: 'Un sourire dessiné case par case s\'affiche au démarrage.',
  },
  {
    t: 'effacer_ecran',
    titre: 'effacer l\'écran',
    sert: '**Éteint toutes les LED** de la matrice de la carte.',
    util: [
      'Placez-le après un affichage pour le faire disparaître, par exemple avec le bloc « attendre » pour faire clignoter une image.',
    ],
    savoir: [
      'Il n\'éteint que la matrice de LED : les modules branchés sur la carte (LED, afficheurs…) ne changent pas.',
    ],
    legende: 'Le cœur s\'affiche une seconde, puis s\'efface une seconde, sans fin.',
  },
  {
    t: 'afficher_console',
    titre: 'afficher dans la console …',
    sert: 'Écrit un nombre ou un texte dans la **console**, sur une nouvelle ligne à chaque fois. Pratique pour suivre des mesures sans occuper la matrice de LED.',
    util: [
      'Accrochez dans la case un texte, un nombre, ou un bloc qui renvoie une valeur.',
      'Ouvrez la console avec le bouton « Afficher la console » de la barre d\'outils, en haut : elle s\'ouvre en bas de l\'écran.',
    ],
    savoir: [
      'Sur la vraie carte, le texte part par le **câble USB** : il s\'affiche dans la console après « Connecter » (navigateur Chrome ou Edge).',
      'Rien ne s\'affiche sur la matrice de LED.',
    ],
    legende: 'Le mot « Démarrage » s\'écrit une fois, puis la température de la carte s\'écrit chaque seconde dans la console.',
  },
  // ═══════════════ Entrées/Sorties ═══════════════
  {
    t: 'si_bouton_appuye',
    titre: 'si le bouton … est appuyé alors',
    sert: 'Exécute les blocs placés à l\'intérieur **si le bouton choisi est enfoncé** au moment où le programme passe sur ce bloc.',
    util: [
      'Choisissez le bouton : **A**, **B**, ou **A+B** (les deux en même temps).',
      'Placez ce bloc dans le bloc « répéter indéfiniment » pour surveiller le bouton en permanence.',
    ],
    savoir: [
      'Le bouton n\'est regardé qu\'au **passage du programme** : pendant un bloc « attendre », un appui très court peut passer inaperçu.',
      'Pour réagir à chaque appui, même court, utilisez plutôt le bloc « lorsque le bouton … est pressé ».',
      'Dans le simulateur, appuyez sur les boutons A et B de la carte dessinée.',
    ],
    legende: 'Le bouton A affiche un visage heureux, le bouton B efface l\'écran.',
  },
  {
    t: 'si_logo_touche',
    titre: 'si LOGO est touché alors',
    sert: 'Exécute les blocs placés à l\'intérieur **si le logo tactile** de la carte est touché au moment où le programme passe sur ce bloc.',
    util: [
      'Placez ce bloc dans le bloc « répéter indéfiniment » pour surveiller le logo en permanence.',
    ],
    savoir: [
      'Le logo tactile est le petit dessin doré au-dessus de la matrice de LED : il n\'existe que sur la carte **micro:bit V2**.',
      'Un simple contact du doigt suffit, sans appuyer.',
      'Dans le simulateur, cliquez sur le logo de la carte dessinée.',
    ],
    legende: 'Un cœur s\'affiche quand le logo est touché.',
  },
  {
    t: 'si_secoue_alors',
    titre: 'si secoué alors',
    sert: 'Exécute les blocs placés à l\'intérieur **si la carte a été secouée** depuis le dernier passage du programme sur ce bloc.',
    util: [
      'Placez ce bloc dans le bloc « répéter indéfiniment ».',
    ],
    savoir: [
      'Chaque secousse n\'est comptée **qu\'une seule fois** : au passage suivant, le bloc attend une nouvelle secousse.',
      'Pour savoir si la carte est secouée **en ce moment**, utilisez le bloc « geste … est actif ».',
      'Dans le simulateur, cliquez sur le bouton « Secouer la carte », sous la carte dessinée.',
    ],
    legende: 'À chaque secousse, un fantôme apparaît une seconde.',
  },
  {
    t: 'bouton_est_appuye',
    titre: 'bouton … est appuyé',
    sert: 'Renvoie **vrai** tant que le bouton choisi est enfoncé, **faux** sinon.',
    valeur: 'logique',
    util: [
      'Choisissez le bouton : **A**, **B**, ou **A+B** (les deux en même temps).',
      'Mettez ce bloc dans un bloc « si » ou « attendre jusqu\'à ».',
    ],
    savoir: [
      'Il renvoie l\'état du bouton **au moment** où le programme le lit : un appui très court, pendant un bloc « attendre », peut passer inaperçu.',
      'Dans le simulateur, appuyez sur les boutons A et B de la carte dessinée.',
    ],
    legende: 'Le bouton A affiche un cœur, le bouton B efface l\'écran.',
  },
  {
    t: 'logo_est_touche',
    titre: 'le logo est appuyé',
    sert: 'Renvoie **vrai** tant que le logo tactile de la carte est touché, **faux** sinon.',
    valeur: 'logique',
    util: [
      'Mettez ce bloc dans un bloc « si » ou « attendre jusqu\'à ».',
    ],
    savoir: [
      'Le logo tactile n\'existe que sur la carte **micro:bit V2**.',
      'Dans le simulateur, cliquez sur le logo de la carte dessinée.',
    ],
    legende: 'Un cœur s\'affiche tant que le logo est touché.',
  },
  {
    t: 'nombre_clics_bouton',
    titre: 'nombre de clics du bouton …',
    sert: 'Renvoie le **nombre total de clics** sur le bouton choisi depuis le démarrage de la carte.',
    valeur: 'nombre',
    util: [
      'Choisissez le bouton : **A** ou **B**.',
      'Comparez le résultat à un nombre dans un bloc « si », ou affichez-le.',
    ],
    savoir: [
      'Le compteur **ne se remet jamais à 0** tout seul : il compte tous les clics depuis le démarrage, même espacés.',
      'Un clic est compté même si le programme était occupé ailleurs à ce moment-là.',
    ],
    legende: 'Un cœur s\'affiche quand le bouton B a été pressé 10 fois en tout.',
  },
  {
    t: 'reinitialiser_microbit',
    titre: '[Micro:bit] réinitialiser la carte',
    sert: '**Redémarre la carte** : le programme recommence depuis le début, comme après un appui sur le bouton reset, au dos de la carte.',
    util: [
      'Placez-le à l\'endroit où le programme doit repartir de zéro, par exemple quand un bouton est pressé.',
    ],
    savoir: [
      'Rien ne peut s\'accrocher sous ce bloc : la carte redémarre aussitôt.',
      'Les variables reprennent leur valeur de départ et le chronomètre repart de 0.',
    ],
    legende: 'Un cœur s\'affiche à chaque démarrage ; le bouton A redémarre la carte.',
  },
];
