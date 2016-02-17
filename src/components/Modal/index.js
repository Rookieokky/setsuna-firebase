import styles from './index.scss'
import classNames from 'classnames'

export class Modal extends React.Component {
  static propTypes = {
    isShow: React.PropTypes.bool.isRequired,
    toggleShow: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired,
  }

  render() {
    return (
      <div className={classNames({
        [styles.Modal]: true,
        [styles.isShow]: this.props.isShow,
      })}>
        <div className={styles.Modal__overlay} onClick={::this.props.toggleShow}></div>
        <div className={styles.Modal__content}>{this.props.children}</div>
      </div>
    )
  }
}

export default Modal
