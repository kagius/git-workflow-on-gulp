# Tasks

## New feature

### Usage
```
gulp new-feature --name {task name} --description {description}
```
### Description
Creates a new feature branch with the task name, and adds a change log entry
with the task name and the description.

To do: Add the "feature" tag to the branch.

### Example
```
gulp new-feature --name TST-004 --description "Add a readme file".
```
## Promote to pre-release

### Usage
```
gulp promote-to-prerelease
```
### Description
Creates a new branch named "rc-{version}", where version is the current project version.
The version numbers in the manifests in the branch will be updated to reflect the release version.

For example, promoting 1.0.0 to pre-release will create a branch named "rc-1.0.0" with an internal
version of "1.0.1-1"

To do: Add the "pre-release" tag to the branch.
