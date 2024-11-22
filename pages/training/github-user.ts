/*
Lecciones aprendidas 
- Los xpath no son tan confiables por que la estructura de la pagina puede cambiar
- Puedo generar locators en cadena de esta manera .item > div > h3 del padre hacia sus hijos
- this.repos.nth(0).textContent() -> nth nos sirve para seleccionar un elemento especifico de todos los elementos encontrados
- aveces algo puede estar fallando por que falta algun await
- Y otras veces los await no son suficientes para esperar a que un cambio ocurra.
*/


import { type Locator, type Page, expect } from "@playwright/test";

export class GithubUser {

    //*Variables
    readonly page: Page;
    readonly repos: Locator;
    readonly following: Locator;
    readonly user: Locator;
    readonly searchBar: Locator;
    readonly searchButton: Locator;
    initialRepoText : string;
    initialFollowingText : string;
    initialUserText : string;

    constructor(page: Page) {
        this.page = page;
        this.repos = page.locator('.item > div > h3');
        this.following = page.locator('.item > div > h3');
        this.user = page.locator('header > div > p');
        this.searchBar = page.getByPlaceholder('enter github user name');
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }

    //*Actions
    async searchUser() {
        await this.searchBar.waitFor({ state: 'visible', timeout: 30000 });
        await this.searchBar.fill('test');
        await this.searchButton.click();
    }

    async fillSearchBar(name: string) {
        await this.searchBar.fill(name);
        this.initialRepoText = (await this.repos.nth(0).textContent())?.trim() || '';
        this.initialFollowingText = (await this.following.nth(2).textContent())?.trim() || '';
        this.initialUserText = (await this.user.textContent())?.trim() || '';
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    //*Asserts
    async repoChangedAfterSearch() {
        const newText = await this.repos.nth(0).textContent()
        expect( newText ).not.toBe(this.initialRepoText);
    }
    async followingChangedAfterSearch() {
        const newText = await this.following.nth(2).textContent()
        expect( newText ).not.toBe(this.initialFollowingText);
    }
    async userChangedAfterSearch() {
        const newText = await this.user.textContent()
        expect( newText ).not.toBe(this.initialUserText);
    }

}