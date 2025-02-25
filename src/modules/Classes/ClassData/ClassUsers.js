import React, { useRef ,useEffect, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import StyleInput from "../../../components/Button/Input"
import formtrans from "../../../translate/forms"
import tabletrans from "../../../translate/tables"
import env from '../../../env';
import StyleSelect from '../../../components/Button/AutoComplete';
import UserTable from '../../Users/UserTable';

function ClassUser(props){
    const content=props.content
    const users=props.users
    const userFilter = props.userFilter
    const [error,setError] = useState({errorText:'',errorColor:"brown"})
    const [selectedUser,setSelectedUser] = useState([])
    const [userSearch,setUserSearch] = useState('')
    const addUserToClass=()=>{
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({userId:userSearch._id,class:content})
      }
    console.log(postOptions)
  fetch(env.siteApi + "/panel/user/update-user-class",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      if(result.error){
        setError({errorText:result.error,
          errorColor:"brown"})
        setTimeout(()=>setError({errorText:'',
          errorColor:"brown"}),3000)
      }
        else{
          setError({errorText:"کلاس پیدا شد",
            errorColor:"green"})
          
          setTimeout(()=>window.location.reload(),500)
        }
        
    },
    (error) => {
      console.log(error);
    })
    }
    //console.log(selectedUser)
    const removeUserFromClass=()=>{
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({users:selectedUser,
          class:content})
      }
  fetch(env.siteApi + "/panel/user/remove-user-class",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      if(result.error){
        setError({errorText:result.error,
          errorColor:"brown"})
        setTimeout(()=>setError({errorText:'',
          errorColor:"brown"}),3000)
      }
        else{
          setError({errorText:"کلاس پیدا شد",
            errorColor:"green"})
          
          setTimeout(()=>window.location.reload(),500)
        }
        
    },
    (error) => {
      console.log(error);
    })
    }
    const setUserClass=(search)=>{
      if(!search||search.length<4)return
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({customer:search})
      }
     
  fetch(env.siteApi + "/panel/user/list",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      if(result.error){
        setError({errorText:result.error,
          errorColor:"brown"})
        setTimeout(()=>setError({errorText:'',
          errorColor:"brown"}),3000)
      }
        else{
          setError({errorText:"سرویس پیدا شد",
            errorColor:"green"})
            setUserSearch(result.filter)
          setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
        }
        
    },
    (error) => {
      console.log(error);
    })
    }
    return(
        <div className="userItem">
          <strong>لیست مشتریان</strong>
          {!props.readOnly?<>
          <div className='new-member newUser'>
            <StyleSelect title={formtrans.customer[props.lang]} direction={props.direction} 
              //defaultValue={content?content.userInfo[0].cName:''} class={"formInput"}
              options={userSearch||[]}
              label={"fullInfo"||''}
              textChange={(e)=>setUserClass(e)}
              action={(e)=>setUserSearch(e)}/>
            <div className="addClassBtn" onClick={addUserToClass}>
              <i className="fa-solid fa-plus"></i></div>
            
          </div>
          <div className="removeBtn leftItem" 
              onClick={removeUserFromClass}>
              حذف از لیست</div></>:<></>}
          <div className="user-list">
          <UserTable userList={{filter:users}} lang={{lang:props.lang}}
          setSelectedUser={setSelectedUser} selectedUser={selectedUser}
          />
          </div>
        </div>
    )
}
export default ClassUser