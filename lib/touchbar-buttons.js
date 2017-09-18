"use babel";

const { TouchBar } = require("remote");
const { TouchBarSegmentedControl, TouchBarButton, TouchBarSpacer } = TouchBar;

const buttons = [
  new TouchBarSegmentedControl({
    mode: "buttons",
    segments: [
      {
        label: "Command"
      },
      {
        label: "Open File"
      }
    ],
    change: selectedIndex => {
      let command;
      if (selectedIndex === 0) {
        command = "command-palette:toggle";
      } else if (selectedIndex === 1) {
        command = "fuzzy-finder:toggle-file-finder";
      }

      if (command) {
        atom.commands.dispatch(atom.views.getView(atom.workspace), command);
      }
    }
  }),
  new TouchBarSpacer(),
  new TouchBarSegmentedControl({
    mode: "buttons",
    segments: [
      {
        label: "Prettier"
      },
      {
        label: "Git"
      }
    ],
    change: selectedIndex => {
      let command;
      if (selectedIndex === 0) {
        command = "prettier:format";
      } else if (selectedIndex === 1) {
        command = "github:toggle-git-tab";
      }

      if (command) {
        atom.commands.dispatch(atom.views.getView(atom.workspace), command);
      }
    }
  }),
  new TouchBarSpacer(),
  new TouchBarSegmentedControl({
    mode: "buttons",
    segments: [
      { label: "Lint" },
      { label: "Fix" },
      { label: "Toggle" },
      { label: "<" },
      { label: ">" }
    ],
    change: selectedIndex => {
      let command;
      if (selectedIndex === 0) {
        command = "linter:lint";
      } else if (selectedIndex === 1) {
        command = "linter-eslint:fix-file";
      } else if (selectedIndex === 2) {
        command = "linter-ui-default:toggle-panel";
      } else if (selectedIndex === 3) {
        command = "linter-ui-default:previous";
      } else if (selectedIndex === 4) {
        command = "linter-ui-default:next";
      }

      if (command) {
        atom.commands.dispatch(atom.views.getView(atom.workspace), command);
      }
    }
  }),
  new TouchBarSpacer(),
  new TouchBarButton({
    label: "//",
    click: () => {
      atom.workspace
        .getActiveTextEditor()
        .selections.forEach(s => s.toggleLineComments());
    }
  })
];

export const showTouchBar = () => {
  atom.getCurrentWindow().setTouchBar(new TouchBar(buttons));
};
