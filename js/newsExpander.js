// News Expander functionality
export function initializeNewsExpander() {
  // Use event delegation for dynamically loaded content
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("read-more-btn")) {
      handleReadMoreClick(event.target);
    }
  });
}

function handleReadMoreClick(button) {
  // Get content from data attribute
  const content = button.getAttribute("data-content");
  const title = button
    .closest(".news-card")
    .querySelector(".news-title").textContent;
  const date = button
    .closest(".news-card")
    .querySelector(".news-date").textContent;

  if (content) {
    // Create and show modal with content
    showNewsModal(title, date, content);
  }
}

function showNewsModal(title, date, content) {
  // Create modal HTML
  const modalHTML = `
    <div class="news-modal" id="news-modal">
      <div class="news-modal-content">
        <div class="news-modal-header">
          <h3 class="news-modal-title">${title}</h3>
          <div class="news-modal-date">${date}</div>
          <button class="news-modal-close" id="news-modal-close">&times;</button>
        </div>
        <div class="news-modal-body">
          <p>${content}</p>
        </div>
        <div class="news-modal-footer">
          <button class="btn-primary" id="news-modal-ok">Close</button>
        </div>
      </div>
    </div>
  `;

  // Add modal to page
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Show modal
  const modal = document.getElementById("news-modal");
  modal.style.display = "flex";

  // Add event listeners
  document
    .getElementById("news-modal-close")
    .addEventListener("click", closeNewsModal);
  document
    .getElementById("news-modal-ok")
    .addEventListener("click", closeNewsModal);

  // Close on outside click
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeNewsModal();
    }
  });
}

function closeNewsModal() {
  const modal = document.getElementById("news-modal");
  if (modal) {
    modal.remove();
  }
}

// Alternative implementation for static content
export function initializeStaticNewsExpander() {
  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const expandedContent = this.nextElementSibling;
      const icon = this.querySelector(".read-more-icon");

      if (
        !expandedContent ||
        !expandedContent.classList.contains("news-expanded")
      ) {
        return;
      }

      const isExpanded = this.classList.contains("expanded");

      if (isExpanded) {
        // Collapse content
        this.classList.remove("expanded");
        this.innerHTML = 'Read More <span class="read-more-icon">▼</span>';
        expandedContent.classList.remove("show");
        expandedContent.innerHTML = "";
      } else {
        // Expand content
        this.classList.add("expanded");
        this.innerHTML = 'Read Less <span class="read-more-icon">▲</span>';

        // Get content from data attribute
        const content = this.getAttribute("data-content");
        if (content) {
          expandedContent.innerHTML = content;
          expandedContent.classList.add("show");
        }
      }
    });
  });
}
