/**
 * Interests View – Zájmy
 * Připraveno na asynchronní načítání dat přes fetch z JSON souboru.
 * Při neúspěchu fetch (např. file:// protokol) použije window.profileData.
 */
function interestsView() {
    return '\
        <div class="view-container" style="animation: fadeInDown 0.5s ease-out;">\
            <div class="card">\
                <h2><span class="icon">🎯</span> Moje zájmy</h2>\
                <div id="interests-loading" class="loading-spinner">\
                    <p style="color: var(--text-muted); text-align: center;">Načítání zájmů...</p>\
                </div>\
                <ul class="interests-list" id="interests-list" style="display: none;"></ul>\
                <div id="interests-error" style="display: none;"></div>\
            </div>\
        </div>';
}

/**
 * Asynchronní načtení zájmů.
 * V budoucnu stačí změnit URL ve fetch() na vzdálený API endpoint.
 */
function interestsAfterRender() {
    function renderInterests(data) {
        var listEl = document.getElementById('interests-list');
        var loadingEl = document.getElementById('interests-loading');

        var interests = data.interests || [];

        if (loadingEl) loadingEl.style.display = 'none';

        if (!listEl) return;

        if (interests.length === 0) {
            listEl.style.display = 'flex';
            listEl.innerHTML = '<li class="interest-item"><span class="interest-text" style="color: var(--text-muted);">Žádné zájmy k zobrazení.</span></li>';
            return;
        }

        listEl.style.display = 'flex';
        listEl.innerHTML = interests.map(function (interest, index) {
            return '<li class="interest-item" style="animation: fadeInDown ' + (0.3 + index * 0.1) + 's ease-out;">' +
                '<span class="interest-text">' + interest + '</span>' +
                '<span class="interest-badge">' + (index + 1) + '</span>' +
                '</li>';
        }).join('');
    }

    // Pokusí se o fetch, při neúspěchu použije inline data
    fetch('profile.json')
        .then(function (response) {
            if (!response.ok) throw new Error('HTTP chyba: ' + response.status);
            return response.json();
        })
        .then(renderInterests)
        .catch(function (err) {
            console.warn('Fetch selhal, používám inline data:', err.message);
            if (window.profileData) {
                renderInterests(window.profileData);
            } else {
                var loadingEl = document.getElementById('interests-loading');
                var errorEl = document.getElementById('interests-error');
                if (loadingEl) loadingEl.style.display = 'none';
                if (errorEl) {
                    errorEl.style.display = 'block';
                    errorEl.innerHTML = '<div class="error-container">Nepodařilo se načíst zájmy.</div>';
                }
            }
        });
}
