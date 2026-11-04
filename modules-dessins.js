// modules-dessins.js — dessins des modules Grove de la vue montage (montage.js), repris de la version Arduino R4
// (r4-board-svg.js : DESSINS_MODULES, oreille, serigraphie, composantCMS, COULEURS_LED, nov. 2026) et verifies sur les
// photos des modules (dossier « photos » fourni avec le modele).
//
// Echelle : comme le modele (modules a 7 unites par mm, carte a 10, soit 0,7), les modules sont dessines a 0,7 fois
// l'echelle de la micro:bit de la scene (5,4 unites par mm) : K_MODULE = 3,7 unites par mm. Un module de 20 mm tient
// ainsi dans la case de 74 unites de haut du rangement automatique (MODULE, montage.js).
// Les cotes de chaque dessin sont en mm depuis le coin haut gauche du circuit. Seuls les modules qui ont leur dessin
// sont listes dans DESSINS_MODULES ; les autres gardent leur pictogramme (montage.js), en attendant leur tour.

export const K_MODULE = 3.7;

const C_MODULE = { pcb: '#2470b8', bord: '#174f86', metal: '#c9cfd4' };
const C_PRISE = { fond: '#d9d5cb', bord: '#aaa597', creux: '#c4bfb2' };

// Couleurs de LED proposees d'un clic sur le module (comme le modele) : eteinte, allumee, bord et halo.
export const COULEURS_LED = {
    rouge:   { nom: 'rouge',   eteinte: '#8e1f1a', allumee: '#ff3b30', bord: '#ffb0a8', halo: '#ff3b30' },
    verte:   { nom: 'verte',   eteinte: '#1f5a2e', allumee: '#3ddc6a', bord: '#b6f5c8', halo: '#3ddc6a' },
    bleue:   { nom: 'bleue',   eteinte: '#1d3a73', allumee: '#3b8bff', bord: '#b9d4ff', halo: '#3b8bff' },
    orange:  { nom: 'orange',  eteinte: '#7a4410', allumee: '#ff9f1a', bord: '#ffd59a', halo: '#ff9f1a' },
    blanche: { nom: 'blanche', eteinte: '#cfd3d6', allumee: '#ffffff', bord: '#ffffff', halo: '#dfeaff' },
};

/** Effets communs, a placer une fois en tete du dessin de la scene : halo des LED allumees. */
export function defsModules() {
    return '<defs><filter id="mod-halo" x="-120%" y="-120%" width="340%" height="340%">' +
           '<feGaussianBlur stdDeviation="4" result="f"/><feMerge><feMergeNode in="f"/><feMergeNode in="SourceGraphic"/></feMerge>' +
           '</filter></defs>';
}

/** Une oreille de fixation (demi-disque perce) centree en (x, y), rayon r (unites). */
function oreille(x, y, r) {
    const t = r * 0.5;
    return `<path fill-rule="evenodd" fill="${C_MODULE.pcb}" stroke="${C_MODULE.bord}" stroke-width="1.2"
              d="M ${x - r} ${y} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z
                 M ${x - t} ${y} a ${t} ${t} 0 1 0 ${2 * t} 0 a ${t} ${t} 0 1 0 ${-2 * t} 0 Z"/>`;
}
/** Texte serigraphie (blanc) d'un circuit Grove, en mm depuis le coin du circuit. */
function serigraphie(X, Y, k, tx, ty, t, taille, ancre, rot) {
    return `<text x="${X(tx)}" y="${Y(ty)}" font-family="Inter, Segoe UI, Arial" font-size="${taille * k}" font-weight="600"
              fill="#e8f1f8" text-anchor="${ancre || 'start'}" dominant-baseline="central"${rot ? ` transform="rotate(${rot} ${X(tx)} ${Y(ty)})"` : ''}>${t}</text>`;
}
/** Resistance ou condensateur CMS (petit pave noir a bouts etames), en mm. */
function composantCMS(X, Y, k, x0, y0, l, h) {
    const vertical = h > l, b = (vertical ? h : l) * 0.22;
    const bouts = vertical
        ? `<rect x="${X(x0)}" y="${Y(y0)}" width="${l * k}" height="${b * k}" fill="#c9cfd4"/><rect x="${X(x0)}" y="${Y(y0 + h - b)}" width="${l * k}" height="${b * k}" fill="#c9cfd4"/>`
        : `<rect x="${X(x0)}" y="${Y(y0)}" width="${b * k}" height="${h * k}" fill="#c9cfd4"/><rect x="${X(x0 + l - b)}" y="${Y(y0)}" width="${b * k}" height="${h * k}" fill="#c9cfd4"/>`;
    return `<rect x="${X(x0) - 1}" y="${Y(y0) - 1}" width="${l * k + 2}" height="${h * k + 2}" rx="1" fill="none" stroke="#e8f1f8" stroke-width="0.8"/>
            <rect x="${X(x0)}" y="${Y(y0)}" width="${l * k}" height="${h * k}" rx="1" fill="#1f1f1f"/>${bouts}`;
}

