const issueContainerEl = document.querySelector("#issues-container");

const getRepoIssues = function(repo) {

	var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

	fetch(apiUrl)
		.then(function(response) {
			if (response.ok) {
				response.json()
					.then(function(data) {
						displayIssues(data);
					});
			} else {
				alert("There was a problem with your request!");
			}
		});

	console.log(repo);
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

getRepoIssues("facebook/react");