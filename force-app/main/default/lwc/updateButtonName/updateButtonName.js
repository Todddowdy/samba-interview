import { api } from 'lwc';
import LightningModal from 'lightning/modal';


export default class UpdateButtonName extends LightningModal {
    @api newNameValue = '';

    get isDisabled() {
        return !this.newNameValue === true;
    }

    handleChange(event) {
        this.newNameValue = event.target.value;
    }

    handleSave() {
        try {
            this.close({value: this.newNameValue});
        } catch (error) {
            console.error("Error message:", error.message);
        }
    }
}