import csv from 'csv-parser'
import { createReadStream } from 'fs'

const parsed = []
const habitable = []
createReadStream('keplerdata.csv')
	.pipe(csv({
		skipComments: true,
	}))
	.on('data', (data) => {
		parsed.push(data)
		var iskoi_disposition = (data.koi_disposition == 'CONFIRMED')
		var iskoi_insol = (data.koi_insol < 1.11 && data.koi_insol > 0.36)
		var iskoi_prad = (data.koi_prad < 1.6)
		if (iskoi_disposition && iskoi_insol && iskoi_prad) {
			habitable.push(data)
		}
	})
	.on('end', () => {
		analyzeData()
	});


const analyzeData = () => {
	console.log(habitable);
}
