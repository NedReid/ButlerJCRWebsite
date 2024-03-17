# How to contribute

If wanting to contribute to the website, please follow the instructions below! We welcome anyone in the JCR
(or alumni!) to contribute to the website, as it's a great experience for working
with modern web frameworks, and you have a lot of freedom to work on what you want!

## Rules for contributing

1. Don't accidentally delete the entire website.

## Install instructions:

Follow the instructions in the [README](README.md) for how to install the repository.

## Development Process

### Picking up a ticket

-   Tickets that are ready to be picked up will be in the `Todo` column of the
    [Butler JCR Website Project](https://github.com/users/NedReid/projects/1).
    -   Feel free to pick up any unassigned ticket! Assign it to yourself and move it into `in-progress`
-   When working non a ticket, name your branch after the number and title of the github issue.
    -   For example this branch is named `56-update-installation-instructions`.
    -   Note that the branch name is lower-case, separated by dashes, and starts with the issue number.
-   When you are done with a branch, create a pull request, and assign someone (probably Ned) to review.
-   Once the PR is approved, **do not merge to master**, as this will immediately make the change go live.
    -   Instead, wait for Ned to merge in at a quiet time of day, where any issues can be quickly fixed if the site breaks
    -   This rule will be under review, and we may loosen rules on merging once we have better pipelines/tests implemented.
-   GitHub sucks and doesn't do fast-forward merges, so instead only rebase-merges are allowed.
    -   Once again this will be under review and I'm welcome to suggestions for changing the repository rules.

### where to add issues

-   Add issues on the issues page of the repository.
-   There are two projects, the main [Butler JCR Website Project](https://github.com/users/NedReid/projects/1), and
    the [Ideas Board](https://github.com/users/NedReid/projects/2/views/1)
    -   If something is a **ticket**, meaning something that is immediately actionable, and ready for development, it
        should go in the main project.
    -   If something should be discussed first before it is worked on, is a more general idea, or is something big
        that needs to be split up into smaller tickets, it should go in the Ideas Board. - Read the [full description](https://github.com/users/NedReid/projects/2?pane=info) to check what sort of things
        are meant to go in the ideas board.

### Writing a ticket

-   When making a ticket, first raise an issue and add it to the project. It will automatically
    go into the `Draft` column.
-   Once you think the ticket is ready for development, move it into the `Todo` column
-   Tickets should have a list of **ACs** (Acceptance Criteria), and **Tech Elaboration**. Please follow the format
    of current issues to get the idea. The ACs should be clearly actionable, and the ticket should describe what the task
    is in clear and unambiguous manner.

### Adding to the ideas board

-   Please feel free to add whatever you want to the ideas board. It is made to be a place of discussion, and we should
    treat it that way!
-   There is no idea too stupid or too big for the ideas board.
-   Please also feel free to chime in on any issue! We want your opinion
-   If an issue on the board is unassigned, **please feel free to assign yourself!** There are many issues that
    may need more research but people don't currently have time to look at.

## GitHub and server access

-   Hopefully right now, the GitHub repository should be pretty locked down.
-   If you see any issues/vulnerabilities with the GitHub permissions, please let Ned know!
-   We may relax certain permissions in the future, and they are always under review! Please raise an idea
    on the ideas board if you have thoughts regarding GitHub!
-   You may need access to the VPS server. We will be slightly more strict on handing out details, as we don't want
    too many people with the ability to destroy the website. If you need access though, please let Ned know!
-   The VPS server is backed up every day, and we have 5 days of history. This means that if anything breaks,
    **Please let Ned know immediately**. We can hopefully save the site if someone destroys it, but be sensible!

## Final thoughts

Be kind to each other, and remember we're all working on this because
we love Butler and love/hate web development! Thank you so much for volunteering your time.
Let's make this site the very best it can be! ❤️💛
