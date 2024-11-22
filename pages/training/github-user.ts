import { type Locator, type Page, expect } from "@playwright/test";

export class GithubUser {

    //*Variables
    readonly page: Page;
    readonly repos: Locator;
    readonly following: Locator;
    readonly user: Locator;
    readonly searchBar: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.repos = page.locator('.item > div > h3');

        this.following = page.locator('//*[@id="root"]/main/section[2]/section/article[3]/div/h3');
        this.user = page.locator('//*[@id="root"]/main/section[3]/div/article[1]/header/div/p');
        this.searchBar = page.getByTestId('search-bar');
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }

    //*Actions
    async searchUser(name: string) {
        await this.searchBar.fill(name);
        await this.searchButton.click();
    }

    async fillSearchBar(name: string) {
        await this.searchBar.fill(name);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    //*Asserts
    async repoChangedAfterSearch() {
        //await this.section.waitFor({ state: "attached", timeout: 60000 });
        await this.repos.nth(1).waitFor({ state: 'visible', timeout: 30000 });

        const initialText = await this.repos.nth(1).textContent();

        this.searchUser('test');

        await expect(this.repos.innerText()).not.toBe(initialText);
    }
    async followingChangedAfterSearch() {

    }
    async userChangedAfterSearch() {

    }

}