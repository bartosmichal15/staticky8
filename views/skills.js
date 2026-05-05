/**
 * Skills View – Dovednosti
 * Načítá dovednosti z profile.json, s fallbackem na window.profileData.
 */
function skillsView() {
    return '\
        <div class="view-container" style="animation: fadeInDown 0.5s ease-out;">\
            <div class="card">\
                <h2><span class="icon">⚡</span> Dovednosti</h2>\
                <ul id="skills"></ul>\
            </div>\
        </div>';
}

/**
 * Po vykreslení šablony načte dovednosti.
 */
function skillsAfterRender() {
    function renderSkills(data) {
        var skillsList = document.getElementById('skills');
        if (!skillsList) return;

        var skills = data.skills || [];
        if (skills.length === 0) {
            skillsList.innerHTML = '<li style="color: var(--text-muted);">Žádné dovednosti k zobrazení.</li>';
            return;
        }

        skillsList.innerHTML = skills.map(function (skill, index) {
            return '<li style="animation: fadeInDown ' + (0.2 + index * 0.08) + 's ease-out;">' + skill + '</li>';
        }).join('');
    }

    fetch('profile.json')
        .then(function (response) { return response.json(); })
        .then(renderSkills)
        .catch(function () {
            // Fallback na inline data
            if (window.profileData) {
                renderSkills(window.profileData);
            }
        });
}
