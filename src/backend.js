import React, {Component} from 'react'
import {Broadcast, Subscriber} from 'react-broadcast'
import {database} from 'firebase'

class FirebaseBackend {
  constructor(boardId, onChangeCallback) {
    this.boardId = boardId

    database()
      .ref(`/${boardId}`)
      .on('value', snapshot => {
        onChangeCallback(snapshot.val())
      })
  }

  addCard(columnId, cardName) {
    if (columnId && cardName) {
      database()
        .ref(`/${this.boardId}/columns/${columnId}/cards/`)
        .push()
        .set({name: cardName})
    }
  }

  removeCard(columnId, cardId) {
    if (columnId && cardId) {
      database()
        .ref(`/${this.boardId}/columns/${columnId}/cards`)
        .child(cardId)
        .remove()
    }
  }

  editCard(columnId, id, content) {
    // TODO: Replace the prompt with with Material-UI
    const newContent = prompt('Edit Card', content)
    if (newContent) {
      database()
        .ref(`/${this.boardId}/columns/${columnId}/cards`)
        .child(id)
        .update({name: newContent})
    }
  }

  moveCard(oldRefSpec, newRefSpec) {
    console.log(oldRefSpec, newRefSpec)
    let newRef = database()
      .ref(`${this._buildRef(newRefSpec)}/cards`)
      .push()

    let oldRef = database().ref(this._buildRef(oldRefSpec))

    oldRef.once('value', function(snap) {
      newRef.set(snap.val(), function(error) {
        !error ? oldRef.remove() : console.error(error)
      })
    })
  }

  mergeCard(sourceCard, destinationCard) {
    const parentCardRef = database()
      .ref(`/${this.boardId}/columns/${destinationCard.columnId}/cards`)
      .child(destinationCard.id)

    if (!destinationCard.subCards) {
      parentCardRef
        .child('subCards')
        .push()
        .set({
          name: destinationCard.name,
          votes: destinationCard.votes,
        })
    }

    parentCardRef.update({name: destinationCard.name.replace(/\.*$/, '...')})
    parentCardRef
      .child('subCards')
      .push()
      .set({name: sourceCard.name, votes: sourceCard.votes})
    this.removeCard(sourceCard.columnId, sourceCard.id)
  }

  addColumn(columnName) {
    if (columnName) {
      database()
        .ref(`/${this.boardId}/columns`)
        .push()
        .set({name: columnName})
    }
  }

  removeColumn(columnId) {
    if (columnId) {
      database()
        .ref(`/${this.boardId}/columns`)
        .child(columnId)
        .remove()
    }
  }

  editColumn(id, content) {
    // TODO: Replace the prompt with with Material-UI
    const newContent = prompt('Edit Column', content)
    if (newContent) {
      database()
        .ref(`/${this.boardId}/columns`)
        .child(id)
        .child('name')
        .set(newContent)
    }
  }

  voteCard(refSpec, votes) {
    database()
      .ref(`${this._buildRef(refSpec)}/votes`)
      .transaction(currentVotes => {
        return Number.isInteger(currentVotes) ? currentVotes + votes : votes
      })
  }

  _buildRef(refSpec) {
    let ref = this.boardId
    if (refSpec.columnId) {
      ref += `/columns/${refSpec.columnId}`
      if (refSpec.cardId) {
        ref += `/cards/${refSpec.cardId}`
        if (refSpec.subCardId) {
          ref += `/subCards/${refSpec.subCardId}`
        }
      }
    }
    return ref
  }
}

export const newBoardKey = boardName => {
  const ref = database()
    .ref('/')
    .push()
  ref.set({
    name: boardName,
    columns: [{name: 'Good'}, {name: 'Bad'}, {name: 'Questions'}],
  })
  return ref.key
}

export class FirebaseProvider extends Component {
  state = {backend: {}, loading: true, columns: [], name: ''}

  componentDidMount() {
    const backend = new FirebaseBackend(this.props.firebaseKey, val => {
      this.setState({
        loading: false,
        columns: val ? val.columns : [],
        name: val ? val.name : '',
      })
    })
    this.setState({backend})
  }

  render() {
    const {children: render} = this.props
    const {backend} = this.state
    return (
      <Broadcast channel="backend" value={backend}>
        {render(this.state, backend)}
      </Broadcast>
    )
  }
}

export class BackendActions extends Component {
  render() {
    const render = this.props.children
    return (
      <Subscriber channel="backend">{backend => render(backend)}</Subscriber>
    )
  }
}
