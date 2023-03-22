// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const fetchStatus = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failed: 'FAILED',
}

class CowinDashboard extends Component {
  state = {data: {}, fetching: fetchStatus.failed}

  componentDidMount() {
    this.getGraphData()
  }

  getGraphData = async () => {
    this.setState({fetching: fetchStatus.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({
        data: {
          last7DaysVaccination: data.last_7_days_vaccination,
          vaccinationByAge: data.vaccination_by_age,
          vaccinationByGender: data.vaccination_by_gender,
        },
        fetching: fetchStatus.success,
      })
    } else {
      this.setState({fetching: fetchStatus.failed})
    }
  }

  renderAllGraphsData = () => {
    const {data} = this.state
    return (
      <div className="graphs-container">
        <h1 className="graphs-container-head">CoWIN Vaccination in India</h1>
        <VaccinationCoverage coverageData={data.last7DaysVaccination} />
        <VaccinationByGender genderData={data.vaccinationByGender} />
        <VaccinationByAge ageData={data.vaccinationByAge} />
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailedView = () => (
    <div className="failed-view-container">
      <img
        className="failed-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failed-text">Data Fetch Failed!!</h1>
    </div>
  )

  renderGraphs = () => {
    const {fetching} = this.state
    switch (fetching) {
      case 'SUCCESS':
        return this.renderAllGraphsData()
      case 'IN_PROGRESS':
        return this.renderLoader()
      case 'FAILED':
        return this.renderFailedView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="dashboard">
        <nav>
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="logo-text">Co-WIN</h1>
        </nav>
        {this.renderGraphs()}
      </div>
    )
  }
}
export default CowinDashboard
