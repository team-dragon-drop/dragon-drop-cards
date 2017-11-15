import { database } from "firebase";

export default {
  boardId: null,

  init: (boardId, onChangeCallback) => {
    this.boardId = boardId;
    database().ref(`/${boardId}`).on("value", snapshot => {
      onChangeCallback(snapshot.val());
    });
  },

  newBoard: (boardName) => {
    const ref = database().ref('/').push();
    ref.set({
      name: boardName,
      columns: [
        {name: "Good"},
        {name: "Bad"},
        {name: "Questions"}
      ]
    });
    return ref.key;
  },

  addCard: (columnId, cardName) => {
    if (columnId && cardName) {
      database()
        .ref(`/${this.boardId}/columns/${columnId}/cards/`)
        .push()
        .set({ name: cardName });
    }
  },

  removeCard: (columnId, cardId) => {
    if (columnId && cardId) {
      database()
        .ref(`/${this.boardId}/columns/${columnId}/cards`)
        .child(cardId)
        .remove();
    }
  },

  editCard: (columnId, id, content) => {
    // TODO: Replace the prompt with with Material-UI
    const newContent = prompt("Edit Card", content);
    if (newContent) {
      database()
        .ref(`/${this.boardId}/columns/${columnId}/cards`)
        .child(id)
        .set({ name: newContent });
    }
  },

  moveCard: (oldColumnId, newColumnId, id) => {
    let newRef = database()
      .ref(`/${this.boardId}/columns/${newColumnId}/cards`)
      .push()

    let oldRef = database()
      .ref(`/${this.boardId}/columns/${oldColumnId}/cards`)
      .child(id)

    oldRef.once("value", function(snap) {
      newRef.set(snap.val(), function(error) {
        !error ? oldRef.remove() : console.error(error);
      });
    });
  },

  addColumn: (columnName) => {
    if (columnName) {
      database()
        .ref(`/${this.boardId}/columns`)
        .push()
        .set({ name: columnName });
    }
  },

  removeColumn: (columnId) => {
    if (columnId) {
      database()
        .ref(`/${this.boardId}/columns`)
        .child(columnId)
        .remove();
    }
  },

  editColumn: (id, content) => {
    // TODO: Replace the prompt with with Material-UI
    const newContent = prompt('Edit Column', content);
    if (newContent) {
      database()
        .ref(`/${this.boardId}/columns`)
        .child(id)
        .child("name")
        .set(newContent);
    }
  },

  voteUpCard: (columnId, cardId) => {
    if (columnId && cardId) {
      database()
        .ref(`/${this.boardId}/columns/${columnId}/cards/${cardId}/votes`)
        .transaction(currentVotes => {
          return Number.isInteger(currentVotes) ? currentVotes + 1 : 0;
        })
    }
  },

  voteDownCard: (columnId, cardId) => {
    if (columnId && cardId) {
      database()
        .ref(`/${this.boardId}/columns/${columnId}/cards/${cardId}/votes`)
        .transaction(currentVotes => {
          return Number.isInteger(currentVotes) ? currentVotes - 1 : 0;
        })
    }
  },

}
