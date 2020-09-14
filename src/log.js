
let mentioned = false;
// --------------------------------------------------------
function log(msg, depth=0) {
    if (mentioned) {
        console.log('')
        mentioned = false
    }
	console.log('' + '    '.repeat(depth) + msg)
}
// --------------------------------------------------------
function mention(msg) {
    process.stdout.write(msg)
    mentioned = true
}
// --------------------------------------------------------
module.exports = {
    log, mention
}
