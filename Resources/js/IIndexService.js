function GetIndexService() {
    try {
        var currentWindow = Titanium.UI.getCurrentWindow();
        return desktopClient;
    }
    catch (exp) {
        return webClient;
    }
}

function getDesireRectangle()
{
        var screenWidth = document.documentElement.clientWidth;
        var screenHeight = document.documentElement.clientHeight;

        var desireWidth = 1024;
        var desireheight = 768;

        var left = ((screenWidth - desireWidth) / 2 - 100 ) > 0? (screenWidth - desireWidth) / 2 - 100 : 50;
        var top = ((screenHeight - desireheight) / 2 - 100 ) > 0? (screenHeight - desireheight) / 2 - 100 : 30;
        var desireX = left + ((Math.random() > 0.5) ? 15 : -15);
        var desireY = top + ((Math.random() > 0.5) ? 15 : -15);

        return {
                width:desireWidth,
                height:desireheight,
                desireX:desireX, 
                desireY:desireY
            };
}

var desktopClient = {
    newWindow: function (url) {
        var desireRectangle = getDesireRectangle();

        
        setTimeout(function(){
            try
            {
                var newWindow = Titanium.UI.createWindow({
                    id: "propertyWindow",
                    url: url,
                    title:"EzDesk Ultimate",
                    x: desireRectangle.desireX,
                    y: desireRectangle.desireY,
                    width: desireRectangle.width,
                    minWidth: 480,
                    height: desireRectangle.height,
                    minHeight: 360,
                    maximizable: true,
                    minimizable: true,
                    closeable: true,
                    resizable: true,
                    fullscreen: false,
                    maximized: false,
                    minimized: false,
                    usingChrome: true,
                    topMost: false,
                    visible: true,
                    transparentBackground: false,
                    transparency: false
                });

                newWindow.open();
                newWindow.show();
                newWindow.setTitle("EzDesk Ultimate");
            }
            catch(exp)
            {
                alert(exp);
            }
            
        },100);
        
    },
    setTopMost: function (value) {
        Titanium.UI.getCurrentWindow().setTopMost(value);
    },
    createTray: function () { 
        _self = this;
        setTimeout(function(){
            try{
                var tray = Titanium.UI.addTray('app://style/images/NotifyIcon.ico');
                var menu = Titanium.UI.createMenu();

                //menu.appendItem(Titanium.UI.createMenuItem('设置'));
                menu.appendItem(Titanium.UI.createMenuItem('切换用户', function () { console.log('sign out'); $.postMessage('signout', '*', parent); } ));
                menu.appendItem(Titanium.UI.createMenuItem('显示', function () { 
                    _self.showCurrentWindow();
                }));
                menu.appendItem(Titanium.UI.createMenuItem('隐藏', function () { _self.hideCurrentWindow();}));
                menu.appendItem(Titanium.UI.createMenuItem('退出', function () { Titanium.App.exit(); }));


                tray.setMenu(menu);
                tray.setHint("易得桌面");
                return tray;
            }
            catch(exp){alert(exp);}
        },100);

    },
    hideCurrentWindow: function()
    {
        Titanium.UI.getCurrentWindow().hide();
    },
    showCurrentWindow:function()
    {
        Titanium.UI.getCurrentWindow().show();
    },
};

var webClient = {
    newWindow: function (url) {
        var desireRectangle = getDesireRectangle();


        var iframe = document.createElement('iframe');
                iframe.src = url;
                iframe.width = desireRectangle.width;
                iframe.height = desireRectangle.height;
                iframe.frameborder = 'no';
                iframe.border = '0px;';
                $('body').append(iframe);
                $(iframe).css({ 'position': 'absolute', 'float': 'left', 'top': desireRectangle.desireY, 'left': desireRectangle.desireX });
    },
    setTopMost: function (value) {
        return;
    },
    createTray: function () { 
      return;
    },
     hideCurrentWindow: function()
    {
        return;
    },
    showCurrentWindow:function()
    {
        return;
    },
};