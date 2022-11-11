import {Component} from 'react'

import CardItem from "./components/CardItem/index"

class AppStore extends Component {
  state = {
    cardList: [],
  }


  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(
      'https://636e428d182793016f3b867e.mockapi.io/cards',
    )
    const data = await response.json()
   
    const Updated = data.map(each => ({
      
      CompanyName:each.company_name,
      CardHolder:each.card_holder,
      CompanyType:each.company_type,
      CardType: each.card_type,
      ExpiryDate:each.expiry_date,
      ListSpend:each.spent,
      ListA:each.avaible
     
      
    }))
    this.setState({cardList: Updated})
    
  }

  render() {
    const {cardList} = this.state
    return (
      <div>
        <h1>heading {cardList.id}</h1>
        <ul>     
          {cardList.map(each=>(
            <CardItem key={each.id} details={each}/>
          ))}
        </ul>

      </div>
    )
  }
}
export default AppStore
