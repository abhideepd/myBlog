/**
 * Editorial Minimalist Static Blog Engine - JS Core
 */

(function () {
    'use strict';

    // State
    let postsState = [];
    let currentPost = null;
    let activeTag = null;
    let searchQuery = '';

    // DOM Elements
    const elements = {
        readingProgress: document.getElementById('reading-progress'),
        themeToggleBtn: document.getElementById('theme-toggle-btn'),
        themeIcon: document.getElementById('theme-icon'),
        themeLabel: document.getElementById('theme-label'),
        searchInput: document.getElementById('search-input'),
        tagsBar: document.getElementById('tags-bar'),
        postListSection: document.getElementById('post-list-section'),
        postListContainer: document.getElementById('post-list-container'),
        articleSection: document.getElementById('article-section'),
        articleContainer: document.getElementById('article-container'),
        loadingIndicator: document.getElementById('loading-indicator'),
        totalPostsCount: document.getElementById('total-posts-count')
    };

    // --------------------------------------------------------------------------
    // 1. Initialization & Theme Engine
    // --------------------------------------------------------------------------
    async function init() {
        setupTheme();
        configureMarked();
        setupEventListeners();
        await loadPostsRegistry();
        handleRouting();
    }

    function setupTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        setTheme(initialTheme);

        elements.themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            elements.themeIcon.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
            elements.themeLabel.textContent = 'Light';
        } else {
            elements.themeIcon.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
            elements.themeLabel.textContent = 'Dark';
        }
    }

    // --------------------------------------------------------------------------
    // 2. Data Loading & Parsing
    // --------------------------------------------------------------------------
    async function loadPostsRegistry() {
        try {
            showLoading(true);
            const response = await fetch('posts.json');
            if (!response.ok) {
                throw new Error('Failed to load posts registry manifest');
            }
            const postsData = await response.json();
            postsState = postsData;
            renderTagsBar();
            if (elements.totalPostsCount) {
                elements.totalPostsCount.textContent = postsState.length;
            }
        } catch (error) {
            console.error('Error loading posts registry:', error);
            showError('Could not load blog posts registry. Ensure posts.json exists.');
        } finally {
            showLoading(false);
        }
    }

    async function fetchPostContent(post) {
        if (post.contentLoaded) return post;
        try {
            const response = await fetch(post.file);
            if (!response.ok) throw new Error(`Could not fetch ${post.file}`);
            const markdown = await response.text();
            
            const parsed = parseMarkdownMetadata(markdown, post);
            post.content = parsed.content;
            post.title = post.title || parsed.title;
            post.summary = post.summary || parsed.summary;
            post.date = post.date || parsed.date;
            post.readTime = calculateReadTime(parsed.content);
            post.contentLoaded = true;
            return post;
        } catch (err) {
            console.error(`Error fetching post content for ${post.id}:`, err);
            post.content = `# ${post.title}\n\n*Failed to load content for this post.*`;
            post.readTime = '1 min read';
            return post;
        }
    }

    function parseMarkdownMetadata(markdown, originalPost) {
        const lines = markdown.split('\n');
        let frontmatter = {};
        let content = markdown;

        if (lines[0] && lines[0].trim() === '---') {
            const endIdx = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
            if (endIdx > 0) {
                const fLines = lines.slice(1, endIdx);
                content = lines.slice(endIdx + 1).join('\n');
                fLines.forEach(line => {
                    const [key, ...vals] = line.split(':');
                    if (key && vals.length > 0) {
                        frontmatter[key.trim()] = vals.join(':').trim().replace(/^["']|["']$/g, '');
                    }
                });
            }
        }

        // Title fallback
        let title = frontmatter.title;
        if (!title) {
            const titleMatch = content.match(/^#\s+(.+)/m);
            title = titleMatch ? titleMatch[1].trim() : originalPost.id;
        }

        // Summary fallback
        let summary = frontmatter.summary;
        if (!summary) {
            const paragraph = content.split('\n\n').find(p => !p.trim().startsWith('#') && !p.trim().startsWith('@') && p.trim().length > 30);
            summary = paragraph ? paragraph.replace(/[#*`_]/g, '').trim().substring(0, 160) + '...' : 'No summary available.';
        }

        return {
            title,
            summary,
            date: frontmatter.date || originalPost.date || 'Undated',
            content: content.trim()
        };
    }

    function calculateReadTime(text) {
        const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    }

    // --------------------------------------------------------------------------
    // 3. Routing Engine
    // --------------------------------------------------------------------------
    function setupEventListeners() {
        window.addEventListener('hashchange', handleRouting);
        
        elements.searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            if (window.location.hash.startsWith('#/post/')) {
                window.location.hash = '#/';
            } else {
                renderPostList();
            }
        });

        window.addEventListener('scroll', updateReadingProgress);
    }

    async function handleRouting() {
        const hash = window.location.hash || '#/';
        showLoading(false);

        if (hash.startsWith('#/post/')) {
            const postId = hash.replace('#/post/', '').trim();
            const post = postsState.find(p => p.id === postId);
            if (post) {
                await renderArticleView(post);
            } else {
                showError(`Post "${postId}" not found.`);
            }
        } else if (hash.startsWith('#/tag/')) {
            const tag = decodeURIComponent(hash.replace('#/tag/', '').trim());
            activeTag = tag;
            searchQuery = '';
            elements.searchInput.value = '';
            showPostListView();
            renderTagsBar();
            renderPostList();
        } else {
            // Home / List View
            activeTag = null;
            showPostListView();
            renderTagsBar();
            renderPostList();
        }

        window.scrollTo(0, 0);
    }

    function showPostListView() {
        elements.articleSection.classList.add('hidden');
        elements.postListSection.classList.remove('hidden');
        elements.readingProgress.style.width = '0%';
    }

    // --------------------------------------------------------------------------
    // 4. Rendering Views (List & Article)
    // --------------------------------------------------------------------------
    function renderTagsBar() {
        if (!elements.tagsBar) return;
        
        const tagsCountMap = {};
        postsState.forEach(p => {
            if (p.tags && Array.isArray(p.tags)) {
                p.tags.forEach(t => {
                    tagsCountMap[t] = (tagsCountMap[t] || 0) + 1;
                });
            }
        });

        const allPill = `<a href="#/" class="tag-pill ${!activeTag ? 'active' : ''}">All</a>`;
        const tagPills = Object.keys(tagsCountMap).sort().map(t => {
            const isActive = activeTag === t;
            return `<a href="#/tag/${encodeURIComponent(t)}" class="tag-pill ${isActive ? 'active' : ''}">${t} (${tagsCountMap[t]})</a>`;
        }).join('');

        elements.tagsBar.innerHTML = `<span class="tags-label">Topics:</span> ${allPill} ${tagPills}`;
    }

    function renderPostList() {
        let filtered = postsState;

        if (activeTag) {
            filtered = filtered.filter(p => p.tags && p.tags.includes(activeTag));
        }

        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(searchQuery) ||
                p.summary.toLowerCase().includes(searchQuery) ||
                (p.tags && p.tags.some(t => t.toLowerCase().includes(searchQuery)))
            );
        }

        if (filtered.length === 0) {
            elements.postListContainer.innerHTML = `
                <div class="no-results fade-in">
                    <div class="no-results-icon">🔍</div>
                    <p class="font-medium mb-1">No matching posts found</p>
                    <p class="text-sm">Try tweaking your search term or selecting a different topic tag.</p>
                </div>
            `;
            return;
        }

        const cardsHTML = filtered.map(post => `
            <a href="#/post/${post.id}" class="post-item fade-in">
                <div class="post-meta-row">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <span class="meta-dot">•</span>
                    <span class="read-time">${post.readTime || '2 min read'}</span>
                </div>
                <h2 class="post-item-title">${escapeHTML(post.title)}</h2>
                <p class="post-item-summary">${escapeHTML(post.summary)}</p>
                <div class="post-item-tags">
                    ${(post.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join('')}
                </div>
            </a>
        `).join('');

        elements.postListContainer.innerHTML = cardsHTML;
    }

    async function renderArticleView(post) {
        showLoading(true);
        const fullPost = await fetchPostContent(post);
        showLoading(false);

        elements.postListSection.classList.add('hidden');
        elements.articleSection.classList.remove('hidden');

        // Parse markdown content
        let htmlBody = marked.parse(fullPost.content);

        // Process PlantUML / Mermaid diagrams inside HTML
        htmlBody = processDiagrams(htmlBody);

        // Generate Table of Contents
        const { html: bodyWithIds, toc } = generateTOC(htmlBody);

        const tagsHTML = (fullPost.tags || []).map(t => 
            `<a href="#/tag/${encodeURIComponent(t)}" class="tag-pill">${t}</a>`
        ).join(' ');

        elements.articleContainer.innerHTML = `
            <div class="article-header fade-in">
                <a href="#/" class="back-link">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Back to all posts
                </a>
                <h1 class="article-title">${escapeHTML(fullPost.title)}</h1>
                <div class="article-meta">
                    <span>${formatDate(fullPost.date)}</span>
                    <span>•</span>
                    <span>${fullPost.readTime}</span>
                    ${tagsHTML ? `<span>•</span> <div>${tagsHTML}</div>` : ''}
                </div>
            </div>

            ${toc ? `<div class="toc-card fade-in"><div class="toc-title">Table of Contents</div>${toc}</div>` : ''}

            <article class="markdown-body fade-in">
                ${bodyWithIds}
            </article>
        `;

        // Highlight code blocks
        elements.articleContainer.querySelectorAll('pre code').forEach((block) => {
            if (window.hljs) {
                hljs.highlightElement(block);
            }
            attachCopyButton(block.parentElement);
        });

        // KaTeX Math Rendering
        if (window.renderMathInElement) {
            renderMathInElement(elements.articleContainer, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ],
                throwOnError : false
            });
        }
    }

    // --------------------------------------------------------------------------
    // 5. Markdown Extensions & Diagram Processing
    // --------------------------------------------------------------------------
    function configureMarked() {
        if (!window.marked) return;
        marked.setOptions({
            gfm: true,
            breaks: true,
            headerIds: true
        });
    }

    function processDiagrams(html) {
        // Handle PlantUML code blocks
        return html.replace(/<pre><code class="language-(plantuml|puml)">([\s\S]*?)<\/code><\/pre>/gi, (match, lang, code) => {
            const rawCode = unescapeHTML(code.trim());
            const encoded = encodePlantUML(rawCode);
            const imgUrl = `https://www.plantuml.com/plantuml/svg/${encoded}`;
            return `<div class="diagram-container"><img src="${imgUrl}" alt="PlantUML Diagram" loading="lazy" /></div>`;
        });
    }

    function encodePlantUML(text) {
        // Standard lightweight PlantUML encoder URL parameter
        try {
            return encodeURIComponent(text);
        } catch(e) {
            return encodeURI(text);
        }
    }

    function generateTOC(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const headings = tempDiv.querySelectorAll('h2, h3');
        if (headings.length < 2) {
            return { html, toc: '' };
        }

        let tocHTML = '<ul class="toc-list">';
        headings.forEach((heading, idx) => {
            const text = heading.textContent;
            const id = 'heading-' + idx;
            heading.id = id;

            const levelClass = heading.tagName.toLowerCase() === 'h3' ? 'level-3' : 'level-2';
            tocHTML += `<li class="toc-item ${levelClass}"><a href="#${id}" class="toc-link">${escapeHTML(text)}</a></li>`;
        });
        tocHTML += '</ul>';

        return { html: tempDiv.innerHTML, toc: tocHTML };
    }

    function attachCopyButton(preBlock) {
        if (!preBlock || preBlock.querySelector('.code-block-header')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';

        const header = document.createElement('div');
        header.className = 'code-block-header';
        
        const codeElem = preBlock.querySelector('code');
        const langMatch = codeElem ? codeElem.className.match(/language-(\w+)/) : null;
        const langName = langMatch ? langMatch[1] : 'code';
        
        header.innerHTML = `<span>${langName}</span>`;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.addEventListener('click', () => {
            const textToCopy = preBlock.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
            }).catch(err => {
                console.error('Copy failed:', err);
            });
        });

        header.appendChild(copyBtn);
        preBlock.parentNode.insertBefore(wrapper, preBlock);
        wrapper.appendChild(header);
        wrapper.appendChild(preBlock);
    }

    // --------------------------------------------------------------------------
    // 6. Helpers & Utilities
    // --------------------------------------------------------------------------
    function updateReadingProgress() {
        if (elements.articleSection.classList.contains('hidden')) return;

        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) {
            elements.readingProgress.style.width = '0%';
            return;
        }
        const progress = (window.scrollY / totalHeight) * 100;
        elements.readingProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    function formatDate(dateStr) {
        if (!dateStr || dateStr === 'Undated') return 'Undated';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch(e) {
            return dateStr;
        }
    }

    function showLoading(show) {
        if (elements.loadingIndicator) {
            elements.loadingIndicator.style.display = show ? 'block' : 'none';
        }
    }

    function showError(msg) {
        elements.postListContainer.innerHTML = `
            <div class="no-results fade-in">
                <div class="no-results-icon">⚠️</div>
                <p class="font-medium text-red-600 mb-1">Error</p>
                <p class="text-sm">${escapeHTML(msg)}</p>
            </div>
        `;
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, function (m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
        });
    }

    function unescapeHTML(str) {
        if (!str) return '';
        return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', init);
})();
