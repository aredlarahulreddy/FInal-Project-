import mongoose from 'mongoose';

const datasetSchema = new mongoose.Schema({
    label: String,
    data: [Number],
    borderColor: String,
    backgroundColor: String,
    fill: Boolean,
    tension: Number,
    pointStyle: String,
    pointBackgroundColor: String
}, { _id: false });

const chartDataSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['pie', 'line'],
        required: true
    },
    label: String,
    labels: [String],
    data: [Number],
    backgroundColor: [String],
    borderColor: String,
    borderWidth: Number,
    datasets: [datasetSchema]
});

const ChartData = mongoose.model('ChartData', chartDataSchema);

export default ChartData;
