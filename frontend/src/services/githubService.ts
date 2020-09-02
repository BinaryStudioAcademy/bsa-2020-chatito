export interface IGithubResponse {
  name: string;
}

export const getUserPublicGithubRepositories = async (githubUsername: string) => {
  const githubUrl = `https://api.github.com/users/${githubUsername}/repos`;

  const response = await fetch(githubUrl);

  if (response.status === 404) {
    return [];
  }

  const repositories: Array<IGithubResponse> = await response.json();
  const repositoriesNames: Array<string> = repositories.map(repo => repo.name);

  return repositoriesNames;
};
