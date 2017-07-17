'use babel'

import AtomTouchbarView from './atom-touchbar-view'
import { CompositeDisposable } from 'atom'
import { showTouchBar } from './touchbar-buttons'
export default {

  atomTouchbarView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    atom.workspace.onDidOpen(showTouchBar)
  },

  deactivate() {
  },

  serialize() {
  }
}
