'use babel'

const { TouchBar } = require('remote')
const { TouchBarButton, TouchBarLabel, TouchBarSpacer, TouchBarPopover } = TouchBar

const linterButtons = [
  new TouchBarLabel({ label: 'Linter: ' }),
  new TouchBarSpacer({ size: 'small' }),
  new TouchBarButton({
    label: 'Run',
    backgroundColor: '#d11900',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'linter:lint')
    }
  }),
  new TouchBarButton({
    label: 'Fix',
    backgroundColor: '#1ed045',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'linter-eslint:fix-file')
    }
  }),
  new TouchBarButton({
    label: 'Toggle',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'linter-ui-default:toggle-panel')
    }
  }),
  new TouchBarSpacer({ size: 'small' }),
  new TouchBarButton({
    label: '<',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'linter-ui-default:previous-in-current-file')
    }
  }),
  new TouchBarButton({
    label: '>',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'linter-ui-default:next-in-current-file')
    }
  }),
  new TouchBarSpacer({ size: 'small' }),
  new TouchBarButton({
    label: '<<',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'linter-ui-default:previous')
    }
  }),
  new TouchBarButton({
    label: '>>',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace.getActiveTextEditor()), 'linter-ui-default:next')
    }
  }),
]

const searchButtons = [
  new TouchBarButton({
    label: 'X',
    click: () => {
      atom.getCurrentWindow().setTouchBar(new TouchBar(Object.values(mainButtons)))
    }
  }),
  new TouchBarSpacer({size: 'large'}),
  new TouchBarLabel({
    label: 'Search in: '
  }),
  new TouchBarButton({
    label: 'Project',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'fuzzy-finder:toggle-file-finder')
    }
  }),
  new TouchBarButton({
    label: 'Open files',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'fuzzy-finder:toggle-buffer-finder')
    }
  })
]

const mainButtons = {
  'commandPalette': new TouchBarButton({
    label: '🎨',
    backgroundColor: '#ffef81',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'command-palette:toggle')
    }
  }),
  'fileFinder': new TouchBarButton({
    label: '🔍',
    click: () => {
      showSearchBar()
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'fuzzy-finder:toggle-file-finder')
    }
  }),
  'spacer': new TouchBarSpacer({size: 'small'}),
  'lint': new TouchBarPopover({
    label: 'Linter',
    showCloseButton: true,
    items: new TouchBar(linterButtons)
  }),
  'git': new TouchBarButton({
    label: 'Git',
    backgroundColor: '#679de4',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'github:toggle-git-tab')
    }
  }),
  'spacer2': new TouchBarSpacer({size: 'small'}),
  'comment': new TouchBarButton({
    label: '//',
    click: () => {
      atom.workspace.getActiveTextEditor().selections.forEach(s => s.toggleLineComments())
    }
  })
}

const showSearchBar = () => {
  atom.getCurrentWindow().setTouchBar(new TouchBar([
    mainButtons['commandPalette'],
    ...searchButtons
  ]))
}

export const showTouchBar = () => {
  atom.getCurrentWindow().setTouchBar(new TouchBar(Object.values(mainButtons)))
}
