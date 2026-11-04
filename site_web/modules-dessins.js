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

/** Bouton poussoir Grove (TS 276329, photo du modele ; dessin du modele, nov. 2026) : circuit 20 x 20 mm, oreilles en
    haut et en bas, encoche peu profonde au milieu du bord droit, prise J1 a gauche (ouverture vers la gauche) avec ses
    pattes de fixation, contacts et inscriptions GND VCC NC SIG (de haut en bas) ; touche SW1 (corps metallique, 4 pattes,
    touche ronde) a droite ; resistances R1 et R2 en bas. Comme le modele, on appuie sur la touche ronde (zone mv-appui) ;
    le reste du module sert a le deplacer. montage.js l'enfonce en direct (allumerBouton). */
function dessinBouton(x, y) {
    const k = K_MODULE, X = v => x + v * k, Y = v => y + v * k;
    const T = (tx, ty, t, taille, ancre, rot) => serigraphie(X, Y, k, tx, ty, t, taille, ancre, rot);
    const s = [oreille(X(10), Y(-0.6), 1.75 * k), oreille(X(10), Y(20.6), 1.75 * k),
        `<rect x="${X(0)}" y="${Y(0)}" width="${20 * k}" height="${20 * k}" rx="${0.8 * k}" fill="${C_MODULE.pcb}" stroke="${C_MODULE.bord}" stroke-width="1.2"/>`];
    // Encoche peu profonde au milieu du bord droit : 4,6 mm de haut pour 1 mm de creux, arc de rayon 3,15 mm
    const de = 2.3 * k, re = 3.15 * k;
    s.push(`<path class="mod-encoche" d="M ${X(20) + 2} ${Y(10.1) - de} H ${X(20)} A ${re} ${re} 0 0 0 ${X(20)} ${Y(10.1) + de} H ${X(20) + 2} Z"/>
            <path d="M ${X(20)} ${Y(10.1) - de} A ${re} ${re} 0 0 0 ${X(20)} ${Y(10.1) + de}" fill="none" stroke="${C_MODULE.bord}" stroke-width="1"/>`);
    // Prise J1 a gauche : pattes de fixation, boitier, creux, 4 contacts, pattes soudees a droite
    s.push(`<rect x="${X(2.3)}" y="${Y(2.9)}" width="${2.4 * k}" height="${1.0 * k}" rx="1" fill="${C_MODULE.metal}"/>
            <rect x="${X(2.3)}" y="${Y(16.3)}" width="${2.4 * k}" height="${1.0 * k}" rx="1" fill="${C_MODULE.metal}"/>
            <rect x="${X(1.0)}" y="${Y(3.2)}" width="${5.7 * k}" height="${13.8 * k}" rx="2" fill="${C_PRISE.fond}" stroke="${C_PRISE.bord}" stroke-width="1.2"/>
            <rect x="${X(1.8)}" y="${Y(4.6)}" width="${3.4 * k}" height="${11.0 * k}" rx="1.5" fill="${C_PRISE.creux}"/>`);
    [7.0, 9.1, 11.2, 13.3].forEach(v => s.push(`<rect x="${X(3.0)}" y="${Y(v) - 0.35 * k}" width="${0.8 * k}" height="${0.7 * k}" fill="#9aa1a5"/>
            <rect x="${X(6.0)}" y="${Y(v) - 0.45 * k}" width="${1.9 * k}" height="${0.9 * k}" rx="1" fill="#5a5f63"/>`));
    s.push(T(7.6, 4.6, 'J1', 1.3));
    [['GND', 7.0], ['VCC', 9.1], ['NC', 11.2], ['SIG', 13.3]].forEach(([t, v]) => s.push(T(8.3, v, t, 1.15)));
    // R1 et R2 en bas
    s.push(composantCMS(X, Y, k, 8.0, 15.3, 1.2, 2.6), composantCMS(X, Y, k, 9.7, 15.3, 1.2, 2.6),
           T(7.3, 17.4, 'R1', 0.9, 'middle', 90), T(11.6, 17.4, 'R2', 0.9, 'middle', 90));
    // Touche SW1 : 4 pattes, corps metallique, plots aux coins
    s.push(T(13.3, 4.8, 'SW1', 1.3));
    [[11.7, 5.4], [16.3, 5.4], [11.7, 14.1], [16.3, 14.1]].forEach(([px, py]) =>
        s.push(`<rect x="${X(px)}" y="${Y(py)}" width="${1.2 * k}" height="${1.9 * k}" rx="1" fill="${C_MODULE.metal}" stroke="#8b949b" stroke-width="0.8"/>`));
    s.push(`<rect x="${X(11.2)}" y="${Y(7.3)}" width="${6.9 * k}" height="${6.6 * k}" rx="1.5" fill="#8d8478" stroke="#6b6359" stroke-width="1"/>`);
    [[12.1, 8.2], [17.2, 8.2], [12.1, 13.0], [17.2, 13.0]].forEach(([px, py]) =>
        s.push(`<circle cx="${X(px)}" cy="${Y(py)}" r="${0.6 * k}" fill="#a39886"/>`));
    // Touche ronde : zone d'appui (mv-appui), anneau vert quand elle est enfoncee, touche et reflet
    s.push(`<g class="mv-appui">
              <rect x="${X(11.2)}" y="${Y(7.3)}" width="${6.9 * k}" height="${6.6 * k}" fill="transparent"/>
              <circle class="mv-anneau" cx="${X(14.65)}" cy="${Y(10.6)}" r="${2.6 * k}" fill="none" stroke="#4caa3c" stroke-width="3" opacity="0"/>
              <circle class="mv-capuchon" data-r-repos="${1.95 * k}" data-r-enfonce="${1.65 * k}" cx="${X(14.65)}" cy="${Y(10.6)}" r="${1.95 * k}"
                      fill="#3b3b3b" stroke="#5a5a5a" stroke-width="1.2"/>
              <circle class="mv-reflet" cx="${X(14.15)}" cy="${Y(10.1)}" r="${0.6 * k}" fill="#ffffff" fill-opacity="0.18"/>
            </g>`);
    return s.join('\n');
}

