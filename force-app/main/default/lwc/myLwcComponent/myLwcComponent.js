import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getGoogleDriveFiles from '@salesforce/apex/GoogleDriveController.getGoogleDriveFiles';


export default class myLwcComponent extends LightningElement {
    @track files = [];
    @track error;
    fileUrl = "https://www.googleapis.com/drive/v3/files/1MNo1w9F3iXyCf3TwE_Ml5TmEWjqs77rp?alt=media&key=AIzaSyBLZhSodH6wCVbfi6LeccdVIeqEoYyYlDw";
    newFileName = "test.mkv";

    connectedCallback() {
        this.fetchFiles();
    }

    fetchFiles() {
        getGoogleDriveFiles()
            .then(result => {
                console.log('result'+result);
                this.files = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error.body.message;
                this.files = undefined;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading files',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    // extract(filesArray) {
    //     filesArray.forEach(file => {

    //     })
    //     const dataIdRegex = /data-id="([^"]*)"/g;
    //     const ariaLabelRegex = /data-tooltip="([^"]*)"/g;
    
    //     // Arrays to store extracted values
    //     const dataIds = [];
    //     const ariaLabels = [];
    
    //     let match;
    //     while ((match = dataIdRegex.exec(htmlString)) !== null) {
    //         dataIds.push(match[1]);
    
    //         // Find the subsequent aria-label after the current data-id
    //         let ariaMatch;
    //         while ((ariaMatch = ariaLabelRegex.exec(htmlString)) !== null) {
    //             if (ariaMatch[1].length > 10) {
    //                 ariaLabels.push(ariaMatch[1]);
    //                 break;
    //             }
    //         }
            
    //         // If no matching aria-label is found, add null
    //         if (!ariaMatch) {
    //             ariaLabels.push(null);
    //         }
    //     }
    
    //     // Combine the data-ids and aria-labels into an array of objects
    //     const result = dataIds.map((id, index) => ({
    //         dataId: id,
    //         ariaLabel: ariaLabels[index]
    //     }));
    
    //     return result.filter(x => x.dataId.length>5);

    // }

    downloadFile() {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = this.files[0].webViewLink;
        iframe.sandbox = 'allow-same-origin allow-scripts';

        iframe.onload = () => {
            this.tryClickDownloadButton(iframe);
        };

        document.body.appendChild(iframe);
    }

    tryClickDownloadButton(iframe) {
        const MAX_TRIES = 10;
        let tries = 0;

        const interval = setInterval(() => {
            tries += 1;

            try {
                const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                const downloadButton = iframeDocument.querySelector('a#uc-download-link, a[data-id="uc-download-link"]');

                if (downloadButton) {
                    downloadButton.click();
                    clearInterval(interval);
                } else if (tries >= MAX_TRIES) {
                    clearInterval(interval);
                    console.error('Download button not found');
                }
            } catch (e) {
                console.error('Error accessing iframe content:', e);
                if (tries >= MAX_TRIES) {
                    clearInterval(interval);
                }
            }
        }, 500); // Try every 500 milliseconds
    }
}