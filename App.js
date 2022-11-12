import {Component} from 'react'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CardItem from "./components/CardItem/index"
import TabItem from './components/TabItem'
import {IoReorderFourSharp} from "react-icons/io5"
import {AiFillAppstore} from "react-icons/ai"
import { FcCamcorderPro,FcDatabase ,FcSearch} from "react-icons/fc";
import "./App.css"

const tabsList = [
  {tabId: 'YOUR', displayText: 'Yours'},
  {tabId: 'ALL', displayText: 'All'},
  {tabId: 'BLOCKED', displayText: 'Blocked'},]

class AppStore extends Component {
  state = {
    cardTypeBurner:"burner",
    cardList: [],
    CardBurner:false,
    activeTabId:tabsList[1].tabId
  }

  setActiveTabId = tabId => {

    this.setState({activeTabId: tabId})

    console.log(tabId)
  }

  SelectBurner=()=>{
     const {CardBurner}=this.state
     this.setState(prevState => {
      return { CardBurner: !prevState.CardBurner};
    });
    console.log(CardBurner)
    
  }

  getActiveTabApps = cardList => {
    const {activeTabId} = this.state
    const filteredApps = cardList.filter(

      eachS => eachS.Category === activeTabId,
      
    )
    console.log(filteredApps)
    return filteredApps
   
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
      ListA:each.avaible,
      Id:each.owner_id,
      ActiveCategory:each.active_tab,
      Category:each.Category
      
    }))
    this.setState({cardList: Updated})
    
  }

  render() {
    const {cardList,activeTabId} = this.state
    const filteredApps =this.getActiveTabApps(cardList)
    return (
      <div className='container_app'>
       <div className='con-heading'>
        <div className='heading-con'>
        <h1 className='heading-app'>Vitrual Cards</h1>
        <p>   <FcCamcorderPro/> Learn more</p>
        </div>
        <div>
          <p>+ Vitrual Card</p>
          
        </div>
       </div>
        <div className='TabList-con'>
            <ul className='tab-list' >
              {tabsList.map(eachTab=>(
                <TabItem key={eachTab.tabId} TabDetails={eachTab} setActiveTabId={this.setActiveTabId} 
               isActive={ activeTabId === eachTab.tabId}/>
              ))}
            </ul>
          
              <div>
                <AiFillAppstore/>
                <IoReorderFourSharp/>
              </div>
          
         </div>
         <hr/>
         <div className='pop-con'>
   
              <Popup  trigger={
              <div><FcSearch/>
                  <button>
                    <FcDatabase/> Filter
                  </button>
              </div>} 
              position="left center" >
                <div className='con-filer-pop'>
                    <h1>Filters</h1>
                    <hr/>
                      <div className='con-input-checkbox'>
                          <input id="burner" type="checkbox" onClick={this.SelectBurner}/>
                          <label htmlFor='burner'>Burner</label>
                          <input id="sub" type="checkbox"/>
                          <label htmlFor='sub'>Subcription</label>
                      </div>
                      <div>
                          <label>card holder</label>
                          <select>
                            <option value="grapefruit">Grapefruit</option>
                            <option >card1</option>
                          </select>
                      </div>
                </div>
              </Popup>
              
            
  </div>
  <div>
          <ul className='unorderlist-con'>     
            {filteredApps.map(each=>(
              
              <CardItem key={each.Id} details={each}   cardTypeBurner={each.CardType}/>
            ))}
          </ul>
         
</div>
      </div>
    )
  }
}
export default AppStore
