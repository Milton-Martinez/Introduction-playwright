import { test, expect, type Page } from '@playwright/test';
import { Demoblaze_home } from "../pages/training/demoblaze-home";

//Setup
let demoblazeHome: Demoblaze_home;

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    demoblazeHome = new Demoblaze_home(page);
  });

test.describe('Login with empty fields', () => {

    //Teardown
    test( 'Assess the login message with empty filds', async () =>{
        //click login in the navbar
        await demoblazeHome.clickLoginInNav();

        //click login in the modal
        await demoblazeHome.clickLogInInModal();

        //asserts
        await demoblazeHome.loginWithEmptyFields();
    })
});