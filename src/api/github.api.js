import axios from "axios";

async function fetchGitHubAPI(query) {
  let response =  await axios.post("https://github-battle-backend.glitch.me/api", { "query": query });
  return response.data.data;
}

async function fetchUser(login) {
  let query = `{
    user (login: "${login}") {
      id
      avatarUrl
      login
      name
      location
      websiteUrl
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories (first:100, orderBy: {
        field: STARGAZERS
        direction: DESC
      }) {
        nodes {
          name
          stargazers {
            totalCount
          }
        }
      }
    }
  }
  `;

  let data = await fetchGitHubAPI(query);
  return data.user;
}

export async function getUser(login) {
  let user = await fetchUser(login);
  if (user !== null) {
    let starCount = user.repositories.nodes.reduce((acc, repo) => acc + repo.stargazers.totalCount, 0);
    user.score = 3 * user.followers.totalCount + starCount;
  }
  return user;
}

export async function fetchPopularRepos(language) {
  let query = `{
    search (query: "language:${language} stars:>100", type: REPOSITORY, first: 30) {
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              login
              avatarUrl
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
  `;

  let data = await fetchGitHubAPI(query);
  return data.search.edges;
}
