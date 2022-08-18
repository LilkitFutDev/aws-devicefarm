const core = require('@actions/core');
const devicefarm = require("../lib/aws-devicefarm.js");

var params = {};
var params_test = {};

// alternative selection method would be via filters in
// deviceSelectionConfiguration - as pool arn is way easier
// stick with that for now
params.projectArn = core.getInput('project_arn');

params.expiresInSeconds = core.getInput('expires_in_seconds');



if (!devicefarm.validateParameters(params,
    {projectArn: 'project_arn',
             expiresInSeconds: 'expires_in_seconds'})) {
    return;
}


devicefarm.createTestGridUrl(params)
    .then(data => {
        console.log("DATA", data.valueOf().url)
        core.setOutput("data", data);

    })
    .catch(err => {core.setFailed(err)})
