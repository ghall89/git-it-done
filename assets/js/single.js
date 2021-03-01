const repNameEl = document.querySelector("#repo-name");
const issueContainerEl = document.querySelector("#issues-container");
const limitWarningEl = document.querySelector("#limit-warning");

const getRepoName = function() {
	let queryString = document.location.search;
	let repoName = queryString.split("=")[1];

	if (repoName) {
		repNameEl.textContent = repoName;
		getRepoIssues(repoName);
	} else {
		document.location.replace("./index.html");
	}
};

const getRepoIssues = function(repo) {

	var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

	fetch(apiUrl)
		.then(function(response) {
			if (response.ok) {
				response.json()
					.then(function(data) {
						displayIssues(data);

						if (response.headers.get("Link")) {
							displayWarning(repo);
						}

					});
			} else {
				document.location.replace("./index.html");
			}
		});
}

const displayIssues = function(issues) {

	if (issues.length === 0) {
		issueContainerEl.textContent = "This repo has no open issues!";
		return;
	}

	for (let i = 0; i < issues.length; i++) {
		const issueEl = document.createElement("a");
		issueEl.classList = "list-item flex-row justify-space-between align-center";
		issueEl.setAttribute("href", issues[i].html_url);
		issueEl.setAttribute("taget", "_blank");

		const titleEl = document.createElement("span");
		titleEl.textContent = issues[i].title;

		issueEl.appendChild(titleEl);

		const typeEl = document.createElement("span");
		if (issues[i].pull_request) {
			typeEl.textContent = "(Pull Request)";
		} else {
			typeEl.textContent = "(Issue)";
		}

		issueEl.appendChild(typeEl);

		issueContainerEl.appendChild(issueEl);
	}
};

const displayWarning = function(repo) {
	limitWarningEl.textContent = "To see more than 30 issues, visit ";

	const linkEl = document.createElement("a");
	linkEl.textContent = "See More Issues on GitHub.com";
	linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
	linkEl.setAttribute("target", "_blank");

	limitWarningEl.appendChild(linkEl);
};


getRepoName();