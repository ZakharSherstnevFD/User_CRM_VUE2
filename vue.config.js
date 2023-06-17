module.exports = {
    publicPath:
        process.env.NODE_ENV === "production"
         ? "/"
         : "/",
         assetsDir: "",
         filenameHashing: true,
         productionSourceMap: false,
}