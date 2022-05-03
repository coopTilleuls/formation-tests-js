import { baseURL } from '../constants/index.mjs';

export class TrainingPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = `${baseURL}/masterclass/formations/introduction-a-api-platform`;

        this.selectors = {
            content: '.sticky+.w-full',
            registerButton: 'text="S\'inscrire"',
            submitSubscriptionButton: 'text="Envoyer le formulaire"',
            requiredFields: 'text="Champ obligatoire"',
            fieldLastName: '#your-lastname',
            fieldFirstName: '#your-firstname',
            fieldLocation: '#your-location',
            fieldNumber: '#attendees-number',
        }
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async gotoRegisterPage() {
        await this.goto();
        await this.page.locator(this.selectors.registerButton).click();
    }

    async fillForm(success = false, submit = false) {
        if (success) {
            await this.page.locator(this.selectors.fieldLastName).fill('Doe');
            await this.page.locator(this.selectors.fieldFirstName).fill('John');
            await this.page.locator(this.selectors.fieldLocation).fill('Lille');
            await this.page.locator(this.selectors.fieldNumber).fill('2');
        }

        if (submit) {
            await this.page.locator(this.selectors.submitSubscriptionButton).click();
        }
    }
}
