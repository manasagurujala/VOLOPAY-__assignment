import {Component} from 'react'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CardItem from "./components/CardItem/index"
import TabItem from './components/TabItem'

import { FcCamcorderPro,FcGrid,FcDatabase,FcFilledFilter,FcSearch} from "react-icons/fc";
import "./App.css"

const tabsList = [
  {tabId: 'YOUR', displayText: 'Yours'},
  {tabId: 'ALL', displayText: 'All'},
  {tabId: 'BLOCKED', displayText: 'Blocked'},]

class AppStore extends Component {
  state = {
  
    cardList: [],
    CardTypeStatus:"",
    activeTabId:tabsList[1].tabId
  }

  setActiveTabId = tabId => {

    this.setState({activeTabId: tabId})    
    console.log(tabId)
  }

  SelectBurner=()=>{
  this.setState({CardTypeStatus:"burner"})
  }
  
  SelectSub=()=>{
    this.setState({CardTypeStatus:"sub"})
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
      Id:each.id,
      OwnerId:each.owner_id,
      ActiveCategory:each.active_tab,
      Category:each.Category
      
    }))
    this.setState({cardList: Updated})
    
  }
  getActiveTabApps = cardList=> {
    const {activeTabId} = this.state
    
    const filteredApps =cardList.filter(

      eachS => eachS.Category === activeTabId,
      
    )
    return filteredApps
  }
 


  render() {
    const {activeTabId,cardList} = this.state
  
    const filteredApps =this.getActiveTabApps(cardList)
    
    return (
      <div className='container_app'>
       <div className='con-heading'>
        <div className='heading-con'>
        <h1 className='heading-app'>Vitrual Cards</h1>
        <p className='para-app'>   <FcCamcorderPro/> Learn more</p>
        </div>
        <div className='virtual-card'>
          <p className='para-cart-vc'> + Vitrual Card</p>
          
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
                <FcGrid/>
                <FcDatabase/>
              </div>
         
         </div>
       <hr/>
         <div className='pop-con'>
   
              <Popup  trigger={
              <div  >
                <FcSearch/>
                  <button className='popUpButton'>
                    <FcFilledFilter/> Filter
                  </button>
              </div>} 
              position="left center" >
                <div className='con-filer-pop'>
                    <h1 className='heading-pop-up'>Filters</h1>
                      <hr className='hr-line'/>
                      <div className='con-input-checkbox'>
                        <p> Type</p>
                          <input  id="burner" type="checkbox" onClick={this.SelectBurner}/>
                          <label className='input-label' htmlFor='burner'>Burner</label>
                          <input id="sub" type="checkbox" onClick={this.SelectSub}/>
                          <label className='input-label' htmlFor='sub'>Subcription</label>
                      </div>
                      <div className='card-con'>
                          <p className='cardholder-heading'>card holder</p>
                          <select className='select-cardholder'>
                            <option>Select Cardholder</option>
                            {cardList.map(eachOwner =>(
                              <option key={eachOwner.Id} value={eachOwner.CardHolder}>{eachOwner.CardHolder}</option>
                            ))}
                          </select>
                          <div className='button-con'>
                            <button className='button-apply'>apply</button>
                            <button className='button-clear'>clear</button>
                          </div>
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