/** Enfonce ou relache en direct la touche du bouton poussoir dessine. */
export function allumerBouton(g, enfonce) {
    const touche = g.querySelector('.mv-appui .mv-capuchon');
    if (!touche) return;
    touche.setAttribute('r', enfonce ? touche.dataset.rEnfonce : touche.dataset.rRepos);
    touche.setAttribute('fill', enfonce ? '#1f1f1f' : '#3b3b3b');
    touche.setAttribute('stroke', enfonce ? '#000' : '#5a5a5a');
    const anneau = g.querySelector('.mv-anneau');
    if (anneau) anneau.setAttribute('opacity', enfonce ? '1' : '0');
    const reflet = g.querySelector('.mv-appui .mv-reflet');
    if (reflet) reflet.setAttribute('fill-opacity', enfonce ? '0' : '0.18');
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

/** Capteur de lumiere Grove analogique (TS 275703, photo du modele ; dessin du modele « dessinPhotoresistance »,
    nov. 2026) : circuit 20 x 20 mm, oreilles en haut et en bas, encoche ronde au bord droit, prise J1 a gauche
    (ouverture vers la gauche) avec ses contacts et GND VCC NC SIG, resistance R1, photoresistance « LIGHT » (lentille
    claire, piste rougeatre), amplificateur U1 a 8 pattes. Ajout (accepte, nov. 2026) : un halo jaune sur la lentille,
    d'autant plus fort que la lumiere mesuree est grande (allumerLumiere). */
function dessinLumiere(x, y) {
    const k = K_MODULE, X = v => x + v * k, Y = v => y + v * k;
    const T = (tx, ty, t, taille, ancre, rot) => serigraphie(X, Y, k, tx, ty, t, taille, ancre, rot);
    const s = [oreille(X(10.1), Y(-0.6), 1.75 * k), oreille(X(10.1), Y(20.6), 1.75 * k),
        `<rect x="${X(0)}" y="${Y(0)}" width="${20 * k}" height="${20 * k}" rx="${0.8 * k}" fill="${C_MODULE.pcb}" stroke="${C_MODULE.bord}" stroke-width="1.2"/>`];
    // Encoche ronde au bord droit
    const re = 1.7 * k;
    s.push(`<path class="mod-encoche" d="M ${X(20) + 2} ${Y(10.5) - re} H ${X(20)} A ${re} ${re} 0 0 0 ${X(20)} ${Y(10.5) + re} H ${X(20) + 2} Z"/>
            <path d="M ${X(20)} ${Y(10.5) - re} A ${re} ${re} 0 0 0 ${X(20)} ${Y(10.5) + re}" fill="none" stroke="${C_MODULE.bord}" stroke-width="1"/>`);
    // Prise J1 a gauche : boitier, creux, 4 contacts
    s.push(`<rect x="${X(1.0)}" y="${Y(4.7)}" width="${5.1 * k}" height="${9.1 * k}" rx="2" fill="${C_PRISE.fond}" stroke="${C_PRISE.bord}" stroke-width="1.2"/>
            <rect x="${X(1.8)}" y="${Y(5.6)}" width="${2.7 * k}" height="${7.3 * k}" rx="1.5" fill="${C_PRISE.creux}"/>`);
    [7.9, 9.5, 11.1, 12.8].forEach(v => s.push(`<rect x="${X(2.8)}" y="${Y(v) - 0.3 * k}" width="${0.7 * k}" height="${0.6 * k}" fill="#9aa1a5"/>`));
    s.push(T(3.0, 3.9, 'J1', 1.2), T(12.0, 3.9, 'LIGHT', 1.2), T(9.3, 4.9, 'R1', 1.0), T(9.3, 9.9, 'U1', 1.0));
    [['GND', 7.9], ['VCC', 9.5], ['NC', 11.1], ['SIG', 12.8]].forEach(([t, v]) => s.push(T(6.4, v, t, 0.95)));
    // R1 : petite resistance CMS
    s.push(`<rect x="${X(9.6)}" y="${Y(5.6)}" width="${1.1 * k}" height="${2.8 * k}" rx="1" fill="#1f1f1f" stroke="#e8f1f8" stroke-width="0.8"/>`);
    // Photoresistance : halo (lumiere mesuree), lentille claire, piste rougeatre au centre
    const cx = X(13.1), cy = Y(6.6);
    s.push(`<circle class="mv-halo" cx="${cx}" cy="${cy}" r="${3.6 * k}" fill="#ffd84a" filter="url(#mod-halo)" opacity="0"/>
            <circle cx="${cx}" cy="${cy}" r="${1.9 * k}" fill="#e9e9f0" stroke="#b8b8c6" stroke-width="1"/>
            <circle class="mv-lentille" cx="${cx}" cy="${cy}" r="${1.2 * k}" fill="#d9d4dc"/>
            <rect x="${cx - 0.35 * k}" y="${cy - 0.9 * k}" width="${0.7 * k}" height="${1.8 * k}" rx="2" fill="#a2463c"/>`);
    // U1 : amplificateur a 8 pattes
    [10.9, 12.0, 13.1, 14.2].forEach(v => s.push(
        `<rect x="${X(9.9)}" y="${Y(v) - 1.5}" width="${1.3 * k}" height="3" rx="1" fill="${C_MODULE.metal}"/>
         <rect x="${X(14.7)}" y="${Y(v) - 1.5}" width="${1.3 * k}" height="3" rx="1" fill="${C_MODULE.metal}"/>`));
    s.push(`<rect x="${X(11.1)}" y="${Y(10.3)}" width="${3.7 * k}" height="${4.5 * k}" rx="1.5" fill="#1f1f1f"/>
            <circle cx="${X(11.8)}" cy="${Y(11.0)}" r="1.6" fill="#3c3c3c"/>`);
    return s.join('\n');
}

/** Detecteur de mouvement PIR Grove (TS 275704, photo du modele ; dessin du modele « dessinPir », nov. 2026) :
    circuit 40 x 20 mm, oreilles a gauche (sous la lentille), en haut et en bas (x 30,5 mm), encoches en haut et en bas
    (x 9,9 mm) ; lentille de Fresnel blanche (O 13,8 mm) a gauche, deux pastilles au-dessus ; composants CMS, circuit
    integre a 16 pattes au milieu, cavalier en bas a droite, prise Grove couchee au bord droit. Comme le modele, un clic
    sur la lentille (zone mv-appui) bascule « mouvement / rien ne bouge » ; cercle vert autour d'elle pendant un
    mouvement (allumerPir). */
function dessinPir(x, y) {
    const k = K_MODULE, X = v => x + v * k, Y = v => y + v * k;
    const rect = (x0, y0, x1, y1, attr) => `<rect x="${X(x0)}" y="${Y(y0)}" width="${(x1 - x0) * k}" height="${(y1 - y0) * k}" ${attr}/>`;
    const cms = (x0, y0, l, h) => composantCMS(X, Y, k, x0, y0, l, h);
    const s = [oreille(X(-0.2), Y(10.1), 1.75 * k), oreille(X(30.5), Y(-0.4), 1.75 * k), oreille(X(30.5), Y(20.4), 1.75 * k),
        `<rect x="${X(0)}" y="${Y(0)}" width="${40 * k}" height="${20 * k}" rx="${0.8 * k}" fill="${C_MODULE.pcb}" stroke="${C_MODULE.bord}" stroke-width="1.2"/>`];
    // Encoches en haut et en bas
    const re = 2.2 * k, xe = 9.9;
    s.push(`<path class="mod-encoche" d="M ${X(xe) - re} ${Y(0) - 2} V ${Y(0)} A ${re} ${re} 0 0 0 ${X(xe) + re} ${Y(0)} V ${Y(0) - 2} Z"/>
            <path d="M ${X(xe) - re} ${Y(0)} A ${re} ${re} 0 0 0 ${X(xe) + re} ${Y(0)}" fill="none" stroke="${C_MODULE.bord}" stroke-width="1"/>
            <path class="mod-encoche" d="M ${X(xe) - re} ${Y(20) + 2} V ${Y(20)} A ${re} ${re} 0 0 1 ${X(xe) + re} ${Y(20)} V ${Y(20) + 2} Z"/>
            <path d="M ${X(xe) - re} ${Y(20)} A ${re} ${re} 0 0 1 ${X(xe) + re} ${Y(20)}" fill="none" stroke="${C_MODULE.bord}" stroke-width="1"/>`);
    // Deux pastilles au-dessus de la lentille, dans leur cadre
    s.push(rect(2.3, 0.9, 8.1, 4.0, 'rx="2" fill="none" stroke="#e8f1f8" stroke-width="0.8"'));
    [3.7, 6.6].forEach(px => s.push(`<circle cx="${X(px)}" cy="${Y(2.5)}" r="${0.75 * k}" fill="${C_MODULE.metal}" stroke="#8b949b" stroke-width="0.8"/>`,
                                    `<circle cx="${X(px)}" cy="${Y(2.5)}" r="${0.3 * k}" fill="#6c757d"/>`));
    // Composants CMS : rangee du haut, colonnes a gauche et a droite du circuit, rangee du bas
    [16.0, 17.8, 19.6, 21.4, 23.2].forEach(px => s.push(cms(px, 1.6, 0.9, 1.8)));
    [[15.4, 6.0], [17.2, 6.0], [15.4, 9.3], [17.2, 9.3], [18.8, 9.3], [17.2, 12.4], [18.8, 12.4]].forEach(([px, py]) => s.push(cms(px, py, 0.9, 1.8)));
    [[27.9, 6.6], [29.6, 6.6], [27.9, 12.2], [29.6, 12.2]].forEach(([px, py]) => s.push(cms(px, py, 0.9, 1.8)));
    s.push(cms(31.2, 6.4, 1.2, 2.4), cms(35.0, 0.6, 2.0, 0.9), cms(19.6, 16.6, 1.8, 0.9), cms(22.4, 16.6, 1.8, 0.9),
           cms(19.6, 18.4, 1.8, 0.9), cms(22.6, 18.4, 1.8, 0.9));
    // Condensateurs au tantale jaunes
    [[26.4, 1.1], [12.8, 11.6]].forEach(([px, py]) => s.push(rect(px, py, px + 2.0, py + 2.6, 'rx="1" fill="#e8b923" stroke="#b88508" stroke-width="0.8"'),
                                                              rect(px, py, px + 2.0, py + 0.5, 'fill="#8a6a10"')));
    // Transistors (3 pattes)
    [[24.7, 1.6], [29.4, 2.6], [32.2, 12.6], [34.6, 2.2]].forEach(([px, py]) => s.push(rect(px, py, px + 1.5, py + 1.3, 'rx="1" fill="#1f1f1f"'),
        rect(px + 0.2, py - 0.5, px + 0.6, py, `fill="${C_MODULE.metal}"`), rect(px + 0.9, py - 0.5, px + 1.3, py, `fill="${C_MODULE.metal}"`),
        rect(px + 0.55, py + 1.3, px + 0.95, py + 1.8, `fill="${C_MODULE.metal}"`)));
    // Pastilles carrees de la rangee du bas, fleche serigraphiee
    [[14.6, 16.6], [14.6, 18.4], [17.6, 16.6], [25.6, 16.6], [25.6, 18.4], [28.5, 17.2]].forEach(([px, py]) =>
        s.push(rect(px, py, px + 0.9, py + 0.9, `rx="1" fill="${C_MODULE.metal}" stroke="#8b949b" stroke-width="0.6"`)));
    s.push(`<path d="M ${X(13.0)} ${Y(7.6)} H ${X(14.4)} L ${X(13.7)} ${Y(8.7)} Z" fill="#e8f1f8"/>`);
    // Circuit integre a 16 pattes (8 de chaque cote), debout
    for (let i = 0; i < 8; i++) {
        const py = 6.1 + i * 1.27;
        s.push(rect(20.3, py - 0.25, 21.3, py + 0.25, `fill="${C_MODULE.metal}"`), rect(25.6, py - 0.25, 26.6, py + 0.25, `fill="${C_MODULE.metal}"`));
    }
    s.push(rect(21.3, 5.4, 25.6, 15.6, 'rx="0.4" fill="#1f1f1f"'), `<circle cx="${X(24.8)}" cy="${Y(14.8)}" r="${0.35 * k}" fill="#3b3b3b"/>`);
    // Cavalier (3 broches, le cavalier noir sur les deux de droite)
    s.push(rect(30.1, 15.9, 32.0, 18.8, 'fill="#1f1f1f"'), rect(30.75, 16.95, 31.35, 17.75, `fill="${C_MODULE.metal}"`),
           rect(32.6, 15.9, 37.4, 18.8, 'rx="1" fill="#2a2a2a" stroke="#111" stroke-width="1"'),
           rect(33.4, 16.6, 36.6, 18.1, 'rx="1" fill="#3b3b3b"'));
    // Prise Grove couchee, ouverture vers la droite, 4 pattes
    s.push(rect(34.0, 4.3, 40.0, 15.3, `rx="2" fill="${C_PRISE.fond}" stroke="${C_PRISE.bord}" stroke-width="1.2"`),
           rect(35.0, 5.3, 40.0, 14.3, `fill="#efede7" stroke="${C_PRISE.bord}" stroke-width="0.8"`));
    [6.7, 8.8, 10.8, 12.9].forEach(v => s.push(rect(32.6, v - 0.35, 34.0, v + 0.35, `fill="${C_MODULE.metal}" stroke="#8b949b" stroke-width="0.6"`),
                                               rect(36.6, v - 0.35, 38.0, v + 0.35, `fill="${C_MODULE.metal}"`)));
    // Lentille de Fresnel (zone d'appui) : anneau vert pendant un mouvement, dome blanc, facettes, reflet
    const cx = X(6.6), cy = Y(9.7), r = 6.9 * k;
    const facettes = [];
    for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3, b = a + Math.PI / 3;
        facettes.push(`M ${cx + 2.4 * k * Math.cos(a)} ${cy + 2.4 * k * Math.sin(a)} L ${cx + 2.4 * k * Math.cos(b)} ${cy + 2.4 * k * Math.sin(b)}`,
                      `M ${cx + 2.4 * k * Math.cos(a)} ${cy + 2.4 * k * Math.sin(a)} L ${cx + 4.9 * k * Math.cos(a)} ${cy + 4.9 * k * Math.sin(a)}`,
                      `M ${cx + 4.9 * k * Math.cos(a)} ${cy + 4.9 * k * Math.sin(a)} Q ${cx + 5.6 * k * Math.cos(a + Math.PI / 6)} ${cy + 5.6 * k * Math.sin(a + Math.PI / 6)} ${cx + 4.9 * k * Math.cos(b)} ${cy + 4.9 * k * Math.sin(b)}`);
    }
    s.push(`<defs><radialGradient id="mod-pir-lentille" cx="0.42" cy="0.38" r="0.65">
              <stop offset="0" stop-color="#ffffff"/><stop offset="0.7" stop-color="#eef0f3"/><stop offset="1" stop-color="#cfd4da"/></radialGradient></defs>
            <g class="mv-appui">
              <title>Cliquez pour simuler un mouvement devant le détecteur (un autre clic l'arrête).</title>
              <circle class="mv-anneau" cx="${cx}" cy="${cy}" r="${r + 0.8 * k}" fill="none" stroke="#4caa3c" stroke-width="4" opacity="0"/>
              <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#mod-pir-lentille)" stroke="#b8bec5" stroke-width="1.2"/>
              <path d="${facettes.join(' ')}" fill="none" stroke="#b8bec5" stroke-opacity="0.7" stroke-width="0.8"/>
              <ellipse cx="${cx - 2.2 * k}" cy="${cy - 2.6 * k}" rx="${1.6 * k}" ry="${0.9 * k}" fill="#ffffff" fill-opacity="0.8" transform="rotate(-35 ${cx - 2.2 * k} ${cy - 2.6 * k})"/>
            </g>`);
    return s.join('\n');
}

