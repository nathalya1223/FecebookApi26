// ---------- Função para criar post ----------
function createPost(content, imageFile = null) {
  const postItem = document.createElement("div");
  postItem.classList.add("feed-item");

  // Cabeçalho + botão minimizar
  const header = document.createElement("div");
  header.classList.add("post-header");
  header.innerHTML = `
    <strong>Post</strong>
    <button class="minimize-btn">−</button>
  `;

  // Corpo do post
  const body = document.createElement("div");
  body.classList.add("post-body");

  if (content) {
    const textEl = document.createElement("p");
    textEl.textContent = content;
    body.appendChild(textEl);
  }

  if (imageFile) {
    const imgURL = URL.createObjectURL(imageFile);
    const img = document.createElement("img");
    img.src = imgURL;
    img.alt = "Post Image";
    body.appendChild(img);
  }

  // Ações
  const actions = document.createElement("div");
  actions.classList.add("actions");

  // Curtir
  let likeCount = 0;
  const likeBtn = document.createElement("button");
  likeBtn.textContent = `Curtir (0)`;
  likeBtn.addEventListener("click", () => {
    likeCount++;
    likeBtn.textContent = `Curtir (${likeCount})`;
  });

  // Comentar
  const commentBtn = document.createElement("button");
  commentBtn.textContent = "Comentar";

  const commentBox = document.createElement("div");
  commentBox.classList.add("comments");
  const commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.placeholder = "Escreva um comentário...";
  const sendComment = document.createElement("button");
  sendComment.textContent = "Enviar";

  sendComment.addEventListener("click", () => {
    if (commentInput.value.trim() !== "") {
      const c = document.createElement("p");
      c.textContent = commentInput.value;
      commentBox.appendChild(c);
      commentInput.value = "";
    }
  });

  const commentArea = document.createElement("div");
  commentArea.append(commentInput, sendComment, commentBox);
  commentArea.style.display = "none";

  commentBtn.addEventListener("click", () => {
    commentArea.style.display =
      commentArea.style.display === "none" ? "block" : "none";
  });

  // Salvar
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Salvar";
  saveBtn.addEventListener("click", () => {
    localStorage.setItem("savedPost", postItem.innerHTML);
    alert("Post salvo!");
  });

  // Apagar
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Apagar";
  deleteBtn.addEventListener("click", () => postItem.remove());

  actions.append(likeBtn, commentBtn, saveBtn, deleteBtn);

  body.appendChild(actions);
  body.appendChild(commentArea);

  // Minimizar
  header.querySelector(".minimize-btn").addEventListener("click", () => {
    body.classList.toggle("hidden");
    const btn = header.querySelector(".minimize-btn");
    btn.textContent = body.classList.contains("hidden") ? "+" : "−";
  });

  postItem.append(header, body);
  return postItem;
}

// ---------- POST ÚNICO (texto + foto) ----------
const postForm = document.getElementById("postForm");
const postContent = document.getElementById("postContent");
const postImage = document.getElementById("postImage");
const feed = document.getElementById("feed");

postForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const content = postContent.value.trim();
  const file = postImage.files[0];

  if (!content && !file) return; // precisa pelo menos de texto ou imagem

  const post = createPost(content, file);
  feed.prepend(post);
  postForm.reset();
});

