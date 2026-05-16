function renderBadges(data) {
    const container = document.getElementById('badgeContainer');
    container.innerHTML = data.map(hobby => `
        <div class="card">
            <h2>${hobby.name}</h2>
            
            <div class="level-section">
                <h3>Beginner</h3>
                <ul>${hobby.beginner_badge.map(req => `<li>${req}</li>`).join('')}</ul>
            </div>

            <div class="level-section">
                <h3>Intermediate</h3>
                <ul>${hobby.intermediate_badge.map(req => `<li>${req}</li>`).join('')}</ul>
            </div>

            <div class="level-section">
                <h3>Expert</h3>
                <ul>${hobby.expert_badge.map(req => `<li>${req}</li>`).join('')}</ul>
            </div>

            <div class="capstone-box">
                <span class="capstone-title">🏆 Capstone</span>
                <span class="capstone-desc">${hobby.capstone_project}</span>
            </div>
        </div>
    `).join('');
}

function filterBadges() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filtered = hobbyData.filter(h => h.name.toLowerCase().includes(searchTerm));
    renderBadges(filtered);
}

// Initial render
renderBadges(hobbyData);