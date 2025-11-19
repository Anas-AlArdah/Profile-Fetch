/* TODO
- function to call https://api.github.com/users/ API
- function to render the UI
- add event listener to the button
HEAD
- store latest fetch to local storage 
*/

// LOAD ELEMENTS FROM DOM
const profileDiv = document.getElementById("profile");
const form = document.getElementById("search-form");

console.log(form);

function loadfflinedata() {
    const data = {
        "login": "Anas-AlArdah",
        "id": 232330267,
        "node_id": "U_kgDODdkUGw",
        "avatar_url": "https://avatars.githubusercontent.com/u/232330267?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/Anas-AlArdah",
        "html_url": "https://github.com/Anas-AlArdah",
        "followers_url": "https://api.github.com/users/Anas-AlArdah/followers",
        "following_url": "https://api.github.com/users/Anas-AlArdah/following{/other_user}",
        "gists_url": "https://api.github.com/users/Anas-AlArdah/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/Anas-AlArdah/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Anas-AlArdah/subscriptions",
        "organizations_url": "https://api.github.com/users/Anas-AlArdah/orgs",
        "repos_url": "https://api.github.com/users/Anas-AlArdah/repos",
        "events_url": "https://api.github.com/users/Anas-AlArdah/events{/privacy}",
        "received_events_url": "https://api.github.com/users/Anas-AlArdah/received_events",
        "type": "User",
        "user_view_type": "public",
        "site_admin": false,
        "name": "Anas_AlArdah",
        "company": null,
        "blog": "",
        "location": null,
        "email": null,
        "hireable": null,
        "bio": null,
        "twitter_username": null,
        "public_repos": 2,
        "public_gists": 0,
        "followers": 1,
        "following": 1,
        "created_at": "2025-09-15T08:41:26Z",
        "updated_at": "2025-10-22T14:56:49Z"
    };

    renderProfileUI(data);
}

function renderProfileUI(data) {
    let html = `
        <img src="${data.avatar_url}" class="avatar" alt="">
        <h2 class="name">${data.name}</h2>
        <p class="bio">${data.bio}</p>
    `;

    if (data.location != null && data.location !== "") {
        html += `<p>🌍 Location: ${data.location}</p>`;
    }

    if (data.blog != null && data.blog !== "") {
        html += `<p>🧾 Blog: <a href="${data.blog}" target="_blank">${data.blog}</a></p>`;
    }

    html += `<p>📚 Public Repository: ${data.public_repos}</p>`;
    html += `<p>👥 Followers: ${data.followers} | 👥 Following: ${data.following}</p>`;
    html += `<p><a href="${data.html_url}" target="_blank">View Profile →</a></p>`;

    profileDiv.innerHTML = html;
}

async function fetchProfile(username) {
    profileDiv.innerHTML = `<p>⏳ Loading ...</p>`;

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (response.ok) {
            const data = await response.json();
            renderProfileUI(data);
            localStorage.setItem("offlineData", JSON.stringify(data));
        } else {
            throw new Error("User Not Found " + response.statusText);
        }

    } catch (error) {
        profileDiv.innerHTML = `<p>❌ ${error.message}</p>`;
    }
}


form.addEventListener("submit", function (event) {
    event.preventDefault();
   let fd= new FormData(form);
const username = fd.get("username");
   
    fetchProfile(username);
});
document.addEventListener("DOMContentLoaded", function () {
    const offlineData = localStorage.getItem("offlineData");
    if (offlineData) {
        const data = JSON.parse(offlineData);
        renderProfileUI(data);
        document.getElementById("username").value = data.login;
    }
});