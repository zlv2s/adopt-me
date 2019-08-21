import React, { lazy } from 'react'
import pet from '@frontendmasters/pet'
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext'
import { navigate } from '@reach/router'

const Modal = lazy(() => import('./Modal'))


class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      showModal: false
    }
  }
  componentDidMount() {
    // throw new Error('lol')
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        url: animal.url,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false
      })
    })
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal })

  adopt = () => navigate(this.state.url)

  render() {
    if (this.state.loading) {
      return (
        <h1>loading ...</h1>
      )
    }
    const { animal, name, location, description, breed, media, showModal } = this.state
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          {/* use context in class Component */}
          <ThemeContext.Consumer>
            {themeHook =>
              (
                <button
                  onClick={this.toggleModal}
                  style={{ backgroundColor: themeHook[0] }}>
                  Adopt {name}
                </button>
              )
            }
          </ThemeContext.Consumer>
          <p>{description}</p>
          {
            showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name} ?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No</button>
                  </div>
                </div>
              </Modal>
            ) : null
          }
        </div>
      </div>
    )
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  )
}