/** Module LED Grove (TS 275716, photo du modele ; dessin du modele, nov. 2026) : circuit 20 x 20 mm, prise J1 EN HAUT
    (ouverture vers le haut, SIG NC VCC GND de gauche a droite), oreilles a gauche et a droite, encoche en bas ; LED D1
    de 5 mm en bas a gauche avec son « + », transistor Q1, resistances R1, R3, R4, R5, potentiometre de reglage R2
    (orange « 103 ») en bas a droite. (Sur la photo, le module est pose prise a gauche : c'est le meme, tourne.)
    La LED prend la couleur choisie (clic sur le module) ; montage.js l'allume en direct (classes mv-led, mv-halo). */
function dessinLed(x, y, couleur) {
    const c = COULEURS_LED[couleur] || COULEURS_LED.rouge;
    const k = K_MODULE, X = v => x + v * k, Y = v => y + v * k;
    const T = (tx, ty, t, taille, ancre, rot) => serigraphie(X, Y, k, tx, ty, t, taille, ancre, rot);
    const s = [oreille(X(-0.6), Y(9.5), 1.75 * k), oreille(X(20.6), Y(9.5), 1.75 * k),
        `<rect x="${X(0)}" y="${Y(0)}" width="${20 * k}" height="${20 * k}" rx="${0.8 * k}" fill="${C_MODULE.pcb}" stroke="${C_MODULE.bord}" stroke-width="1.2"/>`];
    // Encoche du bord bas (seule la moitie interieure est dessinee ; fond de la simulation)
    const re = 2.0 * k;
    s.push(`<path class="mod-encoche" d="M ${X(10.5) - re} ${Y(20) + 2} V ${Y(20)} A ${re} ${re} 0 0 1 ${X(10.5) + re} ${Y(20)} V ${Y(20) + 2} Z"/>
            <path d="M ${X(10.5) - re} ${Y(20)} A ${re} ${re} 0 0 1 ${X(10.5) + re} ${Y(20)}" fill="none" stroke="${C_MODULE.bord}" stroke-width="1"/>`);
    // Prise J1 en haut : pattes de fixation metalliques, boitier, creux et 4 contacts, pattes soudees dessous
    s.push(`<rect x="${X(2.9)}" y="${Y(2.3)}" width="${1.0 * k}" height="${2.4 * k}" rx="1" fill="${C_MODULE.metal}"/>
            <rect x="${X(15.6)}" y="${Y(2.3)}" width="${1.0 * k}" height="${2.4 * k}" rx="1" fill="${C_MODULE.metal}"/>
            <rect x="${X(3.4)}" y="${Y(0.2)}" width="${12.8 * k}" height="${6.2 * k}" rx="2" fill="${C_PRISE.fond}" stroke="${C_PRISE.bord}" stroke-width="1.2"/>
            <rect x="${X(4.6)}" y="${Y(1.0)}" width="${10.4 * k}" height="${3.6 * k}" rx="1.5" fill="${C_PRISE.creux}"/>`);
    [6.4, 8.6, 10.8, 12.9].forEach(v => s.push(`<rect x="${X(v) - 0.35 * k}" y="${Y(2.4)}" width="${0.7 * k}" height="${0.8 * k}" fill="#9aa1a5"/>
            <rect x="${X(v) - 0.45 * k}" y="${Y(6.2)}" width="${0.9 * k}" height="${1.5 * k}" rx="1" fill="${C_MODULE.metal}"/>`));
    s.push(T(17.4, 5.7, 'J1', 1.3), T(10.2, 8.8, 'SIG  NC  VCC  GND', 1.1, 'middle'));
    // R1, Q1, R4, R5, R3
    s.push(T(1.0, 7.3, 'R1', 1.1), composantCMS(X, Y, k, 1.7, 8.2, 2.8, 1.0));
    s.push(`<rect x="${X(3.3)}" y="${Y(9.9)}" width="${2.4 * k}" height="${2.6 * k}" rx="1" fill="#1f1f1f"/>
            <rect x="${X(5.7)}" y="${Y(10.1)}" width="${0.7 * k}" height="${0.8 * k}" fill="${C_MODULE.metal}"/>
            <rect x="${X(5.7)}" y="${Y(11.5)}" width="${0.7 * k}" height="${0.8 * k}" fill="${C_MODULE.metal}"/>
            <rect x="${X(2.6)}" y="${Y(10.8)}" width="${0.7 * k}" height="${0.8 * k}" fill="${C_MODULE.metal}"/>`,
           T(2.0, 11.3, 'Q1', 1.0, 'middle', 90));
    s.push(composantCMS(X, Y, k, 6.4, 9.9, 1.0, 2.6), composantCMS(X, Y, k, 7.9, 9.9, 1.0, 2.6),
           T(7.0, 13.4, 'R4', 0.9, 'middle', 180), T(8.5, 13.4, 'R5', 0.9, 'middle', 180),
           composantCMS(X, Y, k, 8.1, 13.8, 1.0, 2.4), T(8.7, 17.0, 'R3', 1.0, 'middle'));
    // Potentiometre de reglage R2 : boitier metallique, disque orange « 103 » et sa croix
    s.push(`<rect x="${X(10.3)}" y="${Y(9.8)}" width="${7.2 * k}" height="${6.8 * k}" rx="1.5" fill="${C_MODULE.metal}" stroke="#8b949b" stroke-width="0.8"/>
            <circle cx="${X(14.0)}" cy="${Y(13.2)}" r="${2.6 * k}" fill="#e8a33c" stroke="#b97a1c" stroke-width="1"/>
            <path d="M ${X(13.0)} ${Y(13.6)} H ${X(15.0)} M ${X(14.0)} ${Y(12.6)} V ${Y(14.6)}" stroke="#8a5a14" stroke-width="2.2" stroke-linecap="round"/>
            <text x="${X(14.0)}" y="${Y(11.6)}" font-family="Consolas, monospace" font-size="${1.0 * k}" fill="#5a3a0a" text-anchor="middle" dominant-baseline="central">103</text>`,
           T(14.3, 17.5, 'R2', 1.1, 'middle'));
    // LED D1 : cercle blanc serigraphie, halo (allumee seulement), la LED, son reflet, « + »
    s.push(`<circle cx="${X(4.6)}" cy="${Y(16.1)}" r="${3.2 * k}" fill="none" stroke="#e8f1f8" stroke-width="1"/>
            <circle class="mv-halo" cx="${X(4.6)}" cy="${Y(16.1)}" r="${4.4 * k}" fill="${c.halo}" opacity="0" filter="url(#mod-halo)"/>
            <circle class="mv-led" data-couleur="${c.nom}" cx="${X(4.6)}" cy="${Y(16.1)}" r="${2.8 * k}" fill="${c.eteinte}" stroke="rgba(0,0,0,0.45)" stroke-width="1.2"/>
            <circle class="mv-reflet" cx="${X(3.8)}" cy="${Y(15.2)}" r="${0.8 * k}" fill="#ffffff" fill-opacity="0.25"/>`,
           T(1.1, 13.0, 'D1', 1.0, 'middle', 90), T(1.2, 18.9, '+', 1.6, 'middle'));
    return s.join('\n');
}

