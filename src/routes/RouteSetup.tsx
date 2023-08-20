import {Routes, Route} from 'react-router-dom'
import { MainPage, ItemInfo, Login, Histories, Join} from '../pages'

export default function RouteSetup() {

    return (
        <Routes>
            <Route path= "/" element = {<MainPage/>}/>
            <Route path="/Histories" element = { <Histories />} />
            <Route path="/ItemInfo" element = { <ItemInfo/> } />
            <Route path="/Login" element = { <Login/>} />
            <Route path="/join" element = { <Join/>} />
        </Routes>
    )
}
