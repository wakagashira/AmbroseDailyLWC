import { LightningElement, wire } from 'lwc';
import getClosedWonSummary from '@salesforce/apex/ClosedWonSummaryController.getClosedWonSummary';

export default class ClosedWonSummary extends LightningElement {
    data;
    error;

    @wire(getClosedWonSummary)
    wiredData({ error, data }) {
        if (data) {
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    get cards() {
        if (!this.data) return [];
        return [
            { label: 'Closed Won Yesterday', value: this.format(this.data.Yesterday) },
            { label: 'Closed Won Today', value: this.format(this.data.Today) },
            { label: 'Closed Won This Month', value: this.format(this.data.ThisMonth) },
            { label: 'Closed Won Last Month', value: this.format(this.data.LastMonth) },
            { label: 'Closed Won This Year', value: this.format(this.data.ThisYear) },
            { label: 'Closed Won Last Year', value: this.format(this.data.LastYear) }
        ];
    }

    format(value) {
        return value ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) : '$0';
    }
}
