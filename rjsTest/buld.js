define("app/d", ["require", "exports", "module"], function (e, i, n) {
    alert(1)
}),
    define("app/c", ["require", "exports", "module", "app/d"], function (e, i, n) {
        e("app/d")
    }),
    define("app/b", ["require", "exports", "module", "app/c"], function (e, i, n) {
        e("app/c")
    }),
    define("app/a", ["app/b"], function (e) {
        return {name: 1}
    }),
    define("lib/lib", ["./lib"], function () {
        console.log("lib")
    }),
    require(["./app/a"], function (e) {
    }),
    require(["./lib/lib"], function (e) {
    }),
    define("app", function () {
    });