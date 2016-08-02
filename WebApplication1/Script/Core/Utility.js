var Utility;
(function (Utility) {
    var Geometry;
    (function (Geometry) {
        var Point = (function () {
            function Point(x, y) {
                this.x = x;
                this.y = y;
            }
            return Point;
        })();
        Geometry.Point = Point;
        var Circle = (function () {
            function Circle(center, radius) {
                this.center = center;
                this.radius = radius;
            }
            return Circle;
        })();
        Geometry.Circle = Circle;
    })(Geometry = Utility.Geometry || (Utility.Geometry = {}));
    var Convertor;
    (function (Convertor) {
        function enumToString(enumType, arg) {
            var res = enumType[arg];
            return res;
        }
        Convertor.enumToString = enumToString;
        function degreeToRadians(degrees) {
            return degrees * Math.PI / 180;
        }
        Convertor.degreeToRadians = degreeToRadians;
        function radianToDegree(radians) {
            return radians * 180 / Math.PI;
        }
        Convertor.radianToDegree = radianToDegree;
        function polarToEuclidean(radius, angleInDegree) {
            var angle = degreeToRadians(angleInDegree);
            var res = new Geometry.Point(radius * Math.cos(angle), radius * Math.sin(angle));
            return res;
        }
        Convertor.polarToEuclidean = polarToEuclidean;
        function hslToRgb(h, s, l) {
            var r, g, b, m, c, x;
            if (!isFinite(h))
                h = 0;
            if (!isFinite(s))
                s = 0;
            if (!isFinite(l))
                l = 0;
            h /= 60;
            if (h < 0)
                h = 6 - (-h % 6);
            h %= 6;
            s = Math.max(0, Math.min(1, s / 100));
            l = Math.max(0, Math.min(1, l / 100));
            c = (1 - Math.abs((2 * l) - 1)) * s;
            x = c * (1 - Math.abs((h % 2) - 1));
            if (h < 1) {
                r = c;
                g = x;
                b = 0;
            }
            else if (h < 2) {
                r = x;
                g = c;
                b = 0;
            }
            else if (h < 3) {
                r = 0;
                g = c;
                b = x;
            }
            else if (h < 4) {
                r = 0;
                g = x;
                b = c;
            }
            else if (h < 5) {
                r = x;
                g = 0;
                b = c;
            }
            else {
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
        Convertor.hslToRgb = hslToRgb;
    })(Convertor = Utility.Convertor || (Utility.Convertor = {}));
    function notNanNullEmpty(arg) {
        return !_.isNull(arg) && !_.isNaN(arg) && !_.isUndefined(arg);
    }
    Utility.notNanNullEmpty = notNanNullEmpty;
    var String = (function () {
        function String() {
        }
        String.seprateString = function (value, seprate, seprator) {
            if (seprate === void 0) { seprate = 3; }
            if (seprator === void 0) { seprator = ","; }
            var res = "";
            if (notNanNullEmpty(value)) {
                var str = value;
                while (str.length > 0) {
                    if (str.length <= seprate) {
                        res += str;
                        break;
                    }
                    else {
                        res += str.slice(0, seprate) + seprator;
                        str = str.slice(seprate);
                    }
                }
            }
            return res;
        };
        return String;
    })();
    Utility.String = String;
    var Typescript;
    (function (Typescript) {
        var Directive;
        (function (Directive) {
            (function (EventType) {
                EventType[EventType["NgBlur"] = 0] = "NgBlur";
                EventType[EventType["NgChange"] = 1] = "NgChange";
                EventType[EventType["NgClick"] = 2] = "NgClick";
                EventType[EventType["NgCopy"] = 3] = "NgCopy";
                EventType[EventType["NgCut"] = 4] = "NgCut";
                EventType[EventType["NgDblclick"] = 5] = "NgDblclick";
                EventType[EventType["NgFocus"] = 6] = "NgFocus";
                EventType[EventType["NgKeydown"] = 7] = "NgKeydown";
                EventType[EventType["NgKeypress"] = 8] = "NgKeypress";
                EventType[EventType["NgKeyup"] = 9] = "NgKeyup";
                EventType[EventType["NgMousedown"] = 10] = "NgMousedown";
                EventType[EventType["NgMouseenter"] = 11] = "NgMouseenter";
                EventType[EventType["NgMouseleave"] = 12] = "NgMouseleave";
                EventType[EventType["NgMousemove"] = 13] = "NgMousemove";
                EventType[EventType["NgMouseover"] = 14] = "NgMouseover";
                EventType[EventType["NgMouseup"] = 15] = "NgMouseup";
                EventType[EventType["NgPaste"] = 16] = "NgPaste";
            })(Directive.EventType || (Directive.EventType = {}));
            var EventType = Directive.EventType;
            (function (RestrictType) {
                RestrictType[RestrictType["E"] = 0] = "E";
                RestrictType[RestrictType["A"] = 1] = "A";
                RestrictType[RestrictType["C"] = 2] = "C";
                RestrictType[RestrictType["M"] = 3] = "M";
                RestrictType[RestrictType["AE"] = 4] = "AE";
                RestrictType[RestrictType["AEC"] = 5] = "AEC";
            })(Directive.RestrictType || (Directive.RestrictType = {}));
            var RestrictType = Directive.RestrictType;
        })(Directive = Typescript.Directive || (Typescript.Directive = {}));
    })(Typescript = Utility.Typescript || (Utility.Typescript = {}));
    (function (IranStates) {
        IranStates[IranStates["Gilan"] = 0] = "Gilan";
        IranStates[IranStates["Zanjan"] = 1] = "Zanjan";
        IranStates[IranStates["Bushehr"] = 2] = "Bushehr";
        IranStates[IranStates["Tehran"] = 3] = "Tehran";
        IranStates[IranStates["Hormozgan"] = 4] = "Hormozgan";
        IranStates[IranStates["Golestan"] = 5] = "Golestan";
        IranStates[IranStates["Ilam"] = 6] = "Ilam";
        IranStates[IranStates["Alborz"] = 7] = "Alborz";
        IranStates[IranStates["WestAzarbaijan"] = 8] = "WestAzarbaijan";
        IranStates[IranStates["KohgiluyehAndBuyerAhmad"] = 9] = "KohgiluyehAndBuyerAhmad";
        IranStates[IranStates["SouthKhorasan"] = 10] = "SouthKhorasan";
        IranStates[IranStates["Kordestan"] = 11] = "Kordestan";
        IranStates[IranStates["OtherCountries"] = 12] = "OtherCountries";
        IranStates[IranStates["Ardebil"] = 13] = "Ardebil";
        IranStates[IranStates["Fars"] = 14] = "Fars";
        IranStates[IranStates["Mazandaran"] = 15] = "Mazandaran";
        IranStates[IranStates["Kermanshah"] = 16] = "Kermanshah";
        IranStates[IranStates["Qazvin"] = 17] = "Qazvin";
        IranStates[IranStates["Yazd"] = 18] = "Yazd";
        IranStates[IranStates["RazaviKhorasan"] = 19] = "RazaviKhorasan";
        IranStates[IranStates["Qom"] = 20] = "Qom";
        IranStates[IranStates["SistanAndBaluchestan"] = 21] = "SistanAndBaluchestan";
        IranStates[IranStates["NorthKhorasan"] = 22] = "NorthKhorasan";
        IranStates[IranStates["ChaharMahallAndBakhtiari"] = 23] = "ChaharMahallAndBakhtiari";
        IranStates[IranStates["Esfahan"] = 24] = "Esfahan";
        IranStates[IranStates["EastAzarbaijan"] = 25] = "EastAzarbaijan";
        IranStates[IranStates["Khuzestan"] = 26] = "Khuzestan";
        IranStates[IranStates["Kerman"] = 27] = "Kerman";
        IranStates[IranStates["Semnan"] = 28] = "Semnan";
        IranStates[IranStates["Markazi"] = 29] = "Markazi";
        IranStates[IranStates["Lorestan"] = 30] = "Lorestan";
        IranStates[IranStates["Hamadan"] = 31] = "Hamadan";
    })(Utility.IranStates || (Utility.IranStates = {}));
    var IranStates = Utility.IranStates;
    function iranStatesFarsi() {
        var enumration = [];
        enumration[0 /* Gilan */] = "گیلان";
        enumration[1 /* Zanjan */] = "زنجان";
        enumration[2 /* Bushehr */] = "بوشهر";
        enumration[3 /* Tehran */] = "تهران";
        enumration[4 /* Hormozgan */] = "هرمزگان";
        enumration[5 /* Golestan */] = "گلستان";
        enumration[6 /* Ilam */] = "ایلام";
        enumration[7 /* Alborz */] = "البرز";
        enumration[8 /* WestAzarbaijan */] = "آذربایجان غربی";
        enumration[9 /* KohgiluyehAndBuyerAhmad */] = "کهکیلویه و بویر احمد";
        enumration[10 /* SouthKhorasan */] = "خراسان جنوبی";
        enumration[11 /* Kordestan */] = "کردستان";
        enumration[13 /* Ardebil */] = "اردبیل";
        enumration[14 /* Fars */] = "فارس";
        enumration[15 /* Mazandaran */] = "مازندران";
        enumration[16 /* Kermanshah */] = "کرمانشاه";
        enumration[18 /* Yazd */] = "یزد";
        enumration[19 /* RazaviKhorasan */] = "خراسان رضوی";
        enumration[20 /* Qom */] = "قم";
        enumration[21 /* SistanAndBaluchestan */] = "سیستان و بلوچستان";
        enumration[22 /* NorthKhorasan */] = "خراسان شمالی";
        enumration[23 /* ChaharMahallAndBakhtiari */] = "چهار محال بختیاری";
        enumration[24 /* Esfahan */] = "اصفهان";
        enumration[25 /* EastAzarbaijan */] = "آذربایجان شرقی";
        enumration[26 /* Khuzestan */] = "خوزستان";
        enumration[27 /* Kerman */] = "کرمان";
        enumration[28 /* Semnan */] = "سمنان";
        enumration[29 /* Markazi */] = "مرکزی";
        enumration[30 /* Lorestan */] = "لرستان";
        enumration[31 /* Hamadan */] = "همدان";
        return enumration;
    }
    Utility.iranStatesFarsi = iranStatesFarsi;
})(Utility || (Utility = {}));
//# sourceMappingURL=Utility.js.map