/** Potentiometre rotatif Grove (TS 275740 « Rotary(P) v1.0 », photos du modele ; dessin du modele
    « dessinPotentiometre », nov. 2026) : version « P » a monter en facade, prise soudee DESSOUS au bord haut (on voit
    ses 4 pastilles, SIG carree a gauche, « SIG NC VCC GND » ecrit tete-beche, et le bout blanc de la prise depasse
    au-dessus du circuit) ; oreilles en haut et en bas, encoche a gauche ; socle brun et 3 cosses, « ROTATION » ; corps
    metallique rond et bouton noir (zone mv-tourner) qui tourne sur 300 degres (de -150 a +150) pour 0 a 1023. */
function dessinPotentiometre(x, y) {
    const k = K_MODULE, X = v => x + v * k, Y = v => y + v * k;
    const T = (tx, ty, t, taille, ancre, rot) => serigraphie(X, Y, k, tx, ty, t, taille, ancre, rot);
    // Bout de la prise soudee dessous : il depasse au-dessus du bord haut (le cable y arrive)
    const s = [`<rect x="${X(4.6)}" y="${Y(-3.0)}" width="${10.8 * k}" height="${4.0 * k}" rx="2" fill="#ece9e1" stroke="#9c978a" stroke-width="1.2"/>`,
        oreille(X(10), Y(-0.6), 1.75 * k), oreille(X(10), Y(20.6), 1.75 * k),
        `<rect x="${X(0)}" y="${Y(0)}" width="${20 * k}" height="${20 * k}" rx="${0.8 * k}" fill="${C_MODULE.pcb}" stroke="${C_MODULE.bord}" stroke-width="1.2"/>`];
    // Encoche du bord gauche
    const de = 2.2 * k, re = 2.4 * k;
    s.push(`<path class="mod-encoche" d="M ${X(0) - 2} ${Y(10.1) - de} H ${X(0)} A ${re} ${re} 0 0 1 ${X(0)} ${Y(10.1) + de} H ${X(0) - 2} Z"/>
            <path d="M ${X(0)} ${Y(10.1) - de} A ${re} ${re} 0 0 1 ${X(0)} ${Y(10.1) + de}" fill="none" stroke="${C_MODULE.bord}" stroke-width="1"/>`);
    // Pastilles de la prise soudee dessous (SIG carree) et leurs noms, ecrits tete-beche
    [6.8, 8.9, 11.0, 12.9].forEach((v, i) => s.push(i === 0
        ? `<rect x="${X(v) - 0.6 * k}" y="${Y(3.5) - 0.6 * k}" width="${1.2 * k}" height="${1.2 * k}" rx="1" fill="#d9d9d9" stroke="#8b949b" stroke-width="0.8"/>`
        : `<circle cx="${X(v)}" cy="${Y(3.5)}" r="${0.6 * k}" fill="#d9d9d9" stroke="#8b949b" stroke-width="0.8"/>`));
    s.push(T(9.9, 2.0, 'SIG NC VCC GND', 1.1, 'middle', 180));
    // Socle brun et ses 3 cosses percees, a gauche ; « ROTATION » le long du bord
    s.push(`<rect x="${X(3.1)}" y="${Y(6.8)}" width="${6.2 * k}" height="${13.0 * k}" rx="2" fill="#8a5a33"/>`);
    [9.2, 13.2, 17.2].forEach(v => s.push(`<rect x="${X(2.4)}" y="${Y(v) - 1.5 * k}" width="${4.4 * k}" height="${3.0 * k}" rx="1.5" fill="${C_MODULE.metal}" stroke="#8b949b" stroke-width="0.8"/>
            <circle cx="${X(5.3)}" cy="${Y(v)}" r="${0.5 * k}" fill="#4a3220"/>`));
    s.push(T(1.2, 15.8, 'ROTATION', 1.1, 'middle', 90));
    // Patte metallique du haut, corps metallique rond, puis le bouton noir qui tourne (repere : allumerPotentiometre)
    s.push(`<rect x="${X(10.7)}" y="${Y(6.1)}" width="${5.4 * k}" height="${1.3 * k}" rx="2" fill="${C_MODULE.metal}" stroke="#8b949b" stroke-width="0.8"/>`);
    const cx = X(12.9), cy = Y(13.5);
    s.push(`<rect x="${X(19.0)}" y="${Y(12.8)}" width="${0.9 * k}" height="${1.6 * k}" rx="1" fill="${C_MODULE.metal}" stroke="#8b949b" stroke-width="0.8"/>
            <circle cx="${cx}" cy="${cy}" r="${6.4 * k}" fill="#c4c9cc" stroke="#8b949b" stroke-width="1.2"/>
            <circle cx="${cx}" cy="${cy}" r="${5.0 * k}" fill="#aeb4b8"/>
            <g class="mv-tourner">
              <title>Tournez le bouton (glisser autour de son centre) pour régler la valeur.</title>
              <circle cx="${cx}" cy="${cy}" r="${4.0 * k}" fill="#232323" stroke="#000" stroke-width="1.2"/>
              <g class="mv-repere" data-cx="${cx}" data-cy="${cy}" transform="rotate(0 ${cx} ${cy})">
                <path d="M ${cx - 2.9 * k} ${cy - 2.5 * k} A ${3.8 * k} ${3.8 * k} 0 0 1 ${cx + 2.9 * k} ${cy - 2.5 * k} Z" fill="#3a3a3a"/>
                <path d="M ${cx} ${cy - 0.6 * k} V ${cy - 3.6 * k}" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
              </g>
            </g>`);
    return s.join('\n');
}

