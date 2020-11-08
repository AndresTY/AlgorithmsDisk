var Petition = /** @class */ (function () {
    function Petition(_name, _disk) {
        this.name = _name;
        this.disk = _disk;
    }
    return Petition;
}());
var FIFO = /** @class */ (function () {
    function FIFO(_diskSize, _startPoint) {
        this.diskSize = _diskSize;
        this.Point = _startPoint;
        this.petitionList = [];
        this.blockScrolling = 0;
    }
    FIFO.prototype.fillQueue = function (newPetition) {
        newPetition.disk <= this.diskSize ? this.petitionList.push(newPetition) : console.log("the request " + newPetition.name + " isn't on the disk");
    };
    FIFO.prototype.exec = function () {
        var _this = this;
        this.petitionList.forEach(function (a) {
            console.log("from " + _this.Point + " to " + a.disk);
            _this.blockScrolling += Math.abs(_this.Point - a.disk);
            _this.Point = a.disk;
        });
        console.log("Block scrolling: " + this.blockScrolling);
    };
    return FIFO;
}());
var SSTF = /** @class */ (function () {
    function SSTF(_diskSize, _startPoint) {
        this.diskSize = _diskSize;
        this.Point = _startPoint;
        this.petitionList = [];
        this.blockScrolling = 0;
    }
    SSTF.prototype.fillQueue = function (newPetition) {
        newPetition.disk <= this.diskSize ? this.petitionList.push(newPetition) : console.log("the request " + newPetition.name + " isn't on the disk");
    };
    SSTF.prototype.exec = function () {
        while (this.petitionList.length != 0) {
            this.shortestRoute = Infinity;
            for (var _i = 0, _a = this.petitionList; _i < _a.length; _i++) {
                var a = _a[_i];
                if (Math.abs(this.Point - a.disk) < this.shortestRoute) {
                    this.temporalPoint = a;
                    this.shortestRoute = Math.abs(this.Point - a.disk);
                }
            }
            this.petitionList.splice(this.petitionList.indexOf(this.temporalPoint), 1);
            console.log("from " + this.Point + " to " + this.temporalPoint.disk);
            this.blockScrolling += this.shortestRoute;
            this.Point = this.temporalPoint.disk;
        }
        console.log("Block scrolling: " + this.blockScrolling);
    };
    return SSTF;
}());
var SCAN = /** @class */ (function () {
    function SCAN(_diskSize, _startPoint) {
        this.diskSize = _diskSize;
        this.Point = _startPoint;
        this.petitionList = [];
        this.blockScrolling = 0;
    }
    SCAN.prototype.fillQueue = function (newPetition) {
        newPetition.disk <= this.diskSize ? this.petitionList.push(newPetition) : console.log("the request " + newPetition.name + " isn't on the disk");
    };
    SCAN.prototype.exec = function () {
        var _this = this;
        var travel = this.Point;
        var direction;
        travel < this.diskSize / 2 ? direction = -1 : direction = 1;
        while (this.petitionList.length != 0) {
            this.blockScrolling += 1;
            this.petitionList.forEach(function (a) {
                if (a.disk == travel) {
                    _this.petitionList.splice(_this.petitionList.indexOf(a), 1);
                    console.log("complete " + a.name + " in " + a.disk);
                }
            });
            if (travel == 0 || travel == this.diskSize) {
                direction = direction * (-1);
            }
            travel += direction;
        }
        console.log("Block scrolling: " + this.blockScrolling);
    };
    return SCAN;
}());
var CSCAN = /** @class */ (function () {
    function CSCAN(_diskSize, _startPoint) {
        this.diskSize = _diskSize;
        this.Point = _startPoint;
        this.petitionList = [];
        this.blockScrolling = 0;
    }
    CSCAN.prototype.fillQueue = function (newPetition) {
        newPetition.disk <= this.diskSize ? this.petitionList.push(newPetition) : console.log("the request " + newPetition.name + " isn't on the disk");
    };
    CSCAN.prototype.exec = function () {
        var _this = this;
        var travel = this.Point;
        var direction = 1;
        while (this.petitionList.length != 0) {
            this.blockScrolling += 1;
            this.petitionList.forEach(function (a) {
                if (a.disk == travel) {
                    _this.petitionList.splice(_this.petitionList.indexOf(a), 1);
                    console.log("complete " + a.name + " in " + a.disk);
                }
            });
            if (travel == this.diskSize) {
                travel = 0;
                this.blockScrolling += this.diskSize;
            }
            travel += direction;
        }
        console.log("Block scrolling: " + this.blockScrolling);
    };
    return CSCAN;
}());
var LOOK = /** @class */ (function () {
    function LOOK(_diskSize, _startPoint) {
        this.diskSize = _diskSize;
        this.Point = _startPoint;
        this.blockScrolling = 0;
        this.petitionList = [];
    }
    LOOK.prototype.fillQueue = function (newPetition) {
        newPetition.disk <= this.diskSize ? this.petitionList.push(newPetition) : console.log("the request " + newPetition.name + " isn't on the disk");
    };
    LOOK.prototype.exec = function () {
        var _this = this;
        var travel = this.Point;
        var direction;
        var numbers = this.petitionList.map(function (a) { return a.disk; });
        this.Point > this.diskSize / 2 ? direction = 1 : direction = -1;
        while (this.petitionList.length != 0) {
            this.blockScrolling += 1;
            this.petitionList.forEach(function (a) {
                if (a.disk == travel) {
                    _this.petitionList.splice(_this.petitionList.indexOf(a), 1);
                    console.log("complete " + a.name + " in " + a.disk);
                }
            });
            if (travel == Math.min.apply(null, numbers) || travel == Math.max.apply(null, numbers)) {
                direction *= -1;
            }
            travel += direction;
        }
        console.log("Block scrolling: " + this.blockScrolling);
    };
    return LOOK;
}());
