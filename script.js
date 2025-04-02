document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            title: 'Vision Transformer',
            category: 'ai',
            tech: ['PyTorch', 'Transformers', 'ONNX'],
            metrics: { accuracy: '99.4%', latency: '200ms' },
            github: '#',
            description: 'PyTorch implementation of ViT for image classification'
        },
        {
            title: 'ChatGPT Clone',
            category: 'nlp',
            tech: ['TensorFlow', 'HuggingFace', 'GCP'],
            metrics: { perplexity: '18.2', responses: '1.4s' },
            github: '#',
            description: 'Transformer-based conversation model'
        },
        {
            title: 'Medical Diagnosis Classifier',
            category: 'nlp',
            tech: ['Python', 'TensorFlow', 'BERT'],
            metrics: { accuracy: '98.2%', latency: '120ms' },
            github: 'https://github.com/example1',
            description: 'Multi-label classification system for medical reports'
        },
        {
            title: 'Autonomous Vehicle Detection',
            category: 'cv',
            tech: ['Python', 'PyTorch', 'OpenCV'],
            metrics: { accuracy: '99.1%', fps: '45' },
            github: 'https://github.com/example2',
            description: 'Real-time object detection for autonomous systems'
        }
    ];

    const shuffleProjects = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const renderProjects = (filter = 'all') => {
        const grid = document.querySelector('.project-grid');
        grid.innerHTML = shuffleProjects([...projects])
            .filter(p => filter === 'all' || p.category === filter)
            .map(project => `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="metrics">
                        ${Object.entries(project.metrics).map(([key, val]) => `
                            <div class="metric">
                                <span class="metric-key">${key}</span>
                                <span class="metric-val">${val}</span>
                            </div>
                        `).join('')}
                    </div>
                    <a href="${project.github}" class="github-link">View on GitHub</a>
                </div>
            `).join('');
    };

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            const filter = btn.dataset.filter === 'all' ? 'all' : 
                         ['ai', 'nlp'].includes(btn.dataset.filter) ? btn.dataset.filter : 
                         btn.dataset.filter;
            renderProjects(filter);
        });
    });

    renderProjects();
});

// Theme management
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(isDark) {
  body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  setTheme(!isDark);
});

// Initialize theme from storage
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'dark');