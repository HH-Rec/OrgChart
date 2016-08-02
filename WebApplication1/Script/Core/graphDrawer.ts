module GraphDrawer {

    export class Point {
        public x;
        public y;

        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    export class Node {
        public id: string;
        public parent: Node;
        public children: Array<Node>;
        public backNode: Array<Node>;
        public level: number;
        public isStart: boolean;
        public center: Point;
        public text: string;
        public radius: number;

        constructor(id: string, parent: Node = null, children: Array<Node> = null, isStart: boolean = false, level: number = 0, text: string = "", radius: number = 0) {
            this.id = id;
            this.parent = parent;
            this.children = children;
            this.backNode = null;
            this.isStart = isStart;
            this.level = length;
            this.center = null;
            this.text = text;
            this.radius = radius;
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

    export interface IGraphScope extends ng.IScope {
        config: any;
        color: string;
        id: string;
    }
    export interface INodeConfig {
        id: string;
        text: string;
        isStart: string;
    }
    export interface IEdgeConfig {
        sourceId: string;
        destinationId: string;
        text: string;
    }

    export class Graph implements ng.IDirective {
        //#region Fields
        public restrict: string;
        public template: any;
        public replace: boolean;
        public scope: any;
        public link: ng.IDirectiveLinkFn;

        private url: string;
        private properties: any;
        private svg: any;
        private elementShadow : ng.IAugmentedJQuery;
        //#endregion

        constructor() {
            this.initialization();

            this.replace = true;
            this.scope = { config: "@?", color: "@?", id: "@" };
            this.restrict = "E";
            this.template = "<svg class=\"svg-content\" viewBox=\"0 0 " + this.properties.page.width + " " + this.properties.page.height + "\" preserveAspectRatio=\"xMinYMin meet\">" +
            "<defs><marker id=\"arrowmarker\" markerWidth=\"10\" markerHeight=\"10\" refx=\"0\" refy=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\" ><path d=\"M0,0 L0,6 L9,3 z\" fill=\"#f00\" /></marker></defs>" +
            "</svg>";
            this.link = this.linkFn;
        }

        public static factory() {
            return new Graph();
        }

        private initialization() {
            this.properties = {};

            this.properties.page = {};
            this.properties.page.width = 1366;
            this.properties.page.height = 768;
            this.properties.page.padding = {};
            this.properties.page.padding.left = 50;
            this.properties.page.padding.top = 150;

            this.properties.startNode = {};
            this.properties.startNode.radius = 30;
            this.properties.startNode.x = 50;

            this.properties.node = {};
            this.properties.node.radius = 30;
            this.properties.node.fill = Color.red(9);
            this.properties.node.opacity = 1;
            this.properties.node.stroke = Color.red(3);
            this.properties.node.strokewidth = 5;

            this.properties.distance = {};
            this.properties.distance.node = {};
            this.properties.distance.node.vertical = 10;
            this.properties.distance.node.horizontal = 70;
            this.properties.distance.graph = 10;

            this.properties.rtl = true;

            this.properties.font = {};
            this.properties.font.color = Color.white();
            this.properties.font.size = this.properties.node.radius / 3;

            this.properties.animation = {};
            this.properties.animation.duration = 1000;
            this.properties.animation.scale = 1.5;
        }

        private linkFn: ng.IDirectiveLinkFn = (scope: IGraphScope, element: ng.IAugmentedJQuery, attr: ng.IAttributes) => {
            this.elementShadow = element;
            this.svg = Snap("#" + scope.id);

            var nodeConfig = <INodeConfig>JSON.parse('[{"id":"100","text":"وصول","isStart":"true"},{"id":"101","text":"پرداخت","isStart":"false"},{"id":"132","text":"پرداخت","isStart":"false"},{"id":"102","text":"آماده","isStart":"false"},{"id":"103","text":"بانک","isStart":"false"},{"id":"104","text":"در حال پرداخت","isStart":"false"},{"id":"105","text":"-","isStart":"false"},{"id":"106","text":"آماده","isStart":"false"},{"id":"107","text":"رد شده","isStart":"false"},{"id":"108","text":"پذیرش","isStart":"false"},{"id":"109","text":"امروز","isStart":"false"},{"id":"110","text":"دیروز","isStart":"false"},{"id":"111","text":"فردا","isStart":"false"},{"id":"112","text":"آینده","isStart":"false"},{"id":"113","text":"حال","isStart":"false"},{"id":"120","text":"حال","isStart":"true"},{"id":"121","text":"حال","isStart":"false"}]');
            var edgeConfig = <IEdgeConfig>JSON.parse('[{"sourceId":"100","destinationId":"101","text":"-"},{"sourceId":"101","destinationId":"102","text":"-"},{"sourceId":"101","destinationId":"132","text":"-"},{"sourceId":"100","destinationId":"103","text":"-"},{"sourceId":"103","destinationId":"104","text":"-"},{"sourceId":"103","destinationId":"105","text":"-"},{"sourceId":"104","destinationId":"106","text":"-"},{"sourceId":"104","destinationId":"107","text":"-"},{"sourceId":"104","destinationId":"108","text":"-"},{"sourceId":"107","destinationId":"109","text":"-"},{"sourceId":"109","destinationId":"110","text":"-"},{"sourceId":"105","destinationId":"111","text":"-"},{"sourceId":"111","destinationId":"112","text":"-"},{"sourceId":"111","destinationId":"113","text":"-"},{"sourceId":"110","destinationId":"108","text":"-"},{"sourceId":"120","destinationId":"121","text":"-"}]');

            var graphDataStructure = this.constructGraph(nodeConfig, edgeConfig);
            this.localize(graphDataStructure);
            this.draw(graphDataStructure, edgeConfig);
        }

        private constructGraph(nodesConfig: any, edgesConfig: any): Array<Array<Node>> {
            var graph = new Array<Array<Node>>();

            var startNodesConfig = _.filter(nodesConfig,(nc: INodeConfig) => { return nc.isStart === "true"; });

            _.forEach(startNodesConfig,(startNodeConfig: INodeConfig) => {
                var childGraph = new Array<Node>();
                var queue = new Queue<Node>();

                //#region startNode
                var startNode = new Node(startNodeConfig.id);
                startNode.isStart = true;
                startNode.text = startNodeConfig.text;
                startNode.radius = this.properties.startNode.radius;
                //#endregion

                var visitedNode = new Array<string>();
                visitedNode.push(startNodeConfig.id);

                queue.push(startNode);
                while (queue.size() > 0) {
                    var node = queue.pop();

                    var childrenEdgeConfig = _.filter(edgesConfig,(c: IEdgeConfig) => { return c.sourceId === node.id; });
                    _.forEach(childrenEdgeConfig,(c: IEdgeConfig) => {
                        if (_.find(visitedNode,(vn) => { return vn === c.destinationId; }) === undefined) {
                            visitedNode.push(c.destinationId);
                            var newNodeConfig = <INodeConfig>_.find(nodesConfig,(n: INodeConfig) => { return n.id === c.destinationId; });

                            var newNode = new Node(newNodeConfig.id, node);
                            newNode.level = node.level + 1;
                            newNode.text = newNodeConfig.text;
                            newNode.radius = this.properties.node.radius;

                            if (node.children === null) node.children = new Array<Node>();

                            node.children.push(newNode);
                            queue.push(newNode);
                        }
                        else {
                            if (node.backNode === null) node.backNode = new Array<Node>();
                            var backNode = _.find(childGraph,(cg: Node) => { return cg.id === c.destinationId; });
                            node.backNode.push(backNode);
                        }
                    });

                    childGraph.push(node);
                }

                graph.push(childGraph);
            });

            return graph;
        }

        private localize(graphDataStructure: Array<Array<Node>>): void {
            var topPadding = this.properties.page.padding.top;

            _.forEach(graphDataStructure,(gds: Array<Node>) => {
                var space = this.recFuncClaculateAGraphSpace(gds[0]);

                var startNodeY = (space / 2) + topPadding;
                gds[0].center = new Point(this.properties.page.padding.left, startNodeY);
                this.recFuncLocalizeNode(gds[0]);

                topPadding += space;
            });
        }

        private recFuncClaculateAGraphSpace(start: Node): number {
            if (start.children === null) {
                return 2 * this.properties.node.radius;
            } else {
                var res = 0;

                _.forEach(start.children,(child) => { res += this.recFuncClaculateAGraphSpace(child); });
                res += this.properties.distance.node.vertical * (start.children.length - 1);

                return res;
            }
        }

        private recFuncLocalizeNode(start: Node): void {
            if (start.children === null) return;
            else {
                var sortedChildren = _.sortBy(start.children,(child: Node) => { return (child.children !== null) ? child.children.length : 0; }).reverse();

                var ay = 0, by = 0, index = 0;
                if (sortedChildren.length % 2 === 1) {
                    var space = this.recFuncClaculateAGraphSpace(sortedChildren[0]);
                    sortedChildren[0].center = new Point(start.center.x + 2 * this.properties.node.radius + this.properties.distance.node.horizontal, start.center.y);
                    ay = start.center.y - (space / 2 + this.properties.distance.node.vertical / 2);
                    by = start.center.y + (space / 2 + this.properties.distance.node.vertical / 2);
                    index = 1;
                } else {
                    ay = start.center.y;
                    by = start.center.y;
                }

                for (; index < sortedChildren.length; index++) {
                    var space = this.recFuncClaculateAGraphSpace(sortedChildren[index]);
                    if (index % 2 === 0) {
                        ay -= space / 2 + this.properties.distance.node.vertical / 2;
                        sortedChildren[index].center = new Point(start.center.x + 2 * this.properties.node.radius + this.properties.distance.node.horizontal, ay);
                    } else {
                        by += space / 2 + this.properties.distance.node.vertical / 2;
                        sortedChildren[index].center = new Point(start.center.x + 2 * this.properties.node.radius + this.properties.distance.node.horizontal, by);
                    }
                }

                _.forEach(start.children,(child) => { this.recFuncLocalizeNode(child); });
            }
        }

        private draw(graphDataStructure: Array<Array<Node>>, edgesConfig: any) {
            if (this.properties.rtl) {
                _.forEach(graphDataStructure,(graph: Array<Node>) => {
                    _.forEach(graph,(node: Node) => {
                        node.center.x = this.properties.page.width - node.center.x;
                    });
                });
            }

            this.drawEdges(graphDataStructure, edgesConfig);

            this.drawNodes(graphDataStructure, edgesConfig);
        }

        private drawNodes(graphDataStructure: Array<Array<Node>>, edgesConfig: any) {
            _.forEach(graphDataStructure,(graph: Array<Node>) => {
                _.forEach(graph,(node: Node) => {
                    //#region node
                    var cir = this.svg.circle(node.center.x, node.center.y, node.radius)
                        .attr({
                        fill: this.properties.node.fill,
                        opacity: this.properties.node.opacity,
                        strokeWidth: this.properties.node.strokewidth,
                        stroke: this.properties.node.stroke,
                        id: node.id
                    });
                    //#endregion

                    //#region nodeText
                    var tex = this.svg.text(node.center.x, node.center.y, node.text)
                        .attr({
                        "text-anchor": "middle",
                        fill: this.properties.font.color,
                        "font-size": this.properties.font.size + "px"
                    });
                    //#endregion

                    var g = this.svg.group(cir, tex)
                        .mouseover(() => {
                        g.animate({ transform: "s" + this.properties.animation.scale + "," + this.properties.animation.scale }, this.properties.animation.duration, mina.elastic);

                        //#region popover
                        this.elementShadow.find("#" + node.id).popover(<any>{
                            container: "body",
                            content() { return "<div>" + node.text + "</div>"; },
                            title: "عنوان",
                            placement: "top",
                            html: true,
                            trigger: "hover"
                        });
                        //#endregion
                    })
                        .mouseout(() => {
                        g.animate({ transform: "s1,1" }, this.properties.animation.duration, mina.bounce);
                    });
                });
            });
        }

        private drawEdge(node: Node, child: Node, edgesConfig: any) {
            var start = this.getCrossPointOfLineAndCircle(node, child);
            var end = this.getCrossPointOfLineAndCircle(child, node);

            var middle = this.getMiddle(start, end);

            var arrow = this.svg.polygon([0, 10, 4, 10, 2, 0, 0, 10]).attr({ fill: "black" }).transform("r90,s1.2");
            var marker = arrow.marker(0, 0, 10, 10, 0, 5);

            var lin1 = this.svg.line(start.x, start.y, end.x, end.y).
                attr({ stroke: "black", strokeWidth: 3 });

            var lin2 = this.svg.line(start.x, start.y, middle.x, middle.y).
                attr({ stroke: "black", strokeWidth: 3, markerEnd: marker });

            var text = (<IEdgeConfig>_.find(edgesConfig,(ec: IEdgeConfig) => { return ec.sourceId === node.id && ec.destinationId === child.id; })).text;

            var g = this.svg.group(lin1, lin2).attr({ id: node.id + child.id })
                .mouseover(() => {
                $("#" + node.id + child.id).popover({
                    container: "body",
                    content: function () { return "<div>" + text + "</div>"; },
                    title: "عنوان",
                    placement: "top",
                    html: true,
                    trigger: "hover"
                });
            });
        }
        private drawEdges(graphDataStructure: Array<Array<Node>>, edgesConfig: any) {
            _.forEach(graphDataStructure,(graph: Array<Node>) => {
                _.forEach(graph,(node: Node) => {
                    _.forEach(node.children,(child: Node) => {
                        this.drawEdge(node, child, edgesConfig);
                    });

                    _.forEach(node.backNode,(child: Node) => {
                        this.drawEdge(node, child, edgesConfig);
                    });
                });
            });
        }

        private getCrossPointOfLineAndCircle(start: Node, end: Node): Point {
            var theta = this.getTheta(start.center, end.center);

            var angle = 0;
            if (start.center.x > end.center.x) {
                if (start.center.y > end.center.y) angle = 180 - theta;
                else angle = 180 + theta;
            } else {
                if (start.center.y > end.center.y) angle = -theta;
                else angle = theta;
            }

            var res = this.polarToEuclidean(start.radius, angle);

            if (start.center.x > end.center.x) {
                res.x = start.center.x + res.x;
                if (start.center.y > end.center.y) {
                    res.y = start.center.y - res.y;
                } else {
                    res.y = start.center.y - res.y;
                }
            } else {
                res.x = start.center.x + res.x;
                if (start.center.y > end.center.y) {
                    res.y = start.center.y + res.y;
                } else {
                    res.y = start.center.y + res.y;
                }
            }

            return res;
        }

        private getTheta(start: Point, end: Point) {
            var radian = Math.asin(Math.abs(start.y - end.y) / this.getDistance(start, end));
            return this.radianToDegree(radian);
        }

        private getMiddle(p1: Point, p2: Point): Point {
            return new Point((p1.x + p2.x) / 2,(p1.y + p2.y) / 2);
        }
        private getDistance(p1: Point, p2: Point): number {
            return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        }
        private radianToDegree(radians: number): number {
            return radians * 180 / Math.PI;
        }
        private degreeToRadians(degrees: number): number {
            return degrees * Math.PI / 180;
        }
        private polarToEuclidean(radius: number, angleInDegree: number): Point {
            var angle = this.degreeToRadians(angleInDegree);
            return new Point(radius * Math.cos(angle), radius * Math.sin(angle));
        }
    }
}

(<any>angular).module("graph", []).directive("graph", GraphDrawer.Graph.factory);