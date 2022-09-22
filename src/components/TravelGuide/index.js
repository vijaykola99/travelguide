import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class TravelGuide extends Component {
  state = {loader: true, data: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updateData = data.packages.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imagUrl: eachItem.image_url,
      description: eachItem.description,
    }))
    this.setState({loader: false, data: updateData})
  }

  renderImages = () => {
    const {data} = this.state
    return (
      <ul className="list-items">
        {data.map(eachItem => (
          <li key={eachItem.id} className="each-list">
            <img className="image" src={eachItem.imagUrl} alt={eachItem.name} />
            <h1 className="name">{eachItem.name}</h1>
            <p className="description">{eachItem.description}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div>
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {loader} = this.state

    return (
      <div className="app-background">
        <h1 className="heading">Travel Guide</h1>
        {loader ? this.renderLoader() : this.renderImages()}
      </div>
    )
  }
}
export default TravelGuide