/** Joystick Grove (TS 275714, photo du modele ; dessin du modele « dessinJoystick », nov. 2026) : circuit 20 x 40 mm,
    encoche demi-ronde au milieu du haut, oreilles a droite (y 9,5 mm) et au milieu du bas ; R3, R5 (noms a l'envers),
    la croix des directions, U2 ; le gros bouton gris (jupe et dome) qui deborde de la carte ; prise J2 debout en bas,
    R6 et R1 a droite. Le dome (zone mv-manche) suit X et Y et s'enfonce quand on appuie (allumerJoystick). */
function dessinJoystick(x, y) {
    const k = K_MODULE, X = v => x + v * k, Y = v => y + v * k;
    const T = (tx, ty, t, taille, ancre, rot) => serigraphie(X, Y, k, tx, ty, t, taille, ancre, rot);
    const rect = (x0, y0, x1, y1, attr) => `<rect x="${X(x0)}" y="${Y(y0)}" width="${(x1 - x0) * k}" height="${(y1 - y0) * k}" ${attr}/>`;
    const s = [oreille(X(20.4), Y(9.5), 1.75 * k), oreille(X(10.0), Y(40.5), 1.75 * k),
        `<rect x="${X(0)}" y="${Y(0)}" width="${20 * k}" height="${40 * k}" rx="${0.8 * k}" fill="${C_MODULE.pcb}" stroke="${C_MODULE.bord}" stroke-width="1.2"/>`];
    // Encoche demi-ronde au milieu du haut
    const re = 2.1 * k, xe = X(9.6);
    s.push(`<path class="mod-encoche" d="M ${xe - re} ${Y(0) - 2} V ${Y(0)} A ${re} ${re} 0 0 0 ${xe + re} ${Y(0)} V ${Y(0) - 2} Z"/>
            <path d="M ${xe - re} ${Y(0)} A ${re} ${re} 0 0 0 ${xe + re} ${Y(0)}" fill="none" stroke="${C_MODULE.bord}" stroke-width="1"/>`);
    // R3, R5 et leurs noms (a l'envers sur la carte), U2, croix des directions
    s.push(composantCMS(X, Y, k, 4.4, 3.4, 2.6, 1.3), composantCMS(X, Y, k, 9.2, 3.4, 2.8, 1.3),
           T(5.7, 2.0, 'R3', 1.1, 'middle', 180), T(10.6, 2.0, 'R5', 1.1, 'middle', 180), T(1.4, 5.9, 'U2', 1.0, 'middle', -90));
    const cx = 15.6, cy = 3.2, b = 2.9, p = 0.7;
    s.push(`<path d="M ${X(cx - b)} ${Y(cy)} H ${X(cx + b)} M ${X(cx)} ${Y(cy - b + 0.3)} V ${Y(cy + b)}
                     M ${X(cx - b + p)} ${Y(cy - p)} L ${X(cx - b)} ${Y(cy)} L ${X(cx - b + p)} ${Y(cy + p)}
                     M ${X(cx + b - p)} ${Y(cy - p)} L ${X(cx + b)} ${Y(cy)} L ${X(cx + b - p)} ${Y(cy + p)}
                     M ${X(cx - p)} ${Y(cy - b + 0.3 + p)} L ${X(cx)} ${Y(cy - b + 0.3)} L ${X(cx + p)} ${Y(cy - b + 0.3 + p)}
                     M ${X(cx - p)} ${Y(cy + b - p)} L ${X(cx)} ${Y(cy + b)} L ${X(cx + p)} ${Y(cy + b - p)}"
                  fill="none" stroke="#e8f1f8" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>`);
    // Prise J2 debout (vue de dessus) : boitier blanc, creux, 4 contacts ; R6 et R1
    s.push(rect(4.4, 32.2, 15.1, 33.9, `fill="#dcd8cd" stroke="${C_PRISE.bord}" stroke-width="1"`),
           rect(4.4, 33.8, 15.1, 40.0, `rx="2" fill="${C_PRISE.fond}" stroke="${C_PRISE.bord}" stroke-width="1.2"`),
           rect(5.2, 35.1, 14.4, 39.0, `fill="#efede7" stroke="${C_PRISE.bord}" stroke-width="0.8"`));
    [6.9, 8.9, 10.9, 12.8].forEach(px => s.push(rect(px - 0.25, 37.0, px + 0.25, 37.5, 'fill="#9aa1a5"')));
    s.push(composantCMS(X, Y, k, 16.3, 34.5, 1.4, 3.2), composantCMS(X, Y, k, 18.3, 34.5, 1.4, 3.2),
           T(17.0, 33.4, 'R6', 1.0, 'middle', -90), T(19.0, 33.4, 'R1', 1.0, 'middle', -90), T(2.9, 35.9, 'J2', 1.0, 'middle', 180));
    // Le bouton : jupe grise fixe, ombre et dome (decales en direct), reflet
    const bx = X(10), by = Y(19.1);
    s.push(`<g class="mv-manche" data-cx="${bx}" data-cy="${by}" data-k="${k}">
              <title>Glissez le bouton pour pousser le manche ; un clic rapide appuie dessus.</title>
              <circle cx="${bx}" cy="${by}" r="${12.5 * k}" fill="#4a4d55" stroke="#2c2e33" stroke-width="1.2"/>
              <circle class="mv-ombre" cx="${bx}" cy="${by + 3}" r="${10.9 * k}" fill="#000" opacity="0.25"/>
              <circle class="mv-dome" cx="${bx}" cy="${by}" r="${10.9 * k}" fill="#3d4047" stroke="#2a2c31" stroke-width="1.2"/>
              <circle class="mv-reflet" cx="${bx - 2 * k}" cy="${by - 2.5 * k}" r="${5 * k}" fill="#ffffff" opacity="0.05"/>
            </g>`);
    return s.join('\n');
}

