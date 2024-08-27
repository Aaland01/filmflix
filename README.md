# FilmFlix

## Description

TODO

## Commands

| Action                                      | Command                    | Comment           |
| ------------------------------------------- | -------------------------- | ----------------- |
| Open app                                    | pnpm dev                   | Q + enter to exit |
| Run backend(server) (must be ran from core) | python manage.py runserver | Ctrl + C to end   |

TODO - Add more

## Guidelines

### User Stories

#### Naming

&lt;User story # &gt; - &lt;Descriptive title&gt;

The User story # is the number where it's supposed to go in the backlog queue

#### Conventions

User stories should be written in the format of: “As a [persona], I [want to], [so that]."

User Stories are tracked via Issues labeled with "User Story".

### Issues

#### Naming

_&lt;User story #&gt;.&lt;Sequence #&gt; - &lt;Descriptive title&gt;_

#### Conventions: Creating an issue

Tasks related to a User Story are created as their own Issues, but are labeled differently and described in more detail. They should also be related to the "parent" user story, by selecting them as related issues.

An issue should receive labels. The available labels will be listed in a dropdown menu when selecting them. It should also receive an estimated due date for when the task is estimated to be completed.

An issue is to be assigned to one team member, but this can be changed later on.

Issues should contain a description that is understandable to all team members. The description should also contain a link to any corresponding Figma-visualizations.

#### Conventions: While working

Team members should utilize the time-tracking tool to compare estimated time versus actual time spent. This helps build a burn-down chart at the end of a sprint.

Team members should add comments while working on an issue to update its status or provide other necessary information to others.

An issue should be promptly closed after it is completed and the changes are merged in.

### Branches

#### Naming

Default GitLab naming

#### Conventions

A branch should be created in GitLab using the “Create branch” tool within an issue. In general, the branch should be based on "dev," but other source branches are permissible if they better suit the situation.

### Commits

#### Naming

&lt;Type&gt;:&lt;Description&gt;, Co-authored-by: full name &lt;student email&gt;

Type can be one of the following

- feat
- fix
- test
- docs

#### Conventions

Commits should be frequent and relatively concise, avoiding excessive comprehensiveness.

Each commit should adhere to the naming convention, and all contributing parties other than the committer themselves should be acknowledged with the Co-authored-by footer.

### Merge requests and reviews

#### Naming

&lt;Descriptive title&gt;

#### Conventions

If necessary, a description should be provided. If the merge request closes an issue, this issue should be referenced by writing “Closes &lt;issue #&gt;”.

Merge requests are to be assigned to the one who creates it, and the reviewer should be one of the other team-members who have not contributed to any of the included commits.

The reviewer is responsible for thoroughly reviewing all code, providing comments, and requesting changes as necessary. When satisfied, they should approve the merge request.

Upon approval, the assignee will merge in the changes.

### Sprints

During Sprint meetings we define which user stories to include in the sprint. Sprints are tracked through "Milestones". Ex: User Story 6 is to be included for Sprint 3, then Issue "6-User Story" is assigned to milestone "Sprint 3".

### Product Backlog

The Product Backlog can be found in Issue Boards, specifically the Issue board "Backlog". It consists of a single list of issues labeled as User stories, sorted by prioritization.
