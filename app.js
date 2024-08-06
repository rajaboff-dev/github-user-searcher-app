let input = document.getElementById("input"); // this is the input field for username
let searchBtn = document.getElementById("submit-btn"); // this is the search button

let userData = document.getElementById("user-data"); // this is the user data div
let followers = document.getElementById("followers"); // this is the followers div
let followersTitle = document.getElementById('followers-title')

searchBtn.addEventListener('click', () => {
  fetch(`https://api.github.com/users/${input.value}`) // get the user data
    .then((response) => {
      if (!response.ok) {
        container.innerHTML = "User not found"; // if response is not ok, display "User not found"
      } else {
        return response.json(); // else data to json parse and return
      }
    })
    .then((data) => {
      userData.innerHTML += `
          <img src="${data.avatar_url}">
          <h1>${data.name == null ? "" : data.name}</h1>
          <p>${data.bio == null ? "" : data.bio}</p>
          <p>Followers: ${data.followers == null ? "" : data.followers}</p>
          <p>Following: ${data.following == null ? "" : data.following}</p>
          <p>Public Repos: ${
            data.public_repos == null ? "" : data.public_repos
          }</p>
          <p>Public Gists: ${
            data.public_gists == null ? "" : data.public_gists
          }</p>
          <p>Location: ${data.location == null ? "" : data.location}</p>
          <p>Blog: <a href='${data.blog}'>${
        data.blog == null ? "" : data.blog
      }</a></p>
          <p>Company: ${data.company == null ? "" : data.company}</p>
      `;
    });


  fetch(`https://api.github.com/users/${input.value}/followers`) // get the user followers data
    .then((response) => response.json())
    .then((data) => {
      followersTitle.style.display = 'block'
      data.forEach((user) => {
        followers.innerHTML += `<div class='followers-child'>
          <img src="${user.avatar_url}">
          <h1>${user.login}</h1>
        </div>`;
      })
    })
});
