import { GITHUB_API_TOKEN } from "./token";

async function fetchGitHubAPI(query) {
  let options = {
    "method": "POST",
    "headers": {
      "Authorization": `Token ${GITHUB_API_TOKEN}`
    },
    "body": JSON.stringify({
      "query": query
    })
  };
  
  return await fetch("https://api.github.com/graphql", options)
  .then(response => {
    return response.json()
  });
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

  let response = await fetchGitHubAPI(query);
  return response.data.user;
}

export async function getUser(login) {
  let user = await fetchUser(login);
  if (user !== null) {
    let starCount = user.repositories.nodes.reduce((acc, repo) => acc + repo.stargazers.totalCount, 0);
    user["score"] = 3 * user.followers.totalCount + starCount;
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

  let response = await fetchGitHubAPI(query);
  return response.data.search.edges;
}
