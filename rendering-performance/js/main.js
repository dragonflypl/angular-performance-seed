window.measureCRP = function() {
    var t = window.performance.timing,
        interactive = t.domInteractive - t.domLoading,
        dcl = t.domContentLoadedEventStart - t.domLoading,
        complete = t.domComplete - t.domLoading;
    var stats = document.createElement('p');
    stats.textContent = 'interactive: ' + interactive + 'ms, ' +
        'dcl: ' + dcl + 'ms, complete: ' + complete + 'ms';
    document.body.appendChild(stats);
}

setTimeout(function() {
    const messages = Array.from(document.getElementsByClassName("message"));

    for(let i = 0; i < messages.length; i++) {
        const message = messages[i];
        const height = (message.clientHeight + 1)
        const width = (message.clientWidth + 1);
        message.style.height =  height + 'px';
        message.style.width = width + 'px';
    }
}, 5000);
