var s = Snap(500, 600);
var dragging = 0;
var handleGroup;

function addHandleFunc() {
    if (dragging == 0) {
        dragging = 1;
        var bb = this.getBBox();
        var handle = s.circle(bb.x + bb.width, bb.y, 10).attr({ class: 'handler', fill: "red" });
        handleGroup = s.group(this, handle);
        handleGroup.drag(move, start, stop);
    } else {
        dragging = 0;
        s.append(this);
        handleGroup.selectAll('handler').remove();
        handleGroup.remove();
    }
}


var myRect = s.rect(100, 100, 200, 100).attr({ fill: 'blue' });

myRect.dblclick(addHandleFunc);

var dmove = function (dx, dy) { if (dragging == 1) return; this.attr({ transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy] }); }
var dstart = function () { if (dragging == 1) return; this.data('origTransform', this.transform().local); }
var dstop = function () { if (dragging == 1) return; }

myRect.drag(dmove, dstart, dstop);



var start = function () { this.data('origTransform', this.transform().local); }
var move = function (dx, dy) {
    var scale = 1 + dx / 50;
    if (scale > 1.5) {
    scale = 1.5;
        return;
    } else if (scale < 0.5) {
        scale = 0.5;
        return;
    }
    this.attr({ transform: this.data('origTransform') + (this.data('origTransform') ? "S" : "s") + scale });
}
var stop = function () { }; 