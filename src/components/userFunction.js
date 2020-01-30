import axios from 'axios'

export const register = NewUser => {
    return axios
        .post('/register', {
            username : NewUser.username,
            address : NewUser.address,
            telp : NewUser.telp,
            email : NewUser.email,
            password : NewUser.password,
        })
        .then(response => {
          console.log(response.data.error)
            if(response.data.error){
              return response.data
            
            }
            // return response
        })
        .catch(err => {
          console.log(err)
        
      })
}

export const login = user => {
    return axios
        .post('login', {
           username : user.username,
           password : user.password 
           
        })
      
        .then(response => {
          
            if(response){
                if(response.data != ''){
                  localStorage.setItem('usertoken', response.data)
                  return response.data
              // console.log(response.data)
                }
                else{
                  alert('asdsd')
                }
            }
            else{
              alert('salah')
            }
        })
        .catch(err => {
            console.log(err)
          
        })
}

export const getToken = user => {
    return axios
      .get('landing', {
        //headers: { Authorization: ` ${this.getToken()}` }
      })
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }