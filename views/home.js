/**
 * Home View – Domovská stránka
 * Zobrazuje uvítací sekci a grid s projekty.
 */
function homeView() {
    return '\
        <div class="view-container" style="animation: fadeInDown 0.5s ease-out;">\
            <div class="content-grid">\
                <div class="card">\
                    <h2><span class="icon">👋</span> O mně</h2>\
                    <p style="color: var(--text-muted); line-height: 1.8;">\
                        Jsem student IT se zaměřením na webový vývoj a moderní technologie.\
                        Baví mě tvořit interaktivní aplikace a neustále se učím nové věci.\
                    </p>\
                </div>\
                <div class="card">\
                    <h2><span class="icon">🚀</span> Aktuální fokus</h2>\
                    <p style="color: var(--text-muted); line-height: 1.8;">\
                        Právě se soustředím na Single Page Applications, modulární JavaScript\
                        a čistou architekturu frontendových projektů.\
                    </p>\
                </div>\
            </div>\
            <section class="projects-section">\
                <h2><span class="icon">💼</span> Projekty</h2>\
                <div class="projects-grid" id="projects-grid"></div>\
            </section>\
        </div>';
}

/**
 * Po vykreslení home view načte projekty.
 * Pokusí se o fetch z profile.json, při neúspěchu použije window.profileData.
 */
function homeAfterRender() {
    function renderProjects(data) {
        var grid = document.getElementById('projects-grid');
        if (!grid) return;

        var projects = data.projects || [];
        if (projects.length === 0) {
            grid.innerHTML = '<p style="color: var(--text-muted);">Žádné projekty k zobrazení.</p>';
            return;
        }

        grid.innerHTML = projects.map(function (project, index) {
            return '<div class="project-card" style="animation: fadeInDown ' + (0.3 + index * 0.1) + 's ease-out;">' +
                '<h3>' + project.title + '</h3>' +
                '<p>' + project.description + '</p>' +
                '<span class="tech-tag">' + project.tech + '</span>' +
                '</div>';
        }).join('');
    }

    fetch('profile.json')
        .then(function (response) { return response.json(); })
        .then(renderProjects)
        .catch(function () {
            // Fallback na inline data (file:// protokol)
            if (window.profileData) {
                renderProjects(window.profileData);
            }
        });
}
