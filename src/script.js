//ベースマップ
let gsi = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
});
let gsi_awai = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
});
let gsi_eisei = new L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg', {
    attribution: "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>"
});
let osm = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

//ライブカメラ位置、オーバレイ画像
let liveCam = L.geoJSON(livecam,{
    onEachFeature: function(feature, layer){
        layer.bindPopup('<a href="'+ feature.properties.URL + '">' + feature.properties.名称 + 'の河川カメラ' + '</a>');
    },
    pointToLayer: function (feature, coordinates) {
        return L.marker(coordinates, {icon:
            L.AwesomeMarkers.icon({
                icon: 'fa-video',
                markerColor: 'darkblue',
                prefix: 'fa',
            })
        })
    },
    attribution: "<a href='http://www3.doboku-bousai.pref.kagoshima.jp/bousai/jsp/index.jsp'>鹿児島県土木部</a>※位置は個人調査"
});
let kouzui_max = new L.tileLayer('https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png', {
    attribution: "<a href='https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin'>©ハザードマップポータルサイト</a>",
    opacity:0.8
});
let kouzui_keikaku = new L.tileLayer('https://disaportaldata.gsi.go.jp/raster/01_flood_l1_shinsuishin_newlegend_data/{z}/{x}/{y}.png', {
    attribution: "<a href='https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin'>©ハザードマップポータルサイト</a>",
    opacity:0.8
});
let kouzui_time = new L.tileLayer('https://disaportaldata.gsi.go.jp/raster/01_flood_l2_keizoku_data/{z}/{x}/{y}.png', {
    attribution: "<a href='https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin'>©ハザードマップポータルサイト</a>",
    opacity:0.8
});
let tsunami = new L.tileLayer('https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_pref_data/46/{z}/{x}/{y}.png', {
    attribution: "<a href='https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin'>©ハザードマップポータルサイト</a>",
    opacity:0.8
});
let dosekiryu = new L.tileLayer('https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki_data/46/{z}/{x}/{y}.png', {
    attribution: "<a href='https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin'>©ハザードマップポータルサイト</a>",
    opacity:0.8
});
let kyukeisya = new L.tileLayer('https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki_data/46/{z}/{x}/{y}.png', {
    attribution: "<a href='https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin'>©ハザードマップポータルサイト</a>",
    opacity:0.8
});
let zisuberi = new L.tileLayer('https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki_data/46/{z}/{x}/{y}.png', {
    attribution: "<a href='https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin'>©ハザードマップポータルサイト</a>",
    opacity:0.8
});

//ベースマップ
let baseLayers = {
    "地理院地図 標準": gsi,
    "地理院地図 淡色": gsi_awai,
    "地理院地図 衛星画像": gsi_eisei,
    "OpenStreetMap 標準": osm,
};
//オーバレイ
let overLayers = {
    "河川ライブカメラ": liveCam,
    "洪水浸水想定区域（想定最大規模）": kouzui_max,
    "洪水浸水想定区域（計画規模）": kouzui_keikaku,
    "浸水継続時間（想定最大規模）": kouzui_time,
    "津波浸水想定": tsunami,
    "土砂災害警戒区域（土石流）": dosekiryu,
    "土砂災害警戒区域（急傾斜地の崩壊）": kyukeisya,
    "土砂災害警戒区域（地すべり）": zisuberi,
};

let eria = [
    [32.256027, 125.590418],
    [26.809602, 132.118053]
];

//マップのオプションたち
let mymap = L.map('map',{
    center:[31.119304, 130.542668],
    zoom:9,
    maxZoom:17,
    minZoom:8,
    maxBounds: eria,
    zoomControl:true,
    layers:[gsi_awai,liveCam,kouzui_max],
    condensedAttributionControl: false
});
//レイヤコントール追加
L.control.layers(baseLayers,overLayers).addTo(mymap);

//attributionのまとめプラグインーーーーーーーーーーーーーーーーーーーーーーー
L.control.condensedAttribution({
    emblem: '<div class="emblem-wrap"><i class="far fa-copyright"></i></div>',
    prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | <a href="https://github.com/jomon111/kagoshima-hazard">Github</a>'
  }).addTo(mymap);

//現在地の表示プラグインーーーーーーーーーーーーーーーーーーーーーーーーーーー
let lc = L.control.locate({
    flyTo:true,
    strings: {
        title: "現在地を表示する",
    },
    showPopup:false,
    onLocationError(){
        alert('現在地を取得できませんでした');
    },
    onLocationOutsideMapBounds(){
        alert('あなたは鹿児島にいないよ！');
        lc.stop();
    },
}).addTo(mymap);

