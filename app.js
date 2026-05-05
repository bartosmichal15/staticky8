/**
 * IT Profil 8.0 – Hlavní SPA Router
 *
 * Hash-based routing (#/home, #/interests, #/skills).
 * Dynamický obsah se vykresluje do <div id="app">.
 * View moduly poskytují: viewFunkce() → HTML string, afterRenderFunkce() → post-render logika.
 */

/**
 * Mapování rout na view funkce.
 * Každá routa má:
 *   - view: funkce vracející HTML string
 *   - afterRender: (volitelná) funkce volaná po vložení HTML do DOMu
 */
var routes = {
    '/home': {
        view: homeView,
        afterRender: homeAfterRender
    },
    '/interests': {
        view: interestsView,
        afterRender: interestsAfterRender
    },
    '/skills': {
        view: skillsView,
        afterRender: skillsAfterRender
    }
};

/**
 * Hlavní renderovací funkce.
 * 1. Přečte aktuální hash z URL
 * 2. Najde odpovídající routu (fallback na /home)
 * 3. Vykreslí HTML do #app
 * 4. Aktualizuje aktivní stav navigace
 * 5. Zavolá afterRender callback (pokud existuje)
 */
function render() {
    var hash = location.hash.slice(1) || '/home'; // Odstraní '#' prefix
    var route = routes[hash];

    // Fallback na domovskou stránku pro neznámé routy
    if (!route) {
        location.hash = '#/home';
        return; // hashchange event se postará o re-render
    }

    // Vykreslení obsahu
    var app = document.getElementById('app');
    if (app) {
        app.innerHTML = route.view();
    }

    // Aktualizace aktivního stavu navigace
    updateActiveNav(hash);

    // Post-render callback (např. fetch dat)
    if (typeof route.afterRender === 'function') {
        route.afterRender();
    }
}

/**
 * Aktualizuje CSS třídu 'active' na navigačních odkazech
 * podle aktuální routy.
 */
function updateActiveNav(currentHash) {
    var navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(function (link) {
        var linkHash = link.getAttribute('href').slice(1); // Odstraní '#'
        if (linkHash === currentHash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// === Event Listenery ===

// Reaguje na změnu hashe v URL (kliknutí na nav odkaz, tlačítko zpět/vpřed)
window.addEventListener('hashchange', render);

// Inicializační render při prvním načtení stránky
window.addEventListener('load', function () {
    // Pokud není hash nastavený, přesměrujeme na #/home
    if (!location.hash) {
        location.hash = '#/home';
    } else {
        render();
    }
});
