// List of blog markdown files
const blogFiles = [
  'LoadBalancers.md',
  'README.md',
  'ticTacToe.md'
];

const blogContainer = document.getElementById('blog-container');

async function loadBlogs() {
  for (const file of blogFiles) {
    try {
      const response = await fetch(`myBlogs/${file}`);
      const markdown = await response.text();
      
      // Convert markdown to HTML
      const htmlContent = marked.parse(markdown);

      // Create a card
      const card = document.createElement('div');
      card.className = "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300";

      // Extract title (first line starting with #)
      const titleMatch = markdown.match(/^#\s+(.*)/);
      const title = titleMatch ? titleMatch[1] : "Untitled";

      // Shorten content preview
      const plainText = markdown.replace(/^#.*$/m, "").trim();
      const preview = plainText.split(" ").slice(0, 20).join(" ") + "...";

      card.innerHTML = `
        <div class="p-5">
          <h2 class="text-xl font-semibold mb-2">${title}</h2>
          <p class="text-gray-600 mb-4">${preview}</p>
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onclick="openModal(\`${htmlContent.replace(/`/g, "\\`")}\`)">
            Read More
          </button>
        </div>
      `;

      blogContainer.appendChild(card);

    } catch (error) {
      console.error(`Error loading ${file}:`, error);
    }
  }
}

// Show full post in a modal
function openModal(content) {
  const modal = document.createElement('div');
  modal.className = "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50";
  modal.innerHTML = `
    <div class="bg-white max-w-3xl w-full rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh]">
      ${content}
      <button class="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onclick="this.closest('div').parentNode.remove()">
        Close
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

loadBlogs();
