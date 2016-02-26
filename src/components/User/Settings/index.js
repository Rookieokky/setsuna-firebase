import styles from './index.scss'
import i18next from 'i18next'
import firebaseUtils from 'utils/firebase/index'

export default class UserSettings extends React.Component {
  static propTypes = {
    userFirebase: React.PropTypes.object,
  }

  constructor() {
    super()
    this.langOptions = [
      { name: 'English', value: 'en' },
      { name: '日本語', value: 'ja' },
    ]
  }

  _changeLang(e) {
    i18next.changeLanguage(e.target.value, (err) => {
      if (err) {
        alert('言語の切り替えができませんでした。時間が経ってから再度お試しください。')
      }
      location.reload()
    })
  }

  _logout() {
    firebaseUtils.users.logout()
  }

  /**
   * ユーザーの名前、メールアドレス、言語情報を表示
   */
  renderInfo() {
    const { userFirebase } = this.props
    if (!userFirebase) {
      return null
    }
    return (
      <div>
        <div>
          <p>{userFirebase[userFirebase.auth.provider].displayName}</p>
          <p>{userFirebase[userFirebase.auth.provider].email}</p>
        </div>
        <select onChange={::this._changeLang} defaultValue={i18next.language}>
          {this.langOptions.map((option, index) => (
              <option
                key={index}
                value={option.value}>
                  {option.name}
              </option>
            ))}
        </select>
        <div onClick={::this._logout}>{i18next.t('User__logout')}</div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.UserSettings}>
        {this.renderInfo()}
      </div>
    )
  }
}
