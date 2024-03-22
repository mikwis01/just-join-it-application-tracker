// Load apiKey from chrome storage
let apiKey = "";
const _apiKey = async () => {
  if (apiKey) return apiKey;
  return new Promise((resolve) => {
    chrome.storage.sync.get("apiKey", (data) => {
      apiKey = data.apiKey;
      resolve(data.apiKey);
    });
  });
};

// Function to handle user action
const createSuggestion = async (container, requestBody) => {
  const apiKey = await _apiKey();
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const suggestion = (await response.json()).choices[0].message.content.trim();
  container.querySelector(".ql-editor").innerHTML = `<p>${suggestion}</p>`;
};

// Function to create new element
const createButton = (commentBox, prompt) => {
  const newElement = document.createElement("div");
  newElement.classList.add(
    "artdeco-button",
    "artdeco-button--muted",
    "artdeco-button--tertiary",
    "artdeco-button--circle"
  );
  newElement.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb-fill" viewBox="0 0 16 16"><path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/></svg>';
  newElement.addEventListener("click", () =>
    createSuggestion(commentBox, createRequestBody(prompt))
  );
  commentBox.querySelector(".mlA").prepend(newElement);
};

// Function to create body for API request
const createRequestBody = (prompt) => {
  return {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant, that writes replies to LinkedIn posts to other persons. Use the same language as of the text of the post you are recieving in the user's prompt. Please sound like a human being. Don't use hashtags, use smiley occasionally, don't repeat too many of the exact words, but simply create a brief and positive reply.  Maybe add something to the discussion. Be creative! You may mention the name of the author, if it's the name of a natural person. Don't mention the name if it's the name of a company or a LinkedIn group.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 0.7,
    frequency_penalty: 2,
    presence_penalty: 2,
  };
};

// Mutation observer
const observer = new MutationObserver(() => {
  const commentBoxes = document.getElementsByClassName("comments-comment-texteditor");
  if (commentBoxes.length > 0) {
    Array.from(commentBoxes).forEach(commentBox => {
      if (!commentBox.hasAttribute("data-mutated")) {
        commentBox.setAttribute("data-mutated", "true");

        const article = commentBox.closest(".feed-shared-update-v2");
        const author = article.querySelector(
          ".update-components-actor__name .visually-hidden"
        ).innerText;
        const post = article.querySelector(
          ".feed-shared-inline-show-more-text"
        ).innerText;

        let prompt = `${author}" wrote: ${post}`;

        const commentElement = commentBox.closest(".comments-comment-item");
        if (commentElement) {
          // Reply to comment
          const commentAuthor = commentElement.querySelector(
            ".comments-post-meta__name-text .visually-hidden"
          ).innerText;
          const commentText = commentElement.querySelector(
            ".comments-comment-item__main-content"
          ).innerText;
          prompt += `\n${commentAuthor} replied: ${commentText}\nPlease write a reply to the reply with a maximum of 20 words.`;
        } else {
          prompt += `\nPlease write a reply to this post with a maximum of 40 words.`;
        }

        createButton(commentBox, prompt);
      }
    });
  }
});

const config = { childList: true, subtree: true };

observer.observe(document.body, config);
