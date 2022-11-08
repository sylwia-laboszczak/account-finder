document.forms.searchGitUser.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const newGitHubName = document.getElementById("userGitName").value;
    console.log(newGitHubName);
    fetch("https://api.github.com/users/" + newGitHubName)
      .then((res) => res.json())
      .then((user) => {
        console.log(user);

        const content = document.getElementById("contentBox");
        content.innerHTML = "";
    

        const avatarDiv = document.createElement("img");
        avatarDiv.setAttribute("src", user.avatar_url);
        avatarDiv.className = "photoBox";
        content.append(avatarDiv);

        const infoDiv = document.createElement("div");
        infoDiv.className = "infoContainer";

        const nameDiv = document.createElement("div");
        nameDiv.innerText = user.name;
        nameDiv.className = "nameDiv";
        infoDiv.append(nameDiv);

        const descriptionsDiv = document.createElement("div");
        descriptionsDiv.innerText = user.bio
          ? user.bio
          : "Description not provided.";
        infoDiv.append(descriptionsDiv);

        const folowersContainer = document.createElement("div");
        folowersContainer.className = "followersDiv";

        const folowersDiv = document.createElement("div");
        folowersDiv.innerText = user.followers + " " + "Followers";
        folowersDiv.className = "followersDivChild";
        folowersContainer.append(folowersDiv);

        const folowingDiv = document.createElement("div");
        folowingDiv.innerText = user.following + " " + "Following";
        folowingDiv.className = "followersDivChild";
        folowersContainer.append(folowingDiv);

        const publicRepoDiv = document.createElement("div");
        publicRepoDiv.innerText = user.public_repos + " " + "Repos";
        publicRepoDiv.className = "followersDivChild";
        folowersContainer.append(publicRepoDiv);

        infoDiv.append(folowersContainer);

        fetch(user.repos_url)
          .then((res) => res.json())
          .then((repos) => {
            const someRepos = repos.slice(1, 10);
            const listOfPRep = document.createElement("ul");
            listOfPRep.className = "reposDiv";
            someRepos.forEach((repo) => {
              const repoLi = document.createElement("li");
              const ahref = document.createElement("a");
              ahref.setAttribute("href", repo.html_url);
              ahref.innerText = repo.name;

              repoLi.append(ahref);
              listOfPRep.append(repoLi);
            });
            infoDiv.append(listOfPRep);
          });

        content.append(infoDiv);
      });
  }
});
