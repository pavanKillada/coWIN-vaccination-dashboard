// Write your code here
import {Component} from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

class VaccinationCoverage extends Component {
  state = {data: []}

  componentDidMount() {
    const {coverageData} = this.props
    this.setState({data: coverageData})
  }

  dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  render() {
    const {data} = this.state

    return (
      <div className="vaccination-coverage-graph-container">
        <h1 className="graph-head">Vaccination Coverage</h1>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart width={1000} height={300} data={data} margin={{top: 5}}>
            <XAxis
              dataKey="vaccine_date"
              tick={{stroke: '#cbd5e1', strokeWidth: 1}}
            />
            <YAxis
              tickFormatter={this.dataFormatter}
              tick={{stroke: '#cbd5e1', strokeWidth: 1}}
            />
            <Legend
              wrapperStyle={{
                padding: 20,
              }}
            />
            <Bar
              className="dose-1"
              dataKey="dose_1"
              name="Dose 1"
              fill="#5a8dee"
              barSize="20%"
            />
            <Bar
              className="dose-2"
              dataKey="dose_2"
              name="Dose 2"
              fill="#f54394"
              barSize="20%"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
export default VaccinationCoverage
