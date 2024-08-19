// downloadSampleFile.js
import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class HelloWorldLWC extends LightningElement {
    firstName = '';
    lastName = '';
    email = '';
    phone = '';

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    handleSave() {
        // Show a success toast message
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Your details have been saved successfully!',
                variant: 'success',
            }),
        );
    }
}