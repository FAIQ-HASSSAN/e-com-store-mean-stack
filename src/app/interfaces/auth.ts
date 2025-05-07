export interface registration{
    user : {
        name : string,
        email : string,
       password : string
    }
    message : string
}

export interface login{
    token : string,
    userInfo : {
        name : string
    }
}