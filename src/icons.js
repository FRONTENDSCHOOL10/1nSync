/* prettier-ignore */
const icons = {
  bottles: { name: 'bottles', width: 24, height: 29, color: '#062648' },
  statistics: { name: 'statistics', width: 30, height: null, color: '#062648' },
  quote: { name: 'quotes', width: 25, height: null, color: '#2D7EB9' },
  quote_selected: { name: 'quotes',width: 25,height: null,color: '#FFFFFF' },
  video: { name: 'video', width: 26, height: 17, color: '#2D7EB9' },
  video_selected: { name: 'video', width: 26, height: 17, color: '#FFFFFF' },
  book: { name: 'book', width: 26, height: 24, color: '#2D7EB9' },
  book_selected: { name: 'book', width: 26, height: 24, color: '#FFFFFF' },
  music: { name: 'music', width: 17, height: 25, color: '#2D7EB9' },
  music_selected: { name: 'music', width: 17, height: 25, color: '#FFFFFF' },
  bottle_horizental: { name: 'bottle_horizental', width: 122, height: 41, color: '#4651B4' },
  bottle_horizental_pc: { name: 'bottle_horizental', width: 190, height: 64, color: '#4651B4' },
  question: { name: 'question', width: 19, height: null, color: '#062648' },
  headset: { name: 'headset', width: 19, height: null, color: '#062648' },
  announcement: { name: 'announcement', width: 19, height: 17, color: '#062648' },
  logout: { name: 'logout', width: 19, height: null, color: '#062648' },
  list: { name: 'list', width: 17, height: null, color: '#062648' },
  information: { name: 'information', width: 18, height: 22, color: '#062648' },
  version: { name: 'version', width: 22, height: 17, color: '#062648' },
  camera: { name: 'camera', width: 39, height: 33, color: '#fff' },
  leftDir: { name: 'leftDir', width: 10, height: 18, color: '#4F4F4F' },
  rightDir: { name: 'rightDir', width: 10, height: 18, color: '#4F4F4F' },
  nextArrow: {name: 'nextArrow', width: 9, height: 16, color: '#A7A7A7'},
  plus: { name: 'plus', width: 33, height: null, color: '#fff' },
  plus_pc: { name: 'plus', width: 61, height: null, color: '#56483B' },
  goBack_blue: { name: 'goBack', width: 17, height: 24, color: '#2D7EB8' },
  goBack_white: { name: 'goBack', width: 17, height: 24, color: '#FFFFFF' },
  goBack_black: { name: 'goBack', width: 17, height: 24, color: '#2E2E2E' },
  navBottle: { name: 'navBottle', width: 32, height: 48, color: '#56483B80' },
  navBottle_selected: { name: 'navBottle', width: 32, height: 48, color: '#56483B' },
  navBottle_darkBg: { name: 'navBottle', width: 32, height: 48, color: '#fff' },
  navBottle_darkBg_selected: { name: 'navBottle', width: 32, height: 48, color: '#FBE517'},
  navMusic: { name: 'navMusic', width: 42, height: 46, color: '#56483B80' },
  navMusic_selected: { name: 'navMusic', width: 42, height: 46, color: '#56483B' },
  navMusic_darkBg: { name: 'navMusic', width: 42, height: 46, color: '#fff' },
  navMusic_darkBg_selected: { name: 'navMusic', width: 42, height: 46, color: '#FBE517'},
  navPerson: { name: 'navPerson', width: 39, height: 41, color: '#56483B80' },
  navPerson_selected: { name: 'navPerson', width: 39, height: 41, color: '#56483B' },
  navPerson_darkBg: { name: 'navPerson', width: 39, height: 41, color: '#fff' },
  navPerson_darkBg_selected: { name: 'navPerson', width: 39, height: 41, color: '#FBE517'},
  check: { name: 'check', width: 27, height: 20, color: '#2D7EB8' },
  leftArrow: { name: 'leftArrow', width: 25, height: 42, color: '#ffffff' },
  rightArrow: { name: 'rightArrow', width: 25, height: 42, color: '#ffffff' },
  musicPlay: { name: 'musicPlay', width: 50, height: 50, color: '#1771B2' },
  go: { name: 'go', width: 13, height: 15, color: '#1771B2' },
  
  remove: { name: 'remove', width: 18, height: 18, color: '#1F6496' },
  step_forward: { name: 'step_forward', width: 15, height: 21, color: '#2E2E2E' },
  step_backward: { name: 'step_backward', width: 15, height: 21, color: '#2E2E2E' },
  play: { name: 'pause', width: 16, height: 19, color: '#2E2E2E' },
  heart: { name: 'heart', width: 22, height: 20, color: '#2E2E2E' },
  pause: { name: 'play', width: 13, height: 20, color: '#2E2E2E' },
  musiclist: { name: 'musiclist', width: 20, height: 19, color: '#2E2E2E' },
  search: { name: 'search', width: 22, height: 22, color: '#1771B2' },

  shell_angry: { name: 'shell_angry', width: 33, height: null, color: null },
  shell_glad: { name: 'shell_glad', width: 33, height: null, color: null },
  shell_happy: { name: 'shell_happy', width: 33, height: null, color: null },
  shell_panic: { name: 'shell_panic', width: 33, height: null, color: null },
  shell_anxiety: { name: 'shell_anxiety', width: 33, height: null, color: null },
  shell_sad: { name: 'shell_sad', width: 33, height: null, color: null },
  shell_normal: { name: 'shell_normal', width: 33, height: null, color: null },
  shell_tired: { name: 'shell_tired', width: 33, height: null, color: null },

  shell_angry_block: { name: 'shell_angry_block', width: 33, height: null, color: null },
  shell_glad_block: { name: 'shell_glad_block', width: 33, height: null, color: null },
  shell_happy_block: { name: 'shell_happy_block', width: 33, height: null, color: null },
  shell_panic_block: { name: 'shell_panic_block', width: 33, height: null,color: null },
  shell_anxiety_block: { name: 'shell_anxiety_block', width: 33, height: null, color: null },
  shell_sad_block: { name: 'shell_sad_block', width: 33, height: null, color: null },
  shell_normal_block: { name: 'shell_normal_block', width: 33, height: null, color: null },
  shell_tired_block: { name: 'shell_tired_block', width: 33, height: null, color: null },

  shell_angry_hovered: { name: 'shell_angry_hovered', width: 33, height: null, color: null },
  shell_glad_hovered: { name: 'shell_glad_hovered', width: 33, height: null, color: null },
  shell_happy_hovered: { name: 'shell_happy_hovered', width: 33, height: null, color: null },
  shell_panic_hovered: { name: 'shell_panic_hovered', width: 33, height: null, color: null },
  shell_anxiety_hovered: { name: 'shell_anxiety_hovered', width: 33, height: null, color: null,
  },
  shell_sad_hovered: { name: 'shell_sad_hovered', width: 33, height: null, color: null },
  shell_normal_hovered: { name: 'shell_normal_hovered', width: 33, height: null, color: null },
  shell_tired_hovered: { name: 'shell_tired_hovered', width: 33, height: null, color: null }
};

export default icons;
