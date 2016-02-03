import styles from './index.scss'
import config from 'utils/config'
import Firebase from 'firebase'

const firebaseRef = new Firebase(config.firebase.demoRef)

export default class Star extends React.Component {
  static propTypes = {
    item: React.PropTypes.object,
    userFirebase: React.PropTypes.object,
    starsFirebase: React.PropTypes.array
  }

  _addStar (e, isStarred, key) {
    e.stopPropagation()
    if (isStarred) {
      firebaseRef.child('stars').child(this.props.userFirebase.auth.uid).child(key).remove((err) => {
        if (err) alert('starが削除できませんでした。時間を経ってから再度お試しください。')
      })
    } else {
      firebaseRef.child('stars').child(this.props.userFirebase.auth.uid).push({
        post_id: this.props.item['.key'],
        user_id: this.props.item.user_id,
        content: this.props.item.content,
        created_at: Firebase.ServerValue.TIMESTAMP
      }, (err) => {
        if (err) alert('starが保存できませんでした。時間を経ってから再度お試しください。')
      })
    }
  }

  render () {
    let key = null
    const {item, starsFirebase} = this.props
    const isStarred = starsFirebase.some((star) => {
      if (star.post_id === item['.key']) {
        key = star['.key']
        return true
      }
      return false
    })
    return (
      <div className={styles['Star']} onClick={(e) => this._addStar(e, isStarred, key)}>
        <i className='material-icons'>
          {isStarred
            ? 'star' : 'star_border'}
        </i>
      </div>
    )
  }
}