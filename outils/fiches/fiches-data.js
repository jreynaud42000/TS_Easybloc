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
  // ═══════════════ Capteurs ═══════════════
  {
    t: 'lorsque_bouton',
    titre: 'lorsque le bouton … est pressé',
    sert: 'Exécute les blocs placés à l\'intérieur **à chaque appui** sur le bouton choisi.',
    util: [
      'Choisissez le bouton : **A**, **B**, ou **A+B** (les deux en même temps).',
      'Posez ce bloc seul dans l\'espace de travail : il ne s\'accroche à aucun autre bloc.',
    ],
    savoir: [
      'Un appui ne déclenche le bloc **qu\'une fois**, même si le bouton reste enfoncé.',
      'Un appui sur **A+B** ne déclenche pas en plus les blocs « lorsque le bouton A » et « lorsque le bouton B ».',
      'Le bouton est surveillé à chaque tour de la boucle principale du programme (ajoutée automatiquement s\'il n\'y en a pas).',
      'Dans le simulateur, appuyez sur les boutons A et B de la carte dessinée.',
    ],
    legende: 'Le bouton A affiche un visage heureux, le bouton B efface l\'écran.',
  },
  {
    t: 'lorsque_geste',
    titre: 'lorsque …',
    sert: 'Exécute les blocs placés à l\'intérieur quand la carte fait le **geste** choisi : secouée, logo vers le haut ou logo vers le bas.',
    util: [
      'Choisissez le geste dans la liste du bloc.',
      'Posez ce bloc seul dans l\'espace de travail : il ne s\'accroche à aucun autre bloc.',
    ],
    savoir: [
      'Chaque geste ne déclenche le bloc **qu\'une fois** par mouvement.',
      'Dans le simulateur, seul le geste « secouer » existe : cliquez sur le bouton « Secouer la carte », sous la carte dessinée.',
    ],
    legende: 'Quand on secoue la carte, un fantôme apparaît une seconde.',
  },
  {
    t: 'lorsque_broche',
    titre: 'lorsque la broche … est …',
    sert: 'Exécute les blocs placés à l\'intérieur quand la broche **P0, P1 ou P2** est touchée avec le doigt (« activée »), ou quand on la lâche (« relâchée »).',
    util: [
      'Choisissez la broche, puis « activée » ou « relâchée ».',
      'Posez ce bloc seul dans l\'espace de travail : il ne s\'accroche à aucun autre bloc.',
    ],
    savoir: [
      '**Un seul doigt** sur la broche suffit : le mode tactile de la carte V2 est activé automatiquement.',
      'Une broche utilisée comme touche ne doit pas servir en même temps à un module branché.',
      'Dans le simulateur, cliquez sur la broche 0, 1 ou 2 de la carte dessinée.',
    ],
    legende: 'Un doigt sur P0 affiche un visage heureux pendant une seconde.',
  },
  {
    t: 'lorsque_son_detecte',
    titre: 'lorsque le son … est détecté',
    sert: 'Exécute les blocs placés à l\'intérieur quand le **micro** de la carte entend un son **bruyant**, ou quand il redevient **faible**.',
    util: [
      'Choisissez « bruyant » ou « faible ».',
      'Posez ce bloc seul dans l\'espace de travail : il ne s\'accroche à aucun autre bloc.',
    ],
    savoir: [
      'Le micro n\'existe que sur la carte **micro:bit V2**.',
      'Le niveau qui sépare « bruyant » et « faible » se règle avec le bloc « définit le seuil du son ».',
      'Le simulateur n\'entend aucun son : ce bloc ne se déclenche que sur la vraie carte.',
    ],
    legende: 'Un bruit fort fait apparaître un visage triste une seconde.',
  },
  {
    t: 'lorsque_logo',
    titre: 'sur le logo …',
    sert: 'Exécute les blocs placés à l\'intérieur quand le **logo tactile** de la carte est touché (« appuyé »), ou quand on le lâche (« relâché »).',
    util: [
      'Choisissez « appuyé » ou « relâché ».',
      'Posez ce bloc seul dans l\'espace de travail : il ne s\'accroche à aucun autre bloc.',
    ],
    savoir: [
      'Le logo tactile n\'existe que sur la carte **micro:bit V2**.',
      'Dans le simulateur, cliquez sur le logo de la carte dessinée.',
    ],
    legende: 'Un cœur s\'affiche quand on touche le logo.',
  },
  {
    t: 'capteur_acceleration',
    titre: 'accélération (mg) …',
    sert: 'Renvoie l\'**accélération** mesurée par la carte selon l\'axe **x**, **y** ou **z**, ou la **force** totale.',
    valeur: 'nombre',
    util: [
      'Choisissez l\'axe : **x** (gauche-droite), **y** (avant-arrière), **z** (haut-bas), ou **force** (les trois ensemble).',
    ],
    savoir: [
      'L\'unité est le **milli-g (mg)** : 1000 mg correspondent à la pesanteur terrestre. Carte posée à plat, l\'axe vertical mesure donc environ 1000 mg.',
      'L\'étendue de mesure se règle avec le bloc « spécifier la gamme de l\'accéléromètre ».',
      'Dans le simulateur, la carte est toujours immobile et à plat : essayez le programme sur la vraie carte.',
    ],
    legende: 'L\'accélération sur l\'axe x s\'affiche chaque seconde sur la matrice de LED.',
  },
  {
    t: 'broche_est_pressee',
    titre: 'broche … est pressée',
    sert: 'Renvoie **vrai** tant que la broche **P0, P1 ou P2** est touchée avec le doigt, **faux** sinon.',
    valeur: 'logique',
    util: [
      'Choisissez la broche.',
      'Mettez ce bloc dans un bloc « si » ou « attendre jusqu\'à ».',
    ],
    savoir: [
      '**Un seul doigt** sur la broche suffit : le mode tactile de la carte V2 est activé automatiquement.',
      'Dans le simulateur, cliquez sur la broche 0, 1 ou 2 de la carte dessinée.',
    ],
    legende: 'Un visage heureux s\'affiche tant que la broche P0 est touchée.',
  },
  {
    t: 'capteur_luminosite',
    titre: 'niveau d\'intensité lumineuse',
    sert: 'Renvoie le **niveau de lumière** autour de la carte, de **0** (obscurité) à **255** (très lumineux).',
    valeur: 'nombre',
    util: [
      'Affichez la valeur, ou comparez-la à un nombre dans un bloc « si » (par exemple pour allumer une LED quand il fait sombre).',
    ],
    savoir: [
      'La lumière est mesurée par la **matrice de LED** elle-même : il n\'y a pas de capteur à part.',
      'Dans le simulateur, cette mesure ne varie pas (elle vaut toujours 128) : essayez le programme sur la vraie carte.',
    ],
    legende: 'Le niveau de lumière s\'affiche chaque seconde sur la matrice de LED.',
  },
  {
    t: 'capteur_boussole_direction',
    titre: 'direction de la boussole (°)',
    sert: 'Renvoie la **direction** vers laquelle pointe le haut de la carte, en degrés : **0** pour le nord, 90 pour l\'est, 180 pour le sud, 270 pour l\'ouest.',
    valeur: 'nombre',
    util: [
      'Tenez la carte à plat pour une mesure juste.',
      'Placez le bloc « calibrer la boussole » dans le bloc « au démarrage ».',
    ],
    savoir: [
      'Si la boussole n\'a pas encore été calibrée, la carte lance d\'abord la calibration.',
      'Un aimant, un moteur ou un objet en fer près de la carte fausse la direction.',
      'Dans le simulateur, cette mesure ne varie pas (elle vaut toujours 0) : essayez le programme sur la vraie carte.',
    ],
    legende: 'La boussole est calibrée une fois au démarrage, puis la direction s\'affiche chaque seconde.',
    exempleDe: 'capteur_boussole_calibrer',
  },
  {
    t: 'capteur_temperature',
    titre: 'température (° C)',
    sert: 'Renvoie la **température** mesurée par la carte, en **degrés Celsius**.',
    valeur: 'nombre',
    util: [
      'Affichez la valeur, ou comparez-la à un nombre dans un bloc « si ».',
    ],
    savoir: [
      'C\'est la température de la **puce** de la carte : elle est un peu plus élevée que celle de l\'air autour.',
      'Dans le simulateur, cette mesure ne varie pas (elle vaut toujours 21 °C) : essayez le programme sur la vraie carte.',
    ],
    legende: 'La température de la carte s\'affiche chaque seconde sur la matrice de LED.',
  },
  {
    t: 'geste_est_actif',
    titre: 'geste … est actif',
    sert: 'Renvoie **vrai** tant que la carte fait le geste choisi (secouée, logo vers le haut, logo vers le bas), **faux** sinon.',
    valeur: 'logique',
    util: [
      'Choisissez le geste dans la liste du bloc.',
      'Mettez ce bloc dans un bloc « si » ou « attendre jusqu\'à ».',
    ],
    savoir: [
      'Il reste **vrai pendant tout le geste**, contrairement au bloc « si secoué alors » qui ne compte chaque secousse qu\'une fois.',
      'Dans le simulateur, seul le geste « secouer » existe : cliquez sur le bouton « Secouer la carte », sous la carte dessinée.',
    ],
    legende: 'Un visage triste s\'affiche tant que la carte est secouée.',
  },
  {
    t: 'micro_intensite_son',
    titre: 'niveau sonore',
    sert: 'Renvoie le **niveau du son** entendu par le micro de la carte, de **0** (silence) à **255** (très fort).',
    valeur: 'nombre',
    util: [
      'Affichez la valeur, ou comparez-la à un nombre dans un bloc « si ».',
    ],
    savoir: [
      'Le micro n\'existe que sur la carte **micro:bit V2**.',
      'Dans le simulateur, cette mesure ne varie pas (elle vaut toujours 0) : essayez le programme sur la vraie carte.',
    ],
    legende: 'Le niveau sonore s\'affiche chaque seconde sur la matrice de LED.',
  },
  {
    t: 'capteur_boussole_calibrer',
    titre: 'calibrer la boussole',
    sert: 'Lance le **réglage de la boussole** : la carte demande de l\'incliner dans tous les sens.',
    util: [
      'Placez-le dans le bloc « au démarrage ».',
      'Pendant le réglage, suivez les indications qui défilent sur la matrice de LED : inclinez la carte dans tous les sens jusqu\'à la fin du réglage.',
    ],
    savoir: [
      'Le programme **attend la fin du réglage** avant de passer au bloc suivant.',
      'Sans ce bloc, la carte lance le réglage d\'elle-même à la première lecture de la boussole.',
    ],
    legende: 'La boussole est calibrée une fois au démarrage, puis la direction s\'affiche chaque seconde.',
  },
  {
    t: 'capteur_boussole_force',
    titre: 'force magnétique (µT) …',
    sert: 'Renvoie le **champ magnétique** mesuré par la carte selon l\'axe **x**, **y** ou **z**, ou sa **force** totale, en **microteslas (µT)**.',
    valeur: 'nombre',
    util: [
      'Choisissez l\'axe, ou **force** pour les trois ensemble.',
      'Approchez un aimant de la carte : la valeur change.',
    ],
    savoir: [
      'Dans le simulateur, cette mesure ne varie pas (elle vaut toujours 0) : essayez le programme sur la vraie carte.',
    ],
    legende: 'Le champ magnétique sur l\'axe x s\'affiche chaque seconde sur la matrice de LED.',
  },
  {
    t: 'capteur_rotation',
    titre: 'rotation (°) …',
    sert: 'Renvoie l\'**inclinaison** de la carte en degrés : **pitch** quand on la penche vers l\'avant ou l\'arrière, **roll** quand on la penche vers la gauche ou la droite.',
    valeur: 'nombre',
    util: [
      'Choisissez **pitch** ou **roll**.',
    ],
    savoir: [
      'L\'inclinaison est calculée à partir de l\'accéléromètre : elle n\'est juste que si la carte ne bouge pas trop vite.',
      'Dans le simulateur, la carte est toujours immobile et à plat : essayez le programme sur la vraie carte.',
    ],
    legende: 'L\'inclinaison avant-arrière (pitch) s\'affiche chaque seconde sur la matrice de LED.',
  },
  {
    t: 'temps_execution',
    titre: 'temps d\'exécution …',
    sert: 'Renvoie le **temps écoulé depuis le démarrage** de la carte.',
    valeur: 'nombre',
    util: [
      'Choisissez l\'unité : **(ms)** pour les millisecondes, **(micros)** pour les microsecondes.',
    ],
    savoir: [
      '1 seconde = 1000 millisecondes = 1 000 000 microsecondes.',
      'Pour mesurer une durée à partir d\'un moment choisi, utilisez plutôt les blocs du chronomètre (catégorie « Temps »).',
    ],
    legende: 'Le temps écoulé depuis le démarrage, en millisecondes, s\'affiche chaque seconde.',
  },
  {
    t: 'gamme_accelerometre',
    titre: 'spécifier la gamme de l\'accéléromètre …',
    sert: 'Règle l\'**étendue de mesure** de l\'accéléromètre : **1g, 2g, 4g ou 8g**.',
    util: [
      'Placez-le dans le bloc « au démarrage ».',
      'Choisissez une petite gamme pour mesurer de petits mouvements, une grande gamme pour mesurer des chocs forts.',
    ],
    savoir: [
      'Une gamme plus large mesure des chocs plus forts, mais avec **moins de précision**.',
    ],
    legende: 'L\'accéléromètre est réglé sur 8g, puis la force mesurée s\'affiche chaque seconde.',
  },
  {
    t: 'micro_definir_seuil',
    titre: 'définit le seuil du son … à …',
    sert: 'Règle le **niveau sonore** à partir duquel un son est « bruyant » (ou en dessous duquel il est « faible ») pour le bloc « lorsque le son … est détecté ».',
    util: [
      'Choisissez « bruyant » ou « faible », puis écrivez le seuil, de **0 à 255** (comme le bloc « niveau sonore »).',
      'Placez-le dans le bloc « au démarrage ».',
    ],
    savoir: [
      'Plus le seuil « bruyant » est haut, plus il faut de bruit pour déclencher le bloc.',
      'Le micro n\'existe que sur la carte **micro:bit V2**. Le simulateur n\'entend aucun son.',
    ],
    legende: 'Avec un seuil à 200, seuls les bruits assez forts font apparaître le visage triste.',
  },
  // ═══════════════ Actionneurs (Audio) ═══════════════
  {
    t: 'audio_jouer',
    titre: '[Audio] jouer la musique …',
    sert: 'Joue un **son tout prêt** sur le haut-parleur de la carte : un rire (Giggle), un son joyeux (Happy), un bonjour (Hello), un son triste (Sad) ou un scintillement (Twinkle).',
    util: [
      'Choisissez le son dans la liste du bloc.',
    ],
    savoir: [
      'Le haut-parleur n\'existe que sur la carte **micro:bit V2**.',
      'Le programme **attend la fin du son** avant de passer au bloc suivant.',
      'Dans le simulateur, le son est une imitation jouée par l\'ordinateur : il peut être un peu différent de celui de la carte.',
    ],
    legende: 'Le bouton A joue un rire, le bouton B arrête le son.',
  },
  {
    t: 'audio_arreter',
    titre: '[Audio] arrêter la musique',
    sert: '**Arrête** le son en cours de lecture.',
    util: [
      'Placez-le, par exemple, dans un bloc « lorsque le bouton … est pressé » pour couper le son à la demande.',
    ],
    savoir: [
      'S\'il n\'y a aucun son en cours, il ne fait rien.',
    ],
    legende: 'Le bouton A joue un rire, le bouton B arrête le son.',
  },
  {
    t: 'music_jouer_melodie',
    titre: '[Music] jouer la mélodie …',
    sert: 'Joue une **mélodie toute prête**, note après note, sur le haut-parleur de la carte.',
    util: [
      'Choisissez la mélodie dans la liste du bloc.',
    ],
    savoir: [
      'Le programme **attend la fin de la mélodie** avant de passer au bloc suivant.',
      'Le son sort aussi sur la broche **P0** : un buzzer branché sur P0 joue la même mélodie.',
      'Dans le simulateur, la mélodie est jouée par l\'ordinateur.',
    ],
    legende: 'Le bouton A joue la mélodie « Entertainer ».',
  },
  {
    t: 'speech_dire',
    titre: '[Speech] dire … vitesse … hauteur …',
    sert: 'Fait **parler** la carte : elle prononce le texte avec une voix de synthèse.',
    util: [
      'Écrivez le texte à dire dans la case.',
      'Réglez la **vitesse** et la **hauteur** de la voix, de **0 à 255**.',
    ],
    savoir: [
      'La voix prononce les mots **à l\'anglaise** : écrivez le texte en anglais pour qu\'il soit compréhensible.',
      'Plus le nombre « vitesse » est **grand**, plus la voix est **lente** ; plus le nombre « hauteur » est **grand**, plus la voix est **grave**.',
      'Le programme **attend la fin de la phrase** avant de passer au bloc suivant.',
    ],
    legende: 'La carte dit « Hello » au démarrage.',
  },
  // ═══════════════ Servos ═══════════════
  {
    t: 'servo_angle',
    titre: 'régler l\'angle du servomoteur … à … °',
    sert: 'Fait tourner un **servomoteur** jusqu\'à l\'angle choisi, de **0 à 180°**, et l\'y maintient.',
    util: [
      'Choisissez la broche où le servomoteur est branché : **P0, P1 ou P2**.',
      'Écrivez l\'angle dans la case, ou mettez-y un bloc qui renvoie un nombre.',
    ],
    savoir: [
      'Le programme **n\'attend pas** que le servomoteur soit arrivé : ajoutez un bloc « attendre » pour lui laisser le temps de tourner.',
      'L\'angle est ramené dans l\'intervalle choisi avec le bloc « définir l\'intervalle du servomoteur » (de 0 à 180° au départ).',
      'Ce bloc est fait pour un servomoteur **positionnel** ; pour un servomoteur à rotation continue, utilisez le bloc « servomoteur … à rotation continue fonctionne à … % ».',
    ],
    legende: 'Le servomoteur branché sur P0 se place à 90°, puis à 0° une seconde plus tard.',
  },
  {
    t: 'servo_continu',
    titre: 'servomoteur … à rotation continue fonctionne à … %',
    sert: 'Fait tourner un **servomoteur à rotation continue** à la vitesse choisie, de **−100 à 100 %**.',
    util: [
      'Choisissez la broche où le servomoteur est branché : **P0, P1 ou P2**.',
      'Écrivez la vitesse : **0** pour l\'arrêt, un nombre **négatif** pour tourner dans l\'autre sens.',
    ],
    savoir: [
      'Le servomoteur continue de tourner jusqu\'au prochain bloc qui le commande.',
      'Si le servomoteur tourne encore doucement à 0 %, utilisez le bloc « mettre l\'arrêt au neutre du servomoteur » ou le bloc « arrêter le servomoteur ».',
    ],
    legende: 'Le servomoteur branché sur P0 tourne à 50 % pendant deux secondes, puis s\'arrête.',
  },
  {
    t: 'servo_arreter',
    titre: 'arrêter le servomoteur …',
    sert: '**Cesse de commander** le servomoteur : la carte ne lui envoie plus d\'ordre.',
    util: [
      'Choisissez la broche du servomoteur.',
    ],
    savoir: [
      'Un servomoteur **à rotation continue** s\'arrête.',
      'Un servomoteur **positionnel** reste où il est, mais ne tient plus sa position : on peut le tourner à la main.',
    ],
    legende: 'Le servomoteur branché sur P0 tourne à 50 % pendant deux secondes, puis s\'arrête.',
  },
  {
    t: 'servo_arret_neutre',
    titre: 'mettre l\'arrêt au neutre du servomoteur … à …',
    sert: 'Avec **ON**, une vitesse de **0 %** donnée au servomoteur à rotation continue l\'**arrête complètement**, au lieu de lui envoyer l\'ordre « position du milieu ».',
    util: [
      'Choisissez la broche du servomoteur, puis **ON** ou **OFF**.',
      'Placez ce bloc dans le bloc « au démarrage ».',
    ],
    savoir: [
      'Utile quand le servomoteur à rotation continue tourne encore doucement à 0 %.',
      'Au départ, l\'arrêt au neutre est sur **OFF**.',
    ],
    legende: 'L\'arrêt au neutre est activé, puis une vitesse de 0 % arrête le servomoteur branché sur P0.',
  },
  {
    t: 'servo_intervalle',
    titre: 'définir l\'intervalle du servomoteur … de … à …',
    sert: '**Limite la course** du servomoteur entre un angle mini et un angle maxi.',
    util: [
      'Choisissez la broche du servomoteur, puis écrivez l\'angle mini et l\'angle maxi.',
      'Placez ce bloc dans le bloc « au démarrage », avant de faire tourner le servomoteur.',
    ],
    savoir: [
      'Le mini est ramené **entre 0 et 90°**, le maxi **entre 90 et 180°**.',
      'Ensuite, un angle demandé hors de l\'intervalle est ramené à la limite la plus proche : cela protège une pièce qui ne doit pas aller trop loin.',
      'Au départ, l\'intervalle va de 0 à 180°.',
    ],
    legende: 'La course du servomoteur branché sur P0 est limitée de 30° à 150°, puis il se place à 90°.',
  },
  {
    t: 'servo_impulsion',
    titre: 'régler la largeur d\'impulsion du servomoteur … à … µs',
    sert: 'Commande le servomoteur directement par la **durée de l\'impulsion** qu\'il reçoit, en **microsecondes (µs)**.',
    util: [
      'Choisissez la broche du servomoteur, puis écrivez la durée.',
    ],
    savoir: [
      'La durée est ramenée **entre 500 et 2500 µs** : 500 µs correspond à 0°, **1500 µs** au milieu (90°), 2500 µs à 180°.',
      'La carte envoie une impulsion toutes les **20 millisecondes**.',
      'Pour un usage courant, le bloc « régler l\'angle du servomoteur » est plus simple.',
    ],
    legende: 'Une impulsion de 1500 µs place le servomoteur branché sur P0 au milieu.',
  },
  // ═══════════════ Cartes d'extension : DFR0548, Motor:bit ═══════════════
  {
    t: 'dfr_servo',
    titre: 'DFR0548 : servo … à … °',
    sert: 'Place le **servomoteur** branché sur une des 8 sorties servo (**S1 à S8**) de la carte moteurs **DFR0548** à l\'angle choisi.',
    util: [
      'Choisissez la sortie où le servomoteur est branché, de **S1 à S8**.',
      'Écrivez l\'angle, de **0 à 180°**, ou mettez-y un bloc qui renvoie un nombre.',
    ],
    savoir: [
      'La carte DFR0548 reçoit ses ordres par le **bus I2C** (broches P19 et P20) : ces broches ne doivent pas servir à autre chose.',
      'Un angle plus petit que 0 ou plus grand que 180 est ramené à 0 ou à 180°.',
      'Le programme **n\'attend pas** que le servomoteur soit arrivé : ajoutez un bloc « attendre ».',
    ],
    legende: 'Le servomoteur branché sur S1 passe de 0° à 180°, puis revient, chaque seconde.',
  },
  {
    t: 'dfr_moteur',
    titre: 'DFR0548 : moteur … sens … vitesse … (0 à 255)',
    sert: 'Fait tourner le **moteur à courant continu** branché sur une des 4 sorties moteur (**M1 à M4**) de la carte **DFR0548**.',
    util: [
      'Choisissez la sortie du moteur (M1 à M4) et le sens : **horaire** ou **antihoraire**.',
      'Écrivez la vitesse, de **0** (arrêt) à **255** (vitesse maximale).',
    ],
    savoir: [
      'Le moteur **continue de tourner** jusqu\'à un autre ordre : pensez au bloc « DFR0548 : arrêter ».',
      'Le sens réel dépend du branchement des deux fils du moteur : inversez-les, ou choisissez l\'autre sens, si le moteur tourne à l\'envers.',
      'La carte DFR0548 reçoit ses ordres par le **bus I2C** (broches P19 et P20).',
    ],
    legende: 'Le moteur M1 tourne deux secondes dans le sens horaire à la vitesse 150, puis s\'arrête.',
  },
  {
    t: 'dfr_moteur_arreter',
    titre: 'DFR0548 : arrêter …',
    sert: '**Arrête** un moteur à courant continu de la carte **DFR0548**, ou les quatre à la fois.',
    util: [
      'Choisissez le moteur (M1 à M4), ou **tous les moteurs**.',
    ],
    savoir: [
      'Il n\'agit que sur les moteurs à courant continu : les servomoteurs gardent leur position.',
    ],
    legende: 'Le moteur M1 tourne deux secondes dans le sens horaire à la vitesse 150, puis s\'arrête.',
  },
  {
    t: 'dfr_pas_a_pas',
    titre: 'DFR0548 : moteur pas à pas … sur … sens … de … …',
    sert: 'Fait tourner un **moteur pas à pas** branché sur deux sorties moteur de la carte **DFR0548**, d\'un nombre de **degrés** ou de **tours**, puis l\'arrête.',
    util: [
      'Choisissez le modèle du moteur : **28BYJ-48** ou **42BYGH**.',
      'Choisissez les deux sorties où il est branché (**M1-M2** ou **M3-M4**) et le sens.',
      'Écrivez la quantité, puis choisissez l\'unité : **degrés** ou **tours**.',
    ],
    savoir: [
      'Le programme **attend la fin du mouvement** avant de passer au bloc suivant.',
      'L\'angle est obtenu par une **durée de rotation** (méthode de la bibliothèque DFRobot) : il peut être un peu différent sur le vrai moteur. Vérifiez-le et ajustez la quantité.',
      'Un moteur pas à pas occupe **deux sorties moteur** : elles ne peuvent plus servir à un moteur à courant continu.',
    ],
    legende: 'Le moteur pas à pas 28BYJ-48 branché sur M1-M2 fait un tour dans le sens horaire, puis un demi-tour dans l\'autre sens.',
  },
  {
    t: 'motorbit_moteur',
    titre: 'Motor:bit : moteur … sens … vitesse … (0 à 255)',
    sert: 'Fait tourner le **moteur à courant continu** branché sur la sortie **M1** ou **M2** de la carte **Motor:bit** (ELECFREAKS).',
    util: [
      'Choisissez la sortie du moteur (M1 ou M2) et le sens : **horaire** ou **antihoraire**.',
      'Écrivez la vitesse, de **0** (arrêt) à **255** (vitesse maximale).',
    ],
    savoir: [
      'Le moteur **continue de tourner** jusqu\'à un autre ordre : pensez au bloc « Motor:bit : arrêter ».',
      'La carte Motor:bit commande les moteurs avec les broches **P1, P2, P8 et P12** : n\'y branchez pas d\'autre module.',
      'Le sens réel dépend du branchement des deux fils du moteur.',
    ],
    legende: 'Les moteurs M1 et M2 tournent chacun deux secondes à la vitesse 150, l\'un après l\'autre.',
  },
  {
    t: 'motorbit_moteur_arreter',
    titre: 'Motor:bit : arrêter …',
    sert: '**Arrête** un moteur de la carte **Motor:bit** (M1 ou M2), ou les deux à la fois.',
    util: [
      'Choisissez **le moteur M1**, **le moteur M2** ou **les deux moteurs**.',
    ],
    savoir: [
      'Pour arrêter les deux moteurs d\'un coup, choisissez **les deux moteurs**.',
    ],
    legende: 'Les moteurs M1 et M2 tournent chacun deux secondes à la vitesse 150, l\'un après l\'autre.',
  },
  // ═══════════════ Cartes d'extension : Maqueen Lite ═══════════════
  {
    t: 'maqueenlite_moteur',
    titre: 'Maqueen Lite : moteur … à … (-255 à 255)',
    sert: 'Fait tourner le moteur **gauche**, le moteur **droit** ou **les deux** moteurs du robot **Maqueen Lite** à la vitesse choisie.',
    util: [
      'Choisissez le moteur : gauche, droit ou les deux.',
      'Écrivez la vitesse, de **−255 à 255** : un nombre **négatif** fait reculer, **0** arrête.',
    ],
    savoir: [
      'Les moteurs **continuent de tourner** jusqu\'à un autre ordre : pensez au bloc « Maqueen Lite : arrêter le moteur ».',
      'Pour tourner, donnez des vitesses différentes aux deux moteurs (par exemple 100 à gauche et 0 à droite).',
      'Le robot reçoit ses ordres de moteur par le **bus I2C** (broches P19 et P20).',
      'Dans le simulateur, le robot se déplace dans la zone de simulation.',
    ],
    legende: 'Les deux moteurs tournent à la vitesse 50 pendant deux secondes, puis s\'arrêtent.',
  },
  {
    t: 'maqueenlite_arreter',
    titre: 'Maqueen Lite : arrêter le moteur …',
    sert: '**Arrête** le moteur gauche, le moteur droit ou les deux moteurs du robot **Maqueen Lite**.',
    util: [
      'Choisissez le moteur : gauche, droit ou les deux.',
    ],
    savoir: [
      'C\'est la même chose que le bloc « Maqueen Lite : moteur » avec la vitesse **0**.',
    ],
    legende: 'Les deux moteurs tournent à la vitesse 50 pendant deux secondes, puis s\'arrêtent.',
  },
  {
    t: 'maqueenlite_distance',
    titre: 'Maqueen Lite : distance (cm) capteur ultrason',
    sert: 'Renvoie la **distance** entre l\'avant du robot et l\'obstacle le plus proche, en **centimètres**, mesurée par le capteur à ultrasons.',
    valeur: 'nombre',
    util: [
      'Affichez la valeur, ou comparez-la à un nombre dans un bloc « si » (par exemple pour s\'arrêter avant un mur).',
    ],
    savoir: [
      'Le capteur utilise les broches **P1** (émission) et **P2** (écho), fixées par le robot : elles ne peuvent pas servir à autre chose.',
      'Il renvoie **0** quand aucun écho ne revient (obstacle trop loin ou surface qui absorbe le son).',
      'Dans le simulateur, réglez la distance avec le curseur de distance du robot.',
    ],
    legende: 'La distance mesurée devant le robot s\'affiche chaque seconde sur la matrice de LED.',
  },
  {
    t: 'maqueenlite_ligne',
    titre: 'Maqueen Lite : capteur de ligne … (0 ou 1)',
    sert: 'Renvoie l\'état du capteur de ligne **gauche** ou **droit**, sous le robot : **0** ou **1**.',
    valeur: 'nombre',
    util: [
      'Choisissez le capteur : gauche ou droit.',
      'Comparez le résultat à 0 ou à 1 dans un bloc « si ».',
    ],
    savoir: [
      'Le capteur gauche est lu sur la broche **P13**, le droit sur **P14**.',
      'La valeur qui correspond à la ligne noire dépend du capteur : **vérifiez-la** sur votre robot en posant le capteur sur la ligne, puis à côté.',
    ],
    legende: 'Un visage heureux s\'affiche quand le capteur de ligne gauche est à 1.',
  },
  {
    t: 'lorsque_maqueenlite_ligne',
    titre: 'lorsque le capteur de ligne … passe à l\'état …',
    sert: 'Exécute les blocs placés à l\'intérieur quand le capteur de ligne **gauche** ou **droit** du Maqueen Lite **change d\'état** : il passe à **haut (1)** ou à **bas (0)**.',
    util: [
      'Choisissez le capteur, puis l\'état attendu.',
      'Posez ce bloc seul dans l\'espace de travail : il ne s\'accroche à aucun autre bloc.',
    ],
    savoir: [
      'Le bloc se déclenche au **changement** d\'état, pas tant que l\'état dure.',
      'L\'état est vérifié à chaque tour de la boucle principale du programme.',
    ],
    legende: 'Un cœur s\'affiche quand le capteur de ligne gauche passe à l\'état haut (1).',
  },
  {
    t: 'maqueenlite_del',
    titre: 'Maqueen Lite : DEL … …',
    sert: '**Allume** ou **éteint** la DEL gauche, la DEL droite ou les deux DEL à l\'avant du robot **Maqueen Lite**.',
    util: [
      'Choisissez la DEL (gauche, droite ou les deux), puis **allumée** ou **éteinte**.',
    ],
    savoir: [
      'La DEL gauche est commandée par la broche **P8**, la droite par la broche **P12**.',
      'La DEL reste dans son état jusqu\'au prochain bloc qui la commande.',
    ],
    legende: 'Les deux DEL s\'allument une seconde, puis s\'éteignent une seconde, sans fin.',
  },
  {
    t: 'maqueenlite_servo',
    titre: 'Maqueen Lite : servo … angle … °',
    sert: 'Place le **servomoteur** branché sur la prise **S1** ou **S2** du robot **Maqueen Lite** à l\'angle choisi.',
    util: [
      'Choisissez la prise du servomoteur : S1 ou S2.',
      'Écrivez l\'angle, de **0 à 180°**.',
    ],
    savoir: [
      'Le programme **n\'attend pas** que le servomoteur soit arrivé : ajoutez un bloc « attendre ».',
      'Le robot reçoit cet ordre par le **bus I2C** (broches P19 et P20).',
    ],
    legende: 'Le servomoteur S1 se place à 90°, puis à 0° une seconde plus tard.',
  },

  // ═══════════════ Cartes d'extension : LiDAR ═══════════════
  {
    t: 'lidar_initialiser',
    titre: 'LiDAR … : configurer la taille …',
    sert: '**Prépare le capteur LiDAR** (DFRobot SEN0628) et choisit sa façon de mesurer : une grille de **8×8** points, ou le mode **évitement 4×4** qui donne la direction à suivre.',
    util: [
      'Placez ce bloc **une fois**, dans le bloc « au démarrage », avant tous les autres blocs LiDAR.',
      'Choisissez l\'adresse du capteur (**0x30** au départ) et le mode.',
    ],
    savoir: [
      'Le mode **Évitement 4x4** est nécessaire pour les blocs de la partie « Évitement d\'obstacle ».',
      'Le mode **Matrice 8x8** est nécessaire pour le bloc « distance mesurée au point x … y … ».',
      'L\'adresse (0x30 à 0x33) sert à choisir le capteur quand plusieurs sont branchés sur le **bus I2C** (broches P19 et P20).',
    ],
    legende: 'Le LiDAR est préparé en mode évitement au démarrage, puis la distance de l\'obstacle devant s\'affiche chaque seconde.',
    exemple: [B('au_demarrage', null, { DO: S(B('lidar_initialiser', { ADRESSE: '48', MODE: 'FALSE' })) }),
      B('boucle_infinie', null, { DO: S(B('lidar_acquerir'),
        B('afficher_valeur', null, { VALEUR: V(B('lidar_distance_cote', { COTE: 'avant' })) }), ATT(1)) })],
  },
  {
    t: 'lidar_point',
    titre: 'LiDAR … : distance mesurée au point x … y … (mm)',
    sert: 'Renvoie la **distance**, en **millimètres**, mesurée par le LiDAR au point **(x, y)** de sa grille de 8×8 points.',
    valeur: 'nombre',
    util: [
      'Choisissez l\'adresse du capteur, puis écrivez **x** et **y**, de **0 à 7**.',
    ],
    savoir: [
      'Ce bloc ne fonctionne qu\'en mode **Matrice 8x8** : placez le bloc « LiDAR … : configurer la taille Matrice 8x8 » dans le bloc « au démarrage ».',
      'Il interroge le capteur à chaque fois : le bloc « acquérir les données d\'évitement » n\'est pas utile ici.',
    ],
    legende: 'Le LiDAR est préparé en mode matrice 8×8, puis la distance mesurée au point (3, 3) s\'affiche chaque seconde.',
    exemple: [B('au_demarrage', null, { DO: S(B('lidar_initialiser', { ADRESSE: '48', MODE: 'TRUE' })) }),
      B('boucle_infinie', null, { DO: S(
        B('afficher_valeur', null, { VALEUR: V(B('lidar_point', { ADRESSE: '48', X: 3, Y: 3 })) }), ATT(1)) })],
  },
  {
    t: 'lidar_distance_evitement',
    titre: 'LiDAR : configurer la distance d\'évitement à … (mm)',
    sert: 'Règle la **distance**, en **millimètres**, à partir de laquelle le LiDAR considère qu\'un objet est un **obstacle** à éviter.',
    util: [
      'Placez ce bloc dans le bloc « au démarrage », après le bloc « LiDAR … : configurer la taille Évitement 4x4 ».',
    ],
    savoir: [
      'Sur un robot Maqueen, ne dépassez pas **200 mm** : au-delà, le faisceau peut toucher le sol et fausser la détection (avertissement du fabricant).',
    ],
    legende: 'Le LiDAR est préparé en mode évitement avec une distance de 200 mm, puis la direction conseillée s\'affiche chaque seconde.',
    exemple: [B('au_demarrage', null, { DO: S(B('lidar_initialiser', { ADRESSE: '48', MODE: 'FALSE' }),
        B('lidar_distance_evitement', null, { DISTANCE: N(200) })) }),
      B('boucle_infinie', null, { DO: S(B('lidar_acquerir'),
        B('afficher_valeur', null, { VALEUR: V(B('lidar_direction')) }), ATT(1)) })],
  },
  {
    t: 'lidar_acquerir',
    titre: 'LiDAR : acquérir les données d\'évitement',
    sert: '**Lit le capteur LiDAR** et garde ses résultats : direction à suivre, signal d\'urgence et distances à gauche, devant et à droite.',
    util: [
      'Placez ce bloc dans le bloc « répéter indéfiniment », **avant** les blocs qui lisent ces résultats.',
    ],
    savoir: [
      'Les blocs « direction à suivre », « signal d\'urgence » et « distance de l\'obstacle » relisent la **dernière acquisition**, pas le capteur en direct.',
      'Il faut le mode **Évitement 4x4** (bloc « configurer la taille »).',
    ],
    legende: 'Le LiDAR est préparé en mode évitement avec une distance de 200 mm, puis la direction conseillée s\'affiche chaque seconde.',
    exempleDe: 'lidar_distance_evitement',
  },
  {
    t: 'lidar_urgence',
    titre: 'LiDAR : signal d\'urgence activé ?',
    sert: 'Renvoie **vrai** quand le LiDAR a détecté un obstacle **très proche**, à moins de **100 mm**, **faux** sinon.',
    valeur: 'logique',
    util: [
      'Mettez ce bloc dans un bloc « si », après le bloc « LiDAR : acquérir les données d\'évitement ».',
    ],
    savoir: [
      'Le résultat vient de la **dernière acquisition** : placez le bloc « acquérir les données d\'évitement » juste avant.',
      'Dans le simulateur, réglez les distances avec les curseurs du panneau « LiDAR ».',
    ],
    legende: 'Après chaque acquisition, un visage triste s\'affiche si un obstacle est à moins de 100 mm.',
    exemple: [B('au_demarrage', null, { DO: S(B('lidar_initialiser', { ADRESSE: '48', MODE: 'FALSE' })) }),
      B('boucle_infinie', null, { DO: S(B('lidar_acquerir'),
        B('controls_if', null, { IF0: V(B('lidar_urgence')), DO0: S(ICONE('SAD')) })) })],
  },
  {
    t: 'lidar_direction',
    titre: 'LiDAR : direction à suivre pour éviter l\'obstacle',
    sert: 'Renvoie la **direction conseillée** par le LiDAR pour éviter l\'obstacle : **1** pour à gauche, **2** pour à droite, **3** pour tout droit.',
    valeur: 'nombre',
    util: [
      'Comparez le résultat à 1, 2 ou 3 dans un bloc « si » pour choisir le mouvement du robot.',
      'Plus simple : le bloc « LiDAR : direction à suivre est … ? » fait la comparaison pour vous.',
    ],
    savoir: [
      'Le résultat vient de la **dernière acquisition** : placez le bloc « acquérir les données d\'évitement » juste avant.',
      'Dans le simulateur, réglez les distances avec les curseurs du panneau « LiDAR ».',
    ],
    legende: 'Le LiDAR est préparé en mode évitement avec une distance de 200 mm, puis la direction conseillée s\'affiche chaque seconde.',
    exempleDe: 'lidar_distance_evitement',
  },
  {
    t: 'lidar_direction_est',
    titre: 'LiDAR : direction à suivre est … ?',
    sert: 'Renvoie **vrai** quand la direction conseillée par le LiDAR est celle choisie (**à gauche**, **à droite** ou **tout droit**), **faux** sinon.',
    valeur: 'logique',
    util: [
      'Choisissez la direction, puis mettez ce bloc dans un bloc « si ».',
    ],
    savoir: [
      'Le résultat vient de la **dernière acquisition** : placez le bloc « acquérir les données d\'évitement » juste avant.',
    ],
    legende: 'Après chaque acquisition, un visage heureux s\'affiche si la direction à suivre est « à gauche ».',
    exemple: [B('au_demarrage', null, { DO: S(B('lidar_initialiser', { ADRESSE: '48', MODE: 'FALSE' })) }),
      B('boucle_infinie', null, { DO: S(B('lidar_acquerir'),
        B('controls_if', null, { IF0: V(B('lidar_direction_est', { SENS: '1' })), DO0: S(ICONE('HAPPY')) })) })],
  },
  {
    t: 'lidar_distance_cote',
    titre: 'LiDAR : distance (en cm) de l\'obstacle à …',
    sert: 'Renvoie la **distance**, en **centimètres**, de l\'obstacle à **gauche**, **devant** ou à **droite** du LiDAR.',
    valeur: 'nombre',
    util: [
      'Choisissez le côté : gauche, devant ou droite.',
    ],
    savoir: [
      'Le résultat vient de la **dernière acquisition** : placez le bloc « acquérir les données d\'évitement » juste avant.',
      'Le capteur mesure en millimètres : le résultat en centimètres peut être un nombre à virgule.',
      'Dans le simulateur, réglez les distances avec les curseurs du panneau « LiDAR ».',
    ],
    legende: 'Le LiDAR est préparé en mode évitement au démarrage, puis la distance de l\'obstacle devant s\'affiche chaque seconde.',
    exempleDe: 'lidar_initialiser',
  },
];
