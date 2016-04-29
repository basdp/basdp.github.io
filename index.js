var macplus = require('pcejs-macplus')
var utils = require('pcejs-util')
 
// add a loading progress bar. not required, but good ux 
var loadingStatus = utils.loadingStatus(document.querySelector('.pcejs-loading-status'))
 
macplus({
  'arguments': ['-c','pce-config.cfg','-r'],
  autoloadFiles: [
    'macplus-pcex.rom',
    'mac-plus.rom',
	'mac-plus-pram.dat',
	'hd1.qed',
    'fd1.image',
    'pce-config.cfg',
  ],
  print: console.log.bind(console),
  printErr: console.warn.bind(console),
  canvas: document.querySelector('.pcejs-canvas'),
  monitorRunDependencies: function (remainingDependencies) {
    loadingStatus.update(remainingDependencies)
  },
})

document.getElementById('macstartup').play();