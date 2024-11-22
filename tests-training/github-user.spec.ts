import { test, expect, type Page } from '@playwright/test';
import { GithubUser } from "../pages/training/github-user";

//Setup



test.describe('Github users search homepage', () => {
    let githubUser: GithubUser;
    test.beforeEach(async ({ page }) => {
        await page.goto('https://gh-users-search.netlify.app/');
        githubUser = new GithubUser(page);
    });
    //Teardown
    test( 'Assess repos change after a search', async () =>{

        githubUser.repoChangedAfterSearch();

    });

});