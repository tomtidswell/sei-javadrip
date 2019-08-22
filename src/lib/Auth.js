
class Auth {
  static setUserData(data){
    localStorage.setItem('javadrip.portfolio', JSON.stringify({...this.getUserData(), ...data }) )
  }

  static getUserData(){
    const data = localStorage.getItem('javadrip.portfolio')
    //console.log('User data', data)
    if(!data) return null
    return JSON.parse(data)
  }

  static isUser(){
    const data = this.getUserData()
    console.log('User data', data)
    return data ? true : false
    //console.log('token data', atob(parts[1]))
  }

  static deleteUser(){
    localStorage.removeItem('javadrip.portfolio')
  }
}

export default Auth
