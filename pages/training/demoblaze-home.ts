import { type Locator, type Page, expect } from "@playwright/test";

export class Demoblaze_home{

    //!Variables
    readonly page: Page;
    readonly logInButtonInNav: Locator;
    readonly logInButtonInModal: Locator;
    readonly emptyFieldsMessage: String = 'Please fill out Username and Password.';

    constructor(page: Page) {
        this.page = page;
        this.logInButtonInNav = page.locator('a#login2');
        this.logInButtonInModal =  page.getByRole( 'button', { name: 'Log in' } );
    }

    //!Actions
    async clickLoginInNav(){
        await this.logInButtonInNav.click();
    }
    async clickLogInInModal(){
        await this.logInButtonInModal.click();
    }

    //!Asserts
    async loginWithEmptyFields(){
        await expect(this.emptyFieldsMessage).toEqual('Please fill out Username and Password.');
    }

}

export default Demoblaze_home;