//ダイアログプラグインーーーーーーーーーーーーーーーーーーーーーーーーーーーー
    var options = {
        title:null,
        content:'<h3><u>はじめに</u></h3><p>このサイトは個人が作った<b>鹿児島県ハザードマップサイト</b>です。鹿児島県のハザードマップを改良＋河川カメラ情報を載せてみました。<br>現在地が鹿児島県じゃない人には<b>「鹿児島にいないよ！」</b>と教えてくれます！<br>ご意見やお問い合わせは<a href="https://forms.gle/r18wQ3vw3DVHAHyh9">こちら</a>からお願いします。</p><h3><u>使い方</u></h3><p>①このダイアログを読み終えたら右下の<b>OKボタンを押してください</b>。<br>②現在地の取得確認がでますので、許可すると現在地まで飛んでいきます。<br>③見たいハザードマップを<img src="./assets/layers.png">から選ぶと、凡例が左下に出ますので近所を確認してみましょう！</p><h3><u>各ボタンの説明</u></h3><p><img src="./assets/layers.png">　ハザードマップや背景地図を選ぶ<br><img src="./assets/location-arrow.png">　現在地に飛ぶ</p><h3><u>留意点と注意点</u></h3><p><li>本サイトで提供するマップは、データ作成上の誤差を含んでおりますので、参考までにご利用ください。<li>また、本サイトのハザードマップ情報は、国交省の運用する<a href="https://disaportal.gsi.go.jp/">ハザードマップポータイルサイト</a>から取得しているため、ハザードマップポータイルサイトにない情報について、本サイトにおいても表示できておりませんので、ご注意ください。<li>本サイトの利用によって、直接または間接の損失・損害が発生した場合、一切の責任を負いません。<li>本サイトの河川カメラの外部リンク先は、<a href="https://www.pref.kagoshima.jp/ah08/infra/kasen-sabo/sabo/jyouhoushisutemu.html">鹿児島県土木部砂防課</a>になっております。</p>',
        modal: true,
        position:'center',
        closeButton:false
    };
    var win =  L.control.window(mymap, options)
    .prompt({callback:function(){
        //OKボタンを押したら初期から現在地を探す
        lc.start()}}).show()