/** Joystick dessine en direct : dome decale selon X et Y (0 a 1023, centre 512), dans le sens du vrai module releve par
    le modele (X baisse vers la prise J2, Y baisse vers la droite du dessin), course de 2,5 mm sur un cercle ; enfonce
    (plus petit, plus sombre) quand on appuie. */
export function allumerJoystick(g, vx, vy, appui) {
    const manche = g.querySelector('.mv-manche');
    if (!manche) return;
    const k = Number(manche.dataset.k), bx = Number(manche.dataset.cx), by = Number(manche.dataset.cy);
    let ux = -(vy - 512) / 512, uy = -(vx - 512) / 512;
    const d = Math.hypot(ux, uy);
    if (d > 1) { ux /= d; uy /= d; }
    const dx = ux * 2.5 * k, dy = uy * 2.5 * k, r = (appui ? 10.4 : 10.9) * k;
    const dome = manche.querySelector('.mv-dome'), ombre = manche.querySelector('.mv-ombre'), reflet = manche.querySelector('.mv-reflet');
    dome.setAttribute('cx', bx + dx); dome.setAttribute('cy', by + dy); dome.setAttribute('r', r);
    dome.setAttribute('fill', appui ? '#33363c' : '#3d4047');
    ombre.setAttribute('cx', bx + dx); ombre.setAttribute('cy', by + dy + 3); ombre.setAttribute('r', r);
    reflet.setAttribute('cx', bx + dx - 2 * k); reflet.setAttribute('cy', by + dy - 2.5 * k);
}

