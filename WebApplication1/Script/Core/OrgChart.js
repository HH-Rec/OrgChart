var TreeDrawer;
(function (TreeDrawer) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    })();
    TreeDrawer.Point = Point;
    var Queue = (function () {
        function Queue() {
            this.store = [];
        }
        Queue.prototype.push = function (val) {
            this.store.push(val);
        };
        Queue.prototype.pop = function () {
            if (this.store.length === 0)
                return null;
            else
                return this.store.shift();
        };
        Queue.prototype.size = function () {
            return this.store.length;
        };
        return Queue;
    })();
    TreeDrawer.Queue = Queue;
    var Color;
    (function (Color) {
        function red(val) {
            var res = "#b71c1c";
            switch (val) {
                case 3:
                    res = "#e57373";
                    break;
                case 8:
                    res = "#c62828";
                    break;
                case 9:
                    res = "#b71c1c";
                    break;
            }
            return res;
        }
        Color.red = red;
        function gray(val) {
            var res = "#bdbdbd";
            switch (val) {
                case 0:
                    res = "#fafafa";
                    break;
                case 4:
                    res = "#bdbdbd";
                    break;
                case 7:
                    res = "#616161";
                    break;
                case 8:
                    res = "#424242";
                    break;
                case 9:
                    res = "#212121";
                    break;
            }
            return res;
        }
        Color.gray = gray;
        function cyan(val) {
            var res = "#80deea";
            switch (val) {
                case 0:
                    res = "#e0f7fa";
                    break;
                case 1:
                    res = "#b2ebf2";
                    break;
                case 2:
                    res = "#80deea";
                    break;
                case 4:
                    res = "#26c6da";
                    break;
                case 5:
                    res = "#00bcd4";
                    break;
                case 8:
                    res = "#00838f";
                    break;
            }
            return res;
        }
        Color.cyan = cyan;
        function white() {
            return "rgb(255,255,255)";
        }
        Color.white = white;
        function orange(val) {
            var res = "#ff9800";
            switch (val) {
                case 5:
                    res = "#ff9800";
                    break;
            }
            return res;
        }
        Color.orange = orange;
        function brown(val) {
            var res = "#5d4037";
            switch (val) {
                case 7:
                    res = "#5d4037";
                    break;
            }
            return res;
        }
        Color.brown = brown;
        function indigo(val) {
            var res = "#3949ab";
            switch (val) {
                case 6:
                    res = "#3949ab";
                    break;
            }
            return res;
        }
        Color.indigo = indigo;
    })(Color = TreeDrawer.Color || (TreeDrawer.Color = {}));
    var OrgChart = (function () {
        //#endregion
        function OrgChart() {
            var _this = this;
            this.linkFn = function (scope, element, attr) {
                _this.global.svg.id = scope.id;
                _this.global.svg.snap = Snap("#" + _this.global.svg.id);
                _this.global.svg.element = document.getElementById(_this.global.svg.id);
                _this.page();
            };
            this.initialization();
            this.replace = true;
            this.scope = { id: "@" };
            this.restrict = "E";
            this.template = "<svg class=\"svg-content\" viewBox=\"0 0 " + this.properties.page.width + " " + this.properties.page.height + "\" preserveAspectRatio=\"xMinYMin meet\">" + this.getMarker() + "</svg>";
            this.link = this.linkFn;
        }
        OrgChart.factory = function () {
            return new OrgChart();
        };
        OrgChart.prototype.getMarker = function () {
            return "<defs><marker id=\"arrowmarker\" markerWidth=\"10\" markerHeight=\"10\" refx=\"0\" refy=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\" ><path d=\"M0,0 L0,6 L9,3 z\" fill=\"#f00\" /></marker></defs>";
        };
        OrgChart.prototype.initialization = function () {
            this.properties = {};
            this.properties.page = {};
            this.properties.page.width = 1024;
            this.properties.page.height = 768;
            this.properties.page.fill = "red";
            this.properties.node = {};
            this.properties.node.width = 200;
            this.properties.node.height = 100;
            this.properties.node.fill = "blue";
            this.global = {};
            this.global.svg = {};
            this.global.svg.snap = null;
            this.global.svg.id = null;
            this.global.svg.element = null;
            this.global.activeNode = null;
            this.global.lstNodes = new Array();
            this.global.activeEdge = {};
            this.global.activeEdge.start = null;
            this.global.activeEdge.end = null;
        };
        OrgChart.prototype.page = function () {
            var _this = this;
            var self = this;
            var page = this.global.svg.snap.rect(0, 0, self.properties.page.width, self.properties.page.height).attr({ fill: self.properties.page.fill });
            page.click(function (arg) {
                self.global.activeNode = null;
            });
            page.dblclick(function (arg) {
                var point = _this.getClickedPosition(arg);
                var newNode = self.getNode(point.x, point.y);
                self.global.lstNodes.push(newNode);
                console.log("Add a new node : lstNodes.count = " + _this.global.lstNodes.length);
            });
            $(document).on("keydown", function (arg) {
                console.log("Key press : " + arg.key);
                switch (arg.key) {
                    case "Delete":
                        {
                            self.deleteNode();
                        }
                    case "c":
                    case "C":
                        {
                            break;
                        }
                    case "p":
                    case "P":
                        {
                            break;
                        }
                }
            });
            page.mousemove(function (arg) {
                if (_this.global.activeEdge.start !== null) {
                    debugger;
                }
            });
        };
        OrgChart.prototype.getClickedPosition = function (arg) {
            var self = this;
            var point = self.global.svg.element.createSVGPoint();
            point.x = arg.clientX;
            point.y = arg.clientY;
            var loc = point.matrixTransform(self.global.svg.element.getScreenCTM().inverse());
            return new Point(loc.x, loc.y);
        };
        OrgChart.prototype.getNode = function (x, y) {
            var _this = this;
            var g;
            var move = function (dx, dy) {
                var self = _this;
                var point = self.global.svg.element.createSVGPoint();
                point.x = dx;
                point.y = dy;
                var loc = point.matrixTransform(self.global.svg.element.getScreenCTM().inverse());
                g.attr({ transform: g.data("origTransform") + (g.data("origTransform") ? "T" : "t") + [loc.x, loc.y] });
            };
            var start = function () {
                g.data("origTransform", g.transform().local);
            };
            var stop = function () {
            };
            var node = this.global.svg.snap.rect(x - this.properties.node.width / 2, y - this.properties.node.height / 2, this.properties.node.width, this.properties.node.height).attr({ fill: this.properties.node.fill });
            //var circleTopLeft = this.global.svg.snap.circle(x - this.properties.node.width / 2, y - this.properties.node.height / 2, 10).attr({ fill: "yellow" });
            //var circleTopCenter = this.global.svg.snap.circle(x, y - this.properties.node.height / 2, 10).attr({ fill: "yellow" });
            //var circleTopRight = this.global.svg.snap.circle(x + this.properties.node.width / 2, y - this.properties.node.height / 2, 10).attr({ fill: "yellow" });
            var circleRight = this.global.svg.snap.circle(x + this.properties.node.width / 2 - 30, y, 10).attr({ fill: "yellow" });
            circleRight.drag(move, start, stop);
            //var circleBottomRight = this.global.svg.snap.circle(x + this.properties.node.width / 2, y + this.properties.node.height / 2, 10).attr({ fill: "yellow" });
            //var circleBottomCenter = this.global.svg.snap.circle(x, y + this.properties.node.height / 2, 10).attr({ fill: "yellow" });
            //var circleBottomLeft = this.global.svg.snap.circle(x - this.properties.node.width / 2, y + this.properties.node.height / 2, 10).attr({ fill: "yellow" });
            var circleLeft = this.global.svg.snap.circle(x - this.properties.node.width / 2 + 30, y, 10).attr({ fill: "yellow" });
            circleLeft.mouseover(function (arg) {
            });
            circleLeft.mouseover(function (arg) {
            });
            circleLeft.click(function (arg) {
                circleLeft.drag(move, start, stop);
                _this.global.activeEdge.start = _this.getClickedPosition(arg);
            });
            g = this.global.svg.snap.group(node, circleRight, circleLeft);
            g.drag(move, start, stop);
            this.global.activeNode = g;
            node.click(function () {
                _this.global.activeNode = g;
            });
            g.mouseover(function () {
            });
            g.mouseout(function () {
            });
            g.mousemove(function () {
                if (_this.global.activeEdge.start !== null) {
                }
            });
            return g;
        };
        OrgChart.prototype.deleteNode = function () {
            var _this = this;
            var self = this;
            if (self.global.activeNode !== null) {
                _.remove(self.global.lstNodes, function (item) {
                    return item.id === _this.global.activeNode.id;
                });
                self.global.activeNode.remove();
                self.global.activeNode = null;
                console.log("Remove active node : lstNodes.count = " + self.global.lstNodes.length);
            }
        };
        OrgChart.prototype.drawToolbar = function () {
            var rect = this.global.svg.snap.circle(50, 50, 50);
            var pattern = this.global.svg.snap.image("Img/arrow.svg", 0, 0, 80, 80).pattern(0, 0, 80, 80);
            rect.attr({ fill: pattern, stroke: "black", strokeWidth: 1 });
        };
        return OrgChart;
    })();
    TreeDrawer.OrgChart = OrgChart;
})(TreeDrawer || (TreeDrawer = {}));
angular.module("orgChart", []).directive("orgChart", TreeDrawer.OrgChart.factory);
//# sourceMappingURL=OrgChart.js.map