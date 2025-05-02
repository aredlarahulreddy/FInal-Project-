
import ChartData from "../model/chart.js";

async function saveChartData(req, res) {
    try {
        await ChartData.deleteMany({});

        const pieChartData = [
            {
                type: 'pie',
                label: 'Startup Emergence by Sector',
                labels: ['Solar', 'Wind', 'Hydro', 'Battery', 'Hydrogen'],
                data: [70, 65, 40, 95, 85],
                backgroundColor: ['orange', 'lightblue', 'lightgreen', 'gold', 'violet'],
                borderColor: '#fff',
                borderWidth: 2
            }
        ];

        const lineChartData = [
            {
                type: 'line',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Solar PV Installations (MW)',
                        data: [120, 145, 160, 180, 210, 250],
                        borderColor: 'goldenrod',
                        backgroundColor: 'goldenrod',
                        fill: false,
                        tension: 0.3,
                        pointStyle: 'circle',
                        pointBackgroundColor: 'goldenrod'
                    },
                    {
                        label: 'Wind Turbine Output (GWh)',
                        data: [300, 320, 350, 370, 390, 420],
                        borderColor: 'skyblue',
                        backgroundColor: 'skyblue',
                        fill: false,
                        tension: 0.3,
                        pointStyle: 'rect',
                        pointBackgroundColor: 'skyblue'
                    },
                    {
                        label: 'Battery Storage Capacity (MWh)',
                        data: [80, 100, 130, 160, 200, 240],
                        borderColor: 'seagreen',
                        backgroundColor: 'seagreen',
                        fill: false,
                        tension: 0.3,
                        pointStyle: 'triangle',
                        pointBackgroundColor: 'seagreen'
                    }
                ]
            }
        ];

        await ChartData.insertMany([...pieChartData, ...lineChartData]);
        return res.json({ msg: 'Data saved successfully' });
    } catch (err) {
        console.error('Error in saving data:', err);
        return res.status(500).json({ error: 'Failed to save data' });
    }
}

async function getLineChartData(req, res) {
    try {
        const data = await ChartData.find({ type: 'line' });

        if (data.length === 0) {
            return res.status(404).json({ message: 'No line chart data found' });
        }

        return res.json(data);
    } catch (err) {
        console.error('Error fetching line chart data:', err);
        return res.status(500).json({
            message: 'An error occurred while retrieving line chart data',
            error: err.message
        });
    }
}

async function getPieChartData(req, res) {
    try {
        const data = await ChartData.find({ type: 'pie' });

        if (data.length === 0) {
            return res.status(404).json({ message: 'No pie chart data found' });
        }
        return res.json(data);
    } catch (err) {
        console.error('Error fetching pie chart data:', err);
        return res.status(500).json({
            message: 'An error occurred while retrieving pie chart data',
            error: err.message
        });
    }
}


export default { getLineChartData, getPieChartData, saveChartData }