/** Capteur a ultrasons Grove (TS 275730 « Grove Ultrasonic Ranger V2.0 », photos du modele ; dessin du modele
    « dessinUltrason », nov. 2026) : circuit 50 x 25 mm, deux capsules (emetteur, recepteur) sur leurs zones de cuivre,
    trois trous de fixation, prise Grove au bord bas (elle depasse un peu), ouverture vers le bas, GND VCC NC SIG de
    gauche a droite, logo Grove et inscriptions en bas a gauche. Sans ondes (choix du professeur, nov. 2026) : la
    distance se lit sous le module et se regle dans « Peripheriques ». */
function dessinUltrason(x, y) {
    const k = K_MODULE, X = v => x + v * k, Y = v => y + v * k;
    const T = (tx, ty, t, taille, ancre, rot) => serigraphie(X, Y, k, tx, ty, t, taille, ancre, rot);
    const s = [`<rect x="${X(0)}" y="${Y(0)}" width="${50 * k}" height="${25 * k}" rx="${1.0 * k}" fill="${C_MODULE.pcb}" stroke="${C_MODULE.bord}" stroke-width="1.2"/>`];
    // Zones de cuivre sous les capsules, quelques pistes
    s.push(`<rect x="${X(7.0)}" y="${Y(2.25)}" width="${13.1 * k}" height="${17.5 * k}" rx="2" fill="#1d5a9c"/>
            <rect x="${X(26.6)}" y="${Y(2.8)}" width="${17.8 * k}" height="${16.4 * k}" rx="2" fill="#1d5a9c"/>
            <path d="M ${X(42.0)} ${Y(1.6)} H ${X(45.6)} L ${X(46.6)} ${Y(2.6)} V ${Y(10.6)}" fill="none" stroke="#3a86d4" stroke-width="1.6"/>
            <path d="M ${X(22.4)} ${Y(17.6)} V ${Y(9.0)} L ${X(24.4)} ${Y(6.6)}" fill="none" stroke="#3a86d4" stroke-width="1.6"/>`);
    // Trous de fixation
    [[31.1, 1.4], [2.3, 13.1], [32.2, 21.9]].forEach(([hx, hy]) => s.push(
        `<circle cx="${X(hx)}" cy="${Y(hy)}" r="${1.25 * k}" fill="none" stroke="#e8f1f8" stroke-width="1.6"/>
         <circle cx="${X(hx)}" cy="${Y(hy)}" r="${0.85 * k}" class="mod-encoche"/>`));
    // Les deux capsules : bague metallique, grille sombre (centres alignes a 11 mm)
    [[12.1, 11.0], [36.2, 11.0]].forEach(([cx, cy]) => s.push(
        `<circle cx="${X(cx)}" cy="${Y(cy)}" r="${8.2 * k}" fill="#c4c9cc" stroke="#8b949b" stroke-width="1.2"/>
         <circle cx="${X(cx)}" cy="${Y(cy)}" r="${6.7 * k}" fill="#2e2e2e" stroke="#9aa1a5" stroke-width="1.6"/>
         <circle cx="${X(cx)}" cy="${Y(cy)}" r="${5.0 * k}" fill="none" stroke="#454545" stroke-width="1.2"/>
         <circle cx="${X(cx)}" cy="${Y(cy)}" r="${3.2 * k}" fill="none" stroke="#454545" stroke-width="1.2"/>
         <circle cx="${X(cx) - 2.2 * k}" cy="${Y(cy) - 2.2 * k}" r="${1.4 * k}" fill="#ffffff" fill-opacity="0.12"/>`));
    // Noms des contacts (a la verticale) et cadre serigraphie autour des pattes
    [['GND', 22.4], ['VCC', 24.3], ['NC', 26.2], ['SIG', 28.0]].forEach(([t, v]) => s.push(T(v, 15.2, t, 1.0, 'middle', -90)));
    s.push(`<rect x="${X(21.0)}" y="${Y(17.4)}" width="${8.4 * k}" height="${1.4 * k}" fill="none" stroke="#e8f1f8" stroke-width="0.8"/>`);
    // Logo Grove et inscriptions
    const lx = X(4.2), ly = Y(19.4);
    [[-1.1, -1.0], [1.1, -1.0], [-1.1, 1.0], [1.1, 1.0], [0, 2.1]].forEach(([dx, dy]) => s.push(
        `<path d="M ${lx} ${ly} L ${lx + dx * k} ${ly + dy * k}" stroke="#e8f1f8" stroke-width="1.4"/>
         <circle cx="${lx + dx * k}" cy="${ly + dy * k}" r="${0.42 * k}" fill="${C_MODULE.pcb}" stroke="#e8f1f8" stroke-width="1.2"/>`));
    s.push(`<circle cx="${lx}" cy="${ly}" r="${0.5 * k}" fill="#e8f1f8"/>`);
    s.push(`<text x="${X(8.9)}" y="${Y(22.0)}" font-family="Consolas, 'Courier New', monospace" font-size="${1.5 * k}" fill="#e8f1f8"
              dominant-baseline="central">Grove</text>
            <text x="${X(1.2)}" y="${Y(23.6)}" textLength="${18.4 * k}" lengthAdjust="spacingAndGlyphs" font-family="Consolas, 'Courier New', monospace"
              font-size="${1.5 * k}" fill="#e8f1f8" dominant-baseline="central">Ultrasonic Ranger V2.0</text>`);
    // Prise Grove au bord bas, ouverture vers le bas (elle depasse un peu du circuit)
    s.push(`<rect x="${X(19.9)}" y="${Y(17.9)}" width="${10.4 * k}" height="${7.9 * k}" rx="2" fill="${C_PRISE.fond}" stroke="${C_PRISE.bord}" stroke-width="1.2"/>
            <rect x="${X(21.0)}" y="${Y(21.2)}" width="${8.2 * k}" height="${3.2 * k}" rx="1.5" fill="${C_PRISE.creux}"/>`);
    [22.4, 24.3, 26.2, 28.0].forEach(v => s.push(`<rect x="${X(v) - 0.35 * k}" y="${Y(22.6)}" width="${0.7 * k}" height="${0.7 * k}" fill="#9aa1a5"/>`));
    return s.join('\n');
}

