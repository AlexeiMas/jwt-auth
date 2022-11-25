import React, {useState} from 'react';
import {userLogout} from "../store/userSlice";
import {IUser} from "../models/IUser";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import UserService from "../services/UserService";

const HomePage = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [showList, setShowList] = useState<boolean>(false)
  const {user, isAuth, isLoading} = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  async function stateUsers() {
    if (!showList) {
      setShowList(true)
      try {
        const response = await UserService.fetchUsers()
        setUsers(response.data)
      } catch (e) {
        console.log(e)
      }
    } else {
      setShowList(false)
      setUsers([])
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <header>
        <button onClick={() => dispatch(userLogout())}>Log out</button>
      </header>
      <h1>{(isAuth && user) ? `User authed by email ${user.email}` : 'Please login'}</h1>
      <h1 className={user?.isActivated ? "success" : "warning"}>{user?.isActivated ? 'Account confirmed by email ✓' : 'Verify your account, please!!!'}</h1>
      <div>
        <button onClick={stateUsers}>{showList ? "Hide users' list" : "Show users' list"}</button>
      </div>
      <ol>
        {users.map(user =>
          <li key={user.email}>{user.email}</li>
        )}
      </ol>
    </>
  );
};

export default HomePage;