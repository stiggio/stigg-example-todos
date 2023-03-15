// This script is centrally managed in https://github.com/stiggio/.github/
// Don't make changes to this file in this repo as they will be overwritten with changes made to the same file in above mentioned repo

main = async () => {
  const boardId = '616997dcdfa344090329561d';
  const trelloAuthToken = process.argv[5];
  const trelloApiKey = process.argv[6];
  const data = await fetch(
      `https://api.trello.com/1/boards/${boardId}/cards?key=${trelloApiKey}&token=${trelloAuthToken}`,
  ).then((response) => response.json());

  console.log(process.argv[2]);
  console.log(process.argv[3]);
  console.log(process.argv[4]);
  let branchName = process.argv[2];
  if (branchName.indexOf('/refs/heads/') > -1) {
    branchName = branchName.slice('/refs/heads/'.length);
  }
  console.log('branchName is: ' + branchName);
  const githubref = process.argv[3];
  console.log('githubrefus: ' + githubref);
  const pullNum = githubref.split('/')[2];
  console.log('pullNum: ' + pullNum);
  if(!pullNum){
    console.log("Couldn't extract PR number")
    return;
  }
  const repoName = process.argv[4].split('/')[1];
  console.log('repoName: ' + repoName);

  const link = `https://github.com/stiggio/${repoName}/pull/${pullNum}`;
  for (const x of data) {
    if (
        branchName.toLowerCase().startsWith(
            x.name
                .replace(/[\W_]+/g, '-')
                .toLowerCase()
                .slice(0, -1),
        )
    ) {
      console.log(x.id);
      const attachments = await fetch(
          `https://api.trello.com/1/cards/${x.id}/attachments?key=${trelloApiKey}&token=${trelloAuthToken}`,
      ).then((response) => response.json());
      const urls = attachments.map((attachment) => attachment.url);
      if (urls.includes(link)) {
        console.log('attachment already added. skipping');
        return;
      }
      let url = `https://api.trello.com/1/cards/${x.id}/attachments`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: trelloApiKey,
          token: trelloAuthToken,
          url: link,
        }),
      });
      console.log('great success');
      return;
    }
  }
  console.log('card not found');
};

main();
