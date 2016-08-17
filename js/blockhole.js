!function (a, b) {
    // debugger ;
    if (typeof define == "function" && define.amd) {
        define(b)
    } else {
        this[a] = b()
    }
}("blackhole", function () {
    var C = 302;
    var K = 303;
    var s = (function () {
        var R, S;
        var N;
        var W;

        function O(Z) {// s.start调用此方法 ，传入的参数是Q() ，其实就是k.refer（） ;
            N = Z;
            R = true;
            W = requestAnimationFrame(T)
        }

        function X() {
            R = false;
            cancelAnimationFrame(W)
        }

        function T() {
            if (!R) {
                return
            }
            if (N) {
                N()
            }
            W = requestAnimationFrame(T)
        }

        Vector2 = function (Z, aa) {
            this.x = Z;
            this.y = aa
        };
        Vector2.prototype = {
            copy: function () {
                return new Vector2(this.x, this.y)
            }, length: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            }, sqrLength: function () {
                return this.x * this.x + this.y * this.y
            }, normalize: function () {
                var Z = 1 / this.length();
                return new Vector2(this.x * Z, this.y * Z)
            }, negate: function () {
                return new Vector2(-this.x, -this.y)
            }, add: function (Z) {
                return new Vector2(this.x + Z.x, this.y + Z.y)
            }, subtract: function (Z) {
                return new Vector2(this.x - Z.x, this.y - Z.y)
            }, multiply: function (Z) {
                return new Vector2(this.x * Z, this.y * Z)
            }, divide: function (aa) {
                var Z = 1 / aa;
                return new Vector2(this.x * Z, this.y * Z)
            }, dot: function (Z) {
                return this.x * Z.x + this.y * Z.y
            }
        };
        Vector2.zero = new Vector2(0, 0);
        Vector2.one = new Vector2(1, 1);
        var Q = 0;
        Particle = function (aa, ab, Z) {
            this.id = Q++;
            this.position = Vector2.zero;
            this.velocity = ab;
            this.acceleration = Vector2.zero;
            this.age = 0;
            this.life = 1;
            this.size = 5;
            this.$e = aa;
            this.dst = ab;
            this.startStep = Z;
            this.scale = 1;
            this.initDistance = this.dst.sqrLength();
            this.distance = this.initDistance
        };
        var P = 0.02;
        var V = 100000;
        Particle.prototype.update = function () {
            this.position = this.position.add(this.velocity.multiply(P));
            this.velocity = this.velocity.add(this.acceleration.multiply(P));
            if (this.isReached()) {
                this.position = this.dst
            }
            this.distance = this.dst.subtract(this.position).sqrLength();
            if (this.distance <= V) {
                this.scale = this.distance / Math.min(V, this.initDistance);
                this.scale = Math.max(this.scale, 0.1);
                this.scale = Math.min(this.scale, 1)
            }
        };
        Particle.prototype.isReached = function () {
            return Math.abs(this.position.x) >= Math.abs(this.dst.x) && Math.abs(this.position.y) >= Math.abs(this.dst.y)
        };
        function Y() {
            var ae = this;
            var ad = new Array();
            this.particles = ad;
            var ac = {particleComplete: null, allComplete: null};
            this.gravity = new Vector2(0, 100);
            this.effectors = new Array();
            var ab = f;
            this.init = function (af) {
                if (af) {
                    $.extend(ac, af)
                }
                ab = f
            };
            this.emit = function (af) {
                ad.push(af)
            };
            var aa = 0;
            this.render = function () {
                ++aa;
                var aj = $(window).width();
                var ag = $(window).height();
                for (var ai in ad) {
                    var ak = ad[ai];
                    if (aa < ak.startStep) {
                        continue
                    }
                    if (aa == ak.startStep) {
                        ak.$e.css({position: "relative", zIndex: K})
                    }
                    ab += 1;
                    var af = ac.x - ab / 2;
                    var al = ac.y - ab / 2 - $(document).scrollTop();
                    $(".ops-blackhole").css({width: ab, height: ab, left: af, top: al, zIndex: C});
                    ak.update();
                    var ah = "scale(" + ak.scale + ", " + ak.scale + ") ";
                    ah += "translate(" + ak.position.x / ak.scale + "px, " + ak.position.y / ak.scale + "px)";
                    e(ak.$e, ah);
                    if (ak.isReached()) {
                        if (ac.particleComplete) {
                            ac.particleComplete(ak)
                        }
                        Z(ai);
                        if (this.particles.length == 0) {
                            if (ac.allComplete) {
                                ac.allComplete()
                            }
                        }
                    }
                }
            };
            function Z(af) {
                if (ad.length > 1) {
                    ad[af] = ad[ad.length - 1]
                }
                ad.pop()
            }
        }

        var U = {Vector2: Vector2, Particle: Particle, ParticleSystem: Y, start: O, stop: X};
        return U
    })();
    var l = "//bdaladdin.duapp.com/blackhole/img/blackhole.png";
    var m = "//bdaladdin.duapp.com/blackhole/img/close.png";

    function M() {
        var N = "display: none;width:0;height:0;animation: rotates 15s linear infinite;-moz-animation: rotates 15s linear infinite; -webkit-animation: rotates 15s linear infinite;-ms-animation: rotates 15s linear infinite;-o-animation: rotates 15s linear infinite;position:fixed;z-index:0;";
        if ($(".ops-blackhole").length == 0) {
            var P = '<style type="text/css">@-webkit-keyframes rotates{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}@-ms-keyframes rotates{from{-ms-transform:rotate(0deg)}to{-ms-transform:rotate(360deg)}}@-moz-keyframes rotates{from{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(360deg)}}@-o-keyframes rotates{from{-o-transform:rotate(0deg)}to{-o-transform:rotate(360deg)}}</style>';
            var O = "<img src=" + l + ' class="ops-blackhole" style="' + N + '"><img src=' + m + ' class="ops-close OP_LOG_BTN" data-click="{\'fm\':\'beha\'}" style="width:50px;height:50px;box-shadow:0px 0px 3px #000;position:fixed;top:100px;right:50px;z-index:305;cursor: pointer; display:none;">';
            O += P;
            $(document.body).prepend(O)
        } else {
            $(".ops-blackhole").attr("style", N);
            $(".ops-close").show()
        }
    }

    var c = "#wrapper_wrapper";
    var h = "#wrapper_wrapper img, #bds-wraper img";
    var z = "data-blackhole-";
    var o = ["position", "z-index", "top", "left", "width", "height", "transform", "-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform"];

    function n(R) {
        for (var P = 0; P < o.length; ++P) {
            var N = o[P];
            var O = z + N;
            var Q = R.css(N);
            R.data(O, Q)
        }
    }

    function a(R) {
        for (var P = 0; P < o.length; ++P) {
            var N = o[P];
            var O = z + N;
            var Q = R.data(O);
            R.css(N, Q);
            R.removeData(O)
        }
    }

    var p = 30;
    var D = "0%";
    var v = 400;
    var g = 0;
    var E = 0;
    var k;

    function b(P, R) {
        // debugger ;
        var N = P + $(document).scrollLeft();
        var S = R + $(document).scrollTop();
        k = new s.ParticleSystem();
        k.init({
            particleComplete: function (T) {
                T.$e.hide();
                a(T.$e)
            }, allComplete: function () {
                B()
            }, x: N, y: S
        });
        var O = 0;
        $(h).each(function () {
            if (g >= p) {
                return
            }
            var X = $(this);
            var T = 3 - Math.floor(g / 10);
            if (T < 1) {
                T = 1
            }
            O += T;
            ++g;
            n(X);
            var W = X.offset();
            var V = N - W.left - X.width() / 2;
            var U = S - W.top - X.height() / 2;
            k.emit(new s.Particle(X, new Vector2(V, U), O))
        });
        if (g == 0) {
            B()
        }
        function Q() {
            k.render()
        }

        s.start(Q)
    }

    var F = ["-ms-", "-webkit-", "-moz-", "-o-", ""];

    function e(O, Q) {
        var P = {};
        for (var N = 0; N < F.length; ++N) {
            P[F[N] + "transform"] = Q
        }
        O.css(P)
    }

    function w(N, P) {
        var O = "scale(" + P + "," + P + ")";
        e(N, O)
    }

    function B() {
        e($("#wrapper_wrapper"), "scale(0,0)");
        $("#s_tab,.nums").fadeOut();
        J()
    }

    var i = 0;
    var t = 0;
    var G;

    function r() {
        i += 0.03;
        t += 0.03;
        if (i > 1) {
            i = 1;
            t = 1
        }
        e($("#wrapper_wrapper"), "scale(" + i + "," + t + ")");
        if (i < 1) {
            G = requestAnimationFrame(r)
        }
    }

    function J() {
        $(".ops-blackhole").animate({
            width: 0,
            height: 0,
            padding: 0,
            left: $(window).width() / 2,
            top: $(window).height() / 2
        }, 1000, function () {
            G = requestAnimationFrame(r);
            $(h).fadeIn();
            $("#s_tab,.nums").fadeIn();
            $(".ops-close").fadeOut()
        })
    }

    var f = 500;

    function L(N, O) {
        // 显示黑洞图片
        $(".ops-close").fadeIn();
        $(".ops-blackhole").css({width: 0, height: 0, left: N, top: O}).show().animate({
            width: f,
            height: f,
            left: N - f / 2,
            top: O - f / 2
        }, 1000, function () {
            b(N, O)
        })
    }

    function j() {
        $(document).one("click", function (O) {
            var N = O.clientX;
            var P = O.clientY;
            L(N, P)
        })
    }

    function q() {
        var N = $(window).width() / 2;
        var O = $(window).height() / 2;
        L(N, O)
    }

    function d() {
        s.stop();
        $(h).stop(true).each(function () {
            var N = $(this);
            a(N);
            N.show()
        });
        $(c).stop(true);
        w($(c), 1);
        $(c).show()
    }

    function A(N) {
        var Q = [], O = 0;
        var S = function () {
        };
        var N = (typeof N != "object") ? [N] : N;

        function R() {
            O++;
            if (O == N.length) {
                S(Q)
            }
        }

        for (var P = 0; P < N.length; P++) {
            Q[P] = new Image();
            Q[P].onload = function () {
                R()
            };
            Q[P].onerror = function () {
                R()
            };
            Q[P].src = N[P]
        }
        return {
            done: function (T) {
                S = T || S
            }
        }
    }

    function y() {
        g = 0;
        E = 0
    }

    function I() {
        // 入口？？
        // if (x.msie && x.version <= 9) {
        //     return
        // }
        y();
        M();
        A([l, m]).done(function (N) {
            q()
        });
        $(".ops-close").bind("click", function () {
            u()
        })
    }

    function u() {
        cancelAnimationFrame(G);
        $(".ops-blackhole").stop(true).hide();
        $(".ops-close").hide();
        d()
    }

    var H = {init: I, dispose: u};
    window.H_ = H ;
    return H
});