import { LightningElement, api } from 'lwc';
import UpdateButtonName from 'c/updateButtonName'; 

export default class PleaseClickButton extends LightningElement {
    @api buttonName = 'Please Click'

    async handleClick(event) {

        try {
            const result = await UpdateButtonName.open({
                size: 'large'
            });
            this.buttonName = result.value;
        } catch (error) {
            console.error(error.message);
        }
    }
}