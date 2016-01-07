var rain = function (rain_selector, direction) {
    var rain_convars = $(rain_selector);
    var rain_context = rain_convars[0].getContext("2d");
    var width = $(window).width();
    var height = $(window).height();
    rain_convars.attr({"width": width, "height": height});
    var rainDrops = 5000;//雨滴
    var wind = 1;//风力
    var circles = [];
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var globalID;

    function Circle(a, b, c, d) {
        this.speed = b;
        this.xPos = c;
        this.yPos = d;
        this.opacity = -.03 + a / 10;
        this.counter = 0
    }

    Circle.prototype.update = function () {
        this.counter += this.speed;
        this.yPos + this.counter > height && (this.xPos = Math.round(Math.random() * width * wind + width), "right" == direction ? this.xPos = -1 * Math.round(Math.random() * width * wind + 25) : "left" != direction && (this.xPos = Math.round(Math.random() * width + 1)), this.yPos = -1 * Math.round(Math.random() * height * 2 + 1), this.counter = 0);
        rain_context.beginPath();
        "left" == direction ? moveParticules(this, -1, 7, 10, 11, 5) : "right" == direction ? moveParticules(this, 1, 7, 10, 11, 5) : (wind = 0, moveParticules(this, 1, 0, 15, 3, 20));
        rain_context.fillStyle = "rgba(255, 255, 255," + this.opacity.toFixed(2) + ")";
        rain_context.fill();
    };

    function moveParticules(a, b, c, d, e, f) {
        rain_context.moveTo(a.xPos + a.counter * wind * b, a.yPos + a.counter);
        rain_context.bezierCurveTo(a.xPos + a.counter * wind * b + c * b, a.yPos + a.counter + d, a.xPos + a.counter * wind * b + e * b, a.yPos + a.counter + f, a.xPos + a.counter * wind * b, a.yPos + a.counter)
    }

    function drawCircles() {
        for (var a = 0; a < rainDrops; a++) {
            var b = Math.round(Math.random() * width * wind + width);
            "right" == direction ? b *= -1 : "left" != direction && (b = Math.round(Math.random() * width * wind + 1));
            var c = -1 * Math.round(Math.random() * height * 2 + 50),
                d = 5 + 5 * Math.random(),
                e = Math.floor(10 * Math.random() + 1),
                b = new Circle(e, d, b, c);
            circles.push(b)
        }
        draw();
    }

    function draw() {
        rain_context.clearRect(0, 0, width, height);
        for (var a = 0; a < circles.length; a++) {
            circles[a].update();
        }
        globalID = requestAnimationFrame(draw);
    }

    drawCircles();

    function redraw() {
        cancelAnimationFrame(globalID);
        circles.length = 0;
        drawCircles();
    }
};