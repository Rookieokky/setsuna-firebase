import styles from './index.scss'

export class HomeView extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.HomeView}>
        <div className={styles.HomeView__firstView}>
          <div className={styles.HomeView__firstView__text}>
            Let bygones be bygones
          </div>
          <div className={styles.HomeView__startBtn}>Get Started</div>
        </div>
      </div>
    )
  }
}

export default HomeView
