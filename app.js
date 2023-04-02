class TrackingSession {
    activeTouches = {}
    records = []
   
    screenScale = window.devicePixelRatio
    screenSize = [
        screen.width,
        screen.height
    ]
    handle(event, touches) {
        if (touches.length == 3) {
            this.export()
            activeTouches = {}
            records = []
            return
        }
        for (let i = 0; i < touches.length; i++) {
            const touch = touches.item(i)
            switch (event) {
                case "start":
                        const id = Math.floor(1e8 * Math.random()) + ""
                        this.activeTouches[touch.identifier] = id
                        this.records.push(new TouchRecord(event, touch, id))
                    break
                case "move":
                    this.records.push(new TouchRecord(event, touch, this.activeTouches[touch.identifier]))
                    break
                case "end":
                    this.records.push(new TouchRecord(event, touch, this.activeTouches[touch.identifier]))
                    delete this.activeTouches[touch.identifier]
                    break
            }
        }
    }

    export() {
        const name = "TouchTracker Export"
        const output = {
            name: name ,
            startTime: this.records[0].timestamp,
            duration: this.records[this.records.length-1].timestamp - this.records[0].timestamp,
            records: this.records,
            screenSize: this.screenSize,
            screenScale: this.screenScale
        }
        download(JSON.stringify(output, null, 2), name + " " + new Date().toLocaleString(), "application/json")
    }
}

class TouchRecord {
    touchId
    event
    position
    force
    timestamp

    constructor(event, touch, id) {
        this.touchId = id
        this.event = event
        const topOffset = screen.height - window.innerHeight
        this.position = [
            touch.screenX,
            touch.screenY + topOffset
        ]
        this.force = touch.force
        this.timestamp = new Date().getTime() / 1000
    }
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}


const session = new TrackingSession()

document.body.addEventListener('touchstart', function(e){
    e.preventDefault()
    session.handle("start", e.changedTouches)
});
document.body.addEventListener('touchmove', function(e){
    e.preventDefault()
    session.handle("move", e.changedTouches)
}, { passive: false });
document.body.addEventListener('touchend', function(e){
    e.preventDefault()
    console.log(e.changedTouches)
    session.handle("end", e.changedTouches)
});
document.body.addEventListener('touchcancel', function(e){
    e.preventDefault()
    session.handle("end", e.changedTouches)
});

