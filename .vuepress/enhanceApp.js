// async function is also supported, too
export default ({
                    Vue, // the version of Vue being used in the VuePress app
                    options, // the options for the root Vue instance
                    router, // the router instance for the app
                    siteData, // site metadata
                    isServer // is this enhancement applied in server-rendering or client
                }) => {
    if (!isServer && window.parent !== window) {
        hideNavBar()
    }
}


function hideNavBar() {
    let sty = document.createElement("style")
    sty.setAttribute("type", "text/css")
    let css = document.createTextNode(".navbar{display:none;} .page{padding-top:0 !important;}")
    sty.appendChild(css)
    document.getElementsByTagName("head")[0].appendChild(sty)
}
