document.addEventListener('DOMContentLoaded', function() {
    let counters = {
        'education-container': document.querySelectorAll('.education-entry').length,
        'experience-container': document.querySelectorAll('.experience-entry').length,
        'project-container': document.querySelectorAll('.project-entry').length
    };
    function addEntry(containerId, entryClass) {
        const container = document.getElementById(containerId);
        const entry = container.querySelector(`.${entryClass}`).cloneNode(true);
        entry.querySelectorAll('input, textarea').forEach(input => input.value = '');
        const textarea = entry.querySelector('textarea');
        if (textarea){
          textarea.id = textarea.id.replace(/\d+$/, counters[containerId]);  
        }
        container.appendChild(entry);
        counters[containerId]++;
    };
    document.getElementById('add-education').addEventListener('click', () => addEntry('education-container', 'education-entry'));
    document.getElementById('add-experience').addEventListener('click', () => addEntry('experience-container', 'experience-entry'));
    document.getElementById('add-project').addEventListener('click', () => addEntry('project-container', 'project-entry'));
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-entry')) {
            const entry = e.target.parentElement;
            if (entry.parentElement.children.length > 1) entry.remove();
        }
    });
});
