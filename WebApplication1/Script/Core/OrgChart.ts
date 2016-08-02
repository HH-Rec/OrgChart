module TreeDrawer {

    export class Point {
        public x;
        public y;

        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    export class Queue<T> {
        private store: T[] = [];
        public push(val: T) {
            this.store.push(val);
        }
        public pop(): T {
            if (this.store.length === 0) return null;
            else return this.store.shift();
        }
        public size(): number {
            return this.store.length;
        }
    }

    export module Color {
        export function red(val?: number): string {
            var res: string = "#b71c1c";
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
        export function gray(val?: number): string {
            var res: string = "#bdbdbd";
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
        export function cyan(val?: number): string {
            var res: string = "#80deea";
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
        export function white(): string {
            return "rgb(255,255,255)";
        }
        export function orange(val?: number): string {
            var res = "#ff9800";
            switch (val) {
                case 5:
                    res = "#ff9800";
                    break;
            }
            return res;
        }
        export function brown(val?: number): string {
            var res = "#5d4037";
            switch (val) {
                case 7:
                    res = "#5d4037";
                    break;
            }
            return res;
        }
        export function indigo(val?: number): string {
            var res = "#3949ab";
            switch (val) {
                case 6:
                    res = "#3949ab";
                    break;
            }
            return res;
        }
    }

    export interface IOrgChartScope extends ng.IScope {
        id: string;
    }

    export class OrgChart implements ng.IDirective {
        //#region Fields
        public restrict: string;
        public template: any;
        public replace: boolean;
        public scope: any;
        public link: ng.IDirectiveLinkFn;

        private properties: any;
        private global: any;
        //#endregion

        constructor() {
            this.initialization();

            this.replace = true;
            this.scope = { id: "@" };
            this.restrict = "E";
            this.template = "<svg class=\"svg-content\" viewBox=\"0 0 " + this.properties.page.width + " " + this.properties.page.height + "\" preserveAspectRatio=\"xMinYMin meet\">" + this.getMarker() + "</svg>";
            this.link = this.linkFn;
        }

        public static factory() {
            return new OrgChart();
        }

        private getMarker(): string {
            return "<defs><marker id=\"arrowmarker\" markerWidth=\"10\" markerHeight=\"10\" refx=\"0\" refy=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\" ><path d=\"M0,0 L0,6 L9,3 z\" fill=\"#f00\" /></marker></defs>";
        }

        private initialization() {
            this.properties = {};

            this.properties.page = {};
            this.properties.page.width = 1024;
            this.properties.page.height = 768;
            this.properties.page.fill = "red";

            this.properties.node = {};
            this.properties.node.width = 100;
            this.properties.node.height = 50;
            this.properties.node.fill = "blue";


            this.global = {};
            this.global.svg = {};
            this.global.svg.snap = null;
            this.global.svg.id = null;
            this.global.svg.element = null;

            this.global.activeNode = null;
            this.global.lstNodes = new Array<Node>();
            this.global.activeEdge = {};
            this.global.activeEdge.start = null;
            this.global.activeEdge.end = null;
        }

        private linkFn: ng.IDirectiveLinkFn = (scope: IOrgChartScope, element: ng.IAugmentedJQuery, attr: ng.IAttributes) => {
            this.global.svg.id = scope.id;

            this.global.svg.snap = Snap("#" + this.global.svg.id);

            this.global.svg.element = document.getElementById(this.global.svg.id);

            this.page();
        }

        private page() {
            var self = this;

            var page = this.global.svg.snap.rect(0, 0, self.properties.page.width, self.properties.page.height).attr({ fill: self.properties.page.fill });

            page.click((arg) => {
                self.global.activeNode = null;  
            });

            page.dblclick((arg) => {
                var point = this.getClickedPosition(arg);

                var newNode = self.getNode(point.x, point.y);

                self.global.lstNodes.push(newNode);
                console.log("Add a new node : lstNodes.count = " + this.global.lstNodes.length);
            });

            $(document).on("keydown",(arg) => {
                console.log("Key press : " + arg.key);

                switch (arg.key) {
                    case "Delete":
                        {
                            self.deleteNode();
                        }
                    case "c":       //Connect
                    case "C":
                        {
                            break;
                        }
                    case "p":       //Pointer
                    case "P":
                        {
                            break;
                        }
                }
            });

            page.mousemove((arg) => {
                if (this.global.activeEdge.start !== null) {
                    debugger;
                }
            });
        }

        private getClickedPosition(arg): Point {
            var self = this;

            var point = self.global.svg.element.createSVGPoint();
            (<any>point).x = arg.clientX; (<any>point).y = arg.clientY;
            var loc = (<any>point).matrixTransform(self.global.svg.element.getScreenCTM().inverse());
            return new Point(loc.x, loc.y);
        }

        private getNode(x: number, y: number): any {
            var node = this.global.svg.snap.rect(x - this.properties.node.width / 2, y - this.properties.node.height / 2, this.properties.node.width, this.properties.node.height).attr({ fill: this.properties.node.fill });

            var g = this.global.svg.snap.group(node);

            var move = (dx, dy) => {
                var self = this;
                var point = self.global.svg.element.createSVGPoint();
                (<any>point).x = dx; (<any>point).y = dy;
                var loc = (<any>point).matrixTransform(self.global.svg.element.getScreenCTM().inverse());

                g.attr({ transform: g.data("origTransform") + (g.data("origTransform") ? "T" : "t") + [loc.x, loc.y] });
            }
            var start = () => { g.data("origTransform", g.transform().local); }
            var stop = () => { }
            g.drag(move, start, stop);

            this.global.activeNode = g;

            node.click(() => {
                this.global.activeNode = g;
            });

            g.mouseover(() => {
                debugger;
                //var circleTopLeft = this.global.svg.snap.circle(x - this.properties.node.width / 2, y - this.properties.node.height / 2, 10).attr({ fill: "yellow" });
                var circleTopCenter = this.global.svg.snap.circle(x, y - this.properties.node.height / 2, 10).attr({ fill: "yellow" });
                //var circleTopRight = this.global.svg.snap.circle(x + this.properties.node.width / 2, y - this.properties.node.height / 2, 10).attr({ fill: "yellow" });
                var circleRight = this.global.svg.snap.circle(x + this.properties.node.width / 2 - 10, y, 10).attr({ fill: "yellow" });


                circleRight.drag(move, start, stop);

                //var circleBottomRight = this.global.svg.snap.circle(x + this.properties.node.width / 2, y + this.properties.node.height / 2, 10).attr({ fill: "yellow" });
                var circleBottomCenter = this.global.svg.snap.circle(x, y + this.properties.node.height / 2, 10).attr({ fill: "yellow" });
                //var circleBottomLeft = this.global.svg.snap.circle(x - this.properties.node.width / 2, y + this.properties.node.height / 2, 10).attr({ fill: "yellow" });
                var circleLeft = this.global.svg.snap.circle(x - this.properties.node.width / 2 + 10, y, 10).attr({ fill: "yellow" });
                circleLeft.click((arg) => {
                    debugger;
                    this.global.activeEdge.start = this.getClickedPosition(arg);
                });

                g.add(circleTopCenter, circleRight, circleBottomCenter, circleLeft);
            });

            g.mouseout(() => {
                debugger;
                g[1].remove();
                g[1].remove();
                g[1].remove();
                g[1].remove();
            });

            g.mousemove(() => {
                if (this.global.activeEdge.start !== null) {
                    debugger;
                }});

            return g;
        }

        private deleteNode() {
            var self = this;

            if (self.global.activeNode !== null) {
                _.remove(self.global.lstNodes,(item) => { return item.id === this.global.activeNode.id; });
                self.global.activeNode.remove();
                self.global.activeNode = null;
                console.log("Remove active node : lstNodes.count = " + self.global.lstNodes.length);
            }
        }

        private drawToolbar() {
            var rect = this.global.svg.snap.circle(50, 50, 50);
            var pattern = this.global.svg.snap.image("Img/arrow.svg", 0, 0, 80, 80).pattern(0, 0, 80, 80);
            rect.attr({ fill: pattern, stroke: "black", strokeWidth: 1 });
        }
    }
}

(<any>angular).module("orgChart", []).directive("orgChart", TreeDrawer.OrgChart.factory); 