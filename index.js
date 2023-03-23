import * as core from '@actions/core'
import {Octokit} from "@octokit/core";

import {createAppAuth} from "@octokit/auth-app";

try {
    const appOctokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
            appId: core.getInput('app-id'),
            privateKey: core.getInput('private-key'),
            installationId: core.getInput('installation-id'),
        },
    });

    const {token} = await appOctokit.auth({
        type: "installation",
        installationId: core.getInput('installation-id'),
    });

    core.setOutput('token', token);
} catch (e) {
    core.setFailed(e.message);
}
