module Utility {
    export module Geometry {
        export class Point {
            public x;
            public y;

            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        }

        export class Circle {
            public center: Point;
            public radius: number;

            constructor(center?: Point, radius?: number);
            constructor(center: Point, radius: number) {
                this.center = center;
                this.radius = radius;
            }
        }
    }

    export module Convertor {
        export function enumToString(enumType: any, arg: any): string {
            var res: string = enumType[arg];
            return res;
        }

        export function degreeToRadians(degrees: number): number {
            return degrees * Math.PI / 180;
        }

        export function radianToDegree(radians: number): number {
            return radians * 180 / Math.PI;
        }

        export function polarToEuclidean(radius: number, angleInDegree: number): Geometry.Point {
            var angle = degreeToRadians(angleInDegree);
            var res = new Geometry.Point(radius * Math.cos(angle), radius * Math.sin(angle));
            return res;
        }

        export function hslToRgb(h, s, l) {
            var r, g, b, m, c, x;

            if (!isFinite(h)) h = 0;
            if (!isFinite(s)) s = 0;
            if (!isFinite(l)) l = 0;

            h /= 60;
            if (h < 0) h = 6 - (-h % 6);
            h %= 6;

            s = Math.max(0, Math.min(1, s / 100));
            l = Math.max(0, Math.min(1, l / 100));

            c = (1 - Math.abs((2 * l) - 1)) * s;
            x = c * (1 - Math.abs((h % 2) - 1));

            if (h < 1) {
                r = c;
                g = x;
                b = 0;
            } else if (h < 2) {
                r = x;
                g = c;
                b = 0;
            } else if (h < 3) {
                r = 0;
                g = c;
                b = x;
            } else if (h < 4) {
                r = 0;
                g = x;
                b = c;
            } else if (h < 5) {
                r = x;
                g = 0;
                b = c;
            } else {
                r = c;
                g = 0;
                b = x;
            }

            m = l - c / 2;
            r = Math.round((r + m) * 255);
            g = Math.round((g + m) * 255);
            b = Math.round((b + m) * 255);

            return [r, g, b];
        }
    }

    export function notNanNullEmpty(arg): boolean {
        return !_.isNull(arg) && !_.isNaN(arg) && !_.isUndefined(arg);
    }

    export class String {
        public static seprateString(value: string, seprate: number = 3, seprator: string = ","): string {
            var res: string = "";
            if (notNanNullEmpty(value)) {
                var str = value;
                while (str.length > 0) {
                    if (str.length <= seprate) {
                        res += str;
                        break;
                    } else {
                        res += str.slice(0, seprate) + seprator;
                        str = str.slice(seprate);
                    }
                }
            }
            return res;
        }
    }

    export module Typescript {
        export module Directive {

            export enum EventType {
                NgBlur,
                NgChange,
                NgClick,
                NgCopy,
                NgCut,
                NgDblclick,
                NgFocus,
                NgKeydown,
                NgKeypress,
                NgKeyup,
                NgMousedown,
                NgMouseenter,
                NgMouseleave,
                NgMousemove,
                NgMouseover,
                NgMouseup,
                NgPaste
            }

            export enum RestrictType {
                E,  //for Element name
                A,  //for Attribute
                C,  //for Class
                M,  //for Comment
                AE, //for Attribute and Element
                AEC,//for Attribute and Element and class
            }

            export interface IEvent {
                addEvent(type: EventType): void;
            }
        }
    }

    export enum IranStates {
        Gilan, Zanjan, Bushehr, Tehran, Hormozgan, Golestan, Ilam, Alborz, WestAzarbaijan, KohgiluyehAndBuyerAhmad, SouthKhorasan, Kordestan, OtherCountries, Ardebil, Fars, Mazandaran, Kermanshah, Qazvin, Yazd, RazaviKhorasan, Qom, SistanAndBaluchestan, NorthKhorasan, ChaharMahallAndBakhtiari, Esfahan, EastAzarbaijan, Khuzestan, Kerman, Semnan, Markazi, Lorestan, Hamadan
    }

    export function iranStatesFarsi() {
        var enumration = [];
        enumration[IranStates.Gilan] = "گیلان";
        enumration[IranStates.Zanjan] = "زنجان";
        enumration[IranStates.Bushehr] = "بوشهر";
        enumration[IranStates.Tehran] = "تهران";
        enumration[IranStates.Hormozgan] = "هرمزگان";
        enumration[IranStates.Golestan] = "گلستان";
        enumration[IranStates.Ilam] = "ایلام";
        enumration[IranStates.Alborz] = "البرز";
        enumration[IranStates.WestAzarbaijan] = "آذربایجان غربی";
        enumration[IranStates.KohgiluyehAndBuyerAhmad] = "کهکیلویه و بویر احمد";
        enumration[IranStates.SouthKhorasan] = "خراسان جنوبی";
        enumration[IranStates.Kordestan] = "کردستان";
        enumration[IranStates.Ardebil] = "اردبیل";
        enumration[IranStates.Fars] = "فارس";
        enumration[IranStates.Mazandaran] = "مازندران";
        enumration[IranStates.Kermanshah] = "کرمانشاه";
        enumration[IranStates.Yazd] = "یزد";
        enumration[IranStates.RazaviKhorasan] = "خراسان رضوی";
        enumration[IranStates.Qom] = "قم";
        enumration[IranStates.SistanAndBaluchestan] = "سیستان و بلوچستان";
        enumration[IranStates.NorthKhorasan] = "خراسان شمالی";
        enumration[IranStates.ChaharMahallAndBakhtiari] = "چهار محال بختیاری";
        enumration[IranStates.Esfahan] = "اصفهان";
        enumration[IranStates.EastAzarbaijan] = "آذربایجان شرقی";
        enumration[IranStates.Khuzestan] = "خوزستان";
        enumration[IranStates.Kerman] = "کرمان";
        enumration[IranStates.Semnan] = "سمنان";
        enumration[IranStates.Markazi] = "مرکزی";
        enumration[IranStates.Lorestan] = "لرستان";
        enumration[IranStates.Hamadan] = "همدان";
        return enumration;
    }
}  