/** Tourne en direct le bouton du potentiometre dessine : valeur 0 a 1023 -> -150 a +150 degres. */
export function allumerPotentiometre(g, valeur) {
    const repere = g.querySelector('.mv-repere');
    if (!repere) return;
    const angle = -150 + 300 * Math.max(0, Math.min(1023, Number(valeur) || 0)) / 1023;
    repere.setAttribute('transform', `rotate(${angle.toFixed(1)} ${repere.dataset.cx} ${repere.dataset.cy})`);
}

/** Mouvement simule devant le detecteur PIR dessine : cercle vert autour de la lentille. */
export function allumerPir(g, mouvement) {
    const anneau = g.querySelector('.mv-appui .mv-anneau');
    if (anneau) anneau.setAttribute('opacity', mouvement ? '1' : '0');
}

/** Lumiere mesuree (0 a 1023) : halo jaune et lentille plus claire sur la photoresistance dessinee. */
export function allumerLumiere(g, niveau) {
    const f = Math.max(0, Math.min(1, niveau / 1023));
    const halo = g.querySelector('.mv-halo');
    if (halo) halo.setAttribute('opacity', (f * 0.75).toFixed(2));
    const lentille = g.querySelector('.mv-lentille');
    if (lentille) lentille.setAttribute('fill', f > 0.5 ? '#fff6d0' : '#d9d4dc');
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
    // Prise J1 a gauche : GND VCC NC SIG de haut en bas, donc contacts dans l'ordre des fils (SIG, NC, VCC, GND)
    bouton: { largeur: 20, hauteur: 20, connecteur: { x: 1.0, y: 10, sens: 'gauche', contacts: [13.3, 11.2, 9.1, 7.0] },
           dessin: (x, y) => dessinBouton(x, y) },
    // Prise J1 a gauche : GND VCC NC SIG de haut en bas
    lumiere: { largeur: 20, hauteur: 20, connecteur: { x: 1.0, y: 9.25, sens: 'gauche', contacts: [12.8, 11.1, 9.5, 7.9] },
           dessin: (x, y) => dessinLumiere(x, y) },
    // Prise couchee au bord droit : GND VCC NC SIG de haut en bas (comme la photo)
    pir: { largeur: 40, hauteur: 20, deborde: 2.5, connecteur: { x: 40.0, y: 9.8, sens: 'droite', contacts: [12.9, 10.8, 8.8, 6.7] },
           dessin: (x, y) => dessinPir(x, y) },
    // Prise soudee dessous au bord haut : bout blanc au-dessus du circuit, SIG a gauche, GND a droite
    pot: { largeur: 20, hauteur: 20, deborde: 3.0, connecteur: { x: 10.0, y: -3.0, sens: 'haut', contacts: [6.8, 8.9, 11.0, 12.9] },
           dessin: (x, y) => dessinPotentiometre(x, y) },
    // Prise J2 debout au bord bas, fils inverses comme le modele (SIG a gauche) ; le dome deborde de la carte
    joystick: { largeur: 20, hauteur: 40, deborde: 1.0, connecteur: { x: 9.75, y: 39.4, sens: 'bas', contacts: [6.9, 8.9, 10.9, 12.8] },
           dessin: (x, y) => dessinJoystick(x, y) },
    // Prise au bord bas : GND VCC NC SIG de gauche a droite, donc contacts dans l'ordre des fils (SIG, NC, VCC, GND)
    ultrason: { largeur: 50, hauteur: 25, deborde: 0.8, connecteur: { x: 25.2, y: 25.8, sens: 'bas', contacts: [28.0, 26.2, 24.3, 22.4] },
           dessin: (x, y) => dessinUltrason(x, y) },
};
