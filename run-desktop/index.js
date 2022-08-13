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
        core.setOutput("data", data);
        core.setOutput("arn1", data.run.arn);
        core.setOutput("parsing_result_url", data.run.parsingResultUrl);
        core.setOutput("result_code", data.run.resultCode);
        core.setOutput("status", data.run.status);
    })
    .catch(err => {core.setFailed(err)})
