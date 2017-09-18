'use babel'

const { nativeImage, TouchBar } = require('remote')
const path = require('path')
const {
  TouchBarButton,
  TouchBarLabel,
  TouchBarPopover,
  TouchBarSegmentedControl,
  TouchBarSpacer,
} = TouchBar

const gitIcon = nativeImage.createFromPath(
                  path.join(__dirname, '../assets/git-icon-white.png')
                ).resize({ width: 16, height: 16 })

const searchIcon = nativeImage.createFromPath(
                     path.join(__dirname, '../assets/search.png')
                   ).resize({ width: 20, height: 20 })

const commandIcon = nativeImage.createFromPath(
                      path.join(__dirname, '../assets/command.png')
                    ).resize({ width: 16, height: 16 })


const mainButtons = {
  'palette': new TouchBarButton({
    icon: commandIcon,
    iconPosition: 'overlay',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'command-palette:toggle')
    }
  }),
  'fileSearch': new TouchBarButton({
    icon: searchIcon,
    iconPosition: 'overlay',
    click: () => {
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'fuzzy-finder:toggle-file-finder')
    }
  }),
  'spacer': new TouchBarSpacer({size: 'small'}),
  'linter': new TouchBarSegmentedControl({
    mode: 'buttons',
    segmentStyle: 'rounded',
    segments: [{
      label: 'Lint',
    },{
      label: 'Fix',
    },{
      label: 'Toggle',
    }],
    change: index => {
      commands = [
        'linter:lint',
        'linter-eslint:fix-file',
        'linter-ui-default:toggle-panel',
        'linter-ui-default:previous',
        'linter-ui-default:next',
      ]
      atom.commands.dispatch(atom.views.getView(atom.workspace), commands[index])
    }
  }),
  'linterControls': new TouchBarSegmentedControl({
    mode: 'buttons',
    segmentStyle: 'rounded',
    segments: [{
      label: '<',
    },{
      label: '>',
    }],
    change: index => {
      commands = [
        'linter-ui-default:previous',
        'linter-ui-default:next',
      ]
      atom.commands.dispatch(atom.views.getView(atom.workspace), commands[index])
    }
  }),
  'git': new TouchBarButton({
    label: 'Git',
    icon: gitIcon,
    iconPosition: 'left',
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

export const showTouchBar = () => {
  atom.getCurrentWindow().setTouchBar(new TouchBar(Object.values(mainButtons)))
}