/** Buzzer Grove (TS 275701, photo du modele ; dessin du modele, nov. 2026) : circuit 20 x 20 mm, decoupes au milieu des
    bords haut et bas, prise J1 en haut (ouverture vers le haut, 4 contacts), resistance R1 et transistor Q1 a gauche,
    buzzer BUZ1 : disque noir perce au centre, repere « + » sur le boitier et serigraphie « + » a droite. Quand il sonne,
    deux ondes jaunes a droite du disque (groupe mv-onde, allume en direct par montage.js).
    Ordre des contacts de J1 (non serigraphie au recto) : le meme que le module LED, SIG a gauche. */
function dessinBuzzer(x, y) {
    const k = K_MODULE, X = v => x + v * k, Y = v => y + v * k;
    const s = [oreille(X(-0.6), Y(9.6), 1.75 * k), oreille(X(20.6), Y(9.6), 1.75 * k),
        `<rect x="${X(0)}" y="${Y(0)}" width="${20 * k}" height="${20 * k}" rx="${0.8 * k}" fill="${C_MODULE.pcb}" stroke="${C_MODULE.bord}" stroke-width="1.2"/>`];
    // Decoupes du milieu des bords haut et bas (fond de la simulation)
    s.push(`<rect class="mod-encoche" x="${X(7.8)}" y="${Y(0) - 2}" width="${4.4 * k}" height="${0.7 * k + 2}"/>
            <rect class="mod-encoche" x="${X(7.6)}" y="${Y(19.2)}" width="${4.8 * k}" height="${0.8 * k + 2}"/>`);
    // Prise J1 en haut, ouverture vers le haut, et ses 4 contacts
    s.push(`<rect x="${X(4.9)}" y="${Y(0.8)}" width="${10.2 * k}" height="${5.6 * k}" rx="2" fill="${C_PRISE.fond}" stroke="${C_PRISE.bord}" stroke-width="1.2"/>
            <rect x="${X(5.9)}" y="${Y(1.7)}" width="${8.2 * k}" height="${3.0 * k}" rx="1.5" fill="${C_PRISE.creux}"/>`);
    [7.2, 9.0, 11.0, 12.9].forEach(v => s.push(`<rect x="${X(v) - 1.8}" y="${Y(3.0)}" width="3.6" height="${0.8 * k}" rx="1" fill="#c9a84a"/>`));
    const texte = (tx, ty, t, taille, rot) => `<text x="${X(tx)}" y="${Y(ty)}" font-size="${taille * k}" font-weight="600"
              font-family="Inter, Arial, sans-serif" fill="#e8f1f8"${rot ? ` transform="rotate(90 ${X(tx)} ${Y(ty)})"` : ''}>${t}</text>`;
    s.push(texte(2.4, 3.8, 'R1', 1.3), texte(16.0, 3.8, 'J1', 1.3), texte(2.6, 10.6, 'Q1', 1.2, true), texte(2.6, 13.6, 'BUZ1', 1.2, true));
    // R1 (resistance CMS) et Q1 (transistor a 3 pattes)
    s.push(`<rect x="${X(1.5)}" y="${Y(4.7)}" width="${3.2 * k}" height="${1.4 * k}" rx="1" fill="#1f1f1f" stroke="#e8f1f8" stroke-width="0.8"/>
            <rect x="${X(1.6)}" y="${Y(6.9)}" width="${0.8 * k}" height="${0.6 * k}" fill="${C_MODULE.metal}"/>
            <rect x="${X(1.6)}" y="${Y(8.6)}" width="${0.8 * k}" height="${0.6 * k}" fill="${C_MODULE.metal}"/>
            <rect x="${X(3.8)}" y="${Y(7.7)}" width="${0.8 * k}" height="${0.6 * k}" fill="${C_MODULE.metal}"/>
            <rect x="${X(2.4)}" y="${Y(6.6)}" width="${1.4 * k}" height="${2.5 * k}" rx="1" fill="#1f1f1f"/>`);
    // Buzzer : disque noir, trou central, repere « + » sur le boitier, « + » serigraphie a droite
    const cx = X(10.0), cy = Y(14.6), r = 5.9 * k;
    s.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#262626" stroke="#0e0e0e" stroke-width="1.2"/>
            <circle cx="${cx}" cy="${cy}" r="${1.15 * k}" fill="#0b0b0b"/>
            <circle cx="${X(14.1)}" cy="${Y(13.6)}" r="${1.3 * k}" fill="none" stroke="#111" stroke-width="1.2"/>
            <path d="M ${X(13.3)} ${Y(13.6)} H ${X(14.9)} M ${X(14.1)} ${Y(12.8)} V ${Y(14.4)}" stroke="#111" stroke-width="1.2"/>
            <path d="M ${X(16.6)} ${Y(13.6)} H ${X(18.6)} M ${X(17.6)} ${Y(12.6)} V ${Y(14.6)}" stroke="#e8f1f8" stroke-width="1.2"/>`);
    // Ondes du son (cachees au repos ; montage.js les montre quand le buzzer sonne)
    s.push('<g class="mv-onde">' + [3.0, 4.2].map(d => `<path d="M ${cx + r + d * k} ${cy - (2.2 + d) * k} Q ${cx + r + (d + 1.6) * k} ${cy} ${cx + r + d * k} ${cy + (2.2 + d) * k}"
              fill="none" stroke="#f4c20d" stroke-width="2.4" stroke-linecap="round"/>`).join('') + '</g>');
    return s.join('\n');
}

/** Relais Grove (TS 275725, photo du modele : 20 x 40 mm, relais HLS8L-DC3V-S-C ; dessin du modele, nov. 2026). Oreille
    en haut (sous le relais) et oreilles a gauche et a droite en bas, encoches sur les cotes et au bord bas ; le boitier
    noir du relais porte le symbole de son contact, ouvert ou ferme ; composants R1, R2, R3, Q1, D1, C1, U3, voyant D3
    allume quand le contact est ferme ; bornier a vis vert (J1) ; prise Grove J2 au bord bas, ouverture vers le bas
    (GND VCC NC SIG de gauche a droite). Contact et voyant changent en direct (allumerRelais, montage.js). */
function dessinRelais(x, y) {
    const k = K_MODULE, X = v => x + v * k, Y = v => y + v * k;
    const T = (tx, ty, t, taille, ancre, rot) => serigraphie(X, Y, k, tx, ty, t, taille, ancre, rot);
    const s = [oreille(X(10), Y(-0.6), 1.75 * k), oreille(X(-0.6), Y(29.8), 1.75 * k), oreille(X(20.6), Y(29.8), 1.75 * k),
        `<rect x="${X(0)}" y="${Y(0)}" width="${20 * k}" height="${40 * k}" rx="${0.8 * k}" fill="${C_MODULE.pcb}" stroke="${C_MODULE.bord}" stroke-width="1.2"/>`];
    // Encoches : sur les cotes (a mi-hauteur du relais) et au bord bas, a droite de la prise
    const de = 2.6 * k, re = 3.2 * k, rb = 1.1 * k;
    s.push(`<path class="mod-encoche" d="M ${X(0) - 2} ${Y(9.8) - de} H ${X(0)} A ${re} ${re} 0 0 1 ${X(0)} ${Y(9.8) + de} H ${X(0) - 2} Z"/>
            <path d="M ${X(0)} ${Y(9.8) - de} A ${re} ${re} 0 0 1 ${X(0)} ${Y(9.8) + de}" fill="none" stroke="${C_MODULE.bord}" stroke-width="1"/>
            <path class="mod-encoche" d="M ${X(20) + 2} ${Y(9.8) - de} H ${X(20)} A ${re} ${re} 0 0 0 ${X(20)} ${Y(9.8) + de} H ${X(20) + 2} Z"/>
            <path d="M ${X(20)} ${Y(9.8) - de} A ${re} ${re} 0 0 0 ${X(20)} ${Y(9.8) + de}" fill="none" stroke="${C_MODULE.bord}" stroke-width="1"/>
            <path class="mod-encoche" d="M ${X(14.3) - rb} ${Y(40) + 2} V ${Y(40)} A ${rb} ${rb} 0 0 1 ${X(14.3) + rb} ${Y(40)} V ${Y(40) + 2} Z"/>
            <path d="M ${X(14.3) - rb} ${Y(40)} A ${rb} ${rb} 0 0 1 ${X(14.3) + rb} ${Y(40)}" fill="none" stroke="${C_MODULE.bord}" stroke-width="1"/>`);
    // Boitier du relais, qui depasse un peu du bord haut, comme sur la photo ; repere rond en bas a droite
    s.push(`<rect x="${X(1.0)}" y="${Y(-1.0)}" width="${17.8 * k}" height="${23.1 * k}" rx="${0.8 * k}" fill="#232323" stroke="#000" stroke-width="1.2"/>
            <path d="M ${X(1.6)} ${Y(20.4)} H ${X(18.2)}" stroke="#3a3a3a" stroke-width="1.6"/>
            <circle cx="${X(16.6)}" cy="${Y(18.6)}" r="${0.7 * k}" fill="#3e3e3e"/>
            <text x="${X(9.9)}" y="${Y(2.0)}" font-family="Inter, Arial, sans-serif" font-size="${1.3 * k}" font-weight="600" fill="#cfcfcf"
              text-anchor="middle" dominant-baseline="central">HLS8L-DC3V-S-C</text>`);
    // Symbole du contact : deux bornes ; la lame (mv-lame) se pose sur la borne de droite quand le relais est ferme
    const ax = X(5.6), bx = X(14.4), cy = Y(11.6);
    const ouverte = `M ${ax} ${cy} L ${X(13.4)} ${Y(6.6)}`, fermee = `M ${ax} ${cy} L ${bx} ${cy}`;
    s.push(`<path d="M ${X(3.4)} ${cy} H ${ax} M ${bx} ${cy} H ${X(16.6)}" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round"/>
            <path class="mv-lame" data-ouverte="${ouverte}" data-fermee="${fermee}" d="${ouverte}" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round"/>
            <circle cx="${ax}" cy="${cy}" r="${0.8 * k}" fill="#ffffff"/>
            <circle cx="${bx}" cy="${cy}" r="${0.8 * k}" fill="#232323" stroke="#ffffff" stroke-width="2"/>`);
    // Composants : R3, diode D1, transistor Q1, R1, C1, U3, R2 et le voyant D3
    s.push(composantCMS(X, Y, k, 1.9, 24.2, 2.6, 1.1), T(1.0, 24.7, 'R3', 0.9, 'middle', -90));
    s.push(`<rect x="${X(5.6)}" y="${Y(24.4)}" width="${4.4 * k}" height="${1.4 * k}" rx="1.5" fill="#1f1f1f"/>
            <rect x="${X(6.8)}" y="${Y(24.6)}" width="${2.0 * k}" height="${1.0 * k}" rx="1.5" fill="#b4602e"/>`, T(7.8, 26.5, 'D1', 0.9, 'middle', 180));
    s.push(`<rect x="${X(1.7)}" y="${Y(26.9)}" width="${3.1 * k}" height="${1.4 * k}" rx="1" fill="#1f1f1f"/>
            <rect x="${X(2.0)}" y="${Y(26.3)}" width="${0.8 * k}" height="${0.6 * k}" fill="${C_MODULE.metal}"/>
            <rect x="${X(3.7)}" y="${Y(26.3)}" width="${0.8 * k}" height="${0.6 * k}" fill="${C_MODULE.metal}"/>
            <rect x="${X(2.85)}" y="${Y(28.3)}" width="${0.8 * k}" height="${0.6 * k}" fill="${C_MODULE.metal}"/>`, T(1.0, 27.6, 'Q1', 0.9, 'middle', -90));
    s.push(composantCMS(X, Y, k, 5.4, 26.7, 1.2, 3.0), T(4.6, 29.4, 'R1', 0.9, 'middle', -90));
    s.push(composantCMS(X, Y, k, 7.2, 27.0, 3.0, 1.3), T(9.6, 26.5, 'C1', 0.9, 'middle', 180));
    s.push(`<rect x="${X(7.4)}" y="${Y(29.3)}" width="${2.6 * k}" height="${2.0 * k}" rx="1" fill="#1f1f1f"/>`, T(8.4, 32.3, 'U3', 0.9, 'middle', 180));
    s.push(composantCMS(X, Y, k, 5.1, 29.9, 1.2, 2.6), T(4.4, 31.2, 'R2', 0.9, 'middle', -90));
    s.push(`<circle class="mv-halo" cx="${X(3.2)}" cy="${Y(31.2)}" r="${2.0 * k}" fill="#ff3b30" opacity="0" filter="url(#mod-halo)"/>
            <rect class="mv-voyant" x="${X(2.6)}" y="${Y(30.0)}" width="${1.2 * k}" height="${2.5 * k}" rx="1" fill="#8e1f1a" stroke="#e8f1f8" stroke-width="0.8"/>`,
           T(1.6, 31.2, 'D3', 0.9, 'middle', -90));
    // Bornier a vis vert J1 (deux vis)
    s.push(`<rect x="${X(10.4)}" y="${Y(23.3)}" width="${8.6 * k}" height="${8.9 * k}" fill="none" stroke="#e8f1f8" stroke-width="0.8"/>
            <rect x="${X(10.8)}" y="${Y(23.6)}" width="${7.7 * k}" height="${8.3 * k}" rx="1.5" fill="#3aa655" stroke="#22743a" stroke-width="1.2"/>`);
    [25.8, 29.7].forEach(v => s.push(`<circle cx="${X(14.7)}" cy="${Y(v)}" r="${1.5 * k}" fill="${C_MODULE.metal}" stroke="#7d868c" stroke-width="1"/>
            <path d="M ${X(13.7)} ${Y(v) + 0.5 * k} L ${X(15.7)} ${Y(v) - 0.5 * k}" stroke="#6b7378" stroke-width="1.8" stroke-linecap="round"/>`));
    s.push(T(16.9, 32.9, 'J1', 0.9, 'middle', -90));
    // Prise Grove J2 au bord bas, ouverture vers le bas, et ses 4 contacts
    s.push(`<rect x="${X(5.1)}" y="${Y(33.5)}" width="${11.1 * k}" height="${5.9 * k}" rx="2" fill="${C_PRISE.fond}" stroke="${C_PRISE.bord}" stroke-width="1.2"/>
            <rect x="${X(6.0)}" y="${Y(35.4)}" width="${9.3 * k}" height="${3.0 * k}" rx="1.5" fill="${C_PRISE.creux}"/>`);
    [7.4, 9.5, 11.6, 13.7].forEach(v => s.push(`<rect x="${X(v) - 0.35 * k}" y="${Y(36.6)}" width="${0.7 * k}" height="${0.7 * k}" fill="#9aa1a5"/>`));
    s.push(T(4.1, 36.6, 'J2', 1.0, 'middle', -90));
    return s.join('\n');
}

/** Ferme ou ouvre en direct le relais dessine : lame du contact, voyant D3 et son halo. */
export function allumerRelais(g, ferme) {
    const lame = g.querySelector('.mv-lame');
    if (lame) {
        lame.setAttribute('d', ferme ? lame.dataset.fermee : lame.dataset.ouverte);
        lame.setAttribute('stroke', ferme ? '#7ee08a' : '#ffffff');
    }
    const voyant = g.querySelector('.mv-voyant');
    if (voyant) { voyant.setAttribute('fill', ferme ? '#ff3b30' : '#8e1f1a'); voyant.setAttribute('stroke', ferme ? '#ffb0a8' : '#e8f1f8'); }
    const halo = g.querySelector('.mv-halo');
    if (halo) halo.setAttribute('opacity', ferme ? '0.45' : '0');
}

/** Allume ou eteint en direct la LED dessinee (groupe g du module), dans sa couleur ; eclat de 0 a 1. */
export function allumerLed(g, eclat) {
    const led = g.querySelector('.mv-led');
    if (!led) return;
    const c = COULEURS_LED[led.dataset.couleur] || COULEURS_LED.rouge;
    led.setAttribute('fill', eclat > 0 ? c.allumee : c.eteinte);
    led.setAttribute('stroke', eclat > 0 ? c.bord : 'rgba(0,0,0,0.45)');
    const halo = g.querySelector('.mv-halo');
    if (halo) halo.setAttribute('opacity', (eclat * 0.45).toFixed(2));
    const reflet = g.querySelector('.mv-reflet');
    if (reflet) reflet.setAttribute('fill-opacity', eclat > 0 ? '0.7' : '0.25');
}

// Modules dessines, par pictogramme de montage.js : taille du circuit (mm), prise (point d'arrivee du cable et sens de
// sortie, en mm), position de chaque contact le long de la prise (mm, dans l'ordre des fils du cable : SIG, NC ou SIG2,
// VCC, GND) pour que chaque fil arrive sur son contact, dessin (x, y = coin haut gauche du circuit, en unites).
// Comme le modele, montage.js tourne chaque module par quart de tour pour que sa prise regarde le port du cable
// (afficheur: true = jamais tourne, pour rester lisible).
export const DESSINS_MODULES = {
    led: { largeur: 20, hauteur: 20, connecteur: { x: 9.8, y: 0.2, sens: 'haut', contacts: [6.4, 8.6, 10.8, 12.9] }, couleurs: true,
           dessin: (x, y, m) => dessinLed(x, y, m.couleur) },
    buzzer: { largeur: 20, hauteur: 20, connecteur: { x: 10.0, y: 0.8, sens: 'haut', contacts: [7.2, 9.0, 11.0, 12.9] },
           dessin: (x, y) => dessinBuzzer(x, y) },
    // Prise J2 au bord bas : GND VCC NC SIG de gauche a droite, donc contacts dans l'ordre des fils (SIG, NC, VCC, GND)
    relais: { largeur: 20, hauteur: 40, connecteur: { x: 10.6, y: 39.4, sens: 'bas', contacts: [13.7, 11.6, 9.5, 7.4] },
           dessin: (x, y) => dessinRelais(x, y) },
};
