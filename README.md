# GitHub Application Auth Action

This action is used to obtain a short-lived access token, to perform actions on behalf of an installed github app.

A typical use case for this is to use the app instead of a PAT, which is short-lived, in order to perform cross-repository operations. Or any other ones that are not possible by using the repository scoped `GITHUB_TOKEN`.

## Inputs

### `private-key`

**Required** The app' [private key](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps).

### `app-id`

**Required** The ID of the [app](https://docs.github.com/en/apps/creating-github-apps/creating-github-apps/creating-a-github-app).

### `installation-id`

**Required** The application's [installation ID](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation).

## Outputs

### `token`

The short-lived [installation access token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app).

## Example usage


```yaml
uses: gitpod-io/gh-app-auth@v0.1
with:
  app-id: '1234'
  installation-id: '1234556678'
  private-key: ${{ secrets.private-key }}
```

#### Triggering an action in another repository

```yaml
- uses: gitpod-io/gh-app-auth@v0.1
  id: gh-auth
  with:
    app-id: '1234'
    installation-id: '1234556678'
    private-key: ${{ secrets.private-key }}
- name: Test
  uses: actions/github-script@v6
  with:
    github-token: ${{ steps.gh-auth.outputs.token }}
    script: |
      const result = await github.rest.actions.createWorkflowDispatch({
        owner: context.repo.owner,
        repo: 'your-repository',
        workflow_id: 'triggerd-action.yaml',
        ref: 'main',
        inputs: {
          "your": 'input',
        }
      })
      console.log(result)
```
