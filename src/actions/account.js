import { createAction } from 'redux-actions'
import * as constants from 'constants'
import utils from 'utils/index'
import config from 'utils/config'
import Firebase from 'firebase'

const firebaseRef = new Firebase(config.firebase.demoRef)

const requestCreateAuth = createAction(constants.REQUEST_CREATE_AUTH)
const requestCreateAuthSuccess = createAction(constants.REQUEST_CREATE_AUTH_SUCCESS, (authData = {}) => authData)
const requestCreateAuthFailure = createAction(constants.REQUEST_CREATE_AUTH_FAILURE, 'エラーメッセージ')
const requestDeleteAuthSuccess = createAction(constants.REQUEST_DELETE_AUTH_SUCCESS, (authData = {}) => authData)

function initAuth () {
  return (dispatch) => {
    const authData = utils.getAuth()
    if (!authData) return
    dispatch(requestCreateAuthSuccess(authData))
  }
}

function createUser (authData) {
  firebaseRef.child('users').child(authData.uid).set({
    provider: authData.provider,
    name: authData.google.displayName
  })
}

function createAuth () {
  return (dispatch) => {
    if (utils.getAuth()) return
    dispatch(requestCreateAuth())
    firebaseRef.authWithOAuthPopup('google', (err, authData) => {
      if (err || !authData) {
        console.log('Login Failed!', err)
        dispatch(requestCreateAuthFailure())
        return
      }
      console.log('Authenticated successfully with payload:', authData)
      createUser(authData)
      dispatch(requestCreateAuthSuccess(authData))
    }, {scope: 'email'})
  }
}

function deleteAuth () {
  return (dispatch) => {
    firebaseRef.unauth()
    dispatch(requestDeleteAuthSuccess())
  }
}

export default {
  initAuth,
  createAuth,
  deleteAuth
}