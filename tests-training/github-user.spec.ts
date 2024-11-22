import { test, expect, type Page } from '@playwright/test';
import { GithubUser } from "../pages/training/github-user";

test.describe('Github users search homepage', () => {
    //Setup
    let githubUser: GithubUser;
    test.beforeEach(async ({ page }) => {
        await page.goto('https://gh-users-search.netlify.app/');
        githubUser = new GithubUser(page);
    });
    //Teardown
    test.afterEach(async ({ page }) => {
        await page.screenshot({ path: 'debug.png' });
    })

    test('Assess repos change after a search', async () => {
        githubUser.repoChangedAfterSearch();

    });

});