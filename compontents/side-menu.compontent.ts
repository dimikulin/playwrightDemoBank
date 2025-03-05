import {Page} from "@playwright/test";

export class SideMenuCompontent {
    constructor(private page: Page) {
    }
    paymentButton = this.page.getByRole('link', { name: 'płatności' });
}