//ーーーーーーーーーーーーーー以下凡例関係の設定ーーーーーーーーーーーーーーー
let htmlLegendKouzui = L.control.htmllegend({
    position:'bottomleft',
    disableVisibilityControls:true,
    legends:[{
        name:'洪水浸水想定区域（想定最大規模）',
        layer: kouzui_max,
        elements: [{
            label: '0.5m未満',
            html:'',
            style: {
                'background-color': '#F7F5A9',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '0.5～3.0m',
            html: '',
            style: {
                'background-color': '#FFD8C0',
                'width': '30px',
                'height': '10px'
            } 
        },{
            label: '3.0～5.0m',
            html: '',
            style: {
                'background-color': '#FFB7B7',
                'width': '30px',
                'height': '10px'
            } 
        },{
            label: '5.0～10.0m',
            html: '',
            style: {
                'background-color': '#FF9191',
                'width': '30px',
                'height': '10px'
            } 
        },{
            label: '10.0～20.0m',
            html: '',
            style: {
                'background-color': '#F285C9',
                'width': '30px',
                'height': '10px'
            } 
        },{
            label: '20.0m以上',
            html: '',
            style: {
                'background-color': '#DC7ADC',
                'width': '30px',
                'height': '10px'
            } 
        }]
    }]
})
mymap.addControl(htmlLegendKouzui)

htmlLegendKouzui.addLegend({
    name:'洪水浸水想定区域（計画規模）',
    layer: kouzui_keikaku,
    elements: [{
        label: '0.5m未満',
        html: '',
        style: {
            'background-color': '#F7F5A9',
            'width': '30px',
            'height': '10px'
        }
    },{
        label: '0.5～3.0m',
        html: '',
        style: {
            'background-color': '#FFD8C0',
            'width': '30px',
            'height': '10px'
        } 
    },{
        label: '3.0～5.0m',
        html: '',
        style: {
            'background-color': '#FFB7B7',
            'width': '30px',
            'height': '10px'
        } 
    },{
        label: '5.0～10.0m',
        html: '',
        style: {
            'background-color': '#FF9191',
            'width': '30px',
            'height': '10px'
        } 
    },{
        label: '10.0～20.0m',
        html: '',
        style: {
            'background-color': '#F285C9',
            'width': '30px',
            'height': '10px'
        } 
    },{
        label: '20.0m以上',
        html: '',
        style: {
            'background-color': '#DC7ADC',
            'width': '30px',
            'height': '10px'
        } 
    }]
})

let htmlLegendKouzuitime = L.control.htmllegend({
    position:'bottomleft',
    disableVisibilityControls:true,
    legends:[{
        name:'浸水継続時間（想定最大規模）',
        layer: kouzui_time,
        elements: [{
            label: '12時間未満',
            html: '',
            style: {
                'background-color': '#A0D2FF',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '12時間～1日未満',
            html: '',
            style: {
                'background-color': '#0041FF',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '1日～3日未満',
            html: '',
            style: {
                'background-color': '#FAF500',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '3日～1週間未満',
            html: '',
            style: {
                'background-color': '#FF9900',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '1週間～2週間未満',
            html: '',
            style: {
                'background-color': '#FF2800',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '2週間～4週間未満',
            html: '',
            style: {
                'background-color': '#B40068',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '4週間以上～',
            html: '',
            style: {
                'background-color': '#600060',
                'width': '30px',
                'height': '10px'
            }
        }]
    }]
})
mymap.addControl(htmlLegendKouzuitime)

let htmlLegendTsunami = L.control.htmllegend({
    position:'bottomleft',
    disableVisibilityControls:true,
    legends:[{
        name:'津波浸水想定',
        layer: tsunami,
        elements: [{
            label: '0.3m未満',
            html: '',
            style: {
                'background-color': '#FFFFB3',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '0.3～0.5m',
            html: '',
            style: {
                'background-color': '#F7F5A9',
                'width': '30px',
                'height': '10px'
            } 
        },{
            label: '0.5～1.0m',
            html: '',
            style: {
                'background-color': '#F8E1A6',
                'width': '30px',
                'height': '10px'
            } 
        },{
            label: '1.0～3.0m',
            html: '',
            style: {
                'background-color': '#FFD8C0',
                'width': '30px',
                'height': '10px'
            } 
        },{
            label: '3.0～5.0m',
            html: '',
            style: {
                'background-color': '#FFB7B7',
                'width': '30px',
                'height': '10px'
            } 
        },{
            label: '5.0～10.0m',
            html: '',
            style: {
                'background-color': '#FF9191',
                'width': '30px',
                'height': '10px'
            } 
        },{
            label: '10.0～20.0m',
            html: '',
            style: {
                'background-color': '#F285C9',
                'width': '30px',
                'height': '10px'
            } 
        },{
            label: '20.0m以上',
            html: '',
            style: {
                'background-color': '#DC7ABC',
                'width': '30px',
                'height': '10px'
            } 
        }]
    }]
})
mymap.addControl(htmlLegendTsunami)

let htmlLegendDosekiryu = L.control.htmllegend({
    position:'bottomleft',
    disableVisibilityControls:true,
    legends:[{
        name:'土砂災害警戒区域（土石流）',
        layer: dosekiryu,
        elements: [{
            label: '特別警戒区域',
            html: '',
            style: {
                'background-color': '#C04C63',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '警戒区域',
            html: '',
            style: {
                'background-color': '#EDD86F',
                'width': '30px',
                'height': '10px'
            } 
        }]
    }]
})
mymap.addControl(htmlLegendDosekiryu)

let htmlLegendKyukeisya = L.control.htmllegend({
    position:'bottomleft',
    disableVisibilityControls:true,
    legends:[{
        name:'土砂災害警戒区域（急傾斜地の崩壊）',
        layer: kyukeisya,
        elements: [{
            label: '特別警戒区域',
            html: '',
            style: {
                'background-color': '#FB684C',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '警戒区域',
            html: '',
            style: {
                'background-color': '#FFED4C',
                'width': '30px',
                'height': '10px'
            } 
        }]
    }]
})
mymap.addControl(htmlLegendKyukeisya)

let htmlLegendZisuberi = L.control.htmllegend({
    position:'bottomleft',
    disableVisibilityControls:true,
    legends:[{
        name:'土砂災害警戒区域（地すべり）',
        layer: zisuberi,
        elements: [{
            label: '特別警戒区域',
            html: '',
            style: {
                'background-color': '#CA4C95',
                'width': '30px',
                'height': '10px'
            }
        },{
            label: '警戒区域',
            html: '',
            style: {
                'background-color': '#FFB74C',
                'width': '30px',
                'height': '10px'
            } 
        }]
    }]
})
mymap.addControl(htmlLegendZisuberi)
