class UserListComponentState {
    static defaultState(){
        return {
            "datosUsuarios": undefined,
        }
    }
    static updateUserListData(currentState, userListData){
        return {
            ...currentState,
            "datosUsuarios": userListData
        }
    }
}

export default UserListComponentState;