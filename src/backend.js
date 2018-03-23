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

  moveCard(oldColumnId, newColumnId, id) {
    let newRef = database()
      .ref(`/${this.boardId}/columns/${newColumnId}/cards`)
      .push()

    let oldRef = database()
      .ref(`/${this.boardId}/columns/${oldColumnId}/cards`)
      .child(id)

    oldRef.once('value', function(snap) {
      newRef.set(snap.val(), function(error) {
        !error ? oldRef.remove() : console.error(error)
      })
    })
  }

  mergeCard(sourceCard, destinationCard) {
    const cardRef = database()
      .ref(`/${this.boardId}/columns/${destinationCard.parentId}/cards`)
      .child(destinationCard.id)

    if (!destinationCard.subCards) {
      cardRef
        .child('subCards')
        .push()
        .set({
          name: destinationCard.name,
          votes: destinationCard.votes,
        })
    }

    cardRef.update({name: destinationCard.name.replace(/\.*$/, '...')})
    cardRef
      .child('subCards')
      .push()
      .set(sourceCard)
    this.removeCard(sourceCard.parentId, sourceCard.id)
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

  voteCard(columnId, cardId, votes) {
    if (!columnId || !cardId) return
    this._voteCardRef(
      `/${this.boardId}/columns/${columnId}/cards/${cardId}/votes`,
      votes,
    )
  }

  voteSubCard(columnId, cardId, subCardId, votes) {
    if (!columnId || !cardId || !subCardId) return
    this._voteCardRef(
      this.boardId +
        `/columns/${columnId}/cards/${cardId}/subCards/${subCardId}/votes`,
      votes,
    )
  }

  _voteCardRef(ref, votes) {
    database()
      .ref(ref)
      .transaction(currentVotes => {
        return Number.isInteger(currentVotes) ? currentVotes + votes : votes
      })
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
        {render(this.state)}
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
