// Bengal Documentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize syntax highlighting
    if (typeof hljs !== 'undefined') {
        // Register Bengal as an alias of Rust for syntax highlighting
        // Bengal syntax is similar to Rust in many ways
        hljs.registerLanguage('bengal', function(hljs) {
            return {
                name: 'Bengal',
                aliases: ['bl'],
                keywords: {
                    keyword: 'fn let const if else return class module import async await try catch throw for while in native private null true false',
                    type: 'int float str bool void any',
                    built_in: 'println print'
                },
                contains: [
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE,
                    {
                        className: 'string',
                        begin: /"""/,
                        end: /"""/,
                        contains: ['self']
                    },
                    {
                        className: 'string',
                        begin: /"/,
                        end: /"/,
                        contains: [hljs.BACKSLASH_ESCAPE]
                    },
                    {
                        className: 'number',
                        begin: /\b\d+(\.\d+)?/,
                        relevance: 0
                    },
                    {
                        className: 'function',
                        beginKeywords: 'fn',
                        end: /[{(]/,
                        excludeEnd: true,
                        contains: [
                            hljs.UNDERSCORE_TITLE_MODE
                        ]
                    }
                ]
            };
        });
        
        hljs.highlightAll();
    }

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Copy code buttons
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-copy-target');
            const codeElement = document.getElementById(targetId);
            
            if (codeElement) {
                const codeText = codeElement.textContent;
                navigator.clipboard.writeText(codeText).then(() => {
                    // Show feedback
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.classList.add('copied');
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                    this.textContent = 'Failed';
                    setTimeout(() => {
                        this.textContent = 'Copy';
                    }, 2000);
                });
            }
        });
    });

    // Add copy buttons to code blocks that don't have them
    document.querySelectorAll('pre code').forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement;
        if (!pre.parentElement.querySelector('.code-header')) {
            // Create wrapper if needed
            const wrapper = document.createElement('div');
            wrapper.className = 'code-example';
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);

            // Create header
            const header = document.createElement('div');
            header.className = 'code-header';
            
            const langLabel = document.createElement('span');
            langLabel.textContent = codeBlock.classList.contains('language-bengal') ? 'example.bl' : 
                                    codeBlock.classList.contains('language-bash') ? 'Terminal' : 'Code';
            header.appendChild(langLabel);

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = 'Copy';
            copyBtn.setAttribute('data-copy-target', `code-${index}`);
            header.appendChild(copyBtn);

            codeBlock.id = `code-${index}`;
            pre.insertBefore(header, codeBlock);
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Table of Contents highlighting on scroll
    const tocLinks = document.querySelectorAll('.toc a');
    const sections = document.querySelectorAll('.guide-section, section[id]');

    if (tocLinks.length > 0 && sections.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    tocLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Example code tabs (if present)
    const tabContainers = document.querySelectorAll('.tab-container');
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab-btn');
        const contents = container.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.getAttribute('data-tab');

                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));

                this.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    });

    // Search functionality (if search input exists)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            // Search implementation can be added here
            console.log('Search query:', query);
        });
    }
});

// Utility function to get code from element
function getCodeFromElement(element) {
    return element.textContent.trim();
}

// Animation for feature cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .example-card, .std